// Static seed data for Betway Premiership standings — 2025/26 season.
// Replace with CMS/API data when standings integration is available.
// Source: official PSL table (snapshot — admin should update after each matchday).

import { LOGO, OPPONENT_BADGES } from './assets';
import type { TeamRef } from './matches-data';

// ─── Types ─────────────────────────────────────────────────────────────────────

export type FormResult = 'W' | 'D' | 'L';

export interface StandingRow {
  position: number;
  club: TeamRef;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form?: FormResult[];
  isTsGalaxy?: boolean;
}

// ─── Standings seed data ───────────────────────────────────────────────────────
// Snapshot from official PSL source. 12 clubs shown; remaining teams
// not available in source and will be added when API integration is complete.

export const STANDINGS: StandingRow[] = [
  {
    position: 1,
    club: { id: 'pirates', name: 'Orlando Pirates', shortName: 'Pirates', badge: OPPONENT_BADGES.orlandoPirates },
    played: 17, won: 12, drawn: 2, lost: 3, goalsFor: 26, goalsAgainst: 7,  goalDifference: 19, points: 38,
    form: ['W', 'W', 'W', 'D', 'W'],
  },
  {
    position: 2,
    club: { id: 'sundowns', name: 'Mamelodi Sundowns', shortName: 'Sundowns', badge: OPPONENT_BADGES.mamelodiSundowns },
    played: 16, won: 10, drawn: 5, lost: 1, goalsFor: 26, goalsAgainst: 8,  goalDifference: 18, points: 35,
    form: ['W', 'D', 'W', 'W', 'L'],
  },
  {
    position: 3,
    club: { id: 'sekhukhune', name: 'Sekhukhune United', shortName: 'Sekhukhune', badge: OPPONENT_BADGES.sekhukhune },
    played: 18, won: 9, drawn: 5, lost: 4, goalsFor: 19, goalsAgainst: 10, goalDifference: 9,  points: 32,
    form: ['W', 'L', 'D', 'W', 'W'],
  },
  {
    position: 4,
    club: { id: 'chiefs', name: 'Kaizer Chiefs', shortName: 'Chiefs', badge: OPPONENT_BADGES.kaizerChiefs },
    played: 15, won: 8, drawn: 6, lost: 1, goalsFor: 15, goalsAgainst: 6,  goalDifference: 9,  points: 30,
    form: ['W', 'D', 'W', 'W', 'D'],
  },
  {
    position: 5,
    club: { id: 'amazulu', name: 'AmaZulu FC', shortName: 'AmaZulu', badge: OPPONENT_BADGES.amazuluFc },
    played: 17, won: 9, drawn: 3, lost: 5, goalsFor: 19, goalsAgainst: 16, goalDifference: 3,  points: 30,
    form: ['W', 'L', 'W', 'D', 'W'],
  },
  {
    position: 6,
    club: { id: 'durban-city', name: 'Durban City', shortName: 'Durban City', badge: OPPONENT_BADGES.durbanCity },
    played: 18, won: 8, drawn: 4, lost: 6, goalsFor: 17, goalsAgainst: 13, goalDifference: 4,  points: 28,
    form: ['W', 'D', 'L', 'W', 'W'],
  },
  {
    position: 7,
    club: { id: 'polokwane', name: 'Polokwane City', shortName: 'Polokwane', badge: OPPONENT_BADGES.polokwaneCity },
    played: 17, won: 6, drawn: 7, lost: 4, goalsFor: 13, goalsAgainst: 11, goalDifference: 2,  points: 25,
    form: ['D', 'W', 'D', 'L', 'D'],
  },
  {
    position: 8,
    club: { id: 'ts-galaxy', name: 'TS Galaxy FC', shortName: 'Galaxy', badge: LOGO.badge },
    played: 18, won: 7, drawn: 3, lost: 8, goalsFor: 22, goalsAgainst: 19, goalDifference: 3,  points: 24,
    form: ['W', 'L', 'W', 'L', 'W'],
    isTsGalaxy: true,
  },
  {
    position: 9,
    club: { id: 'arrows', name: 'Golden Arrows', shortName: 'Arrows', badge: OPPONENT_BADGES.goldenArrows },
    played: 17, won: 6, drawn: 2, lost: 9, goalsFor: 23, goalsAgainst: 22, goalDifference: 1,  points: 20,
    form: ['L', 'W', 'L', 'L', 'W'],
  },
  {
    position: 10,
    club: { id: 'richards-bay', name: 'Richards Bay', shortName: 'Richards Bay' },
    played: 17, won: 4, drawn: 7, lost: 6, goalsFor: 14, goalsAgainst: 19, goalDifference: -5, points: 19,
    form: ['D', 'L', 'D', 'W', 'D'],
  },
  {
    position: 11,
    club: { id: 'siwelele', name: 'Siwelele', shortName: 'Siwelele' },
    played: 17, won: 4, drawn: 6, lost: 7, goalsFor: 9,  goalsAgainst: 14, goalDifference: -5, points: 18,
    form: ['L', 'D', 'L', 'D', 'W'],
  },
  {
    position: 12,
    club: { id: 'chippa', name: 'Chippa United', shortName: 'Chippa' },
    played: 18, won: 4, drawn: 6, lost: 8, goalsFor: 13, goalsAgainst: 21, goalDifference: -8, points: 18,
    form: ['L', 'L', 'D', 'W', 'L'],
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

export const tsGalaxyStanding = STANDINGS.find(r => r.isTsGalaxy)!;
export const topFour = STANDINGS.slice(0, 4);

/** 2 rows above + TS Galaxy + 2 rows below */
export function aroundTsGalaxy(count = 2): StandingRow[] {
  const idx = STANDINGS.findIndex(r => r.isTsGalaxy);
  if (idx === -1) return [];
  return STANDINGS.slice(Math.max(0, idx - count), Math.min(STANDINGS.length, idx + count + 1));
}
