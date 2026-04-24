#!/bin/sh
# wise-process: commit-msg hook delegate.
# Enforces [OP-N] prefix + conventional type on task/OP-N-* branches.
# On main: no enforcement (founder policy applies; see docs/wise-process.md).

set -eu

commit_msg_file="${1:?missing commit-msg file path}"
subject="$(head -n1 "$commit_msg_file")"
branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '')"

err() { printf 'wise-process/commit-msg: %s\n' "$1" >&2; }

# Global rules (any branch): no co-author footers (per wise-ui CLAUDE.md + Wise spec).
if grep -qi '^Co-authored-by:' "$commit_msg_file"; then
  err "no Co-authored-by: footers allowed"
  exit 1
fi
if grep -q 'Generated with \[Claude Code\]' "$commit_msg_file"; then
  err "no 'Generated with [Claude Code]' footers allowed"
  exit 1
fi

# Task-branch rules.
case "$branch" in
  task/OP-*)
    op_n="$(printf '%s' "$branch" | sed -nE 's#^task/(OP-[0-9]+)-.*#\1#p')"
    if [ -z "$op_n" ]; then
      err "branch '$branch' must match task/OP-N-<slug>"
      exit 1
    fi
    prefix="[$op_n] "
    case "$subject" in
      "$prefix"*) ;;
      *)
        err "subject must start with '$prefix'"
        err "  got: $subject"
        exit 1
        ;;
    esac
    if ! printf '%s' "$subject" | grep -Eq '^\[OP-[0-9]+\] (feat|fix|chore|docs|refactor|test|style|perf|build|ci): .+'; then
      err "subject must match '[OP-N] <type>: <summary>'"
      err "  types: feat|fix|chore|docs|refactor|test|style|perf|build|ci"
      err "  got: $subject"
      exit 1
    fi
    len=$(printf '%s' "$subject" | awk '{print length}')
    if [ "$len" -gt 72 ]; then
      err "subject too long ($len > 72 chars)"
      exit 1
    fi
    ;;
esac

exit 0
