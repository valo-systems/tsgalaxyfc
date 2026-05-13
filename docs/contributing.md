# Contributing

> Dev workflow, code conventions, and how to make changes without breaking things.

---

## Prerequisites

- Node.js 18+
- npm (or pnpm — a `pnpm-workspace.yaml` is present)

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build, verify before PRs
```

---

## Branch and PR workflow

1. Branch from `main` — use descriptive names: `feat/match-centre-live-scores`, `fix/cart-size-validation`
2. Keep PRs focused — one feature or fix per PR
3. Always run `npm run build` before opening a PR — catch TypeScript errors locally
4. Write a clear PR description covering what changed and why

---

## Code conventions

### No data in page files

Pages must import from `src/lib/`. Never define a local data array inside a page component that duplicates or shadows what's in the shared data layer.

```ts
// ✅ correct
import { nextMatch, tsGalaxyStanding } from '@/lib/matches-data'

// ❌ wrong
const NEXT_MATCH = { opponent: 'Kaizer Chiefs', date: 'Sat 17 May' }
```

### Asset paths via assets.ts

Never hardcode `/assets/ts-galaxy/...` paths inside components. Always go through the exports in `src/lib/assets.ts`.

```ts
// ✅ correct
import { QUEENS_IMAGES } from '@/lib/assets'
<img src={QUEENS_IMAGES.teamPhoto} />

// ❌ wrong
<img src="/assets/ts-galaxy/queens/queens-team-photo.webp" />
```

### TypeScript

- All data files are fully typed — use the exported types in page components
- Avoid `any` — use the shared interfaces from `src/lib/cart-types.ts`, `matches-data.ts` etc.
- Import types with `import type { ... }` when not using runtime values

### Styling

- Tailwind utility classes only — no custom CSS files
- Mobile-first: base classes for mobile, `lg:` prefix for desktop
- Use the existing pattern for hero sections (see `docs/architecture.md`)
- No inline `style` except for the `STRIPE_BG` repeating gradient pattern

### Comments

Add a comment only when the **why** is non-obvious. Don't describe what the code does — the code does that. Don't reference issues, PR numbers or callers.

---

## Adding a new page

1. Create `src/app/pages/NewPage.tsx`
2. Export the component: `export function NewPage() { ... }`
3. Add the route in `App.tsx` inside the inner `<Routes>`
4. Add a nav entry in `src/lib/nav-data.ts` if it should appear in navigation
5. Add a hero with the standard background image pattern

---

## Updating match data

See [`data-layer.md`](data-layer.md#updating-data-for-a-new-matchday) for the complete matchday update checklist.

---

## Payment integration

The checkout is fully wired but uses a demo payment service. To connect a real provider, see [`checkout.md`](checkout.md#payment-integration).

---

## Environment

The project has no `.env` file or environment variables at this stage. All configuration is in source files. When backend integration is added, a `.env.local` file will be needed for API endpoints and provider keys — those should never be committed.
