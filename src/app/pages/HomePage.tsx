import {
  ChevronRight, Clock, MapPin, Star,
  Ticket, Calendar, ShoppingBag, CreditCard,
  Trophy, BarChart2, TrendingUp,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LOGO, THE_CLUB_IMAGES, QUEENS_IMAGES, ACADEMY_IMAGES } from '@/lib/assets';
import { HOME_PRODUCTS } from '@/lib/shop-data';
import { homeNewsArticles, featuredNewsArticle } from '@/lib/news-data';
import { FeaturedNewsCard, NewsCardCompact } from '@/app/components/NewsCard';
import { nextMatch, upcomingMatches, latestResult, isTsgHome, getOpponent, type Match } from '@/lib/matches-data';
import { tsGalaxyStanding } from '@/lib/standings-data';
import { PARTNERS } from '@/lib/partners-data';

// ─── Types ────────────────────────────────────────────────────────────────────

type TicketStatus = 'available' | 'soon' | 'soldout' | 'matchcentre';
type FormResult  = 'W' | 'D' | 'L';



// ─── Style constants ──────────────────────────────────────────────────────────

const STRIPE_BG = {
  backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)',
  backgroundSize:  '20px 20px',
};

const RESULT_META: Record<FormResult, { label: string; colour: string; ring: string }> = {
  W: { label: 'WIN',  colour: 'text-emerald-600', ring: 'bg-emerald-500' },
  D: { label: 'DRAW', colour: 'text-amber-500',   ring: 'bg-amber-400'   },
  L: { label: 'LOSS', colour: 'text-red-600',      ring: 'bg-red-500'     },
};

const TICKET_META: Record<TicketStatus, { label: string; pillCls: string; btnLabel: string; btnCls: string }> = {
  available:   { label: '🎫 Tickets Available', pillCls: 'bg-emerald-100 text-emerald-700 border-emerald-200', btnLabel: 'Buy Tickets',  btnCls: 'bg-red-600 hover:bg-red-500 text-white' },
  soon:        { label: '🔜 Tickets Soon',       pillCls: 'bg-amber-100  text-amber-700  border-amber-200',   btnLabel: 'Notify Me',   btnCls: 'bg-gray-700 hover:bg-gray-600 text-white' },
  soldout:     { label: '❌ Sold Out',            pillCls: 'bg-red-100    text-red-700    border-red-200',     btnLabel: 'Join Waitlist', btnCls: 'bg-gray-700 hover:bg-gray-600 text-white' },
  matchcentre: { label: '📺 Watch Live',          pillCls: 'bg-blue-100   text-blue-700   border-blue-200',   btnLabel: 'Match Centre', btnCls: 'bg-gray-900 hover:bg-gray-800 text-white' },
};

// ─── Shared helpers ───────────────────────────────────────────────────────────


