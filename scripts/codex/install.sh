#!/bin/sh
# wise-process installer. Drops skills + hooks + scripts + starter files
# into a target repo and wires core.hooksPath.
#
# Usage:
#   ./scripts/codex/install.sh                 # install into the current git repo
#   ./scripts/codex/install.sh --dry-run       # show what would happen
#   ./scripts/codex/install.sh --force         # overwrite existing files
#   CODEX_TEMPLATE=/path/to/wise-ui ./scripts/codex/install.sh
#
# Idempotent. Re-run with --force to upgrade to the latest rail.
# Preserves tasks/OP-*/ content and tasks/_rules.yml (tune per repo).

set -eu

DRY_RUN=0
FORCE=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --force) FORCE=1 ;;
    -h|--help)
      sed -n '2,13p' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    *)
      printf 'install: unknown flag: %s\n' "$arg" >&2
      exit 1
      ;;
  esac
done

# Resolve template source (default: repo containing this script).
script_path="$(cd "$(dirname "$0")" && pwd -P)/$(basename "$0")"
default_template="$(cd "$(dirname "$script_path")/../.." && pwd -P)"
TEMPLATE="${CODEX_TEMPLATE:-$default_template}"

if [ ! -d "$TEMPLATE/.claude/skills" ]; then
  printf 'install: template %s is not a wise-process source (missing .claude/skills)\n' "$TEMPLATE" >&2
  exit 1
fi

# Resolve install target.
if ! TARGET="$(git rev-parse --show-toplevel 2>/dev/null)"; then
  printf 'install: not inside a git repo\n' >&2
  exit 1
fi

if [ "$TEMPLATE" = "$TARGET" ]; then
  printf 'install: template == target (%s); running self-install (chmod + core.hooksPath only)\n' "$TARGET"
fi

# Files to copy: relative path from template root.
FILES='
.claude/skills/intent.md
.claude/skills/plan.md
.claude/skills/dev.md
.claude/skills/approve.md
.claude/skills/spawn.md
.claude/skills/unblock.md
.githooks/commit-msg
.githooks/pre-commit
.githooks/pre-push
scripts/codex/verify-commit-msg.sh
scripts/codex/verify-branch-scope.sh
scripts/codex/diff-verifier.py
scripts/codex/install.sh
tasks/_rules.yml
tasks/README.md
docs/wise-process.md
'

# Files we refuse to clobber even with --force (per-repo content).
PRESERVE='tasks/_rules.yml'

EXECUTABLES='
.githooks/commit-msg
.githooks/pre-commit
.githooks/pre-push
scripts/codex/verify-commit-msg.sh
scripts/codex/verify-branch-scope.sh
scripts/codex/diff-verifier.py
scripts/codex/install.sh
'

copied=0
skipped=0
would_copy=0

for rel in $FILES; do
  src="$TEMPLATE/$rel"
  dst="$TARGET/$rel"
  if [ ! -f "$src" ]; then
    printf 'install: missing template file: %s\n' "$src" >&2
    exit 2
  fi
  is_preserved=0
  for p in $PRESERVE; do
    [ "$rel" = "$p" ] && is_preserved=1
  done

  if [ -f "$dst" ]; then
    if [ "$is_preserved" = 1 ] || [ "$FORCE" = 0 ]; then
      if [ "$DRY_RUN" = 1 ]; then
        printf '  skip  %s (exists)\n' "$rel"
      fi
      skipped=$((skipped + 1))
      continue
    fi
  fi

  if [ "$DRY_RUN" = 1 ]; then
    printf '  write %s\n' "$rel"
    would_copy=$((would_copy + 1))
    continue
  fi

  mkdir -p "$(dirname "$dst")"
  cp "$src" "$dst"
  copied=$((copied + 1))
done

# chmod +x on executables (only if we copied or if target is missing the bit).
if [ "$DRY_RUN" = 0 ]; then
  for rel in $EXECUTABLES; do
    dst="$TARGET/$rel"
    [ -f "$dst" ] && chmod +x "$dst"
  done
fi

# Wire core.hooksPath.
if [ "$DRY_RUN" = 1 ]; then
  printf '  would run: git config core.hooksPath .githooks\n'
else
  (cd "$TARGET" && git config core.hooksPath .githooks)
fi

# Prereq check — python3 + pyyaml.
if [ "$DRY_RUN" = 0 ]; then
  if ! command -v python3 >/dev/null 2>&1; then
    printf '\ninstall: WARNING python3 not found — diff-verifier will fail\n' >&2
  elif ! python3 -c 'import yaml' >/dev/null 2>&1; then
    printf '\ninstall: WARNING PyYAML not installed. Run: pip3 install --user pyyaml\n' >&2
  fi
fi

# Summary + next steps.
if [ "$DRY_RUN" = 1 ]; then
  printf '\ndry-run: would copy %d file(s), skip %d existing\n' "$would_copy" "$skipped"
else
  printf '\nwise-process installed in %s\n' "$TARGET"
  printf '  copied: %d  skipped: %d\n' "$copied" "$skipped"
  if [ "$copied" = 0 ] && [ "$skipped" -gt 0 ] && [ "$FORCE" = 0 ]; then
    printf '  (already up to date; re-run with --force to overwrite)\n'
  fi
  printf '\nNext steps:\n'
  printf '  1. Tune tasks/_rules.yml for this repo (paths differ per codebase).\n'
  printf '  2. Append to CLAUDE.md:  "- Work follows Wise Process — see docs/wise-process.md."\n'
  printf '  3. Fire the first intent from Claude:  /intent "..."\n'
  printf '  4. Upgrade later with:  %s/scripts/codex/install.sh --force\n' "$TEMPLATE"
fi
