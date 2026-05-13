# Architecture

> How the project is structured, how routing works, and how components are organised.

---

## Folder structure

```
tsgalaxyfc/
├── public/
│   └── assets/ts-galaxy/       # All static media (images, logos, badges)
│       ├── logo/               # Club badge, favicon variants, wordmark
│       ├── the-club/           # Stadium photos, founder, cup moment
│       ├── news/               # Match action photography
│       ├── academy/            # Academy programme images
│       ├── queens/             # TS Galaxy Queens photography
│       ├── shop/               # Product images (kits, accessories)
│       ├── opponents/          # Opponent club badge images
│       ├── players/            # Player headshot photos
│       └── partners/           # Partner logos
│
├── src/
│   ├── app/
│   │   ├── App.tsx             # Root — BrowserRouter, CartProvider, layout shell
│   │   ├── components/         # Shared layout components
│   │   │   ├── DesktopHeader.tsx
│   │   │   ├── MobileHeader.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── NavContext.tsx
│   │   │   ├── NewsCard.tsx
│   │   │   └── ui/             # shadcn/ui primitive components
│   │   └── pages/              # One file per route
│   │       ├── HomePage.tsx
│   │       ├── FixturesPage.tsx
│   │       ├── MatchCentrePage.tsx
│   │       ├── NewsPage.tsx
│   │       ├── ArticlePage.tsx
│   │       ├── SquadPage.tsx
│   │       ├── PlayerProfilePage.tsx
│   │       ├── ShopPage.tsx
│   │       ├── CheckoutPage.tsx
│   │       ├── MembershipPage.tsx
│   │       ├── AcademyPage.tsx
│   │       ├── QueensPage.tsx
│   │       ├── TheClubPage.tsx
│   │       ├── PartnersPage.tsx
│   │       └── AdminDashboard.tsx
│   │
│   ├── context/
│   │   └── CartContext.tsx      # Global cart state (useReducer + localStorage)
│   │
│   ├── lib/                    # All shared data and type definitions
│   │   ├── assets.ts           # Centralised image/asset path exports
│   │   ├── matches-data.ts     # Fixtures, results, helpers
│   │   ├── standings-data.ts   # Betway Premiership table
│   │   ├── news-data.ts        # News articles
│   │   ├── squad-data.ts       # Player profiles
│   │   ├── shop-data.ts        # Product catalogue
│   │   ├── cart-types.ts       # Cart and order TypeScript types
│   │   ├── queens-data.ts      # Queens team data and gallery
│   │   ├── partners-data.ts    # Commercial partners
│   │   └── nav-data.ts         # Navigation items
│   │
│   └── services/
│       └── payment.ts          # Payment provider abstraction layer
```

---

## Routing

Routes are defined in `App.tsx`. The admin route renders without the site shell (no header/footer). All other routes render inside the shared layout:

```
/admin                   → AdminDashboard (no shell)

/ (layout shell)
  /                      → HomePage
  /fixtures              → FixturesPage
  /match/:id             → MatchCentrePage
  /news                  → NewsPage
  /news/:id              → ArticlePage
  /squad                 → SquadPage
  /squad/:slug           → PlayerProfilePage
  /shop                  → ShopPage
  /shop/:id              → ShopPage (product drawer pre-opened)
  /checkout              → CheckoutPage
  /membership            → MembershipPage
  /academy               → AcademyPage
  /queens                → QueensPage
  /the-club              → TheClubPage
  /partners              → PartnersPage
  /design-system         → DesignSystemPage
```

The shop uses URL-driven drawer state — navigating to `/shop/:slug` opens the product drawer for that product directly, so product URLs are shareable and bookmarkable.

---

## Layout shell

`App.tsx` wraps all non-admin routes in a flex column shell:

```
CartProvider
  NavProvider
    MobileHeader   (sticky, z-50)
    DesktopHeader  (sticky, z-50, hidden on mobile)
    MobileMenu     (fixed overlay, z-50)
    <main>         (flex-1, pb clears mobile bottom nav)
      <Routes />
    Footer
    MobileNav      (fixed, mobile only, z-40)
```

The `<main>` gets `pb-[calc(4rem+env(safe-area-inset-bottom))]` on mobile to prevent the MobileNav from obscuring content. On desktop this padding is removed.

---

## Component model

Pages are self-contained — each page file owns its data constants, sub-components and layout. Sub-components that are only used by one page live in the same file. Only components needed by multiple pages are extracted to `src/app/components/`.

Shared data always lives in `src/lib/`. Pages import from `src/lib/` — they never define their own data that duplicates what's in those files.

---

## Hero image pattern

Every page hero uses the same three-layer overlay technique introduced on the home page:

```tsx
<section className="relative bg-gray-950 text-white overflow-hidden">
  {/* Full-bleed background photo */}
  <div className="absolute inset-0" aria-hidden="true">
    <img src={IMAGE} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gray-950/65" />                              {/* base darken */}
    <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 ... " />     {/* left-to-right */}
    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 ..." />      {/* bottom vignette */}
  </div>
  {/* Content sits above via relative z-10 */}
</section>
```

This ensures text is always legible against any photo while the image shows through on the right/top of the section on desktop.
