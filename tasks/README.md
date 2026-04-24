# tasks/

Git is the bus. Every work package lives here as a directory.

```
tasks/
├── _rules.yml              # path → min_evidence; tune per repo
└── OP-<N>-<slug>/
    ├── intent.md           # founder prose (required)
    ├── spec.md             # planner output (exists from Triage on)
    ├── meta.yml            # state + evidence + attempts + pr + branch
    ├── attempts.log        # append-only; one line per iteration
    └── evidence/           # runnable scripts / test refs / screenshots
```

## meta.yml

```yaml
id: OP-1
state: idea          # idea | planning | triage | ready | in_progress | review | blocked | done
evidence: manual     # demo | tests | manual
attempts: 0
assignee: null       # @planner | @dev | @founder | null
pr: null
branch: null
large_ok: false      # set true to bypass _rules.yml#large_diff_threshold
```

State transitions are commits that edit `meta.yml`. `git log -- tasks/OP-N/meta.yml` is the audit trail.

## How to use

- Founder opens an intent → `/intent "<prose>"` (creates this dir, state `idea`).
- Planner writes a spec → `/plan` (moves to `triage`).
- Founder reviews plan → merge commit flips to `ready`.
- Dev implements → `/dev` (moves through `in_progress` → `review`).
- Founder approves → `/approve` runs evidence + merges PR → `done`.

Full protocol in [`docs/wise-process.md`](../docs/wise-process.md); authoritative spec in `wise-codex/simplified.md`.
