import { useNavigate } from 'react-router';
import {
  ChevronRight, MapPin, Users, Trophy,
  ArrowRight, BookOpen, Heart, Target,
} from 'lucide-react';
import { LOGO, ACADEMY_IMAGES, PARTNER_LOGOS, QUEENS_IMAGES } from '@/lib/assets';

// ─── Data ──────────────────────────────────────────────────────────────────────

const SIGN_UP_URL = 'https://forms.office.com/r/hTfRr5guXe';

const ACADEMY_STATS = [
  { label: 'First Official Academy', value: '2024',              sub: 'Launched in Mpumalanga'         },
  { label: 'Home Province',          value: 'Mpumalanga',        sub: 'Birthplace of the club'         },
  { label: 'Academy Base',           value: '@ Penryn',          sub: 'TS Galaxy FC Academy @ Penryn'  },
  { label: 'Academy Teams',          value: '8 teams',           sub: 'Competing in local leagues'     },
  { label: 'DDC Pathway',            value: '7 assessed · 1 signed', sub: 'DStv Diski Challenge route' },
  { label: 'Expansion',              value: 'AISJ JHB',          sub: 'Johannesburg partnership'       },
];

const LEAGUES = [
  { name: 'Ehlanzeni U-20 League', description: 'Senior academy tier competing in the regional Ehlanzeni league.' },
  { name: 'Forek U-17 League',     description: 'Under-17 competition providing age-appropriate challenge.' },
  { name: 'Mbolfa League',         description: 'Local league affiliation broadening competitive exposure.' },
  { name: 'Local Competitions',    description: 'Additional tournaments and competitions throughout the season.' },
];

const PATHWAY_STEPS = [
  { step: '01', title: 'Academy Training',       body: 'Structured coaching at TS Galaxy FC Academy @ Penryn.' },
  { step: '02', title: 'Local League Play',      body: 'Competitive matches in Ehlanzeni, Forek and Mbolfa leagues.' },
  { step: '03', title: 'Tournament Exposure',    body: 'Regional tournaments including the Phalaborwa youth competition.' },
  { step: '04', title: 'DDC Assessment',         body: '7 players invited for assessment with the DStv Diski Challenge squad.' },
  { step: '05', title: 'DDC Opportunity',        body: '1 player officially signed with the DDC — the pathway proven.' },
];

const TOURNAMENT_CARDS = [
  { title: 'Local Leagues',               body: 'Ehlanzeni, Forek and Mbolfa league participation throughout the season.', img: ACADEMY_IMAGES.ehlanzeniTeam },
  { title: 'Regional Club Relationships', body: 'Built connections with clubs across the region, expanding the academy\'s football network.', img: null },
  { title: 'Phalaborwa Youth Tournament', body: 'Competed in a prestigious youth tournament in Phalaborwa, Limpopo, testing talent against wider opposition.', img: null },
  { title: 'Local Tournament Success',    body: 'The academy has performed strongly in local tournaments, showcasing player discipline and team quality.', img: ACADEMY_IMAGES.tournamentTrophy },
];

const PARENT_FAQS = [
  {
    q: 'Who can join?',
    a: 'Academy participation details are managed by the club and shared through official sign-up channels. Use the sign-up form to register your interest.',
  },
  {
    q: 'Where does the academy operate?',
    a: 'The programme is based at TS Galaxy FC Academy @ Penryn in Mpumalanga, with expansion activity through the AISJ partnership in Johannesburg.',
  },
  {
    q: 'How do I register interest?',
    a: 'Use the official Microsoft Forms sign-up link or contact the club through approved channels. The academy team will follow up from there.',
  },
  {
    q: 'What happens after sign-up?',
    a: 'The club will communicate next steps, assessment details and participation information where applicable.',
  },
  {
    q: 'Are education pathways part of the programme?',
    a: "Yes. The academy's story includes education-linked opportunity through the Penryn partnership, as demonstrated by the Siphesihle Mkhonto scholarship.",
  },
];

