import { useNavigate } from 'react-router';
import {
  ChevronRight,
  Trophy,
  MapPin,
  Rocket,
  Calendar,
  Users,
  Star,
  Shield,
  ShoppingBag,
} from 'lucide-react';
import { LOGO, THE_CLUB_IMAGES } from '@/lib/assets';

// ─── Style constants (shared with Home page) ──────────────────────────────────

const STRIPE_BG = {
  backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)',
  backgroundSize: '20px 20px',
};
const STRIPE_SM = {
  backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)',
  backgroundSize: '14px 14px',
};

// ─── Data ────────────────────────────────────────────────────────────────────

const IDENTITY_FACTS = [
  { label: 'Founded',      value: '2015',                       Icon: Calendar },
  { label: 'Nickname',     value: 'The Rockets',                Icon: Rocket   },
  { label: 'Base',         value: 'Kameelrivier, Mpumalanga',   Icon: MapPin   },
  { label: 'League',       value: 'Premiership',                Icon: Shield   },
  { label: 'Major Honour', value: 'Nedbank Cup Winners',        Icon: Trophy   },
  { label: 'Identity',     value: 'Ambition · Rise · Community', Icon: Star   },
];

const TIMELINE = [
  {
    year: '2015',
    icon: Rocket,
    title: 'The Rockets were formed.',
    detail: 'TS Galaxy FC was formed in Kameelrivier, Mpumalanga, competing in the SAFA Second Division from the outset.',
  },
  {
    year: '2018',
    icon: Shield,
    title: 'A bold step up.',
    detail: 'After three seasons in the SAFA Second Division, TS Galaxy took a bold step forward by acquiring the National First Division status of Cape Town All Stars.',
  },
  {
    year: '18 May 2019',
    icon: Trophy,
    title: 'Nedbank Cup Champions.',
    detail: 'TS Galaxy made South African football history, beating Kaizer Chiefs 1–0 in the Nedbank Cup final. Zakhele Lepasa scored the decisive penalty in second-half injury time — the first lower-division club to win the competition.',
    highlight: true,
  },
  {
    year: '2019–20',
    icon: Star,
    title: 'CAF Confederation Cup.',
    detail: 'TS Galaxy competed in the CAF Confederation Cup, representing South Africa on the continental stage for the first time.',
  },
  {
    year: 'September 2020',
    icon: Shield,
    title: 'Premiership status secured.',
    detail: 'The club acquired the Premiership status of Highlands Park, completing the journey from SAFA Second Division to South African football\'s top flight.',
  },
  {
    year: '2020–21',
    icon: Calendar,
    title: 'Debut Premiership campaign.',
    detail: 'TS Galaxy took their place in the Premiership and finished ninth in their debut top-flight season.',
  },
  {
    year: '2023–24',
    icon: Star,
    title: 'Record sixth-place finish.',
    detail: 'The club achieved a record sixth-place Premiership finish — the strongest league performance in the club\'s history.',
  },
  {
    year: '2024 and beyond',
    icon: Rocket,
    title: 'Pushing higher.',
    detail: 'TS Galaxy continues to build with the ambition of pushing toward the Premiership top three.',
  },
];

const PREMIERSHIP_STATS = [
  { year: '2020',    label: 'Premiership Entry',      sub: 'Acquired Highlands Park status'    },
  { year: '2020–21', label: 'Ninth-place finish',     sub: 'Debut Premiership campaign'        },
  { year: '2023–24', label: 'Record sixth place',     sub: 'Best-ever league finish'           },
];

const HONOURS = [
  { title: 'Nedbank Cup Winners',                  year: '2019',    Icon: Trophy,  primary: true  },
  { title: 'First lower-division Nedbank Cup win', year: '2019',    Icon: Star,    primary: false },
  { title: 'CAF Confederation Cup',                year: '2019–20', Icon: Shield,  primary: false },
  { title: 'Record Premiership finish (6th)',       year: '2023–24', Icon: Rocket,  primary: false },
];

