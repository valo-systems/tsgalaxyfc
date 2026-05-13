import { PARTNER_LOGOS } from './assets';

// ─── Types ────────────────────────────────────────────────────────────────────

export type PartnerCategory =
  | 'All'
  | 'Technical'
  | 'Beverage / Lifestyle'
  | 'Media'
  | 'Development'
  | 'Legal / Commercial';

export interface Partner {
  id: string;
  name: string;
  category: Exclude<PartnerCategory, 'All'>;
  logo: string | null;
  role: string;
  description: string;
  href?: string;
}

export interface ImpactArea {
  id: string;
  title: string;
  description: string;
}

export interface WhyValue {
  id: string;
  title: string;
  description: string;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
}

export interface RelatedLink {
  id: string;
  label: string;
  description: string;
  href: string;
}

// ─── Current Partners ────────────────────────────────────────────────────────

export const PARTNERS: Partner[] = [
  {
    id: 'aisj-midrand-campus',
    name: 'AISJ Midrand Campus',
    category: 'Development',
    logo: PARTNER_LOGOS.aisjEagles,
    role: 'Development & Community Partner',
    description:
      'TS Galaxy launched at the American International School of Johannesburg Midrand Campus, with the CCA programme supporting young players and families.',
  },
  {
    id: 'sizzling-sport',
    name: 'Sizzling Sport',
    category: 'Technical',
    logo: PARTNER_LOGOS.sizzlingSport,
    role: 'Kit & Technical Partner',
    description:
      'A football kit manufacturing partner supporting custom kit design, colours and club specifications for TS Galaxy FC.',
  },
  {
    id: 'corporate-commercial-law',
    name: 'Tim Sukazi Attorneys',
    category: 'Legal / Commercial',
    logo: PARTNER_LOGOS.timSukaziAttorneys,
    role: 'Legal & Commercial Partner',
    description:
      'A corporate and commercial law firm founded by Tim Sukazi, bringing legal and commercial expertise to the club.',
  },
  {
    id: 'aquelle-viv',
    name: 'Aquelle ViV',
    category: 'Beverage / Lifestyle',
    logo: PARTNER_LOGOS.aquelleviv,
    role: 'Beverage & Lifestyle Partner',
    description:
      'A lifestyle beverage partner aligned with healthy, active living and uncompromising quality.',
  },
  {
    id: 'ikwekwezi-fm',
    name: 'Ikwekwezi FM',
    category: 'Media',
    logo: PARTNER_LOGOS.ikwekweziFm,
    role: 'Media Partner',
    description:
      'A full-spectrum radio station serving the Ndebele-speaking community with educational, informative, sport and entertainment content.',
  },
  {
    id: 'ligwalagwala-fm',
    name: 'Ligwalagwala FM',
    category: 'Media',
    logo: PARTNER_LOGOS.ligwalagwalaFm,
    role: 'Media Partner',
    description:
      'A SiSwati-speaking radio station broadcasting to Mpumalanga, Limpopo and Gauteng, with strong community and cultural reach.',
  },
];

export const CATEGORY_FILTERS: PartnerCategory[] = [
  'All',
  'Technical',
  'Beverage / Lifestyle',
  'Media',
  'Development',
  'Legal / Commercial',
];

// ─── Impact Areas ─────────────────────────────────────────────────────────────

export const IMPACT_AREAS: ImpactArea[] = [
  {
    id: 'first-team',
    title: 'First Team',
    description: 'Support elite performance, matchdays and club visibility in the DStv Premiership.',
  },
  {
    id: 'queens',
    title: 'TS Galaxy Queens',
    description: 'Support women\'s football, talent growth and representation at the highest level.',
  },
  {
    id: 'academy',
    title: 'Academy',
    description: 'Support youth development, structured training and future football pathways.',
  },
  {
    id: 'matchday',
    title: 'Matchday',
    description: 'Connect with supporters through stadium, ticketing and matchday moments at Mbombela.',
  },
  {
    id: 'community',
    title: 'Community',
    description: 'Build campaigns that reach families, schools and football communities in Mpumalanga.',
  },
  {
    id: 'digital-media',
    title: 'Digital & Media',
    description: 'Gain visibility through club content, news, social media and digital platforms.',
  },
];

// ─── Why Partner ──────────────────────────────────────────────────────────────

export const WHY_VALUES: WhyValue[] = [
  {
    id: 'football-visibility',
    title: 'Football Visibility',
    description: 'Align your brand with a professional football club and a passionate matchday audience.',
  },
  {
    id: 'supporter-connection',
    title: 'Supporter Connection',
    description: 'Reach fans through club content, fixtures, merchandise, membership and digital touchpoints.',
  },
  {
    id: 'community-relevance',
    title: 'Community Relevance',
    description: 'Participate in football-led community development and youth engagement across Mpumalanga.',
  },
  {
    id: 'digital-exposure',
    title: 'Digital Exposure',
    description: 'Feature across the club website, news, partner stories and campaign pages.',
  },
  {
    id: 'development-pathways',
    title: 'Development Pathways',
    description: 'Support academy and youth initiatives connected to the next generation of football talent.',
  },
  {
    id: 'womens-football',
    title: "Women's Football",
    description: 'Create visibility through TS Galaxy Queens and the growth of women\'s football in South Africa.',
  },
];

// ─── Opportunities ────────────────────────────────────────────────────────────

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'main-club',
    title: 'Main Club Partnership',
    description: 'Premier visibility across all club platforms, matchdays and official communications.',
  },
  {
    id: 'matchday',
    title: 'Matchday Partnership',
    description: 'Connect with thousands of supporters on matchday through stadium presence and activations.',
  },
  {
    id: 'kit-technical',
    title: 'Kit / Technical Partnership',
    description: 'Associate your brand with club kit, training gear and technical equipment.',
  },
  {
    id: 'academy',
    title: 'Academy Partnership',
    description: 'Invest in the next generation of talent through TS Galaxy\'s youth development programme.',
  },
  {
    id: 'queens',
    title: 'TS Galaxy Queens',
    description: 'Support women\'s football and connect with a growing audience around TS Galaxy Queens.',
  },
  {
    id: 'digital-content',
    title: 'Digital Content Partnership',
    description: 'Sponsor club content, match coverage, player features and digital campaign series.',
  },
  {
    id: 'community-campaign',
    title: 'Community Campaign',
    description: 'Co-create community initiatives aligned with football, youth and local development.',
  },
  {
    id: 'media',
    title: 'Media Partnership',
    description: 'Amplify your brand through broadcast, radio and editorial media aligned with the club.',
  },
];

// ─── Related Links ─────────────────────────────────────────────────────────────

export const RELATED_LINKS: RelatedLink[] = [
  {
    id: 'the-club',
    label: 'The Club',
    description: 'Learn the story of The Rockets.',
    href: '/the-club',
  },
  {
    id: 'academy',
    label: 'Academy',
    description: 'Explore youth development.',
    href: '/academy',
  },
  {
    id: 'squad',
    label: 'Teams',
    description: 'Meet the players and staff.',
    href: '/squad',
  },
  {
    id: 'fixtures',
    label: 'Fixtures',
    description: 'View upcoming matches.',
    href: '/fixtures',
  },
  {
    id: 'news',
    label: 'News',
    description: 'Follow official club updates.',
    href: '/news',
  },
  {
    id: 'membership',
    label: 'Membership',
    description: 'Connect with supporters.',
    href: '/membership',
  },
];
