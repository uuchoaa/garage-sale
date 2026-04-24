#!/bin/sh
# wise-process: pre-commit hook delegate.
# On task/OP-N-*: confirms the task dir exists and meta.yml state == in_progress.
# On main or other branches: no-op.

set -eu

branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '')"
err() { printf 'wise-process/pre-commit: %s\n' "$1" >&2; }

case "$branch" in
  task/OP-*) ;;
  *) exit 0 ;;
esac

op_n="$(printf '%s' "$branch" | sed -nE 's#^task/(OP-[0-9]+)-.*#\1#p')"
if [ -z "$op_n" ]; then
  err "branch '$branch' must match task/OP-N-<slug>"
  exit 1
fi

repo_root="$(git rev-parse --show-toplevel)"
task_dir="$(find "$repo_root/tasks" -maxdepth 1 -type d -name "$op_n-*" 2>/dev/null | head -n1)"
if [ -z "$task_dir" ]; then
  err "no tasks/$op_n-* directory found for branch '$branch'"
  err "  did you forget to commit the intent first?"
  exit 1
fi

meta="$task_dir/meta.yml"
if [ ! -f "$meta" ]; then
  err "$meta missing"
  exit 1
fi

state="$(awk -F': *' '/^state:/{print $2; exit}' "$meta" | tr -d '"'"'"' ')"
case "$state" in
  in_progress) ;;
  "")
    err "$meta has no 'state:' field"
    exit 1
    ;;
  *)
    err "task $op_n is in state '$state', not 'in_progress' — cannot commit"
    err "  advance the task via the /dev skill before committing code"
    exit 1
    ;;
esac

exit 0
