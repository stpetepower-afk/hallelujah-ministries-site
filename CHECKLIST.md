# HALLELUJAH ONE™ — NO-DRIFT RELEASE CHECKLIST

## Release Metadata
- Version: `v1.3.0`
- Date: `2026-08-09`
- Environment: `production` target; live verification remains queued
- Artifact: `hallelujah-one-v1.3.0.zip` (SHA256 not yet generated in-repo)
- Baseline branch: `main`
- Baseline HEAD: `caf03463445b0401e90da6961ef794a718ca6f5e`
- Reconciliation branch: `reconcile/v1.3.0-nonprofit-hardening`
- Release owner: `Larry Clay Edmonds Jr. / SWARM`

## Gate 0 — Baseline / Inventory
- [x] Repository identified: `stpetepower-afk/hallelujah-ministries-site`
- [x] Baseline HEAD recorded.
- [x] Existing `investor/` route detected.
- [x] Existing `netlify.toml` inspected.
- [x] Existing `assets/chat.js` inspected.
- [x] Existing root `index.html` inspected.
- [ ] v1.3.0 ZIP SHA256 recorded after reproducible artifact assembly.
- [ ] Rollback artifact hash recorded.

## Gate 1 — Architecture
- [ ] `/stewardship/` exists and is nonprofit-safe.
- [ ] `/investor/*` redirects to `/stewardship/` with 301/force.
- [ ] Commercial entity separation verified across public copy.

## Gate 2 — Truth
- [ ] Approved wording: “Hallelujah Ministries is a nonprofit organization.”
- [ ] No unsupported 501(c)(3) or tax-deductibility claims.
- [ ] Every published metric/claim mapped to `docs/evidence.md`.

## Gate 3 — Security
- [ ] Required security headers present.
- [ ] Restrictive CSP present.
- [ ] No user-controlled `innerHTML` or equivalent unsafe DOM injection.
- [ ] External requests documented and intentional.

## Gate 4 — Functional QA
- [ ] Root route loads.
- [ ] Stewardship route loads.
- [ ] Investor redirect verified.
- [ ] 404 route works.
- [ ] Form delivery verified as real, not UI-only.
- [ ] Keyboard/mobile baseline verified.

## Gate 5 — Deployment Integrity
- [ ] Tested artifact and deployment artifact have identical SHA256.
- [ ] No untracked changes between QA and deployment.
- [ ] Netlify/domain/SSL/cache behavior verified.

## Gate 6 — Live Verification Loop
- [ ] Post-deploy live checks executed.
- [ ] Form receipt confirmed.
- [ ] Console checked.
- [ ] 24-hour monitoring completed.

## Release Decision
**HOLD** until Gates 0–5 are PASS with repository evidence.
