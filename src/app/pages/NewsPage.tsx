import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ChevronRight, Calendar, ShoppingBag, Trophy,
  Rocket, Clock, Check, Play, Search, CreditCard, Star,
} from 'lucide-react';
import { LOGO, ACADEMY_IMAGES, QUEENS_IMAGES } from '@/lib/assets';
import { NEWS_ARTICLES, featuredNewsArticle } from '@/lib/news-data';
import { completedMatches, isTsgHome, getOpponent, type Match } from '@/lib/matches-data';
import { NewsCard } from '@/app/components/NewsCard';

// ─── Style constants ──────────────────────────────────────────────────────────

const STRIPE_BG = {
  backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)',
  backgroundSize: '20px 20px',
};


// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'all',        label: 'All'              },
  { id: 'report',     label: 'Match Reports'    },
  { id: 'preview',    label: 'Match Preview'    },
  { id: 'club',       label: 'Club News'        },
  { id: 'squad',      label: 'Squad News'       },
  { id: 'academy',    label: 'Academy'          },
  { id: 'queens',     label: 'TS Galaxy Queens' },
  { id: 'supporters', label: 'Supporters'       },
  { id: 'commercial', label: 'Commercial'       },
  { id: 'podcast',    label: 'Podcasts'         },
];


const MATCH_RESULTS = completedMatches.slice(0, 4);

const RELATED_LINKS = [
  { label: 'Fixtures',          sub: 'View every upcoming Rockets match.',          path: '/fixtures',   Icon: Calendar   },
  { label: 'Match Centre',      sub: 'Live scores, stats and lineups.',              path: '/fixtures',   Icon: Trophy     },
  { label: 'Shop Official Kit', sub: 'Wear the badge with pride.',                  path: '/shop',       Icon: ShoppingBag },
  { label: 'Membership',        sub: 'Become an official Rockets supporter.',        path: '/membership', Icon: CreditCard  },
  { label: 'Academy',           sub: 'Youth development, trials and pathways.',      path: '/academy',    Icon: Rocket     },
  { label: 'TS Galaxy Queens',  sub: 'Follow the women\'s team.',                   path: '/queens',     Icon: Star       },
];

// ─── Outcome styling ──────────────────────────────────────────────────────────

const OUTCOME_META = {
  win:  { label: 'WIN',  cls: 'text-emerald-600', dotCls: 'bg-emerald-500' },
  draw: { label: 'DRAW', cls: 'text-amber-500',   dotCls: 'bg-amber-400'   },
  loss: { label: 'LOSS', cls: 'text-gray-400',    dotCls: 'bg-gray-400'    },
} as const;

// ─── MatchResultCard ──────────────────────────────────────────────────────────

