# TS Galaxy Queens

> Everything about the Queens section — data, images, league log, and how to update it.

---

## Overview

TS Galaxy Queens compete in the **Hollywoodbets Super League** — the top tier of women's football in South Africa. The Queens section (`/queens`) is a dedicated hub with 11 sections: hero, snapshot, league log, matchday, about, squad preview, gallery, pathway, partnership opportunities, related links, and a CTA panel.

---

## Data file

```
src/lib/queens-data.ts
```

### League standing — `queensStanding`

```ts
export const queensStanding = {
  position: 4,
  played:   30,
  won:      18,
  drawn:     7,
  lost:      5,
  goalsFor:  62,
  goalsAgainst: 22,
  goalDifference: 40,
  points:    61,
  season:   '2024/25',
  league:   'Hollywoodbets Super League',
  form:     ['D', 'W', 'W', 'L', 'D'] as const,
}
```

**To update:** Edit the values directly. `season` should reflect the current or most recently completed season — label it clearly (e.g. `'2025/26'`) so it doesn't read as stale.

### Snapshot cards — `queensSnapshot`

Six quick-fact cards shown below the hero. Edit text and values inline.

### Gallery — `queensGalleryMeta`

Array of `{ key, alt }` objects. The `key` maps to a `QUEENS_IMAGES` export in `assets.ts`. The first item in the array is rendered as the large feature image; the rest fill the grid.

### Squad groups — `queensSquadGroups`

Five position groups (Goalkeepers, Defenders, Midfielders, Forwards, Staff), each with a `players` array. Currently in a "To be updated" state — add players when squad data is confirmed.

### Pathway and opportunity cards

Static content arrays for the pathway section and partner opportunities. Edit labels and descriptions directly.

---

## Images

Queens images live in `public/assets/ts-galaxy/queens/` and are exported from `src/lib/assets.ts` under `QUEENS_IMAGES`:

| Key | File | Best used for |
|---|---|---|
| `teamPhoto` | `queens-team-photo.webp` | Hero, full squad matchday lineup |
| `teamLineup` | `queens-team-lineup.jpg` | About section, squad group at goal |
| `matchAction01` | `queens-match-action-01.jpg` | Match action, player at post |
| `matchAction02` | `queens-match-action-02.jpg` | Match action, controlling the ball |
| `trainingStretch` | `queens-training-stretch.jpg` | Training gallery |
| `trainingResistance` | `queens-training-resistance.jpg` | Training gallery |
| `trainingDribble` | `queens-training-dribble.jpg` | Training gallery, golden light |
| `trainingKit` | `queens-training-kit.jpg` | Training gallery, standing pose |
| `trainingWarmup` | `queens-training-warmup.jpg` | Training gallery, movement/energy |
| `trainingPortrait` | `queens-training-portrait.jpg` | Gallery only (SAFA kit — not TSG kit) |

`teamPhoto` is currently used as the Queens page hero and also on the Home page Queens teaser card.

`teamLineup` is used on the Queens About section and as the Squad page hero background.

---

## Adding a Queens match result

Queens fixtures are not yet connected to `matches-data.ts`. The matchday section on the Queens page is in a "prepared" state with placeholder cards. When results are available:

1. Add Queens matches to `matches-data.ts` — add a `competition` value like `'Hollywoodbets Super League'`
2. Filter by competition in the Queens page to show only Queens fixtures
3. Update `queensStanding` in `queens-data.ts`

---

## Navigation

Queens is linked in the main navigation via `src/lib/nav-data.ts`. The link appears between Academy and Partners.

Related links pointing to Queens from other pages use `/queens` — all three confirmed locations (FixturesPage, NewsPage, AcademyPage) are correctly wired.
