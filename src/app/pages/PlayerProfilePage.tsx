import { useNavigate, useParams } from 'react-router';
import {
  ChevronLeft, ChevronRight, Users, Calendar,
  ShoppingBag, BookOpen,
} from 'lucide-react';
import { LOGO } from '@/lib/assets';
import { SQUAD, type Player } from '@/lib/squad-data';

const STRIPE_BG = {
  backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)',
  backgroundSize: '20px 20px',
};

const POSITION_COLOURS: Record<string, string> = {
  Goalkeeper: 'bg-amber-100 text-amber-700',
  Defender:   'bg-blue-100 text-blue-700',
  Midfielder: 'bg-green-100 text-green-700',
  Forward:    'bg-red-100 text-red-700',
};

function RelatedPlayerCard({ player }: { player: Player }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/squad/${player.slug}`)}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all text-left"
      aria-label={`View profile of ${player.name}`}
    >
      <div className="relative bg-gray-50 overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <img
          src={player.image}
          alt={`TS Galaxy FC player ${player.name}`}
          className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
          <span className="text-[11px] font-black text-white">{player.squadNumber}</span>
        </div>
      </div>
      <div className="p-3">
        <p className="font-black text-xs text-gray-900 group-hover:text-red-600 transition-colors leading-tight">{player.name}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">{player.position}</p>
      </div>
    </button>
  );
}

export function PlayerProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate  = useNavigate();

  const player = SQUAD.find(p => p.slug === slug);

  if (!player) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="font-black text-2xl text-gray-900 mb-3">Player not found</p>
        <button
          onClick={() => navigate('/squad')}
          className="text-red-600 font-bold text-sm hover:underline"
        >
          ← Back to Squad
        </button>
      </div>
    );
  }

  const related = SQUAD
    .filter(p => p.id !== player.id && p.position === player.position && p.team === 'mens-first-team')
    .slice(0, 4);

  const posColour = POSITION_COLOURS[player.position] ?? 'bg-gray-100 text-gray-700';

  const profileFacts = [
    { label: 'Squad Number',  value: `#${player.squadNumber}` },
    { label: 'Position',      value: player.position          },
    { label: 'Nationality',   value: player.nationality       },
    { label: 'Team',          value: 'TS Galaxy FC'           },
  ];

  return (
    <>
      {/* ── Breadcrumb ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-6 py-3 flex items-center gap-2 text-xs text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-red-600 transition-colors">Home</button>
          <ChevronRight className="w-3 h-3 text-gray-300" aria-hidden="true" />
          <button onClick={() => navigate('/squad')} className="hover:text-red-600 transition-colors">Squad</button>
          <ChevronRight className="w-3 h-3 text-gray-300" aria-hidden="true" />
          <span className="text-gray-900 font-semibold truncate">{player.name}</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <section
        className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 text-white overflow-hidden"
        aria-label={`Player profile: ${player.name}`}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={STRIPE_BG} aria-hidden="true" />
        <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] bg-red-700 rounded-full blur-[120px] opacity-10 pointer-events-none" aria-hidden="true" />

        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Left: player image */}
            <div className="relative flex items-end justify-center pt-10 lg:pt-12 overflow-hidden">
              <img
                src={LOGO.favicon.png256}
                alt=""
                aria-hidden="true"
                className="absolute left-4 top-4 w-24 h-24 lg:w-40 lg:h-40 opacity-[0.06] pointer-events-none select-none"
              />
              <img
                src={player.image}
                alt={`TS Galaxy FC player ${player.name}`}
                className="relative z-10 w-64 lg:w-80 xl:w-96 object-contain drop-shadow-2xl"
                style={{ maxHeight: '480px' }}
              />
              {/* Squad number watermark */}
              <span
                className="absolute right-6 bottom-8 font-black text-[120px] lg:text-[160px] leading-none text-white/[0.04] select-none pointer-events-none"
                aria-hidden="true"
              >
                {player.squadNumber}
              </span>
            </div>

            {/* Right: player info */}
            <div className="py-10 lg:py-14 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 mb-4 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" aria-hidden="true" />
                <span className="text-[10px] font-black tracking-widest text-gray-300 uppercase">TS Galaxy FC</span>
              </div>

              <span className={`inline-block text-xs font-black px-3 py-1 rounded-full mb-3 w-fit ${posColour}`}>
                {player.position}
              </span>

              <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-white mb-2">
                {player.name}
              </h1>
              <p className="text-gray-400 text-sm mb-6">{player.nationality}</p>

              {player.bio && (
                <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6 max-w-md">
                  {player.bio}
                </p>
              )}

              {/* Profile facts */}
              <dl className="grid grid-cols-2 gap-3 mb-8">
                {profileFacts.map(({ label, value }) => (
                  <div key={label} className="bg-white/10 border border-white/10 rounded-xl px-4 py-3">
                    <dt className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{label}</dt>
                    <dd className="font-black text-sm text-white">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/squad')}
                  className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  Back to Squad
                </button>
                <button
                  onClick={() => navigate('/fixtures')}
                  className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-500 transition-colors"
                >
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  View Fixtures
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Stats placeholder ── */}
      <section className="container mx-auto px-4 lg:px-6 mt-10" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="font-black text-xl lg:text-2xl text-gray-900 tracking-tight mb-5">
          Season Statistics 2025/26
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center mb-6">
            {[
              { label: 'Appearances', note: '' },
              { label: player.position === 'Goalkeeper' ? 'Clean Sheets' : 'Goals', note: '' },
              { label: 'Assists',     note: '' },
              { label: 'Minutes',     note: '' },
            ].map(({ label }) => (
              <div key={label} className="border-b lg:border-b-0 lg:border-r border-gray-100 last:border-0 pb-4 lg:pb-0 lg:pr-4">
                <p className="text-3xl lg:text-4xl font-black text-gray-200 mb-1">—</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center">
            Season statistics will be updated by the club administration.
          </p>
        </div>
      </section>

      {/* ── Profile detail ── */}
      <section className="container mx-auto px-4 lg:px-6 mt-8" aria-labelledby="profile-detail-heading">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* About */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
            <h2 id="profile-detail-heading" className="font-black text-lg text-gray-900 mb-3">
              About {player.name.split(' ')[0]}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {player.bio ?? 'Full player biography will be updated by the club.'}
            </p>
            <dl className="space-y-3 border-t border-gray-50 pt-4">
              {profileFacts.map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2 border-b border-gray-50 text-sm">
                  <dt className="text-gray-500 font-medium">{label}</dt>
                  <dd className="font-black text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            {[
              { label: 'View All Squad',  sub: 'Browse all first team players.', path: '/squad',   Icon: Users       },
              { label: 'Latest News',     sub: 'Match reports and squad news.',   path: '/news',    Icon: BookOpen    },
              { label: 'Shop Official Kit', sub: 'Wear the badge with pride.',   path: '/shop',    Icon: ShoppingBag },
              { label: 'Fixtures',        sub: 'Upcoming Rockets matches.',       path: '/fixtures',Icon: Calendar    },
            ].map(({ label, sub, path, Icon }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="group w-full bg-white rounded-2xl border border-gray-100 p-4 text-left shadow-sm hover:shadow-md hover:border-red-100 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-600 transition-colors flex-shrink-0">
                    <Icon className="w-4 h-4 text-red-600 group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm text-gray-900 group-hover:text-red-600 transition-colors">{label}</p>
                    <p className="text-[11px] text-gray-400">{sub}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" aria-hidden="true" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related players ── */}
      {related.length > 0 && (
        <section className="container mx-auto px-4 lg:px-6 mt-10 mb-16" aria-labelledby="related-heading">
          <h2 id="related-heading" className="font-black text-xl lg:text-2xl text-gray-900 tracking-tight mb-5">
            More {player.position}s
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map(p => <RelatedPlayerCard key={p.id} player={p} />)}
          </div>
        </section>
      )}
    </>
  );
}
