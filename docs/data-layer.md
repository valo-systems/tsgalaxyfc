# Data Layer

> All site content is driven by static TypeScript files in `src/lib/`. This is the single source of truth pattern — no data is hardcoded inside page components.

---

## Files at a glance

| File | What it owns |
|---|---|
| `matches-data.ts` | All fixtures and results, opponent refs, derived exports |
| `standings-data.ts` | Betway Premiership table snapshot |
| `news-data.ts` | News articles, featured article, home preview selection |
| `squad-data.ts` | Player profiles, position filters |
| `shop-data.ts` | Product catalogue, category filters, WhatsApp helper |
| `queens-data.ts` | Queens team stats, gallery, squad groups, pathway cards |
| `partners-data.ts` | Commercial partners, impact areas, opportunities |
| `nav-data.ts` | Navigation items (drives both headers and mobile nav) |
| `assets.ts` | Centralised image path exports — never hardcode `/assets/...` in components |
| `cart-types.ts` | TypeScript interfaces for cart, order, checkout — not data |

---

## matches-data.ts

The canonical source for all match data.

```ts
// Key derived exports — import these in pages, not raw MATCHES array
export const upcomingMatches  // all status === 'upcoming', chronological
export const completedMatches // all status === 'full-time', reversed (most recent first)
export const nextMatch        // upcomingMatches[0] or null
export const latestResult     // completedMatches[0] or null

// Helpers
export function isTsgHome(match: Match): boolean
export function getOpponent(match: Match): TeamRef
export function getMatchById(id: string): Match | undefined
```

**To add a result:** Add a new `Match` object to the `MATCHES` array with `status: 'full-time'` and the correct `homeScore`, `awayScore` and `resultState`.

**To add an upcoming fixture:** Add a new `Match` object with `status: 'upcoming'`. Add a `ticketUrl` if tickets are available.

**Competition name constants** — always use the defined constants, never inline strings:

```ts
const BP  = 'Betway Premiership'
const BPS = 'Betway Prem'       // short form used in compact UI
const NC  = 'Nedbank Cup'
```

---

## standings-data.ts

A snapshot of the Betway Premiership table. Update after each matchday.

```ts
export const tsGalaxyStanding  // the TS Galaxy row — used in home page stats
export const topFour           // top 4 rows
export function aroundTsGalaxy(count = 2) // TS Galaxy ± N rows
```

**To update:** Edit the `STANDINGS` array. The `tsGalaxyStanding` export is derived automatically by finding the row with `isTsGalaxy: true`.

---

## news-data.ts

```ts
export const NEWS_ARTICLES        // all articles
export const featuredNewsArticle  // single featured article (used in hero preview and home page)
export const homeNewsArticles     // 3 articles for home page news widget
```

Each article has an `id`, `slug`, `category`, `title`, `excerpt`, `date`, `author`, `image`, `gradient`, `imageBg`, and `content` (HTML string).

**Categories:** `report` | `preview` | `club` | `squad` | `academy` | `queens` | `supporters` | `commercial` | `podcast`

---

## shop-data.ts

```ts
export const PRODUCTS        // full product catalogue
export const HOME_PRODUCTS   // products where homeFeatured === true
export const FEATURED_PRODUCT // products where featured === true (shop hero spotlight)

export function whatsAppLink(product, size?, qty?): string  // support link only
```

Products have a `price: number | null` — null means "price on request". The `priceLabel` string is always displayed.

---

## assets.ts

All image paths are exported from here. **Never hardcode `/assets/ts-galaxy/...` inside a component.** Always import from `@/lib/assets`.

```ts
import { LOGO, THE_CLUB_IMAGES, QUEENS_IMAGES, ACADEMY_IMAGES, NEWS_IMAGES } from '@/lib/assets'

// Usage
<img src={THE_CLUB_IMAGES.stadium02} />
<img src={QUEENS_IMAGES.teamPhoto} />
<img src={LOGO.favicon.png128} />
```

If you add a new image to `public/assets/ts-galaxy/`, add a corresponding export to `assets.ts` before using it in a component.

---

## Updating data for a new matchday

1. **Add the result** to `MATCHES` in `matches-data.ts`
2. **Update the standings** in `standings-data.ts`
3. **Add a match report article** to `news-data.ts` (optional but links `recapUrl` in the result)
4. Set the `recapUrl` on the match object to `/news/<article-id>`

Everything on the site — home page stats, fixtures strip, news results strip, last result card — updates automatically from these files.