function OpponentBadge({ abbr, img, size = 'md' }: { abbr: string; img?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'sm' ? 'w-10 h-10 text-xs' : size === 'lg' ? 'w-20 h-20 lg:w-24 lg:h-24 text-sm lg:text-base' : 'w-14 h-14 text-sm';
  return (
    <div className={`${sz} rounded-full bg-white border-2 border-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden`}>
      {img
        ? <img src={img} alt={abbr} className="w-full h-full object-contain p-1" />
        : <span className="font-black text-gray-400">{abbr}</span>
      }
    </div>
  );
}

// ─── Countdown ────────────────────────────────────────────────────────────────

function useCountdown(isoDate: string, kickoffTime: string): string {
  const target = new Date(`${isoDate}T${kickoffTime}:00+02:00`).getTime();
  const [diff, setDiff] = useState(target - Date.now());
  useEffect(() => {
    const id = setInterval(() => setDiff(target - Date.now()), 60_000);
    return () => clearInterval(id);
  }, [target]);
  if (diff <= 0) return 'Kick off!';
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

// ─── NextMatchPanel ───────────────────────────────────────────────────────────

function NextMatchPanel({ match }: { match: Match }) {
  const navigate    = useNavigate();
  const tsgHome     = isTsgHome(match);
  const opponent    = getOpponent(match);
  const ticketStatus: TicketStatus = match.ticketUrl ? 'available' : 'matchcentre';
  const ticket      = TICKET_META[ticketStatus];
  const countdown   = useCountdown(match.date, match.kickoffTime);
  const dateLabel   = new Date(match.date).toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const venue       = match.venue ?? (tsgHome ? 'Mbombela Stadium' : 'Away');

  return (
    <div className="relative" style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.28))' }}>

      {/* ══ TOP HALF: stadium photo ══════════════════════════════════════════ */}
      <div className="bg-white rounded-t-2xl overflow-hidden border border-white/10 border-b-0">
        <div className="relative h-[160px] lg:h-[180px] overflow-hidden rounded-t-2xl">
          <img
            src={THE_CLUB_IMAGES.stadium01}
            alt="Mbombela Stadium"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80" />

          <div className="absolute top-0 inset-x-0 bg-red-600/90 px-4 py-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse flex-shrink-0" aria-hidden="true" />
              <span className="text-white font-black text-[11px] uppercase tracking-widest">Next Match</span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${ticket.pillCls} flex-shrink-0`}>
              {ticket.label}
            </span>
          </div>

          <div className="absolute bottom-0 inset-x-0 px-4 pb-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">
                {match.competitionShort}
              </span>
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${tsgHome ? 'bg-red-600 text-white' : 'bg-white/20 text-white'}`}>
                {tsgHome ? 'Home' : 'Away'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-white text-[11px] font-bold">
              <Clock className="w-3 h-3 text-white/70 flex-shrink-0" aria-hidden="true" />
              <span>{dateLabel} · {match.kickoffTime} SAST</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/80 text-[11px] font-semibold">
              <MapPin className="w-3 h-3 text-white/60 flex-shrink-0" aria-hidden="true" />
              <span>{venue}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex items-center bg-white" style={{ margin: '0 -1px', zIndex: 10 }}>
        <div className="w-5 h-5 rounded-full bg-white lg:bg-gray-950 flex-shrink-0 -ml-2.5" aria-hidden="true" />
        <div className="flex-1 border-t-2 border-dashed border-gray-200" aria-hidden="true" />
        <div className="w-5 h-5 rounded-full bg-white lg:bg-gray-950 flex-shrink-0 -mr-2.5" aria-hidden="true" />
      </div>

      <div className="bg-white rounded-b-2xl border border-white/10 border-t-0">
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center justify-between gap-1">
            <div className="flex-1 flex flex-col items-center gap-1">
              <img src={LOGO.favicon.png128} alt="TS Galaxy FC" className="w-12 h-12 lg:w-14 lg:h-14 object-contain drop-shadow-sm" />
              <p className="font-black text-[11px] text-center text-gray-900 leading-tight">TS Galaxy FC</p>
              <p className="text-[9px] text-gray-400">{tsgHome ? 'Home' : 'Away'}</p>
            </div>

            <div className="flex flex-col items-center gap-0.5 px-1 flex-shrink-0">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Kickoff</span>
              <span className="text-xl lg:text-2xl font-black text-gray-200 leading-none">VS</span>
              <span className="text-base font-black text-gray-800 leading-none">{match.kickoffTime}</span>
              <span className="text-[10px] font-bold text-red-500 mt-0.5">{countdown}</span>
            </div>

            <div className="flex-1 flex flex-col items-center gap-1">
              <OpponentBadge abbr={opponent.shortName} img={opponent.badge} size="md" />
              <p className="font-black text-[11px] text-center text-gray-900 leading-tight">{opponent.name}</p>
              <p className="text-[9px] text-gray-400">{tsgHome ? 'Away' : 'Home'}</p>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4 pt-1">
          <button
            onClick={() => match.ticketUrl ? window.open(match.ticketUrl, '_blank') : navigate('/fixtures')}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-colors active:scale-[0.98] ${ticket.btnCls}`}
            aria-label={`${ticket.btnLabel} for TS Galaxy FC vs ${opponent.name}`}
          >
            <Ticket className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            {ticket.btnLabel}
          </button>
        </div>

        <div className="border-t border-gray-100 px-4 py-2.5 flex items-center justify-center">
          <button
            onClick={() => navigate('/fixtures')}
            className="text-red-600 text-xs font-bold flex items-center gap-1 hover:gap-1.5 transition-all"
          >
            View all fixtures
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── QuickActionChips ─────────────────────────────────────────────────────────
// Mobile-only row of fast-access navigation shortcuts.

function QuickActionChips() {
  const navigate = useNavigate();

  const chips = [
    { label: 'Fixtures',   Icon: Calendar,     path: '/fixtures',   accent: false },
    { label: 'Results',    Icon: Star,          path: '/fixtures',   accent: false },
    { label: 'Shop',       Icon: ShoppingBag,   path: '/shop',       accent: false },
    { label: 'Membership', Icon: CreditCard,    path: '/membership', accent: false },
  ];

  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide" role="list" aria-label="Quick navigation">
      {chips.map(({ label, Icon, path }) => (
        <button
          key={label}
          role="listitem"
          onClick={() => navigate(path)}
          className="flex-shrink-0 flex flex-col items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-red-300 hover:shadow-sm transition-all min-w-[72px]"
          aria-label={`Go to ${label}`}
        >
          <Icon className="w-5 h-5 text-red-600" aria-hidden="true" />
          <span className="text-[11px] font-bold text-gray-700 whitespace-nowrap">{label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── UpcomingFixtures ─────────────────────────────────────────────────────────
// Horizontal scroll on mobile, 3-column grid on desktop.

function FixtureCard({ match }: { match: Match }) {
  const tsgHome     = isTsgHome(match);
  const opponent    = getOpponent(match);
  const ticketStatus: TicketStatus = match.ticketUrl ? 'available' : 'matchcentre';
  const ticket      = TICKET_META[ticketStatus];
  const dateLabel   = new Date(match.date).toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <article
      className="flex-shrink-0 w-64 lg:w-auto snap-start bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      aria-label={`TS Galaxy FC vs ${opponent.name}, ${dateLabel}`}
    >
      <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-400" aria-hidden="true" />

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{match.competitionShort}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tsgHome ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
            {tsgHome ? 'Home' : 'Away'}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <img src={LOGO.favicon.png48} alt="TS Galaxy FC" className="w-10 h-10 object-contain flex-shrink-0" width={40} height={40} />
          <div className="flex-1 min-w-0">
            <p className="font-black text-sm text-gray-900 leading-tight">TS Galaxy FC</p>
            <p className="text-xs text-gray-400">vs {opponent.name}</p>
          </div>
          <OpponentBadge abbr={opponent.shortName} img={opponent.badge} size="sm" />
        </div>

        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <Clock className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            <span>{dateLabel} &bull; {match.kickoffTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{match.venue ?? (tsgHome ? 'Mbombela Stadium' : 'Away')}</span>
          </div>
        </div>

        <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border mb-3 ${ticket.pillCls}`}>
          {ticket.label}
        </span>

        <button
          onClick={() => match.ticketUrl ? window.open(match.ticketUrl, '_blank') : undefined}
          className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs transition-colors ${ticket.btnCls}`}
          aria-label={`${ticket.btnLabel} – TS Galaxy vs ${opponent.name}`}
        >
          <Ticket className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
          {ticket.btnLabel}
        </button>
      </div>
    </article>
  );
}

function UpcomingFixtures() {
  const navigate = useNavigate();

  return (
    <section aria-labelledby="fixtures-heading">
      <div className="flex items-start justify-between mb-4 lg:mb-5">
        <div>
          <h2 id="fixtures-heading" className="font-black text-xl lg:text-3xl text-gray-900 tracking-tight">
            Upcoming Fixtures
          </h2>
          <p className="text-xs lg:text-sm text-gray-500 mt-0.5">Never miss a Rockets match.</p>
        </div>
        <button
          onClick={() => navigate('/fixtures')}
          className="flex items-center gap-1 text-red-600 text-sm font-bold hover:gap-1.5 transition-all flex-shrink-0 mt-1"
          aria-label="View full fixtures list"
        >
          View Full Fixtures
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      <div
        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-visible lg:snap-none scrollbar-hide"
        aria-label="Upcoming fixtures list"
      >
        {upcomingMatches.map((match) => (
          <FixtureCard key={match.id} match={match} />
        ))}
      </div>
    </section>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────────────────

export function HomePage() {
  const navigate = useNavigate();

  // Derive last result display values from shared data
  const tsgHomeInLast = latestResult ? isTsgHome(latestResult) : true;
  const lastOpponent  = latestResult ? getOpponent(latestResult) : null;
  const tsgScore      = latestResult ? (tsgHomeInLast ? latestResult.homeScore! : latestResult.awayScore!) : 0;
  const oppScore      = latestResult ? (tsgHomeInLast ? latestResult.awayScore! : latestResult.homeScore!) : 0;
  const lastResult    = latestResult?.resultState === 'win' ? 'W' : latestResult?.resultState === 'draw' ? 'D' : 'L';
  const rm = RESULT_META[lastResult as FormResult];

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          HERO — two-column on desktop, compact on mobile
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative bg-gray-950 text-white overflow-hidden"
        aria-label="Welcome to TS Galaxy FC"
      >
        {/* ── Background: Mbombela Stadium floodlit nighttime ── */}
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={THE_CLUB_IMAGES.stadium02}
            alt=""
            className="w-full h-full object-cover object-[center_35%]"
          />
          {/* Base darkening — keeps image visible but controlled */}
          <div className="absolute inset-0 bg-gray-950/60" />
          {/* Left-to-right gradient — text stays darkest, ticket card area lighter */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/55 to-gray-950/20" />
          {/* Bottom vignette — anchors the section */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
        </div>

        {/* Stripe texture — very subtle over image */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={STRIPE_BG} aria-hidden="true" />

        {/* Red accent glow — bottom right */}
        <div className="absolute -bottom-40 right-1/3 w-[600px] h-[600px] bg-red-700 rounded-full blur-[140px] opacity-[0.18] pointer-events-none" aria-hidden="true" />

        {/* Badge watermark */}
        <img
          src={LOGO.favicon.png256}
          alt=""
          aria-hidden="true"
          className="absolute right-6 top-1/2 -translate-y-1/2 w-56 h-56 lg:w-80 lg:h-80 opacity-[0.06] pointer-events-none select-none"
        />

        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-10 py-8 lg:py-14 xl:py-16">

            {/* ── LEFT: Identity & CTAs ── */}
            <div className="flex-1 min-w-0 pb-6 lg:pb-0">

              {/* Season pill */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" aria-hidden="true" />
                <span className="text-[11px] font-black tracking-widest text-gray-200 uppercase">
                  2025/26 Betway Premiership Season
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-tight mb-3 lg:mb-4">
                <span className="block">The Rockets.</span>
                <span className="block text-red-400">Matchday starts here.</span>
              </h2>

              {/* Subtext – hidden on mobile to keep next match high */}
              <p className="hidden lg:block text-gray-300 text-base xl:text-lg leading-relaxed mb-6 max-w-lg">
                Fixtures, results, tickets, news, membership and official merchandise —
                all in one place.
              </p>

              {/* Desktop secondary CTAs (main CTA is in the panel) */}
              <div className="hidden lg:flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/shop')}
                  className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Shop Official Kit
                </button>
                <button
                  onClick={() => navigate('/membership')}
                  className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Join Membership
                </button>
              </div>

              {/* Mobile single CTA – leads straight to fixtures */}
              <div className="flex gap-3 lg:hidden mt-4">
                <button
                  onClick={() => navigate('/fixtures')}
                  className="bg-red-600 text-white px-5 py-3 rounded-xl font-black text-sm hover:bg-red-500 transition-colors"
                >
                  View Fixtures
                </button>
                <button
                  onClick={() => navigate('/fixtures')}
                  className="bg-white/10 text-white px-5 py-3 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Fixtures
                </button>
              </div>
            </div>

            {/* ── RIGHT: NextMatchPanel — desktop only (inside hero) ── */}
            {nextMatch && (
              <div
                className="hidden lg:block w-[380px] xl:w-[420px] flex-shrink-0"
                aria-label="Next match panel"
              >
                <NextMatchPanel match={nextMatch} />
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE: NextMatchPanel — immediately below hero
          ══════════════════════════════════════════════════════════════ */}
      {nextMatch && (
        <div className="lg:hidden container mx-auto px-4 mt-4" aria-label="Next match panel">
          <NextMatchPanel match={nextMatch} />
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          MOBILE: Quick action chips
          ══════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden container mx-auto px-4 mt-4">
        <QuickActionChips />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MATCHDAY SNAPSHOT — Last result · Position · Points · Tickets
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-5 lg:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
        aria-label="Club statistics"
      >
        {/* ── Card 1: Last Result — dark mini scoreboard ── */}
        <div
          className="relative rounded-xl overflow-hidden shadow-md"
          style={{ background: 'linear-gradient(135deg, #111827 0%, #1f0a0a 60%, #7f1d1d 100%)' }}
        >
          {/* Red top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-600" />

          {/* Badge watermark */}
          <img
            src={LOGO.badge}
            alt=""
            aria-hidden="true"
            className="absolute -right-4 -bottom-4 w-24 h-24 opacity-[0.07] pointer-events-none select-none"
          />

          <div className="relative p-4 lg:p-5">
            {/* Label row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-black text-red-400 uppercase tracking-widest flex items-center gap-1">
                <Trophy className="w-2.5 h-2.5" aria-hidden="true" />
                Last Result
              </span>
              {/* Full Time pill */}
              <span className="text-[9px] font-bold text-gray-400 bg-white/10 px-1.5 py-0.5 rounded-full">Full Time</span>
            </div>

            {/* Scoreline */}
            <div className="space-y-1.5 mb-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-white/90 truncate leading-tight">TS Galaxy</span>
                <span className={`text-2xl font-black flex-shrink-0 leading-none ${rm.colour}`}>{tsgScore}</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-white/60 truncate leading-tight">{lastOpponent?.shortName ?? '—'}</span>
                <span className="text-2xl font-black text-white/30 flex-shrink-0 leading-none">{oppScore}</span>
              </div>
            </div>

            {/* Result badge */}
            <span
              className={`inline-flex items-center text-[10px] font-black px-2 py-0.5 rounded-full ${
                lastResult === 'W'
                  ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40'
                  : lastResult === 'D'
                  ? 'bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/40'
                  : 'bg-red-500/20 text-red-400 ring-1 ring-red-500/40'
              }`}
            >
              {rm.label}
            </span>
          </div>
        </div>

        {/* ── Card 2: League Position — premium light stat card ── */}
        <div className="relative bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          {/* Red left accent bar */}
          <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-red-600 rounded-l-xl" />

          {/* Badge watermark */}
          <img
            src={LOGO.badge}
            alt=""
            aria-hidden="true"
            className="absolute -right-3 -bottom-3 w-20 h-20 opacity-[0.05] pointer-events-none select-none"
          />

          <div className="relative pl-5 pr-4 py-4 lg:py-5 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <BarChart2 className="w-2.5 h-2.5 text-red-400" aria-hidden="true" />
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">League Position</span>
            </div>

            <div className="flex items-end justify-center gap-0.5 my-1.5">
              <span className="text-4xl lg:text-5xl font-black text-red-600 leading-none">{tsGalaxyStanding.position}</span>
              <span className="text-sm font-black text-red-400 mb-1">
                {tsGalaxyStanding.position === 1 ? 'st' : tsGalaxyStanding.position === 2 ? 'nd' : tsGalaxyStanding.position === 3 ? 'rd' : 'th'}
              </span>
            </div>

            <p className="text-[10px] font-semibold text-gray-500">Betway Premiership</p>

            <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              <span className="text-[9px] text-gray-400">Current standing</span>
            </div>
          </div>
        </div>

        {/* ── Card 3: Points + Form — desktop only, premium form tracker ── */}
        <div className="hidden lg:block relative bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          {/* Red top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-600" />

          {/* Subtle pitch-line stripe pattern */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 18px, #000 18px, #000 19px)' }}
            aria-hidden="true"
          />

          {/* Badge watermark */}
          <img
            src={LOGO.badge}
            alt=""
            aria-hidden="true"
            className="absolute -right-3 -bottom-3 w-20 h-20 opacity-[0.05] pointer-events-none select-none"
          />

          <div className="relative p-5">
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="w-2.5 h-2.5 text-red-400" aria-hidden="true" />
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Points</span>
            </div>

            <p className="text-5xl font-black text-gray-900 leading-none mt-1 mb-1">{tsGalaxyStanding.points}</p>
            <p className="text-[10px] text-gray-400 mb-3">After {tsGalaxyStanding.played} games</p>

            <div className="pt-2 border-t border-gray-100">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Recent Form</p>
              <div className="flex gap-1.5" aria-label="Recent form">
                {(tsGalaxyStanding.form ?? []).map((r, i) => (
                  <span
                    key={i}
                    aria-label={r === 'W' ? 'Win' : r === 'D' ? 'Draw' : 'Loss'}
                    className={`w-6 h-6 rounded-md text-[10px] font-black flex items-center justify-center text-white shadow-sm ${RESULT_META[r as FormResult].ring}`}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tickets CTA card — desktop only */}
        <div className="hidden lg:flex flex-col bg-gradient-to-br from-red-600 to-red-700 rounded-xl shadow-sm p-5 items-center justify-center text-center">
          <Ticket className="w-7 h-7 text-white/70 mb-2" aria-hidden="true" />
          <p className="font-black text-white text-base leading-tight">Secure your seat</p>
          <p className="text-red-200 text-xs mt-0.5 mb-3">Official match tickets</p>
          <button
            className="w-full bg-white text-red-600 py-2 rounded-lg font-black text-sm hover:bg-red-50 transition-colors"
            aria-label="Buy tickets for the next match"
          >
            Buy Tickets
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          UPCOMING FIXTURES STRIP
          ══════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 mt-8 lg:mt-14">
        <UpcomingFixtures />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          LATEST NEWS
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-8 lg:mt-14"
        aria-labelledby="news-heading"
      >
        <div className="flex items-center justify-between mb-5 lg:mb-6">
          <h2 id="news-heading" className="font-black text-xl lg:text-3xl text-gray-900 tracking-tight">
            Latest News
          </h2>
          <button
            onClick={() => navigate('/news')}
            className="text-red-600 text-sm font-bold flex items-center gap-1 hover:gap-1.5 transition-all"
            aria-label="View all news articles"
          >
            View All <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop: featured left + 2 stacked compact right */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-5">
          <FeaturedNewsCard article={featuredNewsArticle} />
          <div className="flex flex-col gap-5">
            {homeNewsArticles.slice(1).map(article => (
              <NewsCardCompact key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Mobile: all 3 as compact cards */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {homeNewsArticles.map(article => (
            <NewsCardCompact key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          OFFICIAL SHOP
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-8 lg:mt-14"
        aria-labelledby="shop-heading"
      >
        <div className="flex items-center justify-between mb-5 lg:mb-6">
          <div>
            <h2 id="shop-heading" className="font-black text-xl lg:text-3xl text-gray-900 tracking-tight">
              Official Shop
            </h2>
            <p className="text-[11px] text-gray-500 mt-0.5">Authentic TS Galaxy FC merchandise</p>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="text-red-600 text-sm font-bold flex items-center gap-1 hover:gap-1.5 transition-all"
            aria-label="View all shop products"
          >
            Shop All <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {HOME_PRODUCTS.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => navigate(`/shop/${product.slug}`)}
              aria-label={`${product.name} – ${product.priceLabel}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-3 lg:p-4">
                <p className="font-bold text-xs lg:text-sm text-gray-900 leading-tight mb-1">{product.name}</p>
                <p className="text-red-600 font-black text-base lg:text-xl">{product.priceLabel}</p>
                <button className="w-full bg-gray-900 text-white text-xs lg:text-sm font-bold py-2 lg:py-2.5 rounded-xl mt-3 hover:bg-red-600 transition-colors">
                  View Product
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          MEMBERSHIP BANNER
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-8 lg:mt-14"
        aria-labelledby="membership-heading"
      >
        <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 text-white rounded-2xl p-6 lg:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={STRIPE_BG} aria-hidden="true" />
          <div className="absolute top-0 right-1/3 w-64 h-64 bg-red-600 rounded-full blur-3xl opacity-10 pointer-events-none" aria-hidden="true" />
          <img
            src={LOGO.favicon.png256}
            alt=""
            aria-hidden="true"
            className="absolute right-6 top-1/2 -translate-y-1/2 w-32 h-32 lg:w-52 lg:h-52 opacity-[0.08] pointer-events-none select-none"
          />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1 max-w-lg">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span className="text-[11px] font-black text-amber-400 uppercase tracking-widest">Rockets Membership</span>
              </div>
              <h2 id="membership-heading" className="font-black text-2xl lg:text-4xl leading-tight mb-2">
                Become a Rockets Supporter
              </h2>
              <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                Join the TS Galaxy family and get exclusive benefits — priority tickets,
                member discounts, behind-the-scenes access and more.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0 w-full sm:w-auto lg:w-auto">
              <button
                onClick={() => navigate('/membership')}
                className="bg-red-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-red-500 transition-colors"
              >
                Join Membership
              </button>
              <button
                onClick={() => navigate('/membership')}
                className="bg-white/10 text-white px-7 py-3.5 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TS GALAXY QUEENS & ACADEMY
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-8 lg:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5"
        aria-label="TS Galaxy Queens and Academy"
      >
        <article
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
          onClick={() => navigate('/queens')}
          aria-label="TS Galaxy Queens"
        >
          <div className="relative h-44 lg:h-56 overflow-hidden">
            <img src={QUEENS_IMAGES.teamPhoto} alt="TS Galaxy Queens squad" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1 rounded-full border border-white/30 uppercase tracking-widest">
              Women's Team
            </span>
          </div>
          <div className="p-5">
            <h3 className="font-black text-lg mb-1 text-gray-900">TS Galaxy Queens</h3>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              Follow our women's team competing in the Hollywoodbets Super League.
            </p>
            <span className="text-red-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              View Queens Team <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
        </article>

        <article
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
          onClick={() => navigate('/academy')}
          aria-label="TS Galaxy Academy"
        >
          <div className="relative h-44 lg:h-56 overflow-hidden">
            <img src={ACADEMY_IMAGES.hero} alt="TS Galaxy Academy players" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1 rounded-full border border-white/30 uppercase tracking-widest">
              Youth Development
            </span>
          </div>
          <div className="p-5">
            <h3 className="font-black text-lg mb-1 text-gray-900">TS Galaxy Academy</h3>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              Developing the next generation of talent in Mpumalanga. Trials now open.
            </p>
            <span
              className="text-red-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
              aria-label="Apply for TS Galaxy Academy trials"
            >
              Apply for Trials <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
        </article>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PARTNERS
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-8 lg:mt-14"
        aria-labelledby="partners-heading"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 id="partners-heading" className="font-black text-xl lg:text-3xl text-gray-900 tracking-tight">Our Partners</h2>
            <p className="text-[11px] text-gray-500 mt-0.5">Proud commercial partners of TS Galaxy FC</p>
          </div>
          <button
            onClick={() => navigate('/partners')}
            className="text-red-600 text-sm font-bold flex items-center gap-1 hover:gap-1.5 transition-all"
            aria-label="View all partners"
          >
            View All <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
          {PARTNERS.map(partner => (
            <div
              key={partner.id}
              className="bg-white rounded-xl border border-gray-100 p-3 flex items-center justify-center h-20 hover:shadow-md hover:border-gray-200 transition-all"
              aria-label={partner.name}
            >
              {partner.logo
                ? <img src={partner.logo} alt={partner.name} className="max-h-12 max-w-full object-contain" />
                : <span className="text-gray-400 text-[10px] font-bold text-center leading-tight">{partner.name}</span>
              }
            </div>
          ))}
        </div>

        <div className="mt-4 bg-gray-50 rounded-2xl border border-gray-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-sm text-gray-900">Become a Partner</p>
            <p className="text-xs text-gray-500 mt-0.5">Align your brand with The Rockets across Mpumalanga.</p>
          </div>
          <button
            onClick={() => navigate('/partners')}
            className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors flex-shrink-0"
          >
            Partner With Us
          </button>
        </div>
      </section>

      {/* Mobile nav clearance */}
      <div className="h-8 lg:h-12" aria-hidden="true" />
    </>
  );
}
