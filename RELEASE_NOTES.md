# v1.3.0 — Nonprofit Compliance Hardening

## Scope
Reconcile the nonprofit web presence around evidence-first architecture, legal wording, restrictive security policy, safe client-side behavior, routing, SEO basics, and release controls.

## Atomic commits
1. `chore(gate0): baseline inventory and release ledger`
2. `feat(architecture): stewardship route + investor legacy redirect`
3. `feat(truth): nonprofit-safe copy and legal wording normalization`
4. `security(csp): hardened headers and policy updates`
5. `feat(forms): safe submit handling and delivery verification hooks`
6. `chore(seo): add robots sitemap and 404`
7. `chore(release): update checklist evidence and release notes`

## Gate ledger
- Gate 0: PASS for repository baseline inventory; artifact SHA256 still pending.
- Gate 1: PASS in-repo for stewardship route and redirect configuration; live redirect and complete-site entity scan require verification.
- Gate 2: PASS for reconciled public copy and exclusion of unsupported tax/impact claims.
- Gate 3: HOLD for live-header verification and legacy-script review; configured CSP/headers are present in `netlify.toml`.
- Gate 4: HOLD because live route/device/form-delivery tests have not been executed and no verified Formspree endpoint exists in-repo.
- Gate 5: HOLD because the v1.3.0 ZIP and SHA256 have not been generated and matched to deployment.
- Gate 6: READY for live verification after merge/deploy; not executed here.

## Release decision
**HOLD.** No production deployment is authorized by this branch until Gates 0–5 are independently verified with repository/live evidence.
