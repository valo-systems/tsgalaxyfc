/**
 * TS Galaxy Queens — static seed data.
 * Standing data sourced from Inqaku public log (https://inqaku.com).
 * Replace with CMS/API data when official club-admin feed is available.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type FormResult = 'W' | 'D' | 'L';

// ─── League Standing ──────────────────────────────────────────────────────────

export const queensStanding = {
  competition:    'Hollywoodbets Super League',
  association:    'SAFA',
  season:         '2024/25',
  position:       4,
  played:         30,
  won:            18,
  drawn:          7,
  lost:           5,
  goalsFor:       62,
  goalsAgainst:   22,
  goalDifference: 40,
  points:         61,
  form:           ['D', 'W', 'W', 'L', 'D'] as FormResult[],
  sourceLabel:    'Inqaku public log data',
} as const;

// ─── Snapshot cards ───────────────────────────────────────────────────────────

export const queensSnapshot = [
  { label: 'Team',        value: 'TS Galaxy Queens'              },
  { label: 'Competition', value: 'Hollywoodbets Super League'    },
  { label: 'Association', value: 'SAFA'                          },
  { label: 'Position',    value: '4th',  highlight: true         },
  { label: 'Points',      value: '61',   highlight: true         },
  { label: 'Identity',    value: "Women's football excellence"   },
] as const;

// ─── Gallery images ───────────────────────────────────────────────────────────
// Populated in QueensPage from QUEENS_IMAGES. Defined here for structure.

export interface QueensGalleryImage {
  key:  string;
  alt:  string;
  wide: boolean;
  caption?: string;
}

export const queensGalleryMeta: QueensGalleryImage[] = [
  { key: 'teamPhoto',          alt: 'TS Galaxy Queens team photo in matchday kit',             wide: true,  caption: 'The Queens'              },
  { key: 'teamLineup',         alt: 'TS Galaxy Queens players lined up at the goal',           wide: false, caption: 'Team preparation'        },
  { key: 'matchAction01',      alt: 'TS Galaxy Queens player in match action',                 wide: false, caption: 'Matchday focus'           },
  { key: 'matchAction02',      alt: 'TS Galaxy Queens player controlling the ball',            wide: false, caption: 'Technical quality'        },
  { key: 'trainingStretch',    alt: 'TS Galaxy Queens player stretching during training',      wide: false, caption: 'Training discipline'      },
  { key: 'trainingResistance', alt: 'TS Galaxy Queens player doing resistance band warmup',    wide: false, caption: 'Building strength'        },
  { key: 'trainingDribble',    alt: 'TS Galaxy Queens player dribbling during training drill', wide: false, caption: 'Sharpening skills'        },
  { key: 'trainingWarmup',     alt: 'TS Galaxy Queens player warming up before training',      wide: false, caption: 'Queens environment'       },
  { key: 'trainingKit',        alt: 'TS Galaxy Queens player in training kit',                 wide: false, caption: 'The Queens identity'      },
];

// ─── Squad position groups ────────────────────────────────────────────────────

export const queensSquadGroups = [
  { position: 'Goalkeepers',    icon: '🧤', description: 'The last line of defence for The Queens.'                         },
  { position: 'Defenders',      icon: '🛡',  description: 'A disciplined defensive unit protecting the Queens goal.'         },
  { position: 'Midfielders',    icon: '⚡', description: 'Engine room players driving the Queens style of play.'            },
  { position: 'Forwards',       icon: '🎯', description: '62 league goals this season — the Queens attack means business.'  },
  { position: 'Technical Team', icon: '📋', description: 'The coaching and support staff behind the Queens programme.'      },
];

// ─── Pathway cards ────────────────────────────────────────────────────────────

export const queensPathwayCards = [
  {
    title: 'Visibility',
    body:  'A dedicated home for the Queens within the TS Galaxy platform — giving women\'s football its own space.',
  },
  {
    title: 'Representation',
    body:  "Women's football given its own identity, coverage and matchday space alongside the men's team.",
  },
  {
    title: 'Development Link',
    body:  'A natural connection between the Academy, Queens and the wider TS Galaxy club pathway.',
  },
  {
    title: 'Partner Value',
    body:  "A clear platform for brands that want to support women's football in South Africa.",
  },
];

// ─── Partnership opportunities ────────────────────────────────────────────────

export const queensOpportunityCards = [
  { title: 'Queens Matchday',       body: 'Branding and presence connected to Queens fixtures and results.'            },
  { title: 'Player Stories',        body: 'Authentic content around players and their journeys in women\'s football.'  },
  { title: 'Youth Inspiration',     body: 'Community campaigns showing young girls a clear path in the game.'         },
  { title: 'Digital Content',       body: 'Social, web and video presence around the Queens programme.'               },
  { title: 'Community Campaigns',   body: 'Aligned campaigns connecting brands to football communities.'              },
];

// ─── Related links ────────────────────────────────────────────────────────────

export const queensRelatedLinks = [
  { label: 'Fixtures',    description: 'Follow club matchdays.',              path: '/fixtures'   },
  { label: 'News',        description: 'Read Queens and club updates.',        path: '/news'       },
  { label: 'Academy',     description: 'Follow the development pathway.',      path: '/academy'    },
  { label: 'Partners',    description: "Support women's football.",            path: '/partners'   },
  { label: 'Shop',        description: 'Wear official merchandise.',           path: '/shop'       },
  { label: 'Membership',  description: 'Join the Rockets family.',             path: '/membership' },
];
