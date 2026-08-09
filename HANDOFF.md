# HALLELUJAH MINISTRIES SITE — HANDOFF DOCUMENT

**Date:** August 9, 2026  
**Branch:** `copilot/reconcilev130-nonprofit-hardening`  
**Repository:** `stpetepower-afk/hallelujah-ministries-site`  
**Domain:** `hallelujahministriesfl.org`  
**Deployment:** Netlify (site: `stately-malasada-b53d32`)

---

## 1. CURRENT STATE

The site is a static HTML/CSS site deployed via Netlify. No build step. Publish root is `.` (repo root).

### Files in repo
```
index.html                  — Homepage (main public face of ministry)
investor/index.html         — Strategic partner/investor brief (Hallelujah ONE™)
assets/main.css             — Extracted CSS for homepage
assets/investor.css         — Extracted CSS for investor page
assets/chat.js              — AI chat widget (shared state for main + floating widget)
netlify/functions/chat.js   — Netlify serverless function (AI chat API proxy)
netlify.toml                — Build config, redirects, security headers
robots.txt                  — Search engine directives
sitemap.xml                 — All public URLs (hallelujahministriesfl.org)
404.html                    — Custom error page
CNAME                       — hallelujahministriesfl.org
SETUP.md                    — Internal setup notes
about.html
contact.html
partner.html
impact.html
community-resources.html
programs-career.html
programs-economic-development.html
programs-holistic-living.html
programs-homeownership.html
programs-micro-farming.html
programs-room-board.html
```

---

## 2. WHAT WAS DONE IN THIS SESSION (August 9, 2026)

All changes are in commit `6b079d1` on branch `copilot/reconcilev130-nonprofit-hardening`.

| Item | Detail |
|---|---|
| `robots.txt` | Created — allows all bots, blocks `/netlify/`, includes sitemap URL |
| `sitemap.xml` | Created — all 13 pages at `hallelujahministriesfl.org` with priorities |
| `404.html` | Custom error page with links home and to #contact |
| `assets/main.css` | Extracted from `index.html` inline `<style>` block |
| `assets/investor.css` | Extracted from `investor/index.html` inline `<style>` block |
| OG / social tags | Added to `index.html` and `investor/index.html` |
| Nav cross-links | "Strategic Partners" link → `/investor/` added to homepage nav; "← Hallelujah Ministries" back-link added to investor page |
| Netlify Form | Support/prayer form in `index.html` now has `data-netlify="true"`, honeypot, `name="support-request"` — submissions captured in Netlify dashboard |
| Security headers | CSP (no `unsafe-inline`), `X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` — all in `netlify.toml` |
| Cache headers | `Cache-Control: immutable` for `/assets/*.css` and `/assets/*.js` |

---

## 3. WHAT STILL NEEDS TO HAPPEN

### Merge to main
- Branch `copilot/reconcilev130-nonprofit-hardening` is **not yet merged to `main`**
- There is also an open PR #2 (`reconcile/v1.3.0-nonprofit-hardening`) with earlier work
- Branch protection on `main` was blocking merge — must be resolved in GitHub Settings → Branches or Rulesets
- URL: `https://github.com/stpetepower-afk/hallelujah-ministries-site/settings/branches`

### OG image
- `assets/og-image.png` is referenced in OG tags but **does not exist yet**
- Create a 1200×630px image and add it to `assets/`

### Form endpoint verification
- The Netlify Form will capture submissions in the dashboard automatically once deployed
- Verify at: Netlify dashboard → Site → Forms
- No Formspree or third-party endpoint is needed

### Live verification after merge/deploy
- [ ] `/` loads correctly
- [ ] `/investor/` loads correctly with back-link
- [ ] `/404` (unknown path) shows custom error page
- [ ] `/robots.txt` returns 200
- [ ] `/sitemap.xml` returns 200
- [ ] Security headers present on live HTTP responses (check with `curl -I https://hallelujahministriesfl.org/`)
- [ ] Chat AI widget works (requires Netlify function deployed + OpenAI key set in Netlify env vars)
- [ ] Support form submission captured in Netlify dashboard

---

## 4. KNOWN OPEN ISSUES

| Issue | Status |
|---|---|
| `assets/og-image.png` missing | Must be created and added |
| Netlify function env var for OpenAI | Must be set in Netlify dashboard (key name unknown — check `netlify/functions/chat.js`) |
| PR #2 (`reconcile/v1.3.0-nonprofit-hardening`) | Still open, earlier reconciliation work — review before merging |
| Branch protection blocking merge | User must remove in GitHub settings |

---

## 5. TECHNICAL NOTES

### CSP
The Content-Security-Policy in `netlify.toml` is:
```
default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'
```
`unsafe-inline` was removed because CSS is now external. If any future inline styles are added back, either move them to `.css` files or the CSP will block them.

### Netlify Form
The prayer/support form uses Netlify's native form handling. No third-party service needed. Submissions appear in the Netlify dashboard under **Forms → support-request**.

### AI Chat
- Frontend: `assets/chat.js` — reads `data-chat-list`, `data-chat-input`, `data-chat-send` attributes
- Backend: `netlify/functions/chat.js` — serverless function at `/api/chat`
- Requires an environment variable (likely `OPENAI_API_KEY`) set in Netlify → Site settings → Environment variables

---

## 6. APPROVED WORDING

- **Nonprofit description:** "Hallelujah Ministries is a nonprofit organization."
- Do **not** claim 501(c)(3), tax-deductibility, or unsupported impact metrics without evidence
- Footer: © 2026 Hallelujah Ministries. All rights reserved.

---

## 7. NEXT PERSON — START HERE

1. Check branch protection: `https://github.com/stpetepower-afk/hallelujah-ministries-site/settings/branches`
2. Merge `copilot/reconcilev130-nonprofit-hardening` → `main`
3. Verify Netlify deploys successfully
4. Create `assets/og-image.png` (1200×630)
5. Run live verification checklist (Section 3 above)
6. Confirm form submissions arrive in Netlify dashboard
