# Memory Index

Project-specific memory for wise-ui. User-wide preferences (language, commit policy, etc.) live at `~/.claude/memory/`.

- [DS emerges from product](feedback_ds_emerges_from_product.md) — component library is extracted from real screens; application-ui-v4/ is reference, not scaffold
- [wise-ui scope](project_scope.md) — wise-ui = Vue DS on Tailwind Plus; must serve Cashflow + Planetaria (reference apps); Garage Sale is a future consumer, not in scope
- [API style: idiomatic Vue](feedback_api_style.md) — prefer named/scoped slots over compound children; keep native tags native unless DS adds something real
- [Decide after proposal](feedback_decide_after_proposal.md) — once options are on the table and user says "go", pick and act; don't re-ask on small follow-ons
- [Animations first-class](project_animations_first_class.md) — motion tokens + primitives + per-component contracts; prefers-reduced-motion baked in
- [LLM-generated screens](project_llm_determinism.md) — screens are LLM-generated; DS must offer closed vocabulary, zero Tailwind at consumer, one canonical way per concept
- [YAML as source of truth](project_yaml_source_of_truth.md) — screens authored in YAML; deterministic translator emits .vue; production swaps the stub script for real wiring
- [Multi-target vision](project_multi_target_vision.md) — Vue-only today; architecture supports React/Rails later; portability rules; full analysis in docs/targets.md
- [Mirror memory to disk](feedback_mirror_memory_to_disk.md) — every memory write is mirrored to docs/agent-memory/ in the repo; both stay in sync
- [Foundation v1 baseline](project_foundation_v1.md) — v1 closed 2026-04-23; pinned docs in docs/ + two Home conformance screens; changes are deliberate
- [Current phase](project_current_phase.md) — 4 archetypes × 2 apps drafted; src/ empty; next = implement DS / build translator / add 5th archetype
- [File structure](project_file_structure.md) — colocation default; schemas live with forms (screen-level), not with DS components; full spec in docs/file-structure.md