const GALLERY_IMAGES = [
  { src: ACADEMY_IMAGES.hero,        alt: 'TS Galaxy FC academy player competing in football festival', wide: true  },
  { src: ACADEMY_IMAGES.action01,    alt: 'Academy players in match action at Penryn Football Festival', wide: false },
  { src: ACADEMY_IMAGES.action02,    alt: 'TS Galaxy FC academy player taking a corner kick',           wide: false },
  { src: ACADEMY_IMAGES.action03,    alt: 'Academy youth player controlling the ball during match',      wide: false },
  { src: ACADEMY_IMAGES.ehlanzeniTeam, alt: 'TS Galaxy FC academy team photo at SAFA Ehlanzeni league', wide: false },
  { src: ACADEMY_IMAGES.tournamentTrophy, alt: 'Academy players celebrating with tournament trophy',    wide: false },
];

const RELATED_LINKS = [
  { label: 'First Team',   description: 'Follow the players representing The Rockets.',  href: '/squad'      },
  { label: 'Queens',       description: "Support TS Galaxy FC women's football.",         href: '/queens'     },
  { label: 'News',         description: 'Read academy and club updates.',                 href: '/news'       },
  { label: 'Partners',     description: 'Support youth development through partnership.', href: '/partners'   },
  { label: 'Fixtures',     description: 'Follow upcoming matches.',                       href: '/fixtures'   },
  { label: 'Membership',   description: 'Join the Rockets family.',                       href: '/membership' },
];

// ──────────────────────────────────────────────────────────────────────────────

