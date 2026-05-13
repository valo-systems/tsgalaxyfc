import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ChevronRight, MapPin, Clock, Ticket,
  Trophy, Calendar, ShoppingBag, CreditCard, Rocket, Star,
} from 'lucide-react';
import { LOGO, THE_CLUB_IMAGES } from '@/lib/assets';
import {
  MATCHES, upcomingMatches, completedMatches, nextMatch, latestResult,
  isTsgHome, getOpponent,
  type Match, type TeamRef,
} from '@/lib/matches-data';
import {
  STANDINGS, tsGalaxyStanding,
  type StandingRow, type FormResult,
} from '@/lib/standings-data';

// ─── Style constants ──────────────────────────────────────────────────────────

const STRIPE_BG = {
  backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)',
  backgroundSize: '20px 20px',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-ZA', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });
}

function fmtDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-ZA', {
    weekday: 'short', day: 'numeric', month: 'short',
  });
}

const RESULT_META = {
  win:  { label: 'WIN',  cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  draw: { label: 'DRAW', cls: 'bg-amber-50  text-amber-700  border-amber-200',   dot: 'bg-amber-400'  },
  loss: { label: 'LOSS', cls: 'bg-gray-100  text-gray-600   border-gray-200',    dot: 'bg-gray-400'   },
} as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function TeamBadge({ team, size = 'md' }: { team: TeamRef; size?: 'sm' | 'md' | 'lg' }) {
  const dim = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14' : 'w-10 h-10';
  const txt = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-sm' : 'text-[10px]';
  if (team.badge) {
    return (
      <img
        src={team.badge}
        alt={team.name}
        className={`${dim} object-contain flex-shrink-0`}
      />
    );
  }
  return (
    <div className={`${dim} rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0`}>
      <span className={`font-black ${txt} text-gray-600`}>{team.shortName?.slice(0, 3)}</span>
    </div>
  );
}

function FormDot({ result }: { result: FormResult }) {
  const cls = result === 'W'
    ? 'bg-emerald-500 text-white'
    : result === 'D'
    ? 'bg-amber-400 text-white'
    : 'bg-gray-300 text-gray-600';
  return (
    <span className={`w-5 h-5 rounded-full ${cls} flex items-center justify-center text-[9px] font-black flex-shrink-0`}>
      {result}
    </span>
  );
}

// ─── Fixture card ─────────────────────────────────────────────────────────────

function FixtureCard({ match, highlight }: { match: Match; highlight?: boolean }) {
  const navigate = useNavigate();
  const isHome = isTsgHome(match);

  return (
    <article
      className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-shadow hover:shadow-md cursor-pointer ${
        highlight ? 'border-red-200' : 'border-gray-100'
      }`}
      onClick={() => navigate(`/match/${match.id}`)}
      aria-label={`${match.homeTeam.name} vs ${match.awayTeam.name}`}
    >
      {highlight && <div className="h-1 bg-red-600" aria-hidden="true" />}

      <div className="p-4 lg:p-5">
        {/* Top row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-red-600 uppercase tracking-wide">
              {match.competitionShort}
            </span>
            {isHome && (
              <span className="text-[9px] font-black bg-red-50 text-red-600 border border-red-200 px-1.5 py-0.5 rounded-full uppercase">
                Home
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <Clock className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            <span>{fmtDateShort(match.date)} · {match.kickoffTime}</span>
          </div>
        </div>

        {/* Teams */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
            <TeamBadge team={match.homeTeam} />
            <span className="text-xs font-black text-gray-900 text-center leading-tight line-clamp-1">
              {match.homeTeam.shortName ?? match.homeTeam.name}
            </span>
          </div>
          <div className="flex-shrink-0 text-center px-2">
            <span className="text-xs font-black text-gray-400 tracking-widest">VS</span>
          </div>
          <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
            <TeamBadge team={match.awayTeam} />
            <span className="text-xs font-black text-gray-900 text-center leading-tight line-clamp-1">
              {match.awayTeam.shortName ?? match.awayTeam.name}
            </span>
          </div>
        </div>

        {/* Venue */}
        {match.venue && (
          <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-3">
            <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{match.venue}</span>
          </div>
        )}

        {/* Broadcast */}
        {match.broadcastInfo && (
          <div className="text-[10px] text-gray-400 mb-3">
            Live: {match.broadcastInfo}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-gray-50">
          {match.ticketUrl ? (
            <a
              href={match.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1.5 bg-red-600 text-white text-xs font-black px-3 py-2 rounded-xl hover:bg-red-700 transition-colors"
            >
              <Ticket className="w-3 h-3" aria-hidden="true" /> Buy Tickets
            </a>
          ) : (
            <span className="flex-1 flex items-center justify-center text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
              Tickets TBC
            </span>
          )}
          <button
            className="flex items-center justify-center gap-1.5 bg-gray-900 text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-gray-700 transition-colors"
            onClick={e => { e.stopPropagation(); navigate(`/match/${match.id}`); }}
          >
            Match Centre <ChevronRight className="w-3 h-3" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Result card ──────────────────────────────────────────────────────────────

function ResultCard({ match }: { match: Match }) {
  const navigate = useNavigate();
  const meta = match.resultState ? RESULT_META[match.resultState] : null;

  return (
    <article
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/match/${match.id}`)}
      aria-label={`${match.homeTeam.name} ${match.homeScore ?? 0}–${match.awayScore ?? 0} ${match.awayTeam.name}`}
    >
      <div className="p-4 lg:p-5">
        {/* Top row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-wide">
              {match.competitionShort}
            </span>
            <span className="text-[9px] font-black bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full uppercase">
              Full Time
            </span>
          </div>
          {meta && (
            <span className={`text-[9px] font-black border px-2 py-0.5 rounded-full uppercase ${meta.cls}`}>
              {meta.label}
            </span>
          )}
        </div>

        {/* Score */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
            <TeamBadge team={match.homeTeam} />
            <span className="text-xs font-black text-gray-900 text-center leading-tight line-clamp-1">
              {match.homeTeam.shortName ?? match.homeTeam.name}
            </span>
          </div>
          <div className="flex-shrink-0 text-center px-1">
            <span className="text-2xl font-black text-gray-900 tabular-nums">
              {match.homeScore ?? 0}
            </span>
            <span className="text-gray-300 mx-0.5 font-bold">–</span>
            <span className="text-2xl font-black text-gray-400 tabular-nums">
              {match.awayScore ?? 0}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
            <TeamBadge team={match.awayTeam} />
            <span className="text-xs font-black text-gray-900 text-center leading-tight line-clamp-1">
              {match.awayTeam.shortName ?? match.awayTeam.name}
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-gray-400">{fmtDateShort(match.date)}</span>
            {match.venue && (
              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <MapPin className="w-2.5 h-2.5 flex-shrink-0" aria-hidden="true" />
                <span className="truncate max-w-[140px]">{match.venue}</span>
              </div>
            )}
          </div>
          {match.recapUrl && (
            <button
              className="text-red-600 text-xs font-bold flex items-center gap-0.5 hover:gap-1 transition-all"
              onClick={e => { e.stopPropagation(); navigate(match.recapUrl!); }}
            >
              Recap <ChevronRight className="w-3 h-3" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── Standing row (desktop) ───────────────────────────────────────────────────

function StandingTableRow({ row, expanded, onToggle }: {
  row: StandingRow;
  expanded: boolean;
  onToggle: () => void;
}) {
  const tsg = row.isTsGalaxy;
  return (
    <>
      <tr
        className={`border-b border-gray-100 transition-colors ${tsg ? 'bg-red-50 border-red-100' : 'hover:bg-gray-50'} cursor-pointer lg:cursor-default`}
        onClick={onToggle}
        aria-expanded={expanded}
      >
        <td className={`py-3 pl-4 pr-2 text-sm font-black tabular-nums w-8 ${tsg ? 'text-red-600' : 'text-gray-900'}`}>
          {row.position}
        </td>
        <td className="py-3 px-2">
          <div className="flex items-center gap-2.5">
            {row.club.badge
              ? <img src={row.club.badge} alt={row.club.name} className="w-6 h-6 object-contain flex-shrink-0" />
              : <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0" />
            }
            <span className={`text-sm font-${tsg ? 'black' : 'semibold'} ${tsg ? 'text-red-700' : 'text-gray-900'} whitespace-nowrap`}>
              {row.club.shortName ?? row.club.name}
            </span>
            {tsg && <span className="hidden lg:inline-block text-[9px] font-black bg-red-600 text-white px-1.5 py-0.5 rounded-full">YOU</span>}
          </div>
        </td>
        {/* Desktop cols */}
        <td className="hidden lg:table-cell py-3 px-2 text-sm text-center text-gray-600 tabular-nums">{row.played}</td>
        <td className="hidden lg:table-cell py-3 px-2 text-sm text-center text-gray-600 tabular-nums">{row.won}</td>
        <td className="hidden lg:table-cell py-3 px-2 text-sm text-center text-gray-600 tabular-nums">{row.drawn}</td>
        <td className="hidden lg:table-cell py-3 px-2 text-sm text-center text-gray-600 tabular-nums">{row.lost}</td>
        <td className="hidden lg:table-cell py-3 px-2 text-sm text-center text-gray-500 tabular-nums">{row.goalsFor}</td>
        <td className="hidden lg:table-cell py-3 px-2 text-sm text-center text-gray-500 tabular-nums">{row.goalsAgainst}</td>
        <td className={`hidden lg:table-cell py-3 px-2 text-sm text-center tabular-nums ${row.goalDifference > 0 ? 'text-emerald-600' : row.goalDifference < 0 ? 'text-red-500' : 'text-gray-500'}`}>
          {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
        </td>
        {/* Mobile: show Pts + GD */}
        <td className={`lg:hidden py-3 px-2 text-sm text-center tabular-nums ${row.goalDifference > 0 ? 'text-emerald-600' : row.goalDifference < 0 ? 'text-red-500' : 'text-gray-500'}`}>
          {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
        </td>
        <td className={`py-3 px-2 pr-4 text-sm text-center font-black tabular-nums ${tsg ? 'text-red-700' : 'text-gray-900'}`}>
          {row.points}
        </td>
        <td className="hidden lg:table-cell py-3 px-2 pr-4">
          <div className="flex items-center gap-1 justify-center">
            {(row.form ?? []).map((r, i) => <FormDot key={i} result={r} />)}
          </div>
        </td>
      </tr>
      {/* Mobile expanded row */}
      {expanded && (
        <tr className="lg:hidden bg-gray-50 border-b border-gray-100">
          <td colSpan={5} className="px-4 py-3">
            <div className="flex gap-4 text-xs text-gray-600">
              <span><span className="font-black text-gray-900">{row.played}</span> P</span>
              <span><span className="font-black text-emerald-700">{row.won}</span> W</span>
              <span><span className="font-black text-amber-600">{row.drawn}</span> D</span>
              <span><span className="font-black text-red-600">{row.lost}</span> L</span>
              <span className="text-gray-400">{row.goalsFor}:{row.goalsAgainst}</span>
            </div>
            {row.form && (
              <div className="flex items-center gap-1 mt-2">
                <span className="text-[10px] text-gray-400 mr-1">Form</span>
                {row.form.map((r, i) => <FormDot key={i} result={r} />)}
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

// ─── Tab constants ─────────────────────────────────────────────────────────────

type Tab = 'fixtures' | 'results' | 'log';
const TABS: { id: Tab; label: string }[] = [
  { id: 'fixtures', label: 'Fixtures'   },
  { id: 'results',  label: 'Results'    },
  { id: 'log',      label: 'Log Table'  },
];

const FIXTURE_FILTERS = [
  { id: 'all',  label: 'All'      },
  { id: 'home', label: 'Home'     },
  { id: 'away', label: 'Away'     },
  { id: 'prem', label: 'Betway Prem' },
  { id: 'cup',  label: 'Cup'      },
];

const RELATED_LINKS = [
  { label: 'Shop Official Kit',  sub: 'Wear the badge with pride.',               path: '/shop',       Icon: ShoppingBag },
  { label: 'Membership',         sub: 'Become an official Rockets supporter.',     path: '/membership', Icon: CreditCard  },
  { label: 'Academy',            sub: 'Youth development and pathways.',           path: '/academy',    Icon: Rocket      },
  { label: 'TS Galaxy Queens',   sub: "Follow the women's team.",                 path: '/queens',     Icon: Star        },
  { label: 'News',               sub: 'Match reports and club news.',              path: '/news',       Icon: Trophy      },
  { label: 'The Club',           sub: 'History, founder and stadium.',             path: '/the-club',   Icon: Calendar    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export function FixturesPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('fixtures');
  const [fixtureFilter, setFixtureFilter] = useState('all');
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  function toggleRow(pos: number) {
    setExpandedRows(prev => {
      const next = new Set(prev);
      next.has(pos) ? next.delete(pos) : next.add(pos);
      return next;
    });
  }

  const filteredFixtures = upcomingMatches.filter(m => {
    if (fixtureFilter === 'home') return isTsgHome(m);
    if (fixtureFilter === 'away') return !isTsgHome(m);
    if (fixtureFilter === 'prem') return m.competition.toLowerCase().includes('premiership') || m.competition.toLowerCase().includes('betway');
    if (fixtureFilter === 'cup')  return m.competition.toLowerCase().includes('cup');
    return true;
  });

  const tsgRow = tsGalaxyStanding;
  const nextOpponent = nextMatch ? getOpponent(nextMatch) : null;

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          §1  HERO
          ════════════════════════════════════════════════════════ */}
      <section
        className="relative bg-gray-950 text-white overflow-hidden"
        aria-label="Matches hub"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <img src={THE_CLUB_IMAGES.stadium03} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gray-950/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/55 to-gray-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={STRIPE_BG} aria-hidden="true" />
        <img
          src={LOGO.favicon.png256}
          alt=""
          aria-hidden="true"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-36 h-36 lg:w-56 lg:h-56 opacity-[0.05] pointer-events-none select-none"
        />

        <div className="relative container mx-auto px-4 lg:px-6 py-10 lg:py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" aria-hidden="true" />
              <span className="text-[11px] font-black tracking-widest text-gray-200 uppercase">Matches</span>
            </div>
            <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight mb-3">
              Fixtures, results<br />
              <span className="text-red-400">and log.</span>
            </h1>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed mb-6 max-w-lg">
              Follow every Rockets match, result and league position in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setTab('fixtures')}
                className="bg-red-600 text-white px-5 py-2.5 rounded-xl font-black text-sm hover:bg-red-500 transition-colors"
              >
                View Next Match
              </button>
              <button
                onClick={() => setTab('log')}
                className="bg-white/10 backdrop-blur text-white px-5 py-2.5 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors"
              >
                View Log Table
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          §2  MATCHDAY SUMMARY CARDS
          ════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-6 lg:mt-8"
        aria-label="Matchday summary"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">

          {/* Next match */}
          {nextMatch ? (
            <article
              className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1"
              onClick={() => navigate(`/match/${nextMatch.id}`)}
            >
              <div className="bg-red-600 px-4 py-2.5 flex items-center justify-between">
                <span className="text-white font-black text-[11px] uppercase tracking-widest">Next Match</span>
                <span className="text-red-200 text-[10px] font-bold">{nextMatch.competitionShort}</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
                    <TeamBadge team={nextMatch.homeTeam} size="lg" />
                    <span className="text-xs font-black text-center leading-tight line-clamp-1">
                      {nextMatch.homeTeam.shortName}
                    </span>
                  </div>
                  <div className="flex-shrink-0 text-center">
                    <p className="text-xs font-black text-gray-400 tracking-widest">VS</p>
                    <p className="text-[10px] text-gray-400 mt-1">{fmtDateShort(nextMatch.date)}</p>
                    <p className="text-[10px] font-black text-gray-700">{nextMatch.kickoffTime}</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
                    <TeamBadge team={nextMatch.awayTeam} size="lg" />
                    <span className="text-xs font-black text-center leading-tight line-clamp-1">
                      {nextMatch.awayTeam.shortName}
                    </span>
                  </div>
                </div>
                {nextMatch.venue && (
                  <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-3">
                    <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">{nextMatch.venue}</span>
                  </div>
                )}
                <div className="flex gap-2">
                  {nextMatch.ticketUrl && (
                    <a
                      href={nextMatch.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex-1 text-center bg-red-600 text-white text-xs font-black py-2 rounded-xl hover:bg-red-700 transition-colors"
                    >
                      Buy Tickets
                    </a>
                  )}
                  <button className="flex-1 text-center bg-gray-900 text-white text-xs font-bold py-2 rounded-xl hover:bg-gray-700 transition-colors">
                    Match Centre
                  </button>
                </div>
              </div>
            </article>
          ) : (
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 flex items-center justify-center text-gray-400 text-sm font-bold">
              No upcoming fixtures
            </div>
          )}

          {/* Latest result */}
          {latestResult ? (
            <article
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/match/${latestResult.id}`)}
            >
              <div className="bg-gray-900 px-4 py-2.5 flex items-center justify-between">
                <span className="text-white font-black text-[11px] uppercase tracking-widest">Latest Result</span>
                <span className="text-gray-400 text-[10px] font-bold">{latestResult.competitionShort}</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
                    <TeamBadge team={latestResult.homeTeam} />
                    <span className="text-[10px] font-black text-center line-clamp-1">
                      {latestResult.homeTeam.shortName}
                    </span>
                  </div>
                  <div className="flex-shrink-0 px-1 text-center">
                    <span className="text-2xl font-black text-gray-900 tabular-nums">{latestResult.homeScore}</span>
                    <span className="text-gray-300 mx-0.5">–</span>
                    <span className="text-2xl font-black text-gray-400 tabular-nums">{latestResult.awayScore}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
                    <TeamBadge team={latestResult.awayTeam} />
                    <span className="text-[10px] font-black text-center line-clamp-1">
                      {latestResult.awayTeam.shortName}
                    </span>
                  </div>
                </div>
                {latestResult.resultState && (
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className={`text-[10px] font-black border px-2.5 py-1 rounded-full ${RESULT_META[latestResult.resultState].cls}`}>
                      {RESULT_META[latestResult.resultState].label}
                    </span>
                    <span className="text-[10px] text-gray-400">{fmtDateShort(latestResult.date)}</span>
                  </div>
                )}
                {latestResult.recapUrl && (
                  <button
                    className="w-full text-center border border-gray-200 text-gray-700 text-xs font-bold py-2 rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={e => { e.stopPropagation(); navigate(latestResult.recapUrl!); }}
                  >
                    Read Recap
                  </button>
                )}
              </div>
            </article>
          ) : null}

          {/* Log position */}
          <article
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setTab('log')}
          >
            <div className="bg-gray-50 border-b border-gray-100 px-4 py-2.5 flex items-center justify-between">
              <span className="text-gray-700 font-black text-[11px] uppercase tracking-widest">Log Position</span>
              <span className="text-gray-400 text-[10px] font-bold">Betway Prem</span>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <img src={LOGO.badge} alt="TS Galaxy" className="w-10 h-10 object-contain flex-shrink-0" />
                <div>
                  <p className="font-black text-sm text-gray-900">TS Galaxy FC</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-2xl font-black text-red-600 leading-none">{tsgRow.position}</span>
                    <span className="text-xs text-gray-400 leading-tight">
                      th<br />
                      <span className="text-gray-500 font-bold">{tsgRow.points} pts</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                {[
                  { val: tsgRow.played, lbl: 'Played' },
                  { val: tsgRow.goalDifference > 0 ? `+${tsgRow.goalDifference}` : tsgRow.goalDifference, lbl: 'GD' },
                  { val: `${tsgRow.won}W ${tsgRow.drawn}D ${tsgRow.lost}L`, lbl: 'W/D/L' },
                ].map(({ val, lbl }) => (
                  <div key={lbl} className="bg-gray-50 rounded-xl py-2">
                    <p className="font-black text-sm text-gray-900">{val}</p>
                    <p className="text-[9px] text-gray-400 uppercase tracking-wide">{lbl}</p>
                  </div>
                ))}
              </div>
              {tsgRow.form && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-400 mr-0.5">Form</span>
                  {tsgRow.form.map((r, i) => <FormDot key={i} result={r} />)}
                </div>
              )}
            </div>
          </article>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          §3  TABS
          ════════════════════════════════════════════════════════ */}
      <div
        className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm mt-6 lg:mt-8"
        role="navigation"
        aria-label="Match hub sections"
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex gap-1 overflow-x-auto py-3" style={{ scrollbarWidth: 'none' }}>
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-pressed={tab === t.id}
                className={`flex-shrink-0 px-4 py-2 rounded-xl font-black text-sm transition-colors ${
                  tab === t.id
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          §4  FIXTURES
          ════════════════════════════════════════════════════════ */}
      {tab === 'fixtures' && (
        <section className="container mx-auto px-4 lg:px-6 mt-6 lg:mt-8" aria-labelledby="fixtures-heading">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 id="fixtures-heading" className="font-black text-xl lg:text-2xl text-gray-900 tracking-tight">
                Upcoming Fixtures
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Never miss a Rockets match.</p>
            </div>
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto mb-5 pb-0.5" style={{ scrollbarWidth: 'none' }}>
            {FIXTURE_FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setFixtureFilter(f.id)}
                aria-pressed={fixtureFilter === f.id}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full font-bold text-xs transition-colors ${
                  fixtureFilter === f.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filteredFixtures.length === 0 ? (
            <div className="py-12 text-center text-gray-400 font-bold text-sm">No fixtures match this filter.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              {filteredFixtures.map((m, i) => (
                <FixtureCard key={m.id} match={m} highlight={i === 0 && fixtureFilter === 'all'} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          §5  RESULTS
          ════════════════════════════════════════════════════════ */}
      {tab === 'results' && (
        <section className="container mx-auto px-4 lg:px-6 mt-6 lg:mt-8" aria-labelledby="results-heading">
          <div className="mb-5">
            <h2 id="results-heading" className="font-black text-xl lg:text-2xl text-gray-900 tracking-tight">
              Recent Results
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">{completedMatches.length} matches played this season.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {completedMatches.map(m => <ResultCard key={m.id} match={m} />)}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          §6  LOG TABLE
          ════════════════════════════════════════════════════════ */}
      {tab === 'log' && (
        <section className="container mx-auto px-4 lg:px-6 mt-6 lg:mt-8" aria-labelledby="log-heading">

          {/* TSG Snapshot */}
          <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 rounded-2xl p-5 mb-5 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={STRIPE_BG} aria-hidden="true" />
            <div className="relative flex items-center gap-4">
              <img src={LOGO.badge} alt="TS Galaxy FC" className="w-12 h-12 lg:w-16 lg:h-16 object-contain flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-black text-base lg:text-lg">TS Galaxy FC</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-black text-3xl text-red-400 leading-none">{tsgRow.position}</span>
                  <span className="text-gray-400 text-xs">th · {tsgRow.points} pts · GD {tsgRow.goalDifference > 0 ? `+${tsgRow.goalDifference}` : tsgRow.goalDifference}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs text-gray-400">
                <span>{tsgRow.played} played</span>
                <span className="text-emerald-400 font-bold">{tsgRow.won}W</span>
                <span className="text-amber-400 font-bold">{tsgRow.drawn}D</span>
                <span className="text-gray-500 font-bold">{tsgRow.lost}L</span>
              </div>
            </div>
            {tsgRow.form && (
              <div className="relative flex items-center gap-1.5 mt-3">
                <span className="text-[10px] text-gray-400 mr-0.5">Form</span>
                {tsgRow.form.map((r, i) => <FormDot key={i} result={r} />)}
              </div>
            )}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h2 id="log-heading" className="font-black text-base text-gray-900">Betway Premiership Log</h2>
              <span className="text-[10px] text-gray-400">Tap a row to expand · {STANDINGS.length} clubs shown</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[320px]" aria-label="Betway Premiership standings">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="py-2 pl-4 pr-2 text-[10px] font-black text-gray-400 text-left w-8">#</th>
                    <th className="py-2 px-2 text-[10px] font-black text-gray-400 text-left">Club</th>
                    {/* Desktop */}
                    <th className="hidden lg:table-cell py-2 px-2 text-[10px] font-black text-gray-400 text-center">P</th>
                    <th className="hidden lg:table-cell py-2 px-2 text-[10px] font-black text-gray-400 text-center">W</th>
                    <th className="hidden lg:table-cell py-2 px-2 text-[10px] font-black text-gray-400 text-center">D</th>
                    <th className="hidden lg:table-cell py-2 px-2 text-[10px] font-black text-gray-400 text-center">L</th>
                    <th className="hidden lg:table-cell py-2 px-2 text-[10px] font-black text-gray-400 text-center">GF</th>
                    <th className="hidden lg:table-cell py-2 px-2 text-[10px] font-black text-gray-400 text-center">GA</th>
                    {/* Mobile: just GD */}
                    <th className="lg:hidden py-2 px-2 text-[10px] font-black text-gray-400 text-center">GD</th>
                    <th className="hidden lg:table-cell py-2 px-2 text-[10px] font-black text-gray-400 text-center">GD</th>
                    <th className="py-2 px-2 pr-4 text-[10px] font-black text-gray-400 text-center">Pts</th>
                    <th className="hidden lg:table-cell py-2 px-2 pr-4 text-[10px] font-black text-gray-400 text-center">Form</th>
                  </tr>
                </thead>
                <tbody>
                  {STANDINGS.map(row => (
                    <StandingTableRow
                      key={row.position}
                      row={row}
                      expanded={expandedRows.has(row.position)}
                      onToggle={() => toggleRow(row.position)}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
              <p className="text-[10px] text-gray-400">
                Table data managed by club admin until API integration is enabled.
              </p>
              <p className="text-[10px] text-gray-400">12 clubs · 2025/26</p>
            </div>
          </div>

        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          §7  RELATED LINKS
          ════════════════════════════════════════════════════════ */}
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

      {/* Bottom clearance */}
      <div className="h-8 lg:h-12" aria-hidden="true" />
    </>
  );
}
