import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  ChevronRight, Search, Users, Shield, Rocket,
  Star, Calendar, ShoppingBag, BookOpen, Ticket,
} from 'lucide-react';
import { LOGO, THE_CLUB_IMAGES, QUEENS_IMAGES } from '@/lib/assets';
import { SQUAD, POSITION_FILTERS, countByPosition, type Player, type TeamId } from '@/lib/squad-data';

// ─── Style constants ──────────────────────────────────────────────────────────

const STRIPE_BG = {
  backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)',
  backgroundSize: '20px 20px',
};

// ─── Team config ──────────────────────────────────────────────────────────────

const TEAMS: { id: TeamId; label: string; short: string; Icon: typeof Users }[] = [
  { id: 'mens-first-team', label: "Men's First Team", short: 'First Team', Icon: Shield   },
  { id: 'queens',          label: 'TS Galaxy Queens', short: 'Queens',     Icon: Star     },
  { id: 'technical-team',  label: 'Technical Team',   short: 'Staff',      Icon: Users    },
  { id: 'academy',         label: 'Academy',          short: 'Academy',    Icon: Rocket   },
];

// ─── Related links ────────────────────────────────────────────────────────────

const RELATED = [
  { label: 'Fixtures',   sub: 'See when The Rockets play next.',          path: '/fixtures',   Icon: Calendar    },
  { label: 'News',       sub: 'Latest squad and match updates.',           path: '/news',       Icon: BookOpen    },
  { label: 'Shop Kit',   sub: 'Wear the official kit.',                    path: '/shop',       Icon: ShoppingBag },
  { label: 'Academy',    sub: 'Follow the next generation.',               path: '/academy',    Icon: Rocket      },
  { label: 'Membership', sub: 'Get closer to the club.',                   path: '/membership', Icon: Ticket      },
];

// ─── PlayerCard ───────────────────────────────────────────────────────────────

