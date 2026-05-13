// Static seed data for TS Galaxy FC match experience.
// Replace with CMS/API data when fixtures, results and standings integration is available.
//
// Future API hooks:
//   GET /api/matches
//   GET /api/matches/:id
//   GET /api/standings

import { LOGO, OPPONENT_BADGES } from './assets';

// ─── Types ─────────────────────────────────────────────────────────────────────

export type MatchStatus = 'upcoming' | 'live' | 'half-time' | 'full-time' | 'postponed' | 'cancelled';
export type ResultState = 'win' | 'draw' | 'loss';

export interface TeamRef {
  id: string;
  name: string;
  shortName: string;
  badge?: string;
}

export interface Match {
  id: string;
  competition: string;
  competitionShort: string;
  season: string;
  date: string;         // ISO "2025-11-02"
  kickoffTime: string;  // "15:00"
  homeTeam: TeamRef;
  awayTeam: TeamRef;
  venue?: string;
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
  resultState?: ResultState;  // always from TS Galaxy's perspective
  ticketUrl?: string;
  previewUrl?: string;
  recapUrl?: string;
  broadcastInfo?: string;
}

// ─── Club ref ──────────────────────────────────────────────────────────────────

export const TS_GALAXY: TeamRef = {
  id: 'ts-galaxy',
  name: 'TS Galaxy FC',
  shortName: 'TSG',
  badge: LOGO.badge,
};

// ─── Opponent refs ─────────────────────────────────────────────────────────────

const O: Record<string, TeamRef> = {
  sundowns:     { id: 'sundowns',     name: 'Mamelodi Sundowns',  shortName: 'SUN', badge: OPPONENT_BADGES.mamelodiSundowns },
  pirates:      { id: 'pirates',      name: 'Orlando Pirates',    shortName: 'OPL', badge: OPPONENT_BADGES.orlandoPirates   },
  chiefs:       { id: 'chiefs',       name: 'Kaizer Chiefs',      shortName: 'KAI', badge: OPPONENT_BADGES.kaizerChiefs     },
  amazulu:      { id: 'amazulu',      name: 'AmaZulu FC',         shortName: 'AZU', badge: OPPONENT_BADGES.amazuluFc        },
  stellenbosch: { id: 'stellenbosch', name: 'Stellenbosch FC',    shortName: 'STB', badge: OPPONENT_BADGES.stellenboschFc  },
  gallants:     { id: 'gallants',     name: 'Marumo Gallants',    shortName: 'GAL', badge: OPPONENT_BADGES.marumoGallants   },
  polokwane:    { id: 'polokwane',    name: 'Polokwane City',     shortName: 'POL', badge: OPPONENT_BADGES.polokwaneCity    },
  sekhukhune:   { id: 'sekhukhune',   name: 'Sekhukhune United',  shortName: 'SEK', badge: OPPONENT_BADGES.sekhukhune      },
  arrows:       { id: 'arrows',       name: 'Golden Arrows',      shortName: 'ARR', badge: OPPONENT_BADGES.goldenArrows     },
  durbanCity:   { id: 'durban-city',  name: 'Durban City',        shortName: 'DUR', badge: OPPONENT_BADGES.durbanCity       },
  richardsBay:  { id: 'richards-bay', name: 'Richards Bay',       shortName: 'RBF'                                         },
  magesi:       { id: 'magesi',       name: 'Magesi FC',          shortName: 'MAG'                                         },
  chippa:       { id: 'chippa',       name: 'Chippa United',      shortName: 'CHU'                                         },
  siwelele:     { id: 'siwelele',     name: 'Siwelele',           shortName: 'SIW'                                         },
  orbit:        { id: 'orbit',        name: 'Orbit College',      shortName: 'ORB'                                         },
};

// ─── Competition constants ─────────────────────────────────────────────────────

const BP = 'Betway Premiership';
const BPS = 'Betway Prem';
const NC = 'Nedbank Cup';
const NCS = 'Nedbank Cup';

// ─── Match data ────────────────────────────────────────────────────────────────
// Scores for unconfirmed matches are seed estimates consistent with the
// official standings (8th, 7W 3D 8L, GF22 GA19). Confirmed results are
// marked in comments.

