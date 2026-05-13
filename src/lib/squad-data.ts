import { PLAYER_IMAGES } from './assets';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Position = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
export type TeamId = 'mens-first-team' | 'queens' | 'technical-team' | 'academy';

export interface Player {
  id: string;
  slug: string;
  name: string;
  squadNumber: number;
  position: Position;
  nationality: string;
  team: TeamId;
  image: string;
  bio?: string;
}

// ─── First Team Squad ─────────────────────────────────────────────────────────

export const SQUAD: Player[] = [
  // Goalkeepers
  {
    id: 'ira-eliezer-tape',
    slug: 'ira-eliezer-tape',
    name: 'Ira Eliezer Tape',
    squadNumber: 1,
    position: 'Goalkeeper',
    nationality: 'South Africa',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.iraEliezerTape,
    bio: 'A commanding presence between the sticks, Ira Eliezer Tape brings confidence and organisation to The Rockets\' backline.',
  },
  {
    id: 'sipho-gift-maseti',
    slug: 'sipho-gift-maseti',
    name: 'Sipho Gift Maseti',
    squadNumber: 16,
    position: 'Goalkeeper',
    nationality: 'South Africa',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.siphoGiftMaseti,
    bio: 'An experienced goalkeeper who brings depth and competition to The Rockets\' squad.',
  },
  {
    id: 'nkosingabele-madela',
    slug: 'nkosingabele-madela',
    name: 'Nkosingabele Madela',
    squadNumber: 33,
    position: 'Goalkeeper',
    nationality: 'South Africa',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.nkosingabeleMadela,
    bio: 'A composed shot-stopper offering strong goalkeeping competition within the squad.',
  },
  // Defenders
  {
    id: 'macbeth-mahlangu',
    slug: 'macbeth-mahlangu',
    name: 'MacBeth Mahlangu',
    squadNumber: 3,
    position: 'Defender',
    nationality: 'South Africa',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.macbethMahlangu,
    bio: 'A solid and reliable defender who anchors The Rockets\' defensive unit with composure and reading of the game.',
  },
  {
    id: 'mpho-velase',
    slug: 'mpho-velase',
    name: 'Mpho Velase',
    squadNumber: 4,
    position: 'Defender',
    nationality: 'South Africa',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.mphoVelase,
    bio: 'A dependable defender committed to keeping The Rockets\' defensive line disciplined and organised.',
  },
  {
    id: 'puso-taelo-dithejane',
    slug: 'puso-taelo-dithejane',
    name: 'Puso Taelo Dithejane',
    squadNumber: 5,
    position: 'Defender',
    nationality: 'Botswana',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.pusoTaeloDithejane,
    bio: 'An international defender who brings defensive solidity and international experience to the squad.',
  },
  {
    id: 'qobolwakhe-sibande',
    slug: 'qobolwakhe-sibande',
    name: 'Qobolwakhe Sibande',
    squadNumber: 6,
    position: 'Defender',
    nationality: 'South Africa',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.qobolwakheSibande,
    bio: 'A key figure at the back, bringing energy and defensive commitment to every match for The Rockets.',
  },
  {
    id: 'siyabonga-nguessan',
    slug: 'siyabonga-nguessan',
    name: 'Siyabonga Nguessan',
    squadNumber: 15,
    position: 'Defender',
    nationality: 'South Africa',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.siyabongaNguessan,
    bio: 'A versatile defender who contributes positional discipline and athleticism across the defensive line.',
  },
  {
    id: 'thiago-walters',
    slug: 'thiago-walters',
    name: 'Thiago Walters',
    squadNumber: 18,
    position: 'Defender',
    nationality: 'South Africa',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.thiagoWalters,
    bio: 'A determined defender whose commitment and work rate make him a valued member of The Rockets squad.',
  },
  {
    id: 'kganyane-solomon-letsoenyo',
    slug: 'kganyane-solomon-letsoenyo',
    name: 'Kganyane Solomon Letsoenyo',
    squadNumber: 20,
    position: 'Defender',
    nationality: 'South Africa',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.kganyaneSolomon,
    bio: 'A composed and disciplined defender who adds depth and quality to The Rockets\' defensive options.',
  },
  // Midfielders
  {
    id: 'anslin-williams',
    slug: 'anslin-williams',
    name: 'Anslin Williams',
    squadNumber: 2,
    position: 'Midfielder',
    nationality: 'South Africa',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.anslinWilliams,
    bio: 'A dynamic midfielder who brings energy, discipline and technical quality to the heart of The Rockets\' play.',
  },
  {
    id: 'jeffrey-dlamini',
    slug: 'jeffrey-dlamini',
    name: 'Jeffrey Dlamini',
    squadNumber: 8,
    position: 'Midfielder',
    nationality: 'South Africa',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.jeffreyDlamini,
    bio: 'A composed and creative midfielder, Jeffrey Dlamini links play effectively and drives The Rockets forward from midfield.',
  },
  {
    id: 'mlungisi-mbunjana',
    slug: 'mlungisi-mbunjana',
    name: 'Mlungisi Mbunjana',
    squadNumber: 10,
    position: 'Midfielder',
    nationality: 'South Africa',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.mlungisiMbunjana,
    bio: 'A tenacious midfielder with an eye for goal. Mbunjana\'s crucial equaliser against Richards Bay highlights his instinct at the right moment.',
  },
  {
    id: 'nhlanhla-mgaga',
    slug: 'nhlanhla-mgaga',
    name: 'Nhlanhla Mgaga',
    squadNumber: 11,
    position: 'Midfielder',
    nationality: 'South Africa',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.nhlanhlasMgaga,
    bio: 'A hardworking midfielder who covers ground effectively and contributes both defensively and in attack for The Rockets.',
  },
  {
    id: 'ntandoyenkosi-nkosi',
    slug: 'ntandoyenkosi-nkosi',
    name: 'Ntandoyenkosi Nkosi',
    squadNumber: 14,
    position: 'Midfielder',
    nationality: 'South Africa',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.ntandoyenkosiNkosi,
    bio: 'A versatile and technically gifted midfielder who brings balance and creativity to The Rockets\' squad.',
  },
  {
    id: 'onke-moletshe',
    slug: 'onke-moletshe',
    name: 'Onke Moletshe',
    squadNumber: 17,
    position: 'Midfielder',
    nationality: 'South Africa',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.onkeMoletshe,
    bio: 'An industrious and combative midfielder whose engine and pressing make him an important presence in The Rockets\' midfield.',
  },
  {
    id: 'sibusiso-dlamini',
    slug: 'sibusiso-dlamini',
    name: 'Sibusiso Dlamini',
    squadNumber: 22,
    position: 'Midfielder',
    nationality: 'South Africa',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.sibusisoDlamini,
    bio: 'A creative and box-to-box midfielder whose range of passing and movement keeps The Rockets ticking in the middle of the park.',
  },
  // Forwards
  {
    id: 'junior-zindoga',
    slug: 'junior-zindoga',
    name: 'Junior Zindoga',
    squadNumber: 9,
    position: 'Forward',
    nationality: 'Zimbabwe',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.juniorZindoga,
    bio: 'A powerful and mobile striker who leads The Rockets\' attack with pace, movement and clinical finishing. A fan favourite at Mbombela.',
  },
  {
    id: 'sedwyn-george',
    slug: 'sedwyn-george',
    name: 'Sedwyn George',
    squadNumber: 7,
    position: 'Forward',
    nationality: 'South Africa',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.sedwynGeorge,
    bio: 'A sharp and elusive centre forward whose movement and goal-scoring instinct give The Rockets a constant attacking threat.',
  },
  {
    id: 'seluleko-mahlambi',
    slug: 'seluleko-mahlambi',
    name: 'Seluleko Mahlambi',
    squadNumber: 19,
    position: 'Forward',
    nationality: 'South Africa',
    team: 'mens-first-team',
    image: PLAYER_IMAGES.selulekoMahlambi,
    bio: 'A dynamic and direct forward who uses pace and technical ability to unsettle defenders and create chances for The Rockets.',
  },
];

// ─── Position filter config ───────────────────────────────────────────────────

export const POSITION_FILTERS = [
  { id: 'all',         label: 'All Players',   short: 'All' },
  { id: 'Goalkeeper',  label: 'Goalkeepers',   short: 'GK'  },
  { id: 'Defender',    label: 'Defenders',     short: 'DEF' },
  { id: 'Midfielder',  label: 'Midfielders',   short: 'MID' },
  { id: 'Forward',     label: 'Forwards',      short: 'FWD' },
] as const;

// ─── Counts (derived from SQUAD) ──────────────────────────────────────────────

export function countByPosition(pos: Position) {
  return SQUAD.filter(p => p.team === 'mens-first-team' && p.position === pos).length;
}