export function AcademyPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">

      {/* ════════════════════════════════════════════════════════
          §1  HERO
          ════════════════════════════════════════════════════════ */}
      <section className="relative bg-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <img src={QUEENS_IMAGES.trainingWarmup} alt="" className="w-full h-full object-cover object-[center_30%]" />
          <div className="absolute inset-0 bg-gray-950/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/55 to-gray-950/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)', backgroundSize: '20px 20px' }}
          aria-hidden="true"
        />

        {/* Badge watermark */}
        <img
          src={LOGO.favicon.png256}
          alt=""
          aria-hidden="true"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-48 h-48 lg:w-72 lg:h-72 opacity-[0.05] pointer-events-none select-none"
        />

        <div className="relative container mx-auto px-4 lg:px-6 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left: copy */}
            <div>
              <span className="inline-block text-[10px] font-black text-red-400 tracking-[0.25em] uppercase mb-4">
                The Academy
              </span>
              <h1 className="font-black text-5xl lg:text-7xl leading-[0.9] mb-5">
                Our Youth.<br />
                <span className="text-red-500">Our Future.</span>
              </h1>
              <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-lg mb-8">
                TS Galaxy FC Youth Development nurtures football talent, education pathways
                and community opportunity across South Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={SIGN_UP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-red-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors"
                >
                  Join the Academy
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <button
                  onClick={() => document.getElementById('pathway')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center justify-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
                >
                  View Pathway
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Right: image card — intentional crop, player visible */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
                <img
                  src={ACADEMY_IMAGES.hero}
                  alt="TS Galaxy FC academy player in match action"
                  className="w-full h-full object-cover object-[center_25%]"
                />
                {/* Subtle dark vignette at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
                {/* Red accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" aria-hidden="true" />
              </div>
            </div>

            {/* Mobile: image strip below text, controlled crop */}
            <div className="lg:hidden -mx-4 relative h-52 overflow-hidden">
              <img
                src={ACADEMY_IMAGES.hero}
                alt="TS Galaxy FC academy player in match action"
                className="w-full h-full object-cover object-[center_25%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/20 to-transparent" />
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          §2  SNAPSHOT STATS
          ════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 py-10 lg:py-14" aria-label="Academy quick facts">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {ACADEMY_STATS.map((stat) => (
            <div key={stat.label} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center">
              <p className="font-black text-sm lg:text-base text-gray-900 leading-tight mb-1">{stat.value}</p>
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider mb-0.5">{stat.label}</p>
              <p className="text-[10px] text-gray-400 leading-tight">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          §3  MISSION
          ════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <div>
            <span className="text-[10px] font-black text-red-600 tracking-[0.25em] uppercase">
              Our Mission
            </span>
            <h2 className="font-black text-3xl lg:text-4xl mt-2 mb-5 leading-tight">
              Developing talent.<br />Building futures.
            </h2>
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-8">
              TS Galaxy FC Youth Development is dedicated to nurturing football talent among
              young players in and around South Africa. Rooted in community upliftment and
              football excellence, the programme plays a vital role in shaping the next
              generation of football stars.
            </p>
            <div className="space-y-3">
              {[
                { icon: Trophy,   title: 'Football Excellence',    body: 'Structured development for young footballers from grassroots to professional pathway.' },
                { icon: Heart,    title: 'Community Upliftment',   body: 'Creating opportunity through sport in Mpumalanga and beyond.' },
                { icon: BookOpen, title: 'Education & Discipline', body: "Supporting players' growth on and off the pitch through school partnerships." },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4 items-start">
                  <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-red-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900 mb-0.5">{title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
            <img
              src={ACADEMY_IMAGES.penrynCeremony}
              alt="TS Galaxy FC Academy Penryn partnership ceremony"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Launched 2024
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          §4  PENRYN PARTNERSHIP
          ════════════════════════════════════════════════════════ */}
      <section className="bg-gray-950 text-white relative overflow-hidden py-16 lg:py-20">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)', backgroundSize: '12px 12px' }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] order-2 lg:order-1">
              <img
                src={ACADEMY_IMAGES.penrynStaff}
                alt="TS Galaxy FC Academy staff and partners at Penryn"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold text-sm">TS Galaxy FC Academy @ Penryn</p>
                <p className="text-gray-300 text-xs">Mpumalanga · Est. 2024</p>
              </div>
            </div>

            {/* Copy */}
            <div className="order-1 lg:order-2">
              <span className="text-[10px] font-black text-red-400 tracking-[0.25em] uppercase">
                The First Official Academy
              </span>
              <h2 className="font-black text-3xl lg:text-4xl mt-2 mb-5 leading-tight">
                TS Galaxy FC<br />Academy @ Penryn
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                In 2024, TS Galaxy FC launched its first official academy in Mpumalanga —
                the birthplace of the club. Established in partnership with Penryn, a respected
                local school, the academy reflects a shared commitment to football, education
                and youth development.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Penryn embraced the opportunity to build a stronger football culture through
                the partnership, giving rise to TS Galaxy FC Academy @ Penryn and opening
                doors for young players from across the region.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 inline-flex items-center gap-3">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-white text-xs font-bold">Football + Education + Opportunity</p>
                  <p className="text-gray-400 text-[10px]">The founding principle of TS Galaxy FC Academy @ Penryn</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          §5  JOIN THE ACADEMY CTA
          ════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] font-black text-red-600 tracking-[0.25em] uppercase">
            Sign Up
          </span>
          <h2 className="font-black text-3xl lg:text-4xl mt-2 mb-4 leading-tight">
            Join the Academy
          </h2>
          <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-2 max-w-xl mx-auto">
            Young players and families can register interest through the official academy sign-up form.
            Academy sign-up details, venues and selection processes are managed by the club.
          </p>
          <p className="text-xs text-gray-400 mb-8">
            Sign up and join TS Galaxy FC at the American International School of Johannesburg.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={SIGN_UP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors"
            >
              Sign-up Here
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="tel:+27137500060"
              className="flex items-center justify-center gap-2 border border-gray-200 text-gray-800 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
            >
              Contact Academy
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          §6  ACADEMY STRUCTURE
          ════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <div>
              <span className="text-[10px] font-black text-red-600 tracking-[0.25em] uppercase">
                Structure
              </span>
              <h2 className="font-black text-3xl lg:text-4xl mt-2 mb-5 leading-tight">
                8 teams. Multiple leagues.
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                The academy currently consists of 8 teams and participates in a range of
                competitive local leagues, giving players structured match experience at
                the right level of challenge.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {LEAGUES.map((league) => (
                  <div key={league.name} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0" />
                      <p className="font-bold text-xs text-gray-900">{league.name}</p>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed pl-4">{league.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <img
                src={ACADEMY_IMAGES.ehlanzeniTeam}
                alt="TS Galaxy FC academy team lined up for SAFA Ehlanzeni league"
                className="w-full h-full object-cover object-top"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          §7  DEVELOPMENT PATHWAY
          ════════════════════════════════════════════════════════ */}
      <section id="pathway" className="container mx-auto px-4 lg:px-6 py-16 lg:py-20">
        <div className="text-center mb-10">
          <span className="text-[10px] font-black text-red-600 tracking-[0.25em] uppercase">
            Player Pathway
          </span>
          <h2 className="font-black text-3xl lg:text-4xl mt-2 mb-3 leading-tight">
            From academy football to the next level
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            The pathway is proven. 7 players assessed. 1 player signed with the DDC squad.
          </p>
        </div>

        {/* Stat callouts */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <div className="bg-red-600 text-white rounded-2xl px-8 py-5 text-center">
            <p className="font-black text-4xl leading-none">7</p>
            <p className="text-red-200 text-xs mt-1 font-semibold">Players assessed by DDC</p>
          </div>
          <div className="bg-gray-900 text-white rounded-2xl px-8 py-5 text-center">
            <p className="font-black text-4xl leading-none">1</p>
            <p className="text-gray-400 text-xs mt-1 font-semibold">Player officially signed with DDC</p>
          </div>
        </div>

        {/* Pathway steps */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-5 bottom-5 w-0.5 bg-gray-100 hidden sm:block" aria-hidden="true" />

            <div className="space-y-4">
              {PATHWAY_STEPS.map((step, i) => (
                <div key={step.step} className="flex gap-4 sm:gap-5 items-start">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xs relative z-10 ${
                    i >= 3 ? 'bg-red-600 text-white' : 'bg-white border-2 border-gray-200 text-gray-400'
                  }`}>
                    {step.step}
                  </div>
                  <div className={`flex-1 rounded-2xl p-4 border ${i >= 3 ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'}`}>
                    <p className={`font-bold text-sm mb-0.5 ${i >= 3 ? 'text-red-700' : 'text-gray-900'}`}>{step.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          §8  SIPHESIHLE — IMPACT STORY
          ════════════════════════════════════════════════════════ */}
      <section className="bg-gray-950 text-white relative overflow-hidden py-16 lg:py-20">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)', backgroundSize: '12px 12px' }}
        />
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

        <div className="relative container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[3/4] max-w-xs mx-auto lg:max-w-none">
                <img
                  src={ACADEMY_IMAGES.scholarshipStory}
                  alt="TS Galaxy FC Academy player in full tracksuit at Penryn campus"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Quote badge */}
              <div className="absolute -bottom-3 -right-3 lg:bottom-6 lg:right-0 bg-red-600 text-white rounded-2xl px-5 py-3 max-w-[200px] shadow-xl">
                <p className="font-black text-sm leading-tight italic">"Our Youth, Our Future."</p>
                <p className="text-red-200 text-[10px] mt-1">— TS Galaxy FC Academy</p>
              </div>
            </div>

            {/* Story */}
            <div>
              <span className="inline-block bg-red-600/20 text-red-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                Impact Story
              </span>
              <h2 className="font-black text-3xl lg:text-4xl mb-5 leading-tight">
                Changing lives<br />through football
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Siphesihle Mkhonto, a talented female footballer, received a scholarship to
                study at Penryn College through the academy. Previously attending a local
                government school, she now continues to grow both academically and athletically.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Her story shows how football can become a vehicle for opportunity — opening
                doors that reach far beyond the pitch.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Target,   label: 'Football talent',      desc: 'Identified through the academy programme'        },
                  { icon: BookOpen, label: 'Scholarship awarded',   desc: 'Study at Penryn College, Mpumalanga'             },
                  { icon: Heart,    label: 'Community connection', desc: 'From a local government school'                  },
                  { icon: Users,    label: "Women's pathway",       desc: "Female player opportunity within TS Galaxy FC"   },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <Icon className="w-4 h-4 text-red-400 mb-2" aria-hidden="true" />
                    <p className="font-bold text-xs text-white mb-0.5">{label}</p>
                    <p className="text-[10px] text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          §9  TOURNAMENT & LEAGUE EXPERIENCE
          ════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 py-16 lg:py-20">
        <div className="text-center mb-10">
          <span className="text-[10px] font-black text-red-600 tracking-[0.25em] uppercase">
            Competition
          </span>
          <h2 className="font-black text-3xl lg:text-4xl mt-2 mb-3">
            Testing talent through competition
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            Beyond regular league play, the academy has built regional relationships and
            competed in tournaments that challenge players against wider opposition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOURNAMENT_CARDS.map((card) => (
            <div key={card.title} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              {card.img ? (
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={card.img} alt={`TS Galaxy FC academy — ${card.title.toLowerCase()}`} className="w-full h-full object-cover object-top" />
                </div>
              ) : (
                <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-gray-300" aria-hidden="true" />
                </div>
              )}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-sm text-gray-900 mb-1.5">{card.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed flex-1">{card.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          §10  AISJ EXPANSION
          ════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <div>
              <span className="text-[10px] font-black text-red-600 tracking-[0.25em] uppercase">
                Expanding the Footprint
              </span>
              <h2 className="font-black text-3xl lg:text-4xl mt-2 mb-5 leading-tight">
                Mpumalanga to Johannesburg
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Building on the success of the Penryn partnership, TS Galaxy FC expanded its
                youth development beyond Mpumalanga through a new partnership in Johannesburg
                with the American International School of Johannesburg, AISJ.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                The academy is more than a football training ground. It is a platform for
                hope, growth and opportunity — now reaching young players across two provinces.
              </p>

              {/* Partnership cards */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { title: 'TS Galaxy FC Academy @ Penryn', location: 'Mpumalanga', logo: null },
                  { title: 'AISJ Partnership',              location: 'Johannesburg', logo: PARTNER_LOGOS.aisjEagles },
                ].map((p) => (
                  <div key={p.title} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                    {p.logo
                      ? <img src={p.logo} alt="AISJ Eagles logo" className="h-10 object-contain mb-2" />
                      : <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mb-2"><Target className="w-5 h-5 text-red-600" /></div>
                    }
                    <p className="font-bold text-xs text-gray-900 mb-0.5">{p.title}</p>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" aria-hidden="true" />
                      {p.location}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href={SIGN_UP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors"
              >
                Join the Academy
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            {/* Visual */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <img
                src={ACADEMY_IMAGES.action01}
                alt="TS Galaxy FC academy youth players competing at football festival"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-white">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  <span className="text-xs font-semibold">Youth Development Growth</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          §11  PARENT / PLAYER INFO (FAQ)
          ════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 py-16 lg:py-20">
        <div className="text-center mb-10">
          <span className="text-[10px] font-black text-red-600 tracking-[0.25em] uppercase">
            Information
          </span>
          <h2 className="font-black text-3xl lg:text-4xl mt-2 mb-3">
            For players and parents
          </h2>
        </div>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4">
          {PARENT_FAQS.map((faq) => (
            <div key={faq.q} className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-sm text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          §12  GALLERY
          ════════════════════════════════════════════════════════ */}
      <section className="bg-gray-950 py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-8">
            <span className="text-[10px] font-black text-red-400 tracking-[0.25em] uppercase">
              Gallery
            </span>
            <h2 className="font-black text-3xl lg:text-4xl mt-2 text-white">
              The academy in action
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 lg:gap-3">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl ${img.wide ? 'col-span-2 md:col-span-1 aspect-[4/3]' : 'aspect-square'}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          §13  RELATED LINKS
          ════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 py-16">
        <h2 className="font-black text-2xl lg:text-3xl text-gray-900 text-center mb-8">
          Explore The Rockets
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {RELATED_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => navigate(link.href)}
              className="group bg-gray-50 hover:bg-red-600 border border-gray-100 hover:border-red-600 rounded-2xl p-5 text-left transition-all"
            >
              <p className="font-bold text-sm text-gray-900 group-hover:text-white mb-1 transition-colors">{link.label}</p>
              <p className="text-xs text-gray-500 group-hover:text-red-100 leading-relaxed transition-colors">{link.description}</p>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-white mt-2 transition-colors" />
            </button>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          §14  FINAL CTA
          ════════════════════════════════════════════════════════ */}
      <section className="relative bg-gray-950 text-white overflow-hidden py-20 lg:py-28">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)', backgroundSize: '12px 12px' }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <img src={LOGO.favicon.png256} alt="" aria-hidden="true" className="w-[500px] opacity-[0.03] object-contain" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/20 rounded-full blur-3xl -translate-y-1/2" />

        <div className="relative container mx-auto px-4 lg:px-6 text-center">
          <span className="text-[10px] font-black text-red-400 tracking-[0.25em] uppercase">
            The Next Generation
          </span>
          <h2 className="font-black text-4xl lg:text-6xl mt-3 mb-5 leading-[0.95]">
            Build the future<br />
            <span className="text-red-500">with The Rockets.</span>
          </h2>
          <p className="text-gray-400 text-base max-w-lg mx-auto mb-8">
            Follow academy updates, register your interest and support the next
            generation of TS Galaxy FC talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={SIGN_UP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors"
            >
              Sign-up Here
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <button
              onClick={() => navigate('/news')}
              className="flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
            >
              Read Academy News
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              onClick={() => navigate('/partners')}
              className="flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
            >
              Partner with the Club
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
