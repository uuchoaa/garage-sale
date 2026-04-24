#!/usr/bin/env python3
"""
wise-process diff verifier.

Compares the current task branch's diff against tasks/_rules.yml and
the task's meta.yml. Exits non-zero with a named rule violation on
mismatch.

Invoked from .githooks/pre-push and from the /dev and /approve skills.

Usage:
    diff-verifier.py                # infer branch + base
    diff-verifier.py --base main    # override base ref
    diff-verifier.py --task OP-7    # override task (default: infer from branch)
"""

from __future__ import annotations

import argparse
import fnmatch
import os
import re
import subprocess
import sys
from pathlib import Path

RANK = {"tests": 0, "demo": 1, "staging": 2, "manual": 3}


def fail(msg: str, code: int = 1) -> "NoReturn":  # type: ignore[name-defined]
    print(f"wise-process/diff-verifier: {msg}", file=sys.stderr)
    sys.exit(code)


def sh(cmd: list[str]) -> str:
    return subprocess.check_output(cmd, text=True).strip()


def load_yaml(path: Path):
    try:
        import yaml  # type: ignore
    except ImportError:
        fail(
            "PyYAML not installed. Run: pip3 install --user pyyaml",
            code=2,
        )
    return yaml.safe_load(path.read_text())


def match_glob(path: str, pattern: str) -> bool:
    # Support ** by letting fnmatch.fnmatch handle *, then post-process **.
    # fnmatch treats ** the same as *, which mishandles path boundaries —
    # expand our own semantics: ** matches zero or more path segments.
    if "**" not in pattern:
        return fnmatch.fnmatch(path, pattern)
    # Convert glob → regex with ** handling.
    regex = []
    i = 0
    while i < len(pattern):
        c = pattern[i]
        if pattern[i : i + 2] == "**":
            regex.append(".*")
            i += 2
            # swallow a following /
            if i < len(pattern) and pattern[i] == "/":
                i += 1
            continue
        if c == "*":
            regex.append("[^/]*")
        elif c == "?":
            regex.append("[^/]")
        elif c in ".+^$()|{}[]\\":
            regex.append("\\" + c)
        else:
            regex.append(c)
        i += 1
    return re.fullmatch("".join(regex), path) is not None


def rule_for(path: str, rules: list[dict]) -> str | None:
    """Return the most-specific (last matching) rule's min_evidence."""
    matched: str | None = None
    for rule in rules:
        patterns = rule.get("match", [])
        if isinstance(patterns, str):
            patterns = [patterns]
        for pat in patterns:
            if match_glob(path, pat):
                matched = rule.get("min_evidence")
                break
    return matched


def find_task_dir(repo_root: Path, op_n: str) -> Path:
    candidates = list(repo_root.joinpath("tasks").glob(f"{op_n}-*"))
    if not candidates:
        fail(f"no tasks/{op_n}-* directory found")
    if len(candidates) > 1:
        fail(f"multiple tasks/{op_n}-* directories found: {candidates}")
    return candidates[0]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="main", help="base ref for diff (default: main)")
    ap.add_argument("--task", default=None, help="OP-N (default: infer from branch)")
    ap.add_argument("--quiet", action="store_true", help="suppress pass messages")
    args = ap.parse_args()

    repo_root = Path(sh(["git", "rev-parse", "--show-toplevel"]))
    os.chdir(repo_root)

    branch = sh(["git", "rev-parse", "--abbrev-ref", "HEAD"])
    op_n = args.task
    if not op_n:
        m = re.match(r"^task/(OP-\d+)-", branch)
        if not m:
            # Not on a task branch; nothing to verify.
            if not args.quiet:
                print(f"wise-process/diff-verifier: branch '{branch}' is not a task branch; skipping")
            return 0
        op_n = m.group(1)

    task_dir = find_task_dir(repo_root, op_n)
    rules_path = repo_root / "tasks" / "_rules.yml"
    meta_path = task_dir / "meta.yml"

    if not rules_path.is_file():
        fail(f"{rules_path} missing")
    if not meta_path.is_file():
        fail(f"{meta_path} missing")

    rules_data = load_yaml(rules_path) or {}
    meta = load_yaml(meta_path) or {}

    rules = rules_data.get("rules", [])
    large_threshold = int(rules_data.get("large_diff_threshold", 500))
    override_field = rules_data.get("large_diff_override_field", "large_ok")

    evidence = meta.get("evidence")
    if evidence not in RANK:
        fail(f"{meta_path}: evidence must be one of {list(RANK)}, got {evidence!r}")

    # Changed files vs base.
    try:
        diff_files = sh(["git", "diff", "--name-only", f"{args.base}...HEAD"]).splitlines()
    except subprocess.CalledProcessError:
        fail(f"`git diff {args.base}...HEAD` failed — is '{args.base}' a valid ref?")
    diff_files = [f for f in diff_files if f.strip()]
    if not diff_files:
        if not args.quiet:
            print(f"wise-process/diff-verifier: no files changed vs {args.base}")
        return 0

    # Compute required evidence as max across files.
    required_rank = 0
    required_class = "tests"
    unmatched: list[str] = []
    for f in diff_files:
        rule_ev = rule_for(f, rules)
        if rule_ev is None:
            unmatched.append(f)
            rule_ev = "manual"  # default for unmatched
        r = RANK.get(rule_ev, 3)
        if r > required_rank:
            required_rank = r
            required_class = rule_ev

    if RANK[evidence] < required_rank:
        print(
            f"wise-process/diff-verifier: declared evidence '{evidence}' is weaker than required '{required_class}'",
            file=sys.stderr,
        )
        for f in diff_files:
            ev = rule_for(f, rules) or "manual"
            print(f"  {f} → {ev}", file=sys.stderr)
        sys.exit(1)

    # Diff size.
    total_lines = 0
    try:
        out = sh(["git", "diff", "--numstat", f"{args.base}...HEAD"])
        for line in out.splitlines():
            parts = line.split("\t")
            if len(parts) >= 2:
                add = parts[0]
                rem = parts[1]
                if add.isdigit():
                    total_lines += int(add)
                if rem.isdigit():
                    total_lines += int(rem)
    except subprocess.CalledProcessError:
        pass
    if total_lines > large_threshold and not meta.get(override_field):
        fail(
            f"diff is {total_lines} lines (> {large_threshold}); set '{override_field}: true' in {meta_path} to override"
        )

    # Evidence-class-specific artifact checks.
    if evidence == "demo":
        evidence_script = repo_root / ".evidence" / f"{op_n}.sh"
        if not evidence_script.is_file():
            fail(f"evidence: demo requires {evidence_script} to exist")
        if not os.access(evidence_script, os.X_OK):
            fail(f"{evidence_script} is not executable (chmod +x)")
    elif evidence == "tests":
        has_test = any(
            f.endswith(".test.ts")
            or f.endswith(".spec.ts")
            or "__tests__/" in f
            for f in diff_files
        )
        if not has_test:
            fail("evidence: tests declared but no *.test.ts / *.spec.ts / __tests__/ files touched")

    if unmatched and not args.quiet:
        print(
            "wise-process/diff-verifier: warning — files not matched by any rule (defaulted to 'manual'):",
            file=sys.stderr,
        )
        for f in unmatched:
            print(f"  {f}", file=sys.stderr)

    if not args.quiet:
        print(
            f"wise-process/diff-verifier: {op_n} ok — evidence={evidence}, files={len(diff_files)}, lines={total_lines}"
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())
