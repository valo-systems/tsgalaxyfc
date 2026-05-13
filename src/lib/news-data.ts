// Single source of truth for TS Galaxy FC news articles.
// Used by NewsPage, HomePage latest news widget, and any future CMS integration.
// When a backend is added, replace this module with API/CMS data.

import { NEWS_IMAGES } from './assets';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ImageFit = 'cover' | 'contain';
export type ImageBg  = 'dark'  | 'light';

export interface NewsArticle {
  id:            string;
  slug:          string;
  category:      string;
  categoryLabel: string;
  badgeCls:      string;
  gradient:      string;
  image?:        string;
  imageAlt?:     string;
  imageFit?:     ImageFit;
  imagePosition?: string;
  imageBg?:      ImageBg;
  title:         string;
  excerpt:       string;
  date:          string;
  readTime:      string;
  featured?:     boolean;
  homeFeatured?: boolean;
}

// ─── Articles ─────────────────────────────────────────────────────────────────
// All current news images are official Betway Premiership / Nedbank Cup
// score graphics (square, branded, full-frame content).
// These must use imageFit: 'contain' + imageBg: 'dark' so the
// score, badges and competition text are never cropped.

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id:            '1',
    slug:          'rockets-roar-past-sundowns-nedbank-cup',
    category:      'report',
    categoryLabel: 'Match Report',
    badgeCls:      'bg-red-600',
    gradient:      'from-red-950 via-red-800 to-red-600',
    image:         NEWS_IMAGES.sundownsCup,
    imageAlt:      'Full Time: TS Galaxy FC 2–0 Mamelodi Sundowns — Nedbank Cup 2026',
    imageFit:      'contain',
    imageBg:       'dark',
    title:         'Rockets Roar Past Sundowns in Memorable Nedbank Cup Triumph',
    excerpt:       'In one of the most thrilling moments of the season, TS Galaxy delivered a sensational performance to eliminate Mamelodi Sundowns from the Nedbank Cup with a commanding 2–0 victory at Solomon Mahlangu Stadium.',
    date:          'February 22, 2026',
    readTime:      '4 min read',
    featured:      true,
    homeFeatured:  true,
  },
  {
    id:            '2',
    slug:          'rockets-soar-to-victory-over-stellenbosch',
    category:      'report',
    categoryLabel: 'Match Report',
    badgeCls:      'bg-red-600',
    gradient:      'from-gray-950 via-red-950 to-gray-900',
    image:         NEWS_IMAGES.stellenbosch,
    imageAlt:      'Full Time: TS Galaxy FC 2–0 Stellenbosch FC — Betway Premiership',
    imageFit:      'contain',
    imageBg:       'dark',
    title:         'Rockets Soar to Victory Over Stellenbosch at Home',
    excerpt:       'TS Galaxy produced a confident display to secure a 2–0 win over Stellenbosch FC at Mbombela Stadium.',
    date:          'November 3, 2025',
    readTime:      '3 min read',
    homeFeatured:  true,
  },
  {
    id:            '3',
    slug:          'rockets-show-heart-in-narrow-seshego-defeat',
    category:      'report',
    categoryLabel: 'Match Report',
    badgeCls:      'bg-red-600',
    gradient:      'from-slate-900 via-gray-800 to-slate-700',
    image:         NEWS_IMAGES.matchActionA,
    imageAlt:      'Full Time: Magesi FC 2–1 TS Galaxy FC — Betway Premiership',
    imageFit:      'contain',
    imageBg:       'dark',
    title:         'Rockets Show Heart in Narrow Seshego Defeat',
    excerpt:       'TS Galaxy delivered a spirited performance against Magesi FC in Seshego despite a narrow 2–1 defeat.',
    date:          'October 19, 2025',
    readTime:      '3 min read',
    homeFeatured:  true,
  },
  {
    id:            '4',
    slug:          'brave-rockets-push-pirates-in-mbombela-battle',
    category:      'report',
    categoryLabel: 'Match Report',
    badgeCls:      'bg-red-600',
    gradient:      'from-gray-900 via-gray-800 to-slate-800',
    image:         NEWS_IMAGES.matchActionB,
    imageAlt:      'Full Time: Orlando Pirates 2–0 TS Galaxy FC — Betway Premiership',
    imageFit:      'contain',
    imageBg:       'dark',
    title:         'Brave Rockets Push Pirates in Mbombela Battle',
    excerpt:       'TS Galaxy showed resilience in their Betway Premiership clash against Orlando Pirates at Mbombela.',
    date:          'October 1, 2025',
    readTime:      '4 min read',
  },
  {
    id:            '5',
    slug:          'ts-galaxy-outclass-amazulu-3-1-mbombela',
    category:      'report',
    categoryLabel: 'Match Report',
    badgeCls:      'bg-red-600',
    gradient:      'from-emerald-950 via-gray-900 to-gray-950',
    image:         NEWS_IMAGES.amazulu,
    imageAlt:      'Full Time: TS Galaxy FC 3–1 AmaZulu FC — Betway Premiership',
    imageFit:      'contain',
    imageBg:       'dark',
    title:         'TS Galaxy Outclass AmaZulu in Commanding 3–1 Victory at Mbombela',
    excerpt:       'TS Galaxy delivered a dominant performance, defeating AmaZulu FC 3–1 at Mbombela Stadium.',
    date:          'September 25, 2025',
    readTime:      '4 min read',
  },
  {
    id:            '6',
    slug:          'mbunjana-rescues-point-galaxy-draw-richards-bay',
    category:      'report',
    categoryLabel: 'Match Report',
    badgeCls:      'bg-red-600',
    gradient:      'from-amber-950 via-gray-900 to-gray-950',
    image:         NEWS_IMAGES.richardsBay,
    imageAlt:      'Full Time: Richards Bay 1–1 TS Galaxy FC — Betway Premiership',
    imageFit:      'contain',
    imageBg:       'dark',
    title:         'Mbunjana Rescues Point as Galaxy Draw with Richards Bay',
    excerpt:       'TS Galaxy fought hard to secure a 1–1 draw against Richards Bay, with Mlungisi Mbunjana scoring the crucial equalizer.',
    date:          'September 22, 2025',
    readTime:      '3 min read',
  },
];

// ─── Derived helpers ──────────────────────────────────────────────────────────

export const featuredNewsArticle: NewsArticle =
  NEWS_ARTICLES.find(a => a.featured) ?? NEWS_ARTICLES[0];

export const homeNewsArticles: NewsArticle[] =
  NEWS_ARTICLES.filter(a => a.homeFeatured);

export const latestNewsArticles: NewsArticle[] =
  NEWS_ARTICLES.slice(0, 6);

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find(a => a.slug === slug || a.id === slug);
}
