<div align="center">

<img src="public/assets/ts-galaxy/logo/favicon-128x128.png" width="88" alt="TS Galaxy FC badge" />

# TS Galaxy FC

**The official digital home of The Rockets**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![License](https://img.shields.io/badge/license-private-gray?style=flat-square)](.)

</div>

---

A full-featured club website for **TS Galaxy FC** — a professional football club based in Mpumalanga, South Africa, competing in the **Betway Premiership**. Built as a mobile-first single-page application with live club data, a working ecommerce checkout, and a complete content hub.

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, next match panel, live countdown, fixtures strip, news, shop, partners |
| `/fixtures` | Fixtures, results and Betway Premiership table |
| `/match/:id` | Match centre — lineups, stats, recap |
| `/news` | News hub — articles, match reports, category filter, search |
| `/news/:id` | Article detail page |
| `/squad` | Squad browser — filter by position |
| `/squad/:slug` | Player profile |
| `/shop` | Official merchandise — kit, supporter wear, accessories |
| `/checkout` | 5-step checkout — cart → details → delivery → payment → confirmation |
| `/membership` | Club membership tiers and benefits |
| `/academy` | Academy programme — Penryn partnership, DDC pathway, trials |
| `/queens` | TS Galaxy Queens — Hollywoodbets Super League hub |
| `/the-club` | Club history, founder story, Mbombela Stadium |
| `/partners` | Commercial partners |
| `/admin` | Admin dashboard |

## Stack

- **React 18** + **TypeScript** — full type safety across data, routes and components
- **Vite 6** — HMR dev server, optimised production build
- **Tailwind CSS v4** — utility-first, mobile-first responsive design
- **React Router v7** — client-side routing, URL-driven drawer state
- **shadcn/ui** — accessible component primitives via Radix UI
- **Lucide React** — consistent icon system

## Quick Start

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # → dist/
```

## Docs

Full documentation lives in [`/docs`](docs/):

| Document | What's inside |
|---|---|
| [`architecture.md`](docs/architecture.md) | Folder structure, routing, component model |
| [`data-layer.md`](docs/data-layer.md) | How shared data files work and how to update them |
| [`checkout.md`](docs/checkout.md) | Cart context, checkout steps, payment provider integration |
| [`queens.md`](docs/queens.md) | TS Galaxy Queens data, images, league log |
| [`contributing.md`](docs/contributing.md) | Dev workflow, conventions, PR process |

---

<div align="center">
<sub>TS Galaxy FC · Mpumalanga · South Africa · The Rockets</sub>
</div>
