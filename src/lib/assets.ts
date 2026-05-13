/**
 * TS Galaxy FC – Central Asset Map
 * ─────────────────────────────────
 * All asset paths resolved relative to the Vite `public/` folder root.
 * Update the values here once real photos/graphics are added to
 * public/assets/ts-galaxy/ – every component using this map will
 * automatically pick up the change.
 *
 * Folder convention:
 *   public/assets/ts-galaxy/
 *     logo/       Club badge, wordmark, favicon
 *     hero/       Full-width hero background images
 *     news/       Article thumbnail images
 *     shop/       Product / kit images
 *     players/    Player profile photos
 *     partners/   Sponsor / partner logos
 *     opponents/  Opposition team badges
 *     academy/    Academy section imagery
 *     queens/     TS Galaxy Queens team imagery
 *     the-club/   Club story, founder, stadium, cup
 *     misc/       Social cards, backgrounds, misc graphics
 */

const BASE = '/assets/ts-galaxy';

// ─── Logo & Branding ───────────────────────────────────────────────────────
export const LOGO = {
  /** Circular badge SVG – use at 40 px–120 px */
  badge: `${BASE}/logo/ts-galaxy-badge.svg`,
  /** Horizontal wordmark (badge + text) – for footer / wide header */
  wordmark: `${BASE}/logo/ts-galaxy-wordmark.svg`,
  /** Real favicon PNGs copied from the /favicons source folder */
  favicon: {
    png16:  `${BASE}/logo/favicon-16x16.png`,
    png32:  `${BASE}/logo/favicon-32x32.png`,
    png48:  `${BASE}/logo/favicon-48x48.png`,
    png64:  `${BASE}/logo/favicon-64x64.png`,
    png128: `${BASE}/logo/favicon-128x128.png`,
    png256: `${BASE}/logo/favicon-256x256.png`,
  },
} as const;

// ─── Hero Images ────────────────────────────────────────────────────────────
export const HERO = {
  home: null as string | null,
} as const;

// ─── The Club ────────────────────────────────────────────────────────────────
export const THE_CLUB_IMAGES = {
  founder:   `${BASE}/the-club/founder-tim-sukazi.jpg`,
  cupMoment: `${BASE}/the-club/nedbank-cup-2019.webp`,
  stadium01: `${BASE}/the-club/stadium-01.jpg`,
  stadium02: `${BASE}/the-club/stadium-02.jpg`,
  stadium03: `${BASE}/the-club/stadium-03.jpg`,
} as const;

// ─── News ───────────────────────────────────────────────────────────────────
export const NEWS_IMAGES = {
  placeholder:     `${BASE}/news/news-placeholder.svg`,
  sundownsCup:     `${BASE}/news/rockets-vs-sundowns-nedbank-cup-2026.jpg`,
  stellenbosch:    `${BASE}/news/rockets-vs-stellenbosch-nov-2025.webp`,
  amazulu:         `${BASE}/news/rockets-vs-amazulu-sep-2025.jpg`,
  richardsBay:     `${BASE}/news/rockets-vs-richards-bay-sep-2025.jpg`,
  matchActionA:    `${BASE}/news/rockets-match-action-oct-2025-a.jpg`,
  matchActionB:    `${BASE}/news/rockets-match-action-oct-2025-b.jpg`,
} as const;

// ─── Academy ────────────────────────────────────────────────────────────────
export const ACADEMY_IMAGES = {
  hero:                    `${BASE}/academy/academy-hero.jpg`,
  penrynCeremony:          `${BASE}/academy/penryn-partnership-ceremony.jpg`,
  penrynStaff:             `${BASE}/academy/penryn-staff-group.jpg`,
  ehlanzeniTeam:           `${BASE}/academy/ehlanzeni-league-team.jpg`,
  scholarshipStory:        `${BASE}/academy/scholarship-story.jpg`,
  tournamentTrophy:        `${BASE}/academy/tournament-trophy.jpg`,
  action01:                `${BASE}/academy/academy-action-01.jpg`,
  action02:                `${BASE}/academy/academy-action-02.jpg`,
  action03:                `${BASE}/academy/academy-action-03.jpg`,
  aisjLogo:                `${BASE}/academy/aisj-logo.png`,
} as const;

// ─── Shop / Merchandise ─────────────────────────────────────────────────────
export const SHOP_IMAGES = {
  // Match kits
  homeKit:             `${BASE}/shop/home-kit-2025-26.png`,
  awayKit:             `${BASE}/shop/away-kit-2025-26.png`,
  alternativeKit:      `${BASE}/shop/alternative-kit-2025-26.png`,
  // Supporter wear
  supportersShirtRed:  `${BASE}/shop/supporters-shirt-red.png`,
  supportersShirtWhite:`${BASE}/shop/supporters-shirt-white.png`,
  supportersShirtBlack:`${BASE}/shop/supporters-shirt-black.png`,
  golfShirtBlack:      `${BASE}/shop/golf-shirt-black.png`,
  golfShirtWhite:      `${BASE}/shop/golf-shirt-white.png`,
  // Accessories
  beanieRed:           `${BASE}/shop/beanie-red.png`,
  beanieBlack:         `${BASE}/shop/beanie-black.png`,
  capWhite:            `${BASE}/shop/cap-white.png`,
  // Traditional / special
  swatiIhiya:          `${BASE}/shop/swati-ihiya-traditional.png`,
} as const;

