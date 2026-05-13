import { useNavigate } from 'react-router';
import {
  ChevronRight, Trophy, Calendar, ShoppingBag,
  Users, Target, Eye, Handshake, BookOpen, CreditCard,
  TrendingUp, ArrowRight,
} from 'lucide-react';
import { LOGO, QUEENS_IMAGES } from '@/lib/assets';
import {
  queensStanding,
  queensSnapshot,
  queensGalleryMeta,
  queensSquadGroups,
  queensPathwayCards,
  queensOpportunityCards,
  queensRelatedLinks,
} from '@/lib/queens-data';
import type { FormResult } from '@/lib/queens-data';

// ─── Style constants ──────────────────────────────────────────────────────────

const STRIPE_BG = {
  backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)',
  backgroundSize: '20px 20px',
};

// ─── Form badge ───────────────────────────────────────────────────────────────

function FormBadge({ result }: { result: FormResult }) {
  const cfg = {
    W: { cls: 'bg-emerald-500 text-white',      label: 'W' },
    D: { cls: 'bg-gray-400 text-white',          label: 'D' },
    L: { cls: 'bg-red-600 text-white',           label: 'L' },
  }[result];
  return (
    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

// ─── Stat pill ────────────────────────────────────────────────────────────────

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center bg-white/10 rounded-xl px-4 py-3 min-w-[60px]">
      <span className="text-xl font-black text-white leading-none">{value}</span>
      <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider mt-0.5">{label}</span>
    </div>
  );
}

// ─── QueensPage ───────────────────────────────────────────────────────────────