function PlayerCard({ player }: { player: Player }) {
  const navigate = useNavigate();
  return (
    <article
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col"
      onClick={() => navigate(`/squad/${player.slug}`)}
      aria-label={`TS Galaxy FC player ${player.name}`}
    >
      {/* Image area */}
      <div className="relative bg-gray-50 overflow-hidden flex-shrink-0" style={{ aspectRatio: '3/4' }}>
        <img
          src={player.image}
          alt={`TS Galaxy FC player ${player.name}`}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {/* Bottom gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {/* Squad number badge */}
        <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
          <span className="text-sm font-black leading-none">{player.squadNumber}</span>
        </div>
        {/* Position chip bottom-right */}
        <span className="absolute bottom-3 right-3 text-[10px] font-black uppercase tracking-widest bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full">
          {player.position === 'Goalkeeper' ? 'GK' : player.position === 'Defender' ? 'DEF' : player.position === 'Midfielder' ? 'MID' : 'FWD'}
        </span>
        {/* Subtle badge watermark */}
        <img
          src={LOGO.favicon.png64}
          alt=""
          aria-hidden="true"
          className="absolute right-3 top-3 w-6 h-6 opacity-20 pointer-events-none select-none"
        />
      </div>

      {/* Info area */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-black text-sm lg:text-base leading-tight text-gray-900 group-hover:text-red-600 transition-colors mb-0.5">
          {player.name}
        </h3>
        <p className="text-xs text-gray-500 mb-3">{player.nationality}</p>
        <div className="mt-auto">
          <button
            className="w-full bg-gray-900 text-white text-xs font-black py-2.5 rounded-xl group-hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5"
            aria-label={`View profile of ${player.name}`}
          >
            View Profile
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── SpotlightCard ────────────────────────────────────────────────────────────

function SpotlightCard({ player }: { player: Player }) {
  const navigate = useNavigate();
  return (
    <div
      className="relative bg-gray-950 rounded-2xl overflow-hidden cursor-pointer group shadow-xl"
      onClick={() => navigate(`/squad/${player.slug}`)}
      aria-label={`Player Spotlight: ${player.name}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="relative h-72 lg:h-[340px] bg-gradient-to-br from-gray-900 to-red-950 overflow-hidden">
          <img
            src={player.image}
            alt={`TS Galaxy FC player ${player.name}`}
            className="w-full h-full object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-950/60 hidden lg:block" />
          <div className="absolute top-4 left-4 w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-xl">
            <span className="text-xl font-black text-white leading-none">{player.squadNumber}</span>
          </div>
        </div>

        {/* Text */}
        <div className="p-6 lg:p-8 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 mb-4 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" aria-hidden="true" />
            <span className="text-[10px] font-black tracking-widest text-gray-300 uppercase">Player Spotlight</span>
          </div>
          <h2 className="font-black text-2xl lg:text-3xl text-white leading-tight mb-1">
            {player.name}
          </h2>
          <p className="text-red-400 text-sm font-bold uppercase tracking-widest mb-3">{player.position}</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
            {player.bio ?? 'A key figure in The Rockets squad, bringing energy, discipline and commitment to the team.'}
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-5">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-gray-600" aria-hidden="true" />
              #{player.squadNumber}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-gray-600" aria-hidden="true" />
              {player.nationality}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-gray-600" aria-hidden="true" />
              TS Galaxy FC
            </span>
          </div>
          <button
            className="w-full lg:w-auto bg-red-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-red-500 transition-colors flex items-center justify-center lg:justify-start gap-2"
            aria-label={`View full profile of ${player.name}`}
          >
            View Full Profile
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Queens placeholder ───────────────────────────────────────────────────────

function QueensView() {
  const navigate = useNavigate();
  return (
    <div className="mt-8">
      <div className="relative bg-gradient-to-br from-gray-950 via-purple-950 to-gray-900 rounded-2xl overflow-hidden p-8 lg:p-12 text-white text-center shadow-xl mb-8">
        <div className="absolute inset-0 opacity-[0.04]" style={STRIPE_BG} aria-hidden="true" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 mb-5">
            <Star className="w-3 h-3 text-purple-300" aria-hidden="true" />
            <span className="text-[11px] font-black tracking-widest text-gray-200 uppercase">Women's Football</span>
          </div>
          <h2 className="font-black text-3xl lg:text-4xl mb-4">TS Galaxy Queens</h2>
          <p className="text-gray-300 text-sm lg:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Follow the women's team — fixtures, squad updates, match reports and official club news from TS Galaxy Queens.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            {[
              { label: 'Queens Fixtures',       Icon: Calendar    },
              { label: 'Queens News',            Icon: BookOpen    },
              { label: 'Squad Updates',          Icon: Users       },
              { label: 'Partnership Opps',       Icon: Star        },
            ].map(({ label, Icon }) => (
              <div key={label} className="bg-white/10 border border-white/15 rounded-xl p-4 flex flex-col items-center gap-2 text-center">
                <Icon className="w-5 h-5 text-purple-300" aria-hidden="true" />
                <span className="text-xs font-bold text-gray-200">{label}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/news')}
            className="bg-white text-gray-900 px-6 py-3 rounded-xl font-black text-sm hover:bg-gray-100 transition-colors"
          >
            Follow TS Galaxy Queens
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Technical Team placeholder ───────────────────────────────────────────────

function TechnicalView() {
  const roles = [
    { role: 'Head Coach',              desc: 'Leads all tactical and technical preparation for the first team.' },
    { role: 'Assistant Coach',         desc: 'Supports the head coach in training, analysis and matchday duties.' },
    { role: 'Goalkeeper Coach',        desc: 'Specialist training and development for the goalkeeping unit.' },
    { role: 'Fitness & Conditioning',  desc: 'Managing player fitness, load and recovery across the season.' },
    { role: 'Team Manager',            desc: 'Coordinating logistics, travel and squad administration.' },
    { role: 'Sports Analyst',          desc: 'Video analysis and performance data to support the coaching staff.' },
  ];
  return (
    <div className="mt-8">
      <div className="mb-6">
        <span className="text-[11px] font-black text-red-600 uppercase tracking-widest">Backroom Staff</span>
        <h2 className="font-black text-2xl lg:text-3xl text-gray-900 mt-1">Technical Team</h2>
        <p className="text-gray-500 text-sm mt-1 max-w-xl">
          The coaching and support staff behind The Rockets. Full staff profiles will be updated by the club.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map(({ role, desc }) => (
          <div key={role} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-gray-400" aria-hidden="true" />
            </div>
            <h3 className="font-black text-sm text-gray-900 mb-1">{role}</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">{desc}</p>
            <span className="inline-block text-[10px] font-bold text-gray-400 border border-gray-200 px-2.5 py-1 rounded-full">
              Profile to be updated
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Academy placeholder ─────────────────────────────────────────────────────

function AcademyView() {
  const navigate = useNavigate();
  const cards = [
    { label: 'Trials',              desc: 'Open trials for aspiring players across all age groups.',   Icon: Rocket   },
    { label: 'Age Groups',          desc: 'Under-13 through to senior professional prospects.',         Icon: Users    },
    { label: 'Development Pathway', desc: 'A structured route from grassroots to the first team.',     Icon: ChevronRight },
    { label: 'Academy News',        desc: 'Latest updates, results and news from the academy.',        Icon: BookOpen },
  ];
  return (
    <div className="mt-8">
      <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 rounded-2xl overflow-hidden p-8 lg:p-12 text-white mb-8 shadow-xl">
        <div className="absolute inset-0 opacity-[0.04]" style={STRIPE_BG} aria-hidden="true" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 mb-5">
            <Rocket className="w-3 h-3 text-red-400" aria-hidden="true" />
            <span className="text-[11px] font-black tracking-widest text-gray-200 uppercase">Youth Development</span>
          </div>
          <h2 className="font-black text-3xl lg:text-4xl mb-4">Academy Pathway</h2>
          <p className="text-gray-300 text-sm lg:text-base max-w-xl leading-relaxed mb-8">
            Discover the development pathway for young players working toward the next level of South African football.
            TS Galaxy's youth trials attracted over 2,000 aspiring players in January 2026.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map(({ label, desc, Icon }) => (
              <div key={label} className="bg-white/10 border border-white/15 rounded-xl p-4">
                <Icon className="w-5 h-5 text-red-400 mb-2" aria-hidden="true" />
                <p className="font-black text-xs text-white mb-1">{label}</p>
                <p className="text-[11px] text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/academy')}
              className="bg-red-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-red-500 transition-colors"
            >
              Explore Academy
            </button>
            <button
              onClick={() => navigate('/academy')}
              className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-black text-sm hover:bg-white/20 transition-colors"
            >
              Apply for Trials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SquadPage ────────────────────────────────────────────────────────────────

export function SquadPage() {
  const navigate = useNavigate();
  const [activeTeam, setActiveTeam]         = useState<TeamId>('mens-first-team');
  const [activePosition, setActivePosition] = useState('all');
  const [searchQuery, setSearchQuery]       = useState('');

  const firstTeamPlayers = SQUAD.filter(p => p.team === 'mens-first-team');
  const spotlight = firstTeamPlayers[0]; // Ira Eliezer Tape — first listed

  const filteredPlayers = useMemo(() => {
    return firstTeamPlayers.filter(p => {
      const matchPos = activePosition === 'all' || p.position === activePosition;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.position.toLowerCase().includes(q) || String(p.squadNumber).includes(q);
      return matchPos && matchSearch;
    });
  }, [activePosition, searchQuery]);

  const snapshotCards = [
    { label: 'Squad',       value: String(firstTeamPlayers.length),     sub: 'Players registered',        Icon: Users   },
    { label: 'Goalkeepers', value: String(countByPosition('Goalkeeper')), sub: `${countByPosition('Defender')} Defenders`, Icon: Shield },
    { label: 'Midfielders', value: String(countByPosition('Midfielder')), sub: `${countByPosition('Forward')} Forwards`,   Icon: Rocket },
    { label: 'Identity',    value: 'The Rockets',                       sub: 'Kameelrivier, Mpumalanga',  Icon: Star    },
  ];

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          § 1  HERO
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative bg-gray-950 text-white overflow-hidden"
        aria-label="TS Galaxy FC Squad"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <img src={QUEENS_IMAGES.teamLineup} alt="" className="w-full h-full object-cover object-[center_25%]" />
          <div className="absolute inset-0 bg-gray-950/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/55 to-gray-950/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={STRIPE_BG} aria-hidden="true" />
        <img
          src={LOGO.favicon.png256}
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 lg:w-80 lg:h-80 opacity-[0.05] pointer-events-none select-none"
        />

        <div className="container mx-auto px-4 lg:px-6 py-10 lg:py-16 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">

            {/* Left: copy */}
            <div className="flex-1 min-w-0 pb-8 lg:pb-0">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" aria-hidden="true" />
                <span className="text-[11px] font-black tracking-widest text-gray-200 uppercase">The Squad</span>
              </div>

              <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-tight mb-3">
                <span className="block">Meet</span>
                <span className="block text-red-400">The Rockets.</span>
              </h1>

              <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6 max-w-lg">
                Browse the players, coaches and development pathways representing TS Galaxy FC across every competition.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/fixtures')}
                  className="bg-red-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-red-500 transition-colors"
                >
                  View Fixtures
                </button>
                <button
                  onClick={() => navigate('/news')}
                  className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Latest Team News
                </button>
              </div>
            </div>

            {/* Right: squad snapshot strip — desktop */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-3 w-[340px] flex-shrink-0">
              {snapshotCards.map(({ label, value, sub, Icon }) => (
                <div key={label} className="bg-white/10 border border-white/15 rounded-xl p-4 backdrop-blur-sm">
                  <Icon className="w-4 h-4 text-red-400 mb-2" aria-hidden="true" />
                  <p className="font-black text-xl text-white leading-tight">{value}</p>
                  <p className="text-[11px] font-bold text-red-300 uppercase tracking-wide mt-0.5">{label}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{sub}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 2  SQUAD SNAPSHOT (mobile)
          ══════════════════════════════════════════════════════════════ */}
      <section className="lg:hidden bg-gray-50 border-b border-gray-100" aria-label="Squad at a glance">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            {snapshotCards.map(({ label, value, sub, Icon }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <Icon className="w-4 h-4 text-red-500 mb-1" aria-hidden="true" />
                <p className="font-black text-lg text-gray-900 leading-tight">{value}</p>
                <p className="text-[11px] font-bold text-red-600 uppercase tracking-wide">{label}</p>
                <p className="text-[11px] text-gray-400 leading-tight">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 3  TEAM SELECTOR + FILTER TOOLBAR  (sticky)
          ══════════════════════════════════════════════════════════════ */}
      <div
        className="sticky top-16 lg:top-[73px] z-40 bg-white border-b border-gray-100 shadow-sm"
        role="navigation"
        aria-label="Team and position filters"
      >
        <div className="container mx-auto px-4 lg:px-6 py-3 space-y-3">

          {/* Team tabs */}
          <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
            {TEAMS.map(({ id, label, Icon }) => {
              const active = activeTeam === id;
              return (
                <button
                  key={id}
                  onClick={() => { setActiveTeam(id); setActivePosition('all'); setSearchQuery(''); }}
                  aria-pressed={active}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-all ${
                    active
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-3 h-3" aria-hidden="true" />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Position filters + search (first team only) */}
          {activeTeam === 'mens-first-team' && (
            <div className="flex items-center gap-3">
              {/* Position chips */}
              <div className="flex gap-1.5 overflow-x-auto flex-1 pb-0.5" style={{ scrollbarWidth: 'none' }}>
                {POSITION_FILTERS.map(({ id, label }) => {
                  const active = activePosition === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setActivePosition(id)}
                      aria-pressed={active}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-full font-bold text-xs whitespace-nowrap transition-all ${
                        active
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Search — desktop inline, mobile below */}
              <div className="hidden lg:flex relative flex-shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search player…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-xs w-44 focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-400 transition-colors"
                  aria-label="Search players"
                />
              </div>
            </div>
          )}

          {/* Mobile search */}
          {activeTeam === 'mens-first-team' && (
            <div className="lg:hidden relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search player…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-xs w-full focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-400 transition-colors"
                aria-label="Search players"
              />
            </div>
          )}

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          § 4  MAIN CONTENT (team-conditional)
          ══════════════════════════════════════════════════════════════ */}
      <div className="container mx-auto px-4 lg:px-6 pb-16">

        {activeTeam === 'queens'         && <QueensView />}
        {activeTeam === 'technical-team' && <TechnicalView />}
        {activeTeam === 'academy'        && <AcademyView />}

        {activeTeam === 'mens-first-team' && (
          <>
            {/* ── Player Spotlight ── */}
            {!searchQuery && activePosition === 'all' && spotlight && (
              <section className="mt-8 mb-8" aria-labelledby="spotlight-heading">
                <div className="flex items-center gap-2 mb-4">
                  <span id="spotlight-heading" className="text-[11px] font-black text-red-600 uppercase tracking-widest">Player Spotlight</span>
                </div>
                <SpotlightCard player={spotlight} />
              </section>
            )}

            {/* ── Grid heading ── */}
            <section aria-labelledby="grid-heading">
              <div className="flex items-center justify-between mt-6 mb-5">
                <h2 id="grid-heading" className="font-black text-xl lg:text-2xl text-gray-900 tracking-tight">
                  {activePosition === 'all'
                    ? "Men's First Team"
                    : POSITION_FILTERS.find(f => f.id === activePosition)?.label ?? 'Players'}
                  <span className="ml-2 text-sm font-bold text-gray-400">({filteredPlayers.length})</span>
                </h2>
                {(searchQuery || activePosition !== 'all') && (
                  <button
                    onClick={() => { setActivePosition('all'); setSearchQuery(''); }}
                    className="text-xs font-bold text-red-600 hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {filteredPlayers.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
                  {filteredPlayers.map(player => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              ) : (
                <div className="py-16 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                    <Search className="w-5 h-5 text-gray-300" aria-hidden="true" />
                  </div>
                  <p className="font-black text-sm text-gray-900 mb-1">No players found</p>
                  <p className="text-xs text-gray-400">Try a different name or clear your filters.</p>
                </div>
              )}
            </section>
          </>
        )}

      </div>

      {/* ══════════════════════════════════════════════════════════════
          § 5  RELATED LINKS
          ══════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 border-t border-gray-100 py-12 lg:py-16" aria-labelledby="related-heading">
        <div className="container mx-auto px-4 lg:px-6">
          <h2 id="related-heading" className="font-black text-xl lg:text-2xl text-gray-900 tracking-tight mb-6">
            Explore TS Galaxy FC
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {RELATED.map(({ label, sub, path, Icon }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="group bg-white rounded-2xl border border-gray-100 p-5 text-left shadow-sm hover:shadow-md hover:border-red-100 transition-all"
                aria-label={label}
              >
                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center mb-3 group-hover:bg-red-600 transition-colors">
                  <Icon className="w-4 h-4 text-red-600 group-hover:text-white transition-colors" aria-hidden="true" />
                </div>
                <p className="font-black text-sm text-gray-900 group-hover:text-red-600 transition-colors mb-1 flex items-center gap-1">
                  {label}
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                </p>
                <p className="text-xs text-gray-500 leading-snug">{sub}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