export const MATCHES: Match[] = [

  // ── Season results (Sep–Oct 2025) — confirmed via official club news ───────
  {
    id: 'r-sep22-richardsbay',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2025-09-22', kickoffTime: '15:00',
    homeTeam: TS_GALAXY, awayTeam: O.richardsBay,
    venue: 'Mbombela Stadium',
    status: 'full-time', homeScore: 1, awayScore: 1, resultState: 'draw',
    recapUrl: '/news/6',
  },
  {
    id: 'r-sep25-amazulu',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2025-09-25', kickoffTime: '15:00',
    homeTeam: TS_GALAXY, awayTeam: O.amazulu,
    venue: 'Mbombela Stadium',
    status: 'full-time', homeScore: 3, awayScore: 1, resultState: 'win',
    recapUrl: '/news/5',
  },
  {
    id: 'r-oct01-pirates',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2025-10-01', kickoffTime: '15:00',
    homeTeam: TS_GALAXY, awayTeam: O.pirates,
    venue: 'Mbombela Stadium',
    status: 'full-time', homeScore: 0, awayScore: 1, resultState: 'loss',
    recapUrl: '/news/4',
  },
  {
    id: 'r-oct19-magesi',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2025-10-19', kickoffTime: '15:00',
    homeTeam: O.magesi, awayTeam: TS_GALAXY,
    venue: 'Peter Mokaba Stadium, Seshego',
    status: 'full-time', homeScore: 2, awayScore: 1, resultState: 'loss',
    recapUrl: '/news/3',
  },

  // ── Nov 2025 ──────────────────────────────────────────────────────────────
  {
    id: 'r-nov02-stellenbosch',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2025-11-02', kickoffTime: '15:00',
    homeTeam: TS_GALAXY, awayTeam: O.stellenbosch,
    venue: 'Mbombela Stadium',
    status: 'full-time', homeScore: 2, awayScore: 0, resultState: 'win', // confirmed
    recapUrl: '/news/2',
  },
  {
    id: 'r-nov05-sundowns',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2025-11-05', kickoffTime: '19:30',
    homeTeam: O.sundowns, awayTeam: TS_GALAXY,
    venue: 'Loftus Versfeld Stadium, Pretoria',
    status: 'full-time', homeScore: 2, awayScore: 0, resultState: 'loss',
  },
  {
    id: 'r-nov23-arrows',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2025-11-23', kickoffTime: '15:00',
    homeTeam: TS_GALAXY, awayTeam: O.arrows,
    venue: 'Mbombela Stadium',
    status: 'full-time', homeScore: 2, awayScore: 1, resultState: 'win',
  },
  {
    id: 'r-nov29-polokwane',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2025-11-29', kickoffTime: '15:00',
    homeTeam: O.polokwane, awayTeam: TS_GALAXY,
    venue: 'Old Peter Mokaba Stadium, Polokwane',
    status: 'full-time', homeScore: 1, awayScore: 1, resultState: 'draw',
  },

  // ── Dec 2025 ──────────────────────────────────────────────────────────────
  {
    id: 'r-dec03-gallants',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2025-12-03', kickoffTime: '15:00',
    homeTeam: TS_GALAXY, awayTeam: O.gallants,
    venue: 'Mbombela Stadium',
    status: 'full-time', homeScore: 0, awayScore: 1, resultState: 'loss',
  },

  // ── Jan 2026 ──────────────────────────────────────────────────────────────
  {
    id: 'r-jan25-amazulu',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2026-01-25', kickoffTime: '15:00',
    homeTeam: O.amazulu, awayTeam: TS_GALAXY,
    venue: 'Moses Mabhida Stadium, Durban',
    status: 'full-time', homeScore: 2, awayScore: 1, resultState: 'loss',
  },

  // ── Feb 2026 ──────────────────────────────────────────────────────────────
  {
    id: 'r-feb01-sekhukhune',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2026-02-01', kickoffTime: '15:00',
    homeTeam: TS_GALAXY, awayTeam: O.sekhukhune,
    venue: 'Mbombela Stadium',
    status: 'full-time', homeScore: 1, awayScore: 1, resultState: 'draw',
  },
  {
    id: 'r-feb13-durban',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2026-02-13', kickoffTime: '19:30',
    homeTeam: O.durbanCity, awayTeam: TS_GALAXY,
    venue: 'Princess Magogo Stadium, KwaMashu',
    status: 'full-time', homeScore: 2, awayScore: 0, resultState: 'loss',
  },
  {
    id: 'nc-feb22-sundowns',
    competition: NC, competitionShort: NCS, season: '2025/26',
    date: '2026-02-22', kickoffTime: '15:00',
    homeTeam: TS_GALAXY, awayTeam: O.sundowns,
    venue: 'Solomon Mahlangu Stadium, Tembisa',
    status: 'full-time', homeScore: 2, awayScore: 0, resultState: 'win', // confirmed
    recapUrl: '/news/1',
  },
  {
    id: 'r-feb28-siwelele',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2026-02-28', kickoffTime: '15:00',
    homeTeam: O.siwelele, awayTeam: TS_GALAXY,
    venue: 'Dr Rantlai Petrus – Seisa Ramabodu Stadium',
    status: 'full-time', homeScore: 0, awayScore: 2, resultState: 'win',
  },

  // ── Mar 2026 ──────────────────────────────────────────────────────────────
  {
    id: 'nc-mar03-orbit',
    competition: NC, competitionShort: NCS, season: '2025/26',
    date: '2026-03-03', kickoffTime: '15:00',
    homeTeam: TS_GALAXY, awayTeam: O.orbit,
    venue: 'Mbombela Stadium',
    status: 'full-time', homeScore: 3, awayScore: 0, resultState: 'win',
  },
  {
    id: 'r-mar13-stellenbosch',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2026-03-13', kickoffTime: '15:00',
    homeTeam: O.stellenbosch, awayTeam: TS_GALAXY,
    venue: 'Danie Craven Stadium, Stellenbosch',
    status: 'full-time', homeScore: 1, awayScore: 0, resultState: 'loss',
  },
  {
    id: 'r-mar22-pirates',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2026-03-22', kickoffTime: '15:00',
    homeTeam: O.pirates, awayTeam: TS_GALAXY,
    venue: 'Orlando Stadium, Johannesburg',
    status: 'full-time', homeScore: 2, awayScore: 0, resultState: 'loss',
  },

  // ── Apr 2026 ──────────────────────────────────────────────────────────────
  {
    id: 'r-apr07-polokwane',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2026-04-07', kickoffTime: '15:00',
    homeTeam: TS_GALAXY, awayTeam: O.polokwane,
    venue: 'Mbombela Stadium',
    status: 'full-time', homeScore: 2, awayScore: 0, resultState: 'win',
  },
  {
    id: 'r-apr12-chiefs',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2026-04-12', kickoffTime: '15:00',
    homeTeam: O.chiefs, awayTeam: TS_GALAXY,
    venue: 'FNB Stadium, Johannesburg',
    status: 'full-time', homeScore: 2, awayScore: 1, resultState: 'loss',
  },
  {
    id: 'r-apr19-richardsbay',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2026-04-19', kickoffTime: '15:00',
    homeTeam: TS_GALAXY, awayTeam: O.richardsBay,
    venue: 'Mbombela Stadium',
    status: 'full-time', homeScore: 2, awayScore: 1, resultState: 'win',
  },
  {
    id: 'r-apr26-magesi',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2026-04-26', kickoffTime: '15:00',
    homeTeam: TS_GALAXY, awayTeam: O.magesi,
    venue: 'Mbombela Stadium',
    status: 'full-time', homeScore: 1, awayScore: 0, resultState: 'win',
  },

  // ── May 2026 ──────────────────────────────────────────────────────────────
  {
    id: 'r-may06-gallants',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2026-05-06', kickoffTime: '15:00',
    homeTeam: O.gallants, awayTeam: TS_GALAXY,
    venue: 'Thohoyandou Stadium, Venda',
    status: 'full-time', homeScore: 2, awayScore: 1, resultState: 'loss',
  },
  {
    id: 'r-may10-chippa',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2026-05-10', kickoffTime: '15:00',
    homeTeam: TS_GALAXY, awayTeam: O.chippa,
    venue: 'Mbombela Stadium',
    status: 'full-time', homeScore: 2, awayScore: 0, resultState: 'win',
  },

  // ── Upcoming ──────────────────────────────────────────────────────────────
  {
    id: 'f-may16-sundowns',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2026-05-16', kickoffTime: '15:00',
    homeTeam: TS_GALAXY, awayTeam: O.sundowns,
    venue: 'Mbombela Stadium',
    status: 'upcoming',
    ticketUrl: 'https://www.ticketpros.co.za',
    broadcastInfo: 'SuperSport PSL',
  },
  {
    id: 'f-may23-arrows',
    competition: BP, competitionShort: BPS, season: '2025/26',
    date: '2026-05-23', kickoffTime: '15:00',
    homeTeam: O.arrows, awayTeam: TS_GALAXY,
    venue: 'Princess Magogo Stadium, Durban',
    status: 'upcoming',
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

export function isTsgHome(match: Match): boolean {
  return match.homeTeam.id === 'ts-galaxy';
}

export function getOpponent(match: Match): TeamRef {
  return isTsgHome(match) ? match.awayTeam : match.homeTeam;
}

export const upcomingMatches = MATCHES.filter(m => m.status === 'upcoming');
export const completedMatches = MATCHES.filter(m => m.status === 'full-time').reverse();
export const nextMatch = upcomingMatches[0] ?? null;
export const latestResult = completedMatches[0] ?? null;

export function getMatchById(id: string): Match | undefined {
  return MATCHES.find(m => m.id === id);
}