export function QueensPage() {
  const navigate = useNavigate();

  // Build gallery array by mapping meta keys to QUEENS_IMAGES
  const galleryImages = queensGalleryMeta.map(item => ({
    ...item,
    src: QUEENS_IMAGES[item.key as keyof typeof QUEENS_IMAGES],
  }));

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          § 1  HERO
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative bg-gray-950 text-white overflow-hidden"
        aria-label="TS Galaxy Queens"
      >
        {/* Background texture + glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-red-950" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={STRIPE_BG} aria-hidden="true" />
        <div className="absolute -bottom-24 right-1/3 w-[400px] h-[400px] bg-red-700 rounded-full blur-[120px] opacity-10 pointer-events-none" aria-hidden="true" />
        <img
          src={LOGO.favicon.png256}
          alt=""
          aria-hidden="true"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-48 h-48 lg:w-72 lg:h-72 opacity-[0.04] pointer-events-none select-none"
        />

        <div className="relative z-10 container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-10 lg:py-16 xl:py-20">

            {/* LEFT: copy */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm rounded-full px-3 py-1 mb-5 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" aria-hidden="true" />
                <span className="text-[11px] font-black tracking-widest text-gray-200 uppercase">TS Galaxy Queens</span>
              </div>

              <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-tight mb-4">
                <span className="block">The Queens carry</span>
                <span className="block text-red-400">The Rockets forward.</span>
              </h1>

              <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6 max-w-lg">
                Follow TS Galaxy Queens, the women's football side representing the club in the
                Hollywoodbets Super League — 4th place, 61 points, and building.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => { const el = document.getElementById('queens-matchday'); el?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="bg-red-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-red-500 transition-colors"
                >
                  View Queens Matchday
                </button>
                <button
                  onClick={() => { const el = document.getElementById('queens-squad'); el?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Meet the Queens
                </button>
              </div>
            </div>

            {/* RIGHT: team photo card — desktop only */}
            <div className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src={QUEENS_IMAGES.teamPhoto}
                  alt="TS Galaxy Queens team in matchday kit"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                      Hollywoodbets Super League
                    </span>
                    <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                      4th · 61 pts
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: image strip */}
            <div className="lg:hidden -mx-4 relative h-52 overflow-hidden">
              <img
                src={QUEENS_IMAGES.teamPhoto}
                alt="TS Galaxy Queens team in matchday kit"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                  Hollywoodbets Super League
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 2  QUEENS SNAPSHOT
          ══════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 mt-6 lg:mt-8" aria-label="Queens quick facts">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {queensSnapshot.map(item => (
            <div
              key={item.label}
              className={`rounded-2xl p-4 flex flex-col items-center text-center border ${
                'highlight' in item && item.highlight
                  ? 'bg-red-600 border-red-500 text-white'
                  : 'bg-white border-gray-100 shadow-sm'
              }`}
            >
              <span className={`font-black text-lg leading-none mb-1 ${'highlight' in item && item.highlight ? 'text-white' : 'text-gray-900'}`}>
                {item.value}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wide ${'highlight' in item && item.highlight ? 'text-red-100' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 3  LEAGUE POSITION / LOG PANEL
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-14"
        aria-labelledby="log-heading"
      >
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[11px] font-black text-red-600 uppercase tracking-widest">League Standing</span>
        </div>
        <h2 id="log-heading" className="font-black text-2xl lg:text-3xl text-gray-900 tracking-tight mb-6">
          Queens league position
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">

          {/* Main log card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" style={STRIPE_BG} aria-hidden="true" />
            <img src={LOGO.favicon.png256} alt="" aria-hidden="true"
              className="absolute right-4 top-4 w-24 h-24 opacity-[0.06] pointer-events-none select-none" />

            <div className="relative z-10">
              {/* Competition */}
              <div className="flex items-center gap-2 mb-5">
                <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                  {queensStanding.competition}
                </span>
                <span className="text-white/40 text-[10px] font-bold">{queensStanding.association}</span>
              </div>

              {/* Position hero */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-7xl lg:text-8xl font-black text-white leading-none">4</span>
                <div>
                  <p className="text-red-400 font-black text-sm uppercase tracking-widest leading-none mb-1">th Place</p>
                  <p className="text-white/60 text-xs">Hollywoodbets Super League</p>
                </div>
              </div>

              {/* Stat row */}
              <div className="flex flex-wrap gap-2 mb-6">
                <StatPill label="Played" value={queensStanding.played} />
                <StatPill label="Won"    value={queensStanding.won}    />
                <StatPill label="Drawn"  value={queensStanding.drawn}  />
                <StatPill label="Lost"   value={queensStanding.lost}   />
                <StatPill label="GF"     value={queensStanding.goalsFor} />
                <StatPill label="GA"     value={queensStanding.goalsAgainst} />
                <StatPill label="GD"     value={`+${queensStanding.goalDifference}`} />
                <StatPill label="Points" value={queensStanding.points} />
              </div>

              {/* Form */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Last 5</span>
                <div className="flex gap-1.5">
                  {queensStanding.form.map((r, i) => <FormBadge key={i} result={r} />)}
                </div>
              </div>
            </div>
          </div>

          {/* Right: three smaller stat highlights */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Goals scored</span>
              <div>
                <p className="font-black text-5xl text-gray-900 leading-none">{queensStanding.goalsFor}</p>
                <p className="text-xs text-gray-500 mt-1">in {queensStanding.played} league matches</p>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                <span className="text-xs font-bold text-emerald-600">+{queensStanding.goalDifference} goal difference</span>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Win rate</span>
              <div>
                <p className="font-black text-5xl text-gray-900 leading-none">
                  {Math.round((queensStanding.won / queensStanding.played) * 100)}
                  <span className="text-2xl text-gray-400">%</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{queensStanding.won}W · {queensStanding.drawn}D · {queensStanding.lost}L</p>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
                <div
                  className="bg-red-600 h-1.5 rounded-full"
                  style={{ width: `${Math.round((queensStanding.won / queensStanding.played) * 100)}%` }}
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4">
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Static public log snapshot from{' '}
                <span className="font-bold text-gray-500">Inqaku</span>.
                Full updates to be managed by club admin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 4  QUEENS MATCHDAY
          ══════════════════════════════════════════════════════════════ */}
      <section
        id="queens-matchday"
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-14"
        aria-labelledby="matchday-heading"
      >
        <h2 id="matchday-heading" className="font-black text-2xl lg:text-3xl text-gray-900 tracking-tight mb-2">
          Queens Matchday
        </h2>
        <p className="text-sm text-gray-500 mb-6 max-w-xl">
          Queens fixtures and results will be updated here as club-admin match data becomes available.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            {
              Icon: Calendar,
              title: 'Fixtures',
              body: 'Upcoming Queens fixtures to be updated here by club admin.',
              tag: 'Coming soon',
            },
            {
              Icon: Trophy,
              title: 'Results',
              body: 'Recent Queens results to be updated here as they become available.',
              tag: 'Coming soon',
            },
            {
              Icon: Eye,
              title: 'Match Centre',
              body: 'Match previews, recaps and media can be connected here.',
              tag: 'Coming soon',
            },
          ].map(({ Icon, title, body, tag }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-red-600" aria-hidden="true" />
                </div>
                <span className="text-[10px] font-black text-gray-400 border border-gray-200 rounded-full px-2 py-0.5 uppercase tracking-wide">
                  {tag}
                </span>
              </div>
              <h3 className="font-black text-sm text-gray-900 mb-1.5">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/fixtures')}
            className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            View Club Fixtures <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            onClick={() => navigate('/news')}
            className="bg-white text-gray-900 px-5 py-2.5 rounded-xl font-bold text-sm border border-gray-200 hover:border-red-300 transition-colors"
          >
            Read Queens News
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 5  ABOUT TS GALAXY QUEENS
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-14"
        aria-labelledby="about-heading"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-[11px] font-black text-red-600 uppercase tracking-widest block mb-3">
              About the Queens
            </span>
            <h2 id="about-heading" className="font-black text-2xl lg:text-3xl text-gray-900 tracking-tight mb-4">
              A dedicated women's football platform
            </h2>
            <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-4">
              TS Galaxy Queens F.C. is the women's football side connected to TS Galaxy FC. The team
              carries The Rockets identity into South African women's football, giving the women's game
              a dedicated place within the club platform.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              The Queens represent the club in the Hollywoodbets Super League under SAFA, building on
              a proud women's football identity rooted in Mpumalanga and with a growing footprint
              across South Africa.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/news')}
                className="bg-red-600 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-red-500 transition-colors flex items-center gap-2"
              >
                Queens News <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                onClick={() => navigate('/fixtures')}
                className="bg-white text-gray-900 px-5 py-3 rounded-xl font-bold text-sm border border-gray-200 hover:border-red-300 transition-colors"
              >
                View Fixtures
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
            <img
              src={QUEENS_IMAGES.teamLineup}
              alt="TS Galaxy Queens players lined up at the goal during training"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 6  MEET THE QUEENS / SQUAD PREVIEW
          ══════════════════════════════════════════════════════════════ */}
      <section
        id="queens-squad"
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-14"
        aria-labelledby="squad-heading"
      >
        <div className="text-center mb-8">
          <span className="text-[11px] font-black text-red-600 uppercase tracking-widest block mb-3">The Squad</span>
          <h2 id="squad-heading" className="font-black text-2xl lg:text-3xl text-gray-900 tracking-tight mb-3">
            Meet the Queens
          </h2>
          <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
            Squad profiles, player stories and technical team updates will give supporters a closer
            look at the women representing TS Galaxy Queens.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          {queensSquadGroups.map(group => (
            <div
              key={group.position}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center hover:border-red-200 hover:shadow-md transition-all"
            >
              <span className="text-3xl mb-3" role="img" aria-hidden="true">{group.icon}</span>
              <h3 className="font-black text-sm text-gray-900 mb-2">{group.position}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{group.description}</p>
              <span className="mt-3 text-[10px] font-black text-gray-300 border border-gray-100 rounded-full px-2 py-0.5 uppercase tracking-wide">
                To be updated
              </span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/news')}
            className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors"
          >
            View Squad Updates
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 7  TRAINING GALLERY
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-14"
        aria-labelledby="gallery-heading"
      >
        <div className="mb-6">
          <span className="text-[11px] font-black text-red-600 uppercase tracking-widest block mb-2">Training Gallery</span>
          <h2 id="gallery-heading" className="font-black text-2xl lg:text-3xl text-gray-900 tracking-tight mb-2">
            Inside Queens training
          </h2>
          <p className="text-sm text-gray-500">
            A visual look at preparation, discipline and team energy inside the Queens environment.
          </p>
        </div>

        {/* Large feature + 8-grid layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Feature image — spans 2 cols on all sizes */}
          {galleryImages[0] && (
            <div className="col-span-2 lg:col-span-2 row-span-2 relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full group">
              <img
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {galleryImages[0].caption && (
                <span className="absolute bottom-3 left-3 text-white text-xs font-bold bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                  {galleryImages[0].caption}
                </span>
              )}
            </div>
          )}

          {/* Remaining 8 gallery images */}
          {galleryImages.slice(1).map(img => (
            <div key={img.key} className="relative rounded-2xl overflow-hidden aspect-square group">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover object-top group-hover:scale-[1.05] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {img.caption && (
                <span className="absolute bottom-2 left-2 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.caption}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 8  WOMEN'S FOOTBALL PATHWAY
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-14"
        aria-labelledby="pathway-heading"
      >
        <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 rounded-2xl p-6 lg:p-10 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={STRIPE_BG} aria-hidden="true" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-700 rounded-full blur-[100px] opacity-10 pointer-events-none" aria-hidden="true" />
          <img src={LOGO.favicon.png256} alt="" aria-hidden="true"
            className="absolute right-6 bottom-0 w-32 h-32 lg:w-48 lg:h-48 opacity-[0.06] pointer-events-none select-none" />

          <div className="relative z-10">
            <span className="text-[11px] font-black text-red-400 uppercase tracking-widest block mb-3">
              Why it matters
            </span>
            <h2 id="pathway-heading" className="font-black text-2xl lg:text-3xl text-white tracking-tight mb-3">
              A pathway worth building
            </h2>
            <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-8 max-w-2xl">
              TS Galaxy Queens give women's football a dedicated platform within the club, creating
              visibility for players, supporters, partners and young girls who want to see a future
              in the game.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { Icon: Eye,       ...queensPathwayCards[0] },
                { Icon: Users,     ...queensPathwayCards[1] },
                { Icon: BookOpen,  ...queensPathwayCards[2] },
                { Icon: Handshake, ...queensPathwayCards[3] },
              ].map(({ Icon, title, body }) => (
                <div key={title} className="bg-white/10 border border-white/10 rounded-xl p-5">
                  <div className="w-9 h-9 rounded-lg bg-red-600/30 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-red-400" aria-hidden="true" />
                  </div>
                  <h3 className="font-black text-sm text-white mb-2">{title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 9  PARTNER WITH QUEENS
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-14"
        aria-labelledby="partner-heading"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <span className="text-[11px] font-black text-red-600 uppercase tracking-widest block mb-3">
              Partnerships
            </span>
            <h2 id="partner-heading" className="font-black text-2xl lg:text-3xl text-gray-900 tracking-tight mb-4">
              Support women's football with The Rockets
            </h2>
            <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-6">
              Partnership around TS Galaxy Queens can support visibility, player stories, youth
              inspiration and the growth of women's football in South Africa.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/partners')}
                className="bg-red-600 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-red-500 transition-colors flex items-center gap-2"
              >
                Partner with Queens <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                onClick={() => navigate('/partners')}
                className="bg-white text-gray-900 px-5 py-3 rounded-xl font-bold text-sm border border-gray-200 hover:border-red-300 transition-colors"
              >
                View Partners
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {queensOpportunityCards.map(({ title, body }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:border-red-200 hover:shadow-md transition-all">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center mb-3">
                  <Target className="w-4 h-4 text-red-600" aria-hidden="true" />
                </div>
                <h3 className="font-black text-sm text-gray-900 mb-1.5">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 10  RELATED LINKS
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-14"
        aria-labelledby="links-heading"
      >
        <h2 id="links-heading" className="font-black text-xl lg:text-2xl text-gray-900 tracking-tight mb-5">
          Explore The Rockets
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {[
            { Icon: Calendar,    ...queensRelatedLinks[0] },
            { Icon: Eye,         ...queensRelatedLinks[1] },
            { Icon: BookOpen,    ...queensRelatedLinks[2] },
            { Icon: Handshake,   ...queensRelatedLinks[3] },
            { Icon: ShoppingBag, ...queensRelatedLinks[4] },
            { Icon: CreditCard,  ...queensRelatedLinks[5] },
          ].map(({ Icon, label, description, path }) => (
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
                  <p className="text-xs text-gray-500 leading-snug">{description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-red-600 group-hover:translate-x-0.5 flex-shrink-0 mt-0.5 transition-all" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 11  FINAL CTA
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-14"
        aria-labelledby="cta-heading"
      >
        <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 rounded-2xl p-8 lg:p-14 text-center text-white overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={STRIPE_BG} aria-hidden="true" />
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-700 rounded-full blur-[120px] opacity-10 pointer-events-none" aria-hidden="true" />
          <img src={LOGO.favicon.png256} alt="" aria-hidden="true"
            className="absolute top-6 right-6 w-20 h-20 opacity-[0.06] pointer-events-none select-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-[11px] font-black text-red-400 uppercase tracking-widest block mb-4">
              TS Galaxy Queens
            </span>
            <h2 id="cta-heading" className="font-black text-2xl lg:text-4xl text-white tracking-tight mb-4">
              Follow the Queens.<br />Follow The Rockets.
            </h2>
            <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-8">
              Stay close to TS Galaxy Queens fixtures, squad updates, club news and women's football stories.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => navigate('/fixtures')}
                className="bg-red-600 text-white px-7 py-3.5 rounded-xl font-black text-sm hover:bg-red-500 transition-colors"
              >
                View Matchday
              </button>
              <button
                onClick={() => navigate('/news')}
                className="bg-white/10 backdrop-blur text-white px-7 py-3.5 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors"
              >
                Read News
              </button>
              <button
                onClick={() => navigate('/partners')}
                className="bg-white/10 backdrop-blur text-white px-7 py-3.5 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors"
              >
                Partner with Queens
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile nav clearance */}
      <div className="h-8 lg:h-12" aria-hidden="true" />
    </>
  );
}