// ─── Players ────────────────────────────────────────────────────────────────
export const PLAYER_IMAGES = {
  // Goalkeepers
  iraEliezerTape:      `${BASE}/players/ira-eliezer-tape.png`,
  siphoGiftMaseti:     `${BASE}/players/sipho-gift-maseti.png`,
  nkosingabeleMadela:  `${BASE}/players/nkosingabele-madela.webp`,
  // Defenders
  anslinWilliams:      `${BASE}/players/anslin-williams.png`,
  macbethMahlangu:     `${BASE}/players/macbeth-mahlangu.webp`,
  mphoVelase:          `${BASE}/players/mpho-velase.webp`,
  pusoTaeloDithejane:  `${BASE}/players/puso-taelo-dithejane.webp`,
  qobolwakheSibande:   `${BASE}/players/qobolwakhe-sibande.png`,
  siyabongaNguessan:   `${BASE}/players/siyabonga-nguessan.png`,
  thiagoWalters:       `${BASE}/players/thiago-walters.png`,
  kganyaneSolomon:     `${BASE}/players/kganyane-solomon-letsoenyo.webp`,
  // Midfielders
  jeffreyDlamini:      `${BASE}/players/jeffrey-dlamini.webp`,
  mlungisiMbunjana:    `${BASE}/players/mlungisi-mbunjana.webp`,
  nhlanhlasMgaga:      `${BASE}/players/nhlanhla-mgaga.png`,
  ntandoyenkosiNkosi:  `${BASE}/players/ntandoyenkosi-nkosi.webp`,
  onkeMoletshe:        `${BASE}/players/onke-moletshe.webp`,
  sibusisoDlamini:     `${BASE}/players/sibusiso-dlamini.png`,
  // Forwards
  juniorZindoga:       `${BASE}/players/junior-zindoga.webp`,
  sedwynGeorge:        `${BASE}/players/sedwyn-george.png`,
  selulekoMahlambi:    `${BASE}/players/seluleko-mahlambi.png`,
} as const;

// ─── Partners / Sponsors ────────────────────────────────────────────────────
export const PARTNER_LOGOS = {
  ikwekweziFm:       `${BASE}/partners/ikwekwezi-fm.png`,
  sizzlingSport:     `${BASE}/partners/sizzling-sport.png`,
  ligwalagwalaFm:    `${BASE}/partners/ligwalagwala-fm.webp`,
  aquelleviv:        `${BASE}/partners/aquelleviv.jpg`,
  aisjEagles:        `${BASE}/partners/aisj-eagles.png`,
  timSukaziAttorneys:`${BASE}/partners/tim-sukazi-attorneys.png`,
} as const;

// ─── Opponent Team Badges ────────────────────────────────────────────────────
export const OPPONENT_BADGES = {
  kaizerChiefs:     `${BASE}/opponents/kaizer-chiefs.png`,
  orlandoPirates:   `${BASE}/opponents/orlando-pirates.png`,
  mamelodiSundowns: `${BASE}/opponents/mamelodi-sundowns.png`,
  amazuluFc:        `${BASE}/opponents/amazulu-fc.png`,
  stellenboschFc:   `${BASE}/opponents/stellenbosch-fc.png`,
  marumoGallants:   `${BASE}/opponents/marumo-gallants.png`,
  polokwaneCity:    `${BASE}/opponents/polokwane-city.png`,
  sekhukhune:       `${BASE}/opponents/sekhukhune-united.png`,
  goldenArrows:     `${BASE}/opponents/golden-arrows.png`,
  durbanCity:       `${BASE}/opponents/durban-city.png`,
} as const;

// ─── TS Galaxy Queens ────────────────────────────────────────────────────────
export const QUEENS_IMAGES = {
  // Team photos — best for hero / identity sections
  teamPhoto:           `${BASE}/queens/queens-team-photo.webp`,   // squad lineup, matchday kit, wide
  teamLineup:          `${BASE}/queens/queens-team-lineup.jpg`,   // group in black training kit at goal

  // Match action — players in TSG red/white kit with ball
  matchAction01:       `${BASE}/queens/queens-match-action-01.jpg`, // player at post with ball
  matchAction02:       `${BASE}/queens/queens-match-action-02.jpg`, // player controlling ball on pitch

  // Training / gallery images
  trainingStretch:     `${BASE}/queens/queens-training-stretch.jpg`,    // TSG kit stretch on grass
  trainingResistance:  `${BASE}/queens/queens-training-resistance.jpg`, // resistance band warmup
  trainingDribble:     `${BASE}/queens/queens-training-dribble.jpg`,    // dribbling drill, golden light
  trainingKit:         `${BASE}/queens/queens-training-kit.jpg`,        // player standing in TSG kit
  trainingWarmup:      `${BASE}/queens/queens-training-warmup.jpg`,     // warmup run/kick motion
  trainingPortrait:    `${BASE}/queens/queens-training-portrait.jpg`,   // SAFA training kit portrait (gallery use)
} as const;

// ─── Misc ────────────────────────────────────────────────────────────────────
export const MISC_IMAGES = {} as const;

// ─── Convenience re-export ───────────────────────────────────────────────────
export const TS_GALAXY_ASSETS = {
  ...LOGO,
  hero:      HERO,
  theClub:   THE_CLUB_IMAGES,
  news:      NEWS_IMAGES,
  academy:   ACADEMY_IMAGES,
  shop:      SHOP_IMAGES,
  players:   PLAYER_IMAGES,
  partners:  PARTNER_LOGOS,
  opponents: OPPONENT_BADGES,
  queens:    QUEENS_IMAGES,
  misc:      MISC_IMAGES,
} as const;