function MatchResultCard({ result }: { result: Match }) {
  const navigate  = useNavigate();
  const tsgHome   = isTsgHome(result);
  const opponent  = getOpponent(result);
  const tsgScore  = tsgHome ? result.homeScore! : result.awayScore!;
  const oppScore  = tsgHome ? result.awayScore! : result.homeScore!;
  const outcome   = result.resultState === 'win' ? 'win' : result.resultState === 'draw' ? 'draw' : 'loss';
  const meta      = OUTCOME_META[outcome];
  const dateLabel = new Date(result.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
  return (
    <article
      className="flex-shrink-0 w-56 lg:w-auto snap-start bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group overflow-hidden"
      onClick={() => result.recapUrl ? navigate(result.recapUrl) : navigate('/news')}
      aria-label={`TS Galaxy ${tsgScore}–${oppScore} ${opponent.name}, ${result.competition}`}
    >
      <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-400" aria-hidden="true" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest truncate mr-2">{result.competitionShort}</span>
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className={`w-1.5 h-1.5 rounded-full ${meta.dotCls}`} aria-hidden="true" />
            <span className={`text-[10px] font-black ${meta.cls}`}>{meta.label}</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-1 mb-3">
          <p className="font-black text-sm text-gray-900 truncate flex-1 min-w-0">TS Galaxy</p>
          <div className="flex items-center gap-1 flex-shrink-0 px-1">
            <span className="text-xl font-black text-gray-900 leading-none">{tsgScore}</span>
            <span className="text-gray-300 font-bold text-sm leading-none">–</span>
            <span className="text-xl font-black text-gray-400 leading-none">{oppScore}</span>
          </div>
          <p className="font-bold text-sm text-gray-500 truncate flex-1 min-w-0 text-right">{opponent.shortName}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-400">{dateLabel}</span>
          {result.recapUrl && (
            <button className="text-red-600 text-[10px] font-bold flex items-center gap-0.5 group-hover:gap-1 transition-all">
              Read Report <ChevronRight className="w-3 h-3" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

function EmptyState({ category }: { category: string }) {
  return (
    <div className="col-span-full py-16 flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <Trophy className="w-5 h-5 text-gray-300" aria-hidden="true" />
      </div>
      <p className="font-black text-sm text-gray-900 mb-1">No stories yet</p>
      <p className="text-xs text-gray-400">
        {category === 'all'
          ? 'No articles found matching your search.'
          : `No ${CATEGORIES.find(c => c.id === category)?.label ?? category} articles yet.`}
      </p>
    </div>
  );
}

// ─── NewsPage ─────────────────────────────────────────────────────────────────

export function NewsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const filteredArticles = NEWS_ARTICLES.filter(a => {
    const matchesCat = activeCategory === 'all' || a.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (email && consent) setSubmitted(true);
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          § 1  HERO
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative bg-gray-950 text-white overflow-hidden"
        aria-label="Rockets Media hub"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <img src={QUEENS_IMAGES.matchAction02} alt="" className="w-full h-full object-cover object-[center_30%]" />
          <div className="absolute inset-0 bg-gray-950/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/60 to-gray-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={STRIPE_BG} aria-hidden="true" />
        <img
          src={LOGO.favicon.png256}
          alt=""
          aria-hidden="true"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-40 h-40 lg:w-64 lg:h-64 opacity-[0.05] pointer-events-none select-none"
        />

        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-10 py-10 lg:py-16 xl:py-18">

            {/* LEFT: copy */}
            <div className="flex-1 min-w-0 pb-8 lg:pb-0">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" aria-hidden="true" />
                <span className="text-[11px] font-black tracking-widest text-gray-200 uppercase">Rockets Media</span>
              </div>

              <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-tight mb-3 lg:mb-4">
                <span className="block">Latest from</span>
                <span className="block text-red-400">The Rockets.</span>
              </h1>

              <p className="text-gray-300 text-sm lg:text-base xl:text-lg leading-relaxed mb-6 max-w-xl">
                Match reports, player updates, behind-the-scenes stories, academy news and official
                club announcements — all from the TS Galaxy FC universe.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/news/1')}
                  className="bg-red-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-red-500 transition-colors"
                >
                  Read Latest Story
                </button>
                <button
                  onClick={() => navigate('/fixtures')}
                  className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors"
                >
                  View Fixtures
                </button>
              </div>
            </div>

            {/* RIGHT: featured article preview card — desktop only */}
            <div className="hidden lg:block w-[360px] xl:w-[400px] flex-shrink-0">
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                {/* Red header */}
                <div className="bg-red-600 px-5 py-3 flex items-center justify-between">
                  <span className="text-white font-black text-xs uppercase tracking-widest">Featured Story</span>
                  <span className="text-[10px] font-bold text-red-200">{featuredNewsArticle.date}</span>
                </div>
                {/* Thumbnail */}
                <div className={`relative h-36 overflow-hidden ${featuredNewsArticle.imageBg === 'dark' ? 'bg-gray-950' : ''}`}>
                  {featuredNewsArticle.image ? (
                    <img
                      src={featuredNewsArticle.image}
                      alt={featuredNewsArticle.imageAlt ?? featuredNewsArticle.title}
                      className={`absolute inset-0 w-full h-full ${featuredNewsArticle.imageFit === 'contain' ? 'object-contain p-2' : 'object-cover'}`}
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${featuredNewsArticle.gradient}`} />
                  )}
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide z-10">
                    {featuredNewsArticle.categoryLabel}
                  </span>
                </div>
                {/* Text */}
                <div className="p-5">
                  <h3 className="font-black text-sm text-gray-900 leading-snug mb-2 line-clamp-3">
                    {featuredNewsArticle.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
                    {featuredNewsArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" /> {featuredNewsArticle.readTime}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/news/${featuredNewsArticle.id}`)}
                    className="w-full bg-red-600 text-white py-2.5 rounded-xl font-black text-sm hover:bg-red-500 transition-colors"
                  >
                    Read Story
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 2  FEATURED STORY (editorial full card)
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-6 lg:mt-10"
        aria-labelledby="featured-heading"
      >
        <article
          className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden"
          onClick={() => navigate(`/news/${featuredNewsArticle.id}`)}
          aria-label={featuredNewsArticle.title}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className={`relative h-56 lg:h-full min-h-[220px] overflow-hidden ${featuredNewsArticle.imageBg === 'dark' ? 'bg-gray-950' : ''}`}>
              {featuredNewsArticle.image ? (
                <img
                  src={featuredNewsArticle.image}
                  alt={featuredNewsArticle.imageAlt ?? featuredNewsArticle.title}
                  className={`absolute inset-0 w-full h-full ${featuredNewsArticle.imageFit === 'contain' ? 'object-contain p-2' : 'object-cover'}`}
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${featuredNewsArticle.gradient}`} />
              )}
              <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest z-10">
                {featuredNewsArticle.categoryLabel}
              </span>
              {/* Mobile: headline overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:hidden z-10">
                <p className="text-white font-black text-lg leading-tight line-clamp-2">{featuredNewsArticle.title}</p>
              </div>
            </div>

            {/* Text */}
            <div className="p-6 lg:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-black text-red-600 uppercase tracking-widest">Featured Story</span>
                <span className="text-gray-300" aria-hidden="true">·</span>
                <span className="text-[11px] text-gray-400">{featuredNewsArticle.date}</span>
              </div>
              <h2 id="featured-heading" className="font-black text-xl lg:text-2xl xl:text-3xl text-gray-900 leading-tight mb-3 group-hover:text-red-600 transition-colors hidden lg:block">
                {featuredNewsArticle.title}
              </h2>
              <p className="text-sm lg:text-base text-gray-500 leading-relaxed mb-5">
                {featuredNewsArticle.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{featuredNewsArticle.readTime}</span>
                </div>
                <span className="text-red-600 font-bold text-sm flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  Read Story <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 3  CATEGORY FILTERS  (sticky)
          ══════════════════════════════════════════════════════════════ */}
      <div
        className="sticky top-16 lg:top-[73px] z-40 bg-white border-b border-gray-100 shadow-sm"
        role="navigation"
        aria-label="News categories"
      >
        <div className="container mx-auto px-4 lg:px-6 py-3">
          <div className="flex items-center gap-3">
            {/* Chips — horizontal scroll */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1 pb-0.5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={activeCategory === cat.id}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full font-bold text-xs whitespace-nowrap transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search — desktop only */}
            <div className="hidden lg:flex relative flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search stories…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-xs w-52 focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-400 transition-colors"
                aria-label="Search news articles"
              />
            </div>
          </div>

          {/* Mobile search — below chips */}
          <div className="lg:hidden mt-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search stories…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-xs w-full focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-400 transition-colors"
              aria-label="Search news articles"
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          § 4  NEWS GRID
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-8 lg:mt-10"
        aria-labelledby="grid-heading"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 id="grid-heading" className="font-black text-xl lg:text-2xl text-gray-900 tracking-tight">
            {activeCategory === 'all' ? 'Latest Stories' : CATEGORIES.find(c => c.id === activeCategory)?.label}
          </h2>
          {(searchQuery || activeCategory !== 'all') && (
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="text-xs font-bold text-red-600 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {filteredArticles.length > 0
            ? filteredArticles.map(a => <NewsCard key={a.id} article={a} />)
            : <EmptyState category={activeCategory} />
          }
        </div>

        {filteredArticles.length > 0 && (
          <div className="mt-8 text-center">
            <button className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors">
              Load More Stories
            </button>
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 5  MATCH REPORTS STRIP
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-14"
        aria-labelledby="reports-heading"
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 id="reports-heading" className="font-black text-xl lg:text-2xl text-gray-900 tracking-tight">
              Recent Match Reports
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Catch up on the latest Rockets results and performance stories.</p>
          </div>
          <button
            onClick={() => { setActiveCategory('report'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-1 text-red-600 text-sm font-bold hover:gap-1.5 transition-all flex-shrink-0 mt-1"
            aria-label="View all match reports"
          >
            View All <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div
          className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:overflow-visible lg:snap-none scrollbar-hide"
          aria-label="Recent match results"
        >
          {MATCH_RESULTS.map(r => <MatchResultCard key={r.id} result={r} />)}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 6  PODCAST / MEDIA FEATURE
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-14"
        aria-labelledby="media-heading"
      >
        <div className="mb-5">
          <span className="inline-block text-[11px] font-black text-red-600 uppercase tracking-widest mb-1">Rockets Media</span>
          <h2 id="media-heading" className="font-black text-xl lg:text-2xl text-gray-900 tracking-tight">
            Audio &amp; Podcast
          </h2>
        </div>

        <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={STRIPE_BG} aria-hidden="true" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-700 rounded-full blur-[100px] opacity-10 pointer-events-none" aria-hidden="true" />

          <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">

            {/* Left: media visual */}
            <div className="flex flex-col items-center justify-center gap-5 px-8 py-10 lg:py-14 border-b border-white/5 lg:border-b-0 lg:border-r lg:border-white/5">
              <div className="relative w-full max-w-[280px] aspect-video rounded-xl overflow-hidden shadow-lg">
                <img
                  src={ACADEMY_IMAGES.action01}
                  alt="TS Galaxy Youth Trials podcast thumbnail — Sivukile Sport on Ikwekwezi FM"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 text-white ml-0.5" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: text content */}
            <div className="p-8 lg:p-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-indigo-700 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">Podcast</span>
                <span className="text-[10px] font-bold text-gray-500">Ikwekwezi FM</span>
              </div>
              <h3 className="font-black text-lg lg:text-xl text-white leading-snug mb-3">
                Sivukile Sport: TS Galaxy Youth Trials
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                TS Galaxy Chairman Tim Sukazi reflected on the overwhelming response to the
                club's youth development trials, which attracted more than 2,000 aspiring
                footballers on 6 January 2026.
              </p>
              <ul className="space-y-2 mb-6" aria-label="Key podcast highlights">
                {[
                  'More than 2,000 aspiring footballers attended the trials.',
                  'Trials covered Under-13 through to senior professional prospects.',
                  'Youth development remains central to the club\'s pathway.',
                  'Further community events planned through official club channels.',
                ].map(point => (
                  <li key={point} className="flex items-start gap-2.5 text-xs text-gray-400 leading-relaxed">
                    <div className="w-4 h-4 rounded-full bg-red-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-red-400" aria-hidden="true" />
                    </div>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 flex-wrap">
                <button className="bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-500 transition-colors">
                  Listen / Read More
                </button>
                <button
                  onClick={() => navigate('/academy')}
                  className="bg-white/10 text-white px-5 py-2.5 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Explore Academy
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 7  ACADEMY SPOTLIGHT
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-14"
        aria-labelledby="academy-heading"
      >
        <div className="relative bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-950 rounded-2xl p-6 lg:p-10 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={STRIPE_BG} aria-hidden="true" />
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-600 rounded-full blur-3xl opacity-10 pointer-events-none" aria-hidden="true" />
          <img
            src={LOGO.favicon.png256}
            alt=""
            aria-hidden="true"
            className="absolute right-6 bottom-0 w-28 h-28 lg:w-44 lg:h-44 opacity-[0.07] pointer-events-none select-none"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:gap-12">
            {/* Stat */}
            <div className="flex-shrink-0 mb-5 lg:mb-0 text-center lg:text-left">
              <p className="font-black text-5xl lg:text-7xl text-white leading-none">2,000<span className="text-emerald-400">+</span></p>
              <p className="text-emerald-300 text-xs font-black uppercase tracking-widest mt-1">Aspiring footballers</p>
            </div>

            <div className="hidden lg:block w-px bg-white/10 self-stretch" aria-hidden="true" />

            {/* Text */}
            <div className="flex-1 min-w-0">
              <span className="inline-block text-[11px] font-black text-emerald-400 uppercase tracking-widest mb-2">Academy Spotlight</span>
              <h2 id="academy-heading" className="font-black text-xl lg:text-3xl text-white tracking-tight mb-3">
                The next generation of Rockets is here.
              </h2>
              <p className="text-teal-200 text-sm lg:text-base leading-relaxed mb-5">
                More than 2,000 aspiring footballers attended TS Galaxy youth trials, showing the
                scale of football ambition in the region and the importance of structured development
                pathways.
              </p>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => navigate('/academy')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors"
                >
                  Explore Academy
                </button>
                <button
                  onClick={() => navigate('/academy')}
                  className="bg-white/10 text-white px-5 py-3 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Apply for Trials
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 8  SUPPORTER UPDATES CTA
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-14"
        aria-labelledby="signup-heading"
      >
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-10">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
                <Check className="w-7 h-7 text-emerald-600" aria-hidden="true" />
              </div>
              <h2 className="font-black text-xl text-gray-900">You're in.</h2>
              <p className="text-sm text-gray-500 max-w-sm">
                You'll receive official TS Galaxy FC updates — fixtures, results, shop releases and more.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Copy */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                    <Rocket className="w-4 h-4 text-red-600" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-black text-red-600 uppercase tracking-widest">Rockets Updates</span>
                </div>
                <h2 id="signup-heading" className="font-black text-xl lg:text-3xl text-gray-900 tracking-tight mb-2">
                  Never miss a Rockets update.
                </h2>
                <p className="text-sm lg:text-base text-gray-500 leading-relaxed">
                  Get fixtures, match reports, ticket alerts, shop releases and official club news direct
                  to your inbox.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSignup} className="flex flex-col gap-3" noValidate>
                <div>
                  <label htmlFor="signup-email" className="sr-only">Email address</label>
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-400 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="signup-phone" className="sr-only">Mobile number (optional)</label>
                  <input
                    id="signup-phone"
                    type="tel"
                    placeholder="Mobile number (optional)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-400 transition-colors"
                  />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={e => setConsent(e.target.checked)}
                    className="mt-0.5 accent-red-600 flex-shrink-0"
                    required
                  />
                  <span className="text-xs text-gray-500 leading-relaxed">
                    I agree to receive official TS Galaxy FC updates. You can unsubscribe at any time.
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={!email || !consent}
                  className="w-full bg-red-600 text-white py-3 rounded-xl font-black text-sm hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Get Updates
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 9  RELATED QUICK LINKS
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-14"
        aria-labelledby="links-heading"
      >
        <h2 id="links-heading" className="font-black text-xl lg:text-2xl text-gray-900 tracking-tight mb-5">
          Explore The Rockets
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {RELATED_LINKS.map(({ label, sub, path, Icon }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 lg:p-5 text-left hover:shadow-md hover:border-red-200 transition-all group"
              aria-label={label}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 transition-colors">
                  <Icon className="w-4 h-4 text-red-600 group-hover:text-white transition-colors" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm text-gray-900 mb-0.5 group-hover:text-red-600 transition-colors">{label}</p>
                  <p className="text-xs text-gray-500 leading-snug line-clamp-2">{sub}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-red-600 group-hover:translate-x-0.5 flex-shrink-0 mt-0.5 transition-all" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Mobile nav clearance */}
      <div className="h-8 lg:h-12" aria-hidden="true" />
    </>
  );
}
