# Stocked

Local-first pantry → recipes → shopping list → budget PWA.
**Current state: Phase 0 (installable shell) + Phase 1 (pantry management) complete.**

## What works now

- Add / edit / delete pantry items (name, category, quantity, unit, optional low-stock threshold)
- Items grouped by category on "shelves," alphabetized within each
- Quantity +/− steppers (clamped at 0; items at 0 show as **Out**)
- **Low** badge when `quantity <= lowThreshold`
- Everything persists on-device in IndexedDB (Dexie) — survives refresh, works offline
- Installable to a phone home screen (manifest + service worker via vite-plugin-pwa)
- Recipes / List / Settings tabs are placeholders for Phases 2–4

## Run locally

```bash
npm install
npm run dev
```

Note: the service worker only registers in production builds. To test install/offline behavior locally:

```bash
npm run build
npm run preview
```

## Deploy (once)

1. Push this folder to a GitHub repo.
2. In Netlify: **Add new site → Import from Git**, pick the repo.
   Build command and publish directory are already set in `netlify.toml`
   (`npm run build` → `dist`), so accept the detected settings.
3. Deploy. Open the site on your phone → browser menu → **Add to Home Screen**.

No environment variables are needed yet. `SPOONACULAR_KEY` arrives with
Phase 2; `KROGER_CLIENT_ID` / `KROGER_CLIENT_SECRET` with Phase 4 (brief §8).

## Phase 1 test checklist

- [ ] Site installs to the home screen and opens standalone
- [ ] Add an item in each category; groups appear in fixed shelf order
- [ ] +/− steppers change quantity; − stops at 0 and the item shows **Out**
- [ ] Set a low threshold (e.g. 2), step down to it → **Low** badge appears
- [ ] Tap an item → edit fields → Save persists; Delete asks for a second tap
- [ ] Kill the app / refresh — data is still there
- [ ] Airplane mode → app still opens and pantry still works

## Structure

```
netlify/functions/        (empty — Phase 2 and 4 functions land here)
src/
  db/db.js                Dexie schema (all 4 tables from brief §3, v1)
  db/pantry.js            pantry CRUD + stock status helpers
  constants.js            categories + units
  App.jsx                 tab shell
  components/
    layout/               AppHeader, TabBar
    pantry/               PantryScreen, CategoryShelf, PantryItemRow,
                          QuantityStepper, ItemFormModal, EmptyPantry
    screens/              ComingSoon placeholder
```

The full Dexie schema (pantryItems, shoppingItems, recipesCache, settings)
is declared in v1 now, so Phases 2–4 add no migrations.
