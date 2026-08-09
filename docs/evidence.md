# v1.3.0 Evidence Ledger

Evidence is limited to repository-verifiable facts. Absence of evidence is treated as unverified.

| ID | Public claim / control | Source | Status |
|---|---|---|---|
| E-001 | Hallelujah Ministries is a nonprofit organization. | `index.html` on reconciliation branch; approved wording specified by release controls. | Published |
| E-002 | Hallelujah ONE™ is the mission ecosystem layer. | `index.html` on reconciliation branch. | Published |
| E-003 | Six program names are part of the public program taxonomy. | Baseline `index.html` at main HEAD `caf03463445b0401e90da6961ef794a718ca6f5e`. | Published as program descriptions; outcomes not asserted |
| E-004 | `/investor/*` must redirect to `/stewardship/`. | `netlify.toml` on reconciliation branch. | Configured; live behavior unverified |
| E-005 | Required security headers/CSP are configured. | `netlify.toml` on reconciliation branch. | Configured; live headers unverified |
| E-006 | Contact form uses safe text APIs and a mail client fallback. | `assets/site.js` on reconciliation branch. | Code verified; actual receipt unverified |

## Claims deliberately excluded
- No 501(c)(3) claim.
- No tax-deductibility claim.
- No unsupported revenue, impact, service-volume, or outcome metrics.
- No commercial/investor claims on the nonprofit landing or stewardship copy.

## Baseline conflicts recorded
- Baseline contained an `investor/` directory with strategic-partner/investment material.
- Baseline `netlify.toml` lacked the required investor redirect and security headers.
- Baseline root page used inline CSS and external Google Fonts; the reconciled root uses local CSS/JS to support a restrictive CSP.
- Baseline `assets/chat.js` contained an `innerHTML = ""` container-clear operation; the reconciled root does not load that legacy script.
- No verified Formspree endpoint was found in repository evidence; therefore form receipt remains HOLD.
