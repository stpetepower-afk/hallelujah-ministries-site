# Hallelujah Ministries — Main Site Setup

## What's in this folder
- `index.html` — the full main site (matches the design handoff pixel-for-pixel: nav, hero, stats, about, programs, AI assistant, giving, prayer request form, footer, floating chat widget)
- `assets/chat.js` — powers both chat boxes (the embedded one and the floating widget) and the prayer request form
- `netlify/functions/chat.js` — the backend that talks to Claude on your behalf, keeping your API key private
- `netlify.toml` — tells Netlify how to run everything together

## What you need to do (3 steps)

### 1. Upload everything to GitHub
Same as before: unzip this, go to your repo on GitHub, drag in ALL of it (including the `netlify` folder — don't skip it), commit.

### 2. Get a Claude API key
1. Go to console.anthropic.com and sign in (or create an account).
2. Go to "API Keys" and create a new key. Copy it somewhere safe — you'll only see it once.
3. You'll need a small amount of prepaid credit on the account for the assistant to work (this is a pay-as-you-go API; a ministry chat assistant like this typically costs just a few dollars a month at modest traffic).

### 3. Add the key to Netlify (this is the important security step)
1. In Netlify, go to your site → **Site configuration** → **Environment variables**.
2. Click **Add a variable**.
3. Key: `ANTHROPIC_API_KEY`
4. Value: paste the key you copied from Anthropic.
5. Save, then trigger a new deploy (Netlify → Deploys → "Trigger deploy").

Once that's set, both chat boxes on your live site will give real, warm, ministry-aware answers — day or night, just like the design promised.

## Note on the other 12 pages
This covers the **main site only**, per your request. The other pages (Get Involved, Our Impact, Financial Literacy, Community Resources, Storehouse Travel, etc.) are still just design references — let me know when you're ready to build the next one.