const RELATED_LINKS = [
  { label: 'Meet the Squad',        sub: 'The players carrying the Rockets story.',         path: '/squad',    Icon: Users      },
  { label: 'Follow the Queens',     sub: 'Women\'s football at TS Galaxy FC.',              path: '/squad',    Icon: Star       },
  { label: 'Academy Pathway',       sub: 'Nurturing the next generation in Mpumalanga.',   path: '/academy',  Icon: Rocket     },
  { label: 'Partner with the Club', sub: 'Align your brand with The Rockets.',              path: '/partners', Icon: Shield     },
  { label: 'View Fixtures',         sub: 'Follow every upcoming Rockets match.',            path: '/fixtures', Icon: Calendar   },
  { label: 'Shop Official Kit',     sub: 'Wear the badge with pride.',                      path: '/shop',     Icon: ShoppingBag },
];

// ─── Shared helpers ───────────────────────────────────────────────────────────

function RedAccentLine() {
  return <div className="w-12 h-1 bg-red-600 rounded-full mb-4" aria-hidden="true" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] font-black text-red-600 uppercase tracking-widest mb-2">
      {children}
    </span>
  );
}

// ─── TheClubPage ──────────────────────────────────────────────────────────────

export function TheClubPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          § 1  HERO
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative bg-gray-950 text-white overflow-hidden"
        aria-label="The Club hero"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <img src={THE_CLUB_IMAGES.cupMoment} alt="" className="w-full h-full object-cover object-[center_30%]" />
          <div className="absolute inset-0 bg-gray-950/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/60 to-gray-950/25" />
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-10 py-10 lg:py-16 xl:py-20">

            {/* LEFT: text */}
            <div className="flex-1 min-w-0 pb-8 lg:pb-0">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" aria-hidden="true" />
                <span className="text-[11px] font-black tracking-widest text-gray-200 uppercase">The Club</span>
              </div>

              <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-tight mb-3 lg:mb-4">
                <span className="block">The story of</span>
                <span className="block text-red-400">The Rockets.</span>
              </h1>

              <p className="text-gray-300 text-sm lg:text-base xl:text-lg leading-relaxed mb-6 max-w-xl">
                From Kameelrivier to South African football's biggest stages, TS Galaxy FC continues
                to build a bold and ambitious football story.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/fixtures')}
                  className="bg-red-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-red-500 transition-colors"
                >
                  View Fixtures
                </button>
                <button
                  onClick={() => navigate('/squad')}
                  className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Meet the Squad
                </button>
              </div>
            </div>

            {/* RIGHT: cup moment card — desktop only */}
            <div className="hidden lg:block w-[420px] xl:w-[460px] flex-shrink-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/2]">
                <img
                  src={THE_CLUB_IMAGES.cupMoment}
                  alt="TS Galaxy FC celebrating the 2019 Nedbank Cup victory"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-2">
                    Historic Moment
                  </span>
                  <p className="text-white font-black text-lg leading-tight">Nedbank Cup Champions</p>
                  <p className="text-gray-300 text-xs mt-1">18 May 2019 · TS Galaxy FC 1–0 Kaizer Chiefs</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mobile: cup moment image below hero */}
      <div className="lg:hidden container mx-auto px-4 mt-4">
        <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[16/9]">
          <img
            src={THE_CLUB_IMAGES.cupMoment}
            alt="TS Galaxy FC celebrating the 2019 Nedbank Cup victory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="inline-block bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest mb-1.5">
              Historic Moment
            </span>
            <p className="text-white font-black text-base leading-tight">Nedbank Cup Champions</p>
            <p className="text-gray-300 text-xs mt-0.5">18 May 2019 · TS Galaxy 1–0 Kaizer Chiefs</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          § 2  CLUB IDENTITY SNAPSHOT
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-8 lg:mt-14"
        aria-labelledby="identity-heading"
      >
        <h2 id="identity-heading" className="sr-only">Club Identity</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {IDENTITY_FACTS.map(({ label, value, Icon }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col items-start gap-2 hover:shadow-md transition-shadow"
            >
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-red-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
                <p className="font-black text-sm text-gray-900 leading-snug">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 3  ABOUT / FOUNDER
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-16"
        aria-labelledby="about-heading"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">

          {/* Left: text + supporting fact card */}
          <div className="flex flex-col gap-5">
            <div>
              <SectionLabel>About the Club</SectionLabel>
              <RedAccentLine />
              <h2 id="about-heading" className="font-black text-2xl lg:text-4xl text-gray-900 tracking-tight mb-4 leading-tight">
                A club with purpose,<br className="hidden lg:block" /> roots and ambition.
              </h2>
              <div className="space-y-4 text-gray-600 text-sm lg:text-base leading-relaxed">
                <p>
                  TS Galaxy FC is a South African football club based in Kameelrivier, in the Nkangala
                  District Municipality near Siyabuswa, Mpumalanga. The club competes in the
                  Premiership and is known as The Rockets.
                </p>
                <p>
                  The club is named after its owner, Tim Sukazi — a bold statement of identity that
                  reflects the personal investment and vision driving everything The Rockets do on and
                  off the pitch.
                </p>
                <p>
                  Based in Mpumalanga, the club connects football, community and ambition in one of
                  South Africa's most passionate football regions.
                </p>
              </div>
            </div>

            {/* Supporting fact card */}
            <div className="bg-gray-950 rounded-2xl p-5 flex items-center gap-5">
              <img
                src={LOGO.favicon.png64}
                alt=""
                aria-hidden="true"
                className="w-10 h-10 opacity-60 flex-shrink-0"
              />
              <div className="flex gap-5 flex-wrap">
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Founded</p>
                  <p className="font-black text-white text-base">2015</p>
                </div>
                <div className="w-px bg-gray-800 self-stretch" aria-hidden="true" />
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Base</p>
                  <p className="font-black text-white text-base">Mpumalanga</p>
                </div>
                <div className="w-px bg-gray-800 self-stretch" aria-hidden="true" />
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Nickname</p>
                  <p className="font-black text-red-400 text-base">The Rockets</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: founder portrait */}
          {/* aspect-[4/5] on mobile → natural portrait; fixed height on desktop to cap vertical size */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5] lg:aspect-auto lg:h-[480px]">
            <img
              src={THE_CLUB_IMAGES.founder}
              alt="TS Galaxy FC founder Tim Sukazi"
              className="w-full h-full object-cover object-center-top"
              style={{ objectPosition: 'center 15%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="h-0.5 w-8 bg-red-600 mb-2 rounded-full" />
              <p className="text-white font-black text-sm">Tim Sukazi</p>
              <p className="text-gray-300 text-xs">Club founder and owner</p>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 4  THE ROCKETS STORY
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="mt-10 lg:mt-16"
        aria-labelledby="story-heading"
      >
        <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 text-white overflow-hidden py-12 lg:py-16">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={STRIPE_BG} aria-hidden="true" />
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-red-700 rounded-full blur-[120px] opacity-10 pointer-events-none" aria-hidden="true" />
          {/* Badge watermark — right side */}
          <img
            src={LOGO.favicon.png256}
            alt=""
            aria-hidden="true"
            className="absolute right-8 top-1/2 -translate-y-1/2 w-40 h-40 lg:w-72 lg:h-72 opacity-[0.07] pointer-events-none select-none"
          />

          <div className="container mx-auto px-4 lg:px-6 relative z-10">
            <div className="max-w-2xl">
              <SectionLabel>The Rockets Story</SectionLabel>
              <div className="w-12 h-1 bg-red-600 rounded-full mb-5" />
              <h2 id="story-heading" className="font-black text-2xl lg:text-4xl xl:text-5xl tracking-tight mb-5 leading-tight">
                Built on ambition.<br />
                <span className="text-red-400">Known as The Rockets.</span>
              </h2>
              <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-8">
                The Rockets identity reflects a club built on movement, ambition, and belief.
                From its early years in South African football to competing at Premiership level,
                TS Galaxy FC has become a club associated with bold progress and historic moments.
              </p>

              {/* Milestone chips */}
              <div className="flex flex-wrap gap-3">
                {[
                  { Icon: Rocket, label: 'Founded', value: '2015'       },
                  { Icon: Trophy, label: 'Cup Winners', value: '2019'   },
                  { Icon: Shield, label: 'Premiership', value: '2020'   },
                ].map(({ Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 bg-white/10 border border-white/15 backdrop-blur-sm rounded-full px-4 py-2"
                  >
                    <Icon className="w-3.5 h-3.5 text-red-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-[11px] font-black text-gray-300 uppercase tracking-widest">{label}</span>
                    <span className="text-[11px] font-black text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 5  CLUB HISTORY TIMELINE
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-16"
        aria-labelledby="timeline-heading"
      >
        <div className="mb-6 lg:mb-8">
          <SectionLabel>Club History</SectionLabel>
          <RedAccentLine />
          <h2 id="timeline-heading" className="font-black text-2xl lg:text-4xl text-gray-900 tracking-tight mb-2">
            The journey so far.
          </h2>
          <p className="text-gray-500 text-sm lg:text-base max-w-2xl leading-relaxed">
            From formation to cup history and Premiership football, the club's journey has
            been defined by bold steps forward.
          </p>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="relative lg:hidden">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" aria-hidden="true" />
          <div className="space-y-5 pl-10">
            {TIMELINE.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.year} className="relative">
                  <div
                    className={`absolute -left-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${item.highlight ? 'bg-red-600 border-red-600' : 'bg-white border-gray-200'}`}
                    aria-hidden="true"
                  >
                    <Icon className={`w-3.5 h-3.5 ${item.highlight ? 'text-white' : 'text-red-600'}`} />
                  </div>
                  <div className={`rounded-2xl border p-4 ${item.highlight ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-white'} shadow-sm`}>
                    <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 ${item.highlight ? 'bg-red-600 text-white' : 'bg-gray-100 text-red-600'}`}>
                      {item.year}
                    </span>
                    <p className="font-black text-sm text-gray-900 mb-1">{item.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop: alternating timeline — tightened spacing */}
        <div className="hidden lg:block relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" aria-hidden="true" />
          <div className="space-y-5">
            {TIMELINE.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;
              return (
                <div key={item.year} className="relative flex items-start gap-6">
                  {isLeft ? (
                    <>
                      <div className="flex-1 flex justify-end pr-8">
                        <div className={`w-full max-w-[360px] rounded-2xl border p-4 ${item.highlight ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-white'} shadow-sm text-right`}>
                          <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-2 ${item.highlight ? 'bg-red-600 text-white' : 'bg-gray-100 text-red-600'}`}>
                            {item.year}
                          </span>
                          <p className="font-black text-sm text-gray-900 mb-1">{item.title}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.detail}</p>
                        </div>
                      </div>
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center border-2 z-10 ${item.highlight ? 'bg-red-600 border-red-600' : 'bg-white border-gray-200'}`}
                        aria-hidden="true"
                      >
                        <Icon className={`w-4 h-4 ${item.highlight ? 'text-white' : 'text-red-600'}`} />
                      </div>
                      <div className="flex-1 pl-8" />
                    </>
                  ) : (
                    <>
                      <div className="flex-1 pr-8" />
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center border-2 z-10 ${item.highlight ? 'bg-red-600 border-red-600' : 'bg-white border-gray-200'}`}
                        aria-hidden="true"
                      >
                        <Icon className={`w-4 h-4 ${item.highlight ? 'text-white' : 'text-red-600'}`} />
                      </div>
                      <div className="flex-1 flex justify-start pl-8">
                        <div className={`w-full max-w-[360px] rounded-2xl border p-4 ${item.highlight ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-white'} shadow-sm`}>
                          <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-2 ${item.highlight ? 'bg-red-600 text-white' : 'bg-gray-100 text-red-600'}`}>
                            {item.year}
                          </span>
                          <p className="font-black text-sm text-gray-900 mb-1">{item.title}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.detail}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 6  HISTORIC NEDBANK CUP MOMENT
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-16"
        aria-labelledby="nedbank-heading"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl min-h-[420px] lg:min-h-[500px] flex items-end">
          <img
            src={THE_CLUB_IMAGES.cupMoment}
            alt="TS Galaxy FC celebrating the 2019 Nedbank Cup victory"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

          <div className="relative z-10 p-6 lg:p-12 w-full">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-xl">
                <span className="inline-block bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                  Historic Moment
                </span>
                <h2 id="nedbank-heading" className="font-black text-2xl lg:text-4xl xl:text-5xl text-white leading-tight mb-4">
                  The cup moment that<br className="hidden lg:block" /> changed the story.
                </h2>
                <p className="text-gray-300 text-sm lg:text-base leading-relaxed max-w-lg">
                  On 18 May 2019, TS Galaxy FC made South African football history by beating Kaizer
                  Chiefs 1–0 in the Nedbank Cup final. Zakhele Lepasa scored the decisive penalty in
                  second-half injury time, making TS Galaxy the first lower-division team to win the
                  competition.
                </p>
              </div>

              {/* Scoreline card */}
              <div className="flex-shrink-0">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center min-w-[200px]">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Nedbank Cup Final</p>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="text-center">
                      <img src={LOGO.favicon.png64} alt="TS Galaxy FC" className="w-10 h-10 mx-auto mb-1 object-contain" width={40} height={40} />
                      <p className="text-white text-[10px] font-bold">TS Galaxy</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-black text-white leading-none">1</p>
                      <p className="text-gray-500 text-[10px] font-bold my-0.5">–</p>
                      <p className="text-3xl font-black text-gray-500 leading-none">0</p>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 mx-auto mb-1 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-[9px] font-black text-white">KC</span>
                      </div>
                      <p className="text-white text-[10px] font-bold">Kaizer Chiefs</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2">18 May 2019</p>
                  <p className="text-[10px] text-gray-400">Scorer: Zakhele Lepasa</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => navigate('/news')}
            className="bg-red-600 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-red-500 transition-colors"
          >
            Read Club News
          </button>
          <button
            onClick={() => navigate('/fixtures')}
            className="bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
          >
            View Fixtures
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 7  PREMIERSHIP JOURNEY
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-16"
        aria-labelledby="premiership-heading"
      >
        <div className="mb-6 lg:mb-8">
          <SectionLabel>Premiership Journey</SectionLabel>
          <RedAccentLine />
          <h2 id="premiership-heading" className="font-black text-2xl lg:text-4xl text-gray-900 tracking-tight">
            Rising through the ranks.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {PREMIERSHIP_STATS.map(({ year, label, sub }) => (
            <div key={year} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="h-1 w-8 bg-red-600 rounded-full mb-4" />
              <span className="inline-block text-[10px] font-black text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded-full mb-3">
                {year}
              </span>
              <p className="font-black text-base lg:text-lg text-gray-900 mb-1">{label}</p>
              <p className="text-xs text-gray-500">{sub}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => navigate('/fixtures')}
            className="bg-gray-900 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors"
          >
            View Fixtures
          </button>
          <button
            onClick={() => navigate('/fixtures')}
            className="bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
          >
            View Current Log
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 8  HOME STADIUM / COMMUNITY
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-16"
        aria-labelledby="stadium-heading"
      >
        <div className="mb-6 lg:mb-8">
          <SectionLabel>Home Stadium</SectionLabel>
          <RedAccentLine />
          <h2 id="stadium-heading" className="font-black text-2xl lg:text-4xl text-gray-900 tracking-tight mb-3">
            Our home. Our community.
          </h2>
          <p className="text-gray-500 text-sm lg:text-base max-w-2xl leading-relaxed">
            TS Galaxy FC carries the pride of its Mpumalanga roots, with the club's story connected
            to Kameelrivier, Siyabuswa and the wider Nkangala District Municipality community.
          </p>
        </div>

        {/* Stadium gallery: large left + two stacked right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
          <div className="rounded-2xl overflow-hidden shadow-md aspect-[16/10] lg:aspect-auto lg:row-span-2 lg:min-h-[380px]">
            <img
              src={THE_CLUB_IMAGES.stadium01}
              alt="TS Galaxy FC stadium — interior view"
              className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md aspect-[16/9]">
            <img
              src={THE_CLUB_IMAGES.stadium02}
              alt="TS Galaxy FC stadium — night view"
              className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md aspect-[16/9]">
            <img
              src={THE_CLUB_IMAGES.stadium03}
              alt="TS Galaxy FC stadium — aerial view"
              className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Home Base',      value: 'Kameelrivier, Mpumalanga',                         Icon: MapPin   },
            { label: 'Matchday Venue', value: 'Stadium details to be confirmed',                   Icon: Shield   },
            { label: 'Community',      value: 'Supporters, families, academy & local football',    Icon: Users    },
            { label: 'Matchday Info',  value: 'Fixtures, tickets and venue details on match pages', Icon: Calendar },
          ].map(({ label, value, Icon }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-red-600" aria-hidden="true" />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
              <p className="font-bold text-xs lg:text-sm text-gray-700 leading-snug">{value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => navigate('/fixtures')}
            className="bg-red-600 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-red-500 transition-colors"
          >
            View Matchday Info
          </button>
          <button
            onClick={() => navigate('/fixtures')}
            className="bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
          >
            View Fixtures
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 9  HONOURS / MILESTONES
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-16"
        aria-labelledby="honours-heading"
      >
        <div className="mb-6 lg:mb-8">
          <SectionLabel>Honours</SectionLabel>
          <RedAccentLine />
          <h2 id="honours-heading" className="font-black text-2xl lg:text-4xl text-gray-900 tracking-tight">
            Milestones that define us.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HONOURS.map(({ title, year, Icon, primary }) => (
            primary ? (
              /* Primary honour — dark premium card */
              <div
                key={title}
                className="relative bg-gray-950 rounded-2xl p-5 overflow-hidden shadow-lg sm:col-span-2 lg:col-span-1"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-700 rounded-full blur-3xl opacity-20 pointer-events-none" aria-hidden="true" />
                <img
                  src={LOGO.favicon.png64}
                  alt=""
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 w-10 h-10 opacity-[0.08] pointer-events-none select-none"
                />
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-red-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <span className="inline-block text-[10px] font-black text-red-400 bg-red-950 px-2.5 py-0.5 rounded-full uppercase tracking-widest mb-2">
                    {year}
                  </span>
                  <p className="font-black text-base text-white leading-snug">{title}</p>
                  <div className="mt-3 h-0.5 w-8 bg-red-600 rounded-full" />
                </div>
              </div>
            ) : (
              /* Secondary honours */
              <div
                key={title}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-red-100 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                  <Icon className="w-5 h-5 text-red-600 group-hover:text-white transition-colors" aria-hidden="true" />
                </div>
                <p className="font-black text-sm text-gray-900 leading-snug mb-1.5">{title}</p>
                <span className="inline-block text-[10px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-widest">
                  {year}
                </span>
              </div>
            )
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 10  RELATED CLUB LINKS
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-16"
        aria-labelledby="links-heading"
      >
        <div className="mb-6 lg:mb-8">
          <SectionLabel>Explore the Club</SectionLabel>
          <RedAccentLine />
          <h2 id="links-heading" className="font-black text-2xl lg:text-4xl text-gray-900 tracking-tight">
            Everything Rockets.
          </h2>
        </div>

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

      {/* ══════════════════════════════════════════════════════════════
          § 11  FINAL CTA
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="container mx-auto px-4 lg:px-6 mt-10 lg:mt-16"
        aria-labelledby="final-cta-heading"
      >
        <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 text-white rounded-2xl p-6 lg:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={STRIPE_SM} aria-hidden="true" />
          <div className="absolute top-0 right-1/3 w-64 h-64 bg-red-600 rounded-full blur-3xl opacity-10 pointer-events-none" aria-hidden="true" />
          {/* Badge watermark — more prominent */}
          <img
            src={LOGO.favicon.png256}
            alt=""
            aria-hidden="true"
            className="absolute right-6 top-1/2 -translate-y-1/2 w-32 h-32 lg:w-56 lg:h-56 opacity-[0.09] pointer-events-none select-none"
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1 max-w-lg">
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="w-4 h-4 text-red-400" aria-hidden="true" />
                <span className="text-[11px] font-black text-red-400 uppercase tracking-widest">The Rockets</span>
              </div>
              <h2 id="final-cta-heading" className="font-black text-2xl lg:text-4xl leading-tight mb-2">
                Follow the next chapter<br className="hidden lg:block" /> of The Rockets.
              </h2>
              <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                Stay close to fixtures, results, news, membership and official TS Galaxy FC updates.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={() => navigate('/fixtures')}
                className="bg-red-600 text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-red-500 transition-colors text-center"
              >
                View Fixtures
              </button>
              <button
                onClick={() => navigate('/membership')}
                className="bg-white/10 text-white px-6 py-3.5 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors text-center"
              >
                Join Membership
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="bg-white/10 text-white px-6 py-3.5 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                Shop Official Kit
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
