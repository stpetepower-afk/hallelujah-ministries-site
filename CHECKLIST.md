# HALLELUJAH ONE™ — NO-DRIFT RELEASE CHECKLIST

## Release Metadata
- Version: `v1.3.0`
- Date: `2026-08-09`
- Environment: `production` target; live verification remains queued
- Artifact: `hallelujah-one-v1.3.0.zip` (SHA256 not yet generated)
- Baseline branch: `main`
- Baseline HEAD: `caf03463445b0401e90da6961ef794a718ca6f5e`
- Reconciliation branch: `reconcile/v1.3.0-nonprofit-hardening`
- Release owner: `Larry Clay Edmonds Jr. / SWARM`

## Gate 0 — Baseline / Inventory — PASS (with artifact HOLD)
- [x] Repository identified.
- [x] Baseline HEAD recorded.
- [x] Existing `investor/` route detected.
- [x] Existing `netlify.toml`, root `index.html`, and legacy `assets/chat.js` inspected.
- [ ] v1.3.0 ZIP SHA256 generated.
- [ ] Rollback artifact hash recorded.

## Gate 1 — Architecture — PASS in-repo / LIVE HOLD
- [x] `/stewardship/` exists and uses nonprofit-safe copy.
- [x] `/investor/*` is configured to redirect to `/stewardship/` with 301/force.
- [x] No `Power St. Pete LLC` reference found by repository search.
- [ ] Live redirect verified.
- [ ] Complete public-page entity scan completed.

## Gate 2 — Truth — PASS for reconciled scope
- [x] Approved wording: “Hallelujah Ministries is a nonprofit organization.”
- [x] No 501(c)(3) claim in reconciled public copy.
- [x] No tax-deductibility claim in reconciled public copy.
- [x] No unsupported impact/revenue metrics in reconciled public copy.
- [x] Claims ledger populated in `docs/evidence.md`.

## Gate 3 — Security — HOLD
- [x] Restrictive CSP configured in `netlify.toml`.
- [x] Required baseline security headers configured.
- [x] Reconciled root uses external JS/CSS and safe `textContent` rendering.
- [ ] Live headers verified.
- [ ] Legacy script usage fully reviewed; `assets/chat.js` remains in repository but is not loaded by reconciled root.

## Gate 4 — Functional QA — HOLD
- [x] Root markup has keyboard-visible focus states through `assets/site.css`.
- [x] 404 page created.
- [ ] Root route tested live.
- [ ] Stewardship route tested live.
- [ ] Investor redirect tested live.
- [ ] Mobile/browser matrix tested.
- [ ] Form receipt verified.
- [ ] No verified Formspree endpoint found in repository; current implementation uses mail-client fallback.

## Gate 5 — Deployment Integrity — HOLD
- [ ] Reproducible ZIP generated.
- [ ] SHA256 recorded.
- [ ] Tested artifact SHA256 matched to deployment artifact.
- [ ] Netlify publish verified.
- [ ] Domain/SSL/cache behavior verified.

## Gate 6 — Live Verification Loop — READY FOR POST-MERGE/DEPLOY
- [ ] `/` live verification.
- [ ] `/stewardship/` live verification.
- [ ] `/investor/*` 301 verification.
- [ ] `/404.html` verification.
- [ ] `robots.txt` verification.
- [ ] `sitemap.xml` verification.
- [ ] SSL verification.
- [ ] Real form receipt verification.
- [ ] Browser console verification.
- [ ] 24-hour monitoring.

## Release Decision
**HOLD** — Gates 0–5 are not all PASS with evidence. No production deployment is authorized from this branch yet.
