import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import {
  ChevronRight, Trophy, Users, Globe, BookOpen,
  Target, Handshake, Mail, Phone, ArrowRight,
  Zap, Heart, Megaphone, Monitor,
} from 'lucide-react';
import { LOGO, THE_CLUB_IMAGES, QUEENS_IMAGES } from '@/lib/assets';
import {
  PARTNERS, CATEGORY_FILTERS, IMPACT_AREAS, WHY_VALUES, OPPORTUNITIES, RELATED_LINKS,
} from '@/lib/partners-data';
import type { PartnerCategory } from '@/lib/partners-data';

// ─── Icon map for impact areas ───────────────────────────────────────────────

const IMPACT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'first-team':    Trophy,
  'queens':        Heart,
  'academy':       BookOpen,
  'matchday':      Users,
  'community':     Handshake,
  'digital-media': Monitor,
};

const WHY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'football-visibility':  Target,
  'supporter-connection': Users,
  'community-relevance':  Heart,
  'digital-exposure':     Globe,
  'development-pathways': BookOpen,
  'womens-football':      Zap,
};

// ─── Partner logo card ────────────────────────────────────────────────────────

function PartnerLogoCard({ partner }: { partner: (typeof PARTNERS)[number] }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
      {/* Logo area */}
      <div className="flex items-center justify-center h-28 p-5 bg-gray-50 border-b border-gray-100">
        {partner.logo ? (
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center gap-1 text-center">
            <Handshake className="w-8 h-8 text-gray-300" />
            <span className="text-xs font-semibold text-gray-400 leading-tight px-2">
              {partner.name}
            </span>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="p-4 flex-1 flex flex-col">
        <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1">
          {partner.category}
        </span>
        <h3 className="font-bold text-sm text-gray-900 mb-1 leading-tight">{partner.name}</h3>
        <p className="text-xs text-gray-500 leading-relaxed flex-1">{partner.description}</p>
      </div>
    </div>
  );
}

// ─── Featured story card ──────────────────────────────────────────────────────

function FeaturedStoryCard({
  eyebrow, headline, body, logo, logoAlt, cta, onCta,
}: {
  eyebrow: string;
  headline: string;
  body: string;
  logo: string | null;
  logoAlt: string;
  cta: string;
  onCta: () => void;
}) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Top: logo on dark */}
      <div className="bg-gray-900 flex items-center justify-center h-36 p-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 40%)',
            backgroundSize: '8px 8px',
          }}
        />
        {logo ? (
          <img src={logo} alt={logoAlt} className="relative max-h-full max-w-[180px] object-contain" />
        ) : (
          <div className="relative flex flex-col items-center gap-2 text-center">
            <Handshake className="w-10 h-10 text-gray-500" />
            <span className="text-sm font-semibold text-gray-400 leading-tight">{logoAlt}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-2">{eyebrow}</span>
        <h3 className="font-bold text-lg text-gray-900 mb-3 leading-snug">{headline}</h3>
        <p className="text-sm text-gray-600 leading-relaxed flex-1">{body}</p>
        <button
          onClick={onCta}
          className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors self-start"
        >
          {cta}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function PartnersPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<PartnerCategory>('All');
  const formRef = useRef<HTMLElement>(null);

  const filteredPartners = activeCategory === 'All'
    ? PARTNERS
    : PARTNERS.filter(p => p.category === activeCategory);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Form state ──────────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    company: '', contact: '', email: '', phone: '',
    interest: '', budget: '', message: '', consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const formValid = form.company && form.contact && form.email && form.phone
    && form.interest && form.message && form.consent;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formValid) return;
    setSubmitted(true);
  }

  // ────────────────────────────────────────────────────────────────────────────

  return (
    <div className="bg-white">

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1: HERO
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <img src={QUEENS_IMAGES.trainingDribble} alt="" className="w-full h-full object-cover object-[center_35%]" />
          <div className="absolute inset-0 bg-gray-950/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/55 to-gray-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)', backgroundSize: '12px 12px' }} aria-hidden="true" />

        {/* Badge watermark */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-0 pointer-events-none select-none overflow-hidden lg:pr-8">
          <img
            src={LOGO.favicon.png256}
            alt=""
            aria-hidden="true"
            className="w-[300px] lg:w-[420px] opacity-[0.05] object-contain"
          />
        </div>

        <div className="relative container mx-auto px-4 lg:px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: copy */}
            <div>
              <span className="inline-block text-[10px] font-black text-red-400 tracking-[0.25em] uppercase mb-4">
                Partners
              </span>
              <h1 className="font-black text-4xl lg:text-6xl leading-[0.95] mb-5">
                Partners<br />
                <span className="text-red-500">powering</span><br />
                The Rockets
              </h1>
              <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-lg mb-8">
                Our partners help TS Galaxy FC grow on the field, connect with communities,
                support development pathways, and bring the club closer to its supporters.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={scrollToForm}
                  className="flex items-center justify-center gap-2 bg-red-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors"
                >
                  <Handshake className="w-4 h-4" aria-hidden="true" />
                  Become a Partner
                </button>
                <button
                  onClick={() => document.getElementById('partner-wall')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center justify-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
                >
                  View Current Partners
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Right: partner count callout */}
            <div className="hidden lg:flex flex-col items-center justify-center gap-4">
              <div className="text-center">
                <p className="font-black text-7xl text-white/10 leading-none">{PARTNERS.length}</p>
                <p className="font-bold text-lg text-white mt-1">current partners</p>
                <p className="text-sm text-gray-400 mt-1">across football, media, lifestyle, development and law</p>
              </div>
              <button
                onClick={() => document.getElementById('partner-wall')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
              >
                View all partners <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2: VALUE STATEMENT
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-[10px] font-black text-red-600 tracking-[0.25em] uppercase">
            Our Philosophy
          </span>
          <h2 className="font-black text-3xl lg:text-4xl mt-2 mb-5 leading-tight">
            Success is built on teamwork — beyond the field
          </h2>
          <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
            At TS Galaxy FC, success is built through teamwork — on the pitch, in the stands,
            in business and across the communities we serve. Our partners bring expertise, resources
            and visibility that help the club grow while connecting their brands to football,
            supporters and meaningful community impact.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Trophy,
              title: 'Football Growth',
              body: 'Partners invest in the performance and infrastructure of a professional DStv Premiership football club.',
            },
            {
              icon: Heart,
              title: 'Community Impact',
              body: 'Football reaches communities, schools and families across Mpumalanga and beyond.',
            },
            {
              icon: Megaphone,
              title: 'Brand Visibility',
              body: 'Partners connect their brands to a passionate supporter base and a growing national football audience.',
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
              <div className="w-11 h-11 bg-red-600 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-base text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3: PARTNER WALL
          ══════════════════════════════════════════════════════════════════════ */}
      <section id="partner-wall" className="bg-gray-50 py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">

          <div className="text-center mb-10">
            <span className="text-[10px] font-black text-red-600 tracking-[0.25em] uppercase">
              Current Partners
            </span>
            <h2 className="font-black text-3xl lg:text-4xl mt-2 mb-3">Our Partner Network</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Brands and organisations supporting The Rockets journey.
            </p>
          </div>

          {/* Category filter chips */}
          <div
            className="flex gap-2 overflow-x-auto pb-2 mb-8 justify-center flex-wrap"
            style={{ scrollbarWidth: 'none' }}
          >
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Partner grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {filteredPartners.map((partner) => (
              <PartnerLogoCard key={partner.id} partner={partner} />
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4: FEATURED PARTNER STORIES
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 py-16 lg:py-20">

        <div className="text-center mb-10">
          <span className="text-[10px] font-black text-red-600 tracking-[0.25em] uppercase">
            Partner Stories
          </span>
          <h2 className="font-black text-3xl lg:text-4xl mt-2 mb-3">Partnerships with purpose</h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Each partner is part of a bigger story — football, community, ambition and growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeaturedStoryCard
            eyebrow="Development Partnership"
            headline="Football at the heart of education"
            body="TS Galaxy's launch at AISJ Midrand Campus shows how club partnerships can support structured football activity, families and young players beyond traditional matchday environments. The CCA programme connects the club's identity with youth ambition."
            logo={PARTNERS.find(p => p.id === 'aisj-midrand-campus')?.logo ?? null}
            logoAlt="AISJ Midrand Campus logo"
            cta="View Development Pathway"
            onCta={() => navigate('/academy')}
          />
          <FeaturedStoryCard
            eyebrow="Media Partnership"
            headline="Amplifying The Rockets across the region"
            body="Ikwekwezi FM and Ligwalagwala FM help amplify club stories, supporter conversations, football updates and community reach across key regional audiences in Mpumalanga, Limpopo and Gauteng. Media partners make The Rockets louder."
            logo={PARTNERS.find(p => p.id === 'ikwekwezi-fm')?.logo ?? null}
            logoAlt="Ikwekwezi FM logo"
            cta="Explore Club News"
            onCta={() => navigate('/news')}
          />
          <FeaturedStoryCard
            eyebrow="Lifestyle Partnership"
            headline="Connecting active brands to an active audience"
            body="Commercial and lifestyle partners connect their brands to an active football audience while supporting the club's broader journey and supporter experience. Aquelle ViV reflects the energy and commitment that drives The Rockets forward."
            logo={PARTNERS.find(p => p.id === 'aquelle-viv')?.logo ?? null}
            logoAlt="Aquelle ViV logo"
            cta="Become a Partner"
            onCta={scrollToForm}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5: IMPACT AREAS
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-950 text-white py-16 lg:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)',
            backgroundSize: '12px 12px',
          }}
        />
        <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <span className="text-[10px] font-black text-red-400 tracking-[0.25em] uppercase">
              Impact Areas
            </span>
            <h2 className="font-black text-3xl lg:text-4xl mt-2 mb-3">
              Where partners make an impact
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Partnership opportunities span every dimension of the TS Galaxy FC family.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {IMPACT_AREAS.map((area) => {
              const Icon = IMPACT_ICONS[area.id] ?? Target;
              return (
                <div
                  key={area.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-red-400" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-sm text-white mb-1.5 leading-tight">{area.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{area.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 6: WHY PARTNER
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 py-16 lg:py-20">

        <div className="text-center mb-10">
          <span className="text-[10px] font-black text-red-600 tracking-[0.25em] uppercase">
            Commercial Value
          </span>
          <h2 className="font-black text-3xl lg:text-4xl mt-2 mb-3">
            Why brands partner with The Rockets
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            TS Galaxy FC connects partners with football, communities and supporters in Mpumalanga and across South Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_VALUES.map((val) => {
            const Icon = WHY_ICONS[val.id] ?? Target;
            return (
              <div
                key={val.id}
                className="group flex gap-4 bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-red-100 transition-all"
              >
                <div className="w-10 h-10 bg-red-50 group-hover:bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                  <Icon className="w-5 h-5 text-red-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1.5">{val.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{val.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 7: OPPORTUNITIES
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">

          <div className="text-center mb-10">
            <span className="text-[10px] font-black text-red-600 tracking-[0.25em] uppercase">
              Ways to Partner
            </span>
            <h2 className="font-black text-3xl lg:text-4xl mt-2 mb-3">Partnership opportunities</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Partnership packages can be tailored based on brand objectives, available inventory and club priorities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {OPPORTUNITIES.map((opp) => (
              <div
                key={opp.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-red-100 transition-all flex flex-col"
              >
                <h3 className="font-bold text-sm text-gray-900 mb-2">{opp.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed flex-1">{opp.description}</p>
                <button
                  onClick={scrollToForm}
                  className="mt-4 text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
                >
                  Enquire
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 9: BECOME A PARTNER FORM
          ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="partner-form"
        ref={formRef}
        className="bg-gray-50 py-16 lg:py-20"
        aria-labelledby="form-heading"
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left: value summary */}
            <div className="lg:sticky lg:top-[89px]">
              <span className="text-[10px] font-black text-red-600 tracking-[0.25em] uppercase">
                Partnership Enquiry
              </span>
              <h2 id="form-heading" className="font-black text-3xl lg:text-4xl mt-2 mb-5 leading-tight">
                Become a Partner
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Tell us how your brand would like to connect with TS Galaxy FC,
                supporters and community football. We'll be in touch to discuss
                the right partnership for your objectives.
              </p>

              {/* What you get */}
              <div className="space-y-3">
                {[
                  'Access to a passionate football supporter base',
                  'Tailored partnership packages to match your goals',
                  'Visibility across first team, academy, and Queens',
                  'Community connection through football-led programmes',
                  'Media and digital exposure opportunities',
                  'Matchday brand presence at Mbombela Stadium',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-red-600 rounded-full" />
                    </div>
                    <p className="text-sm text-gray-700">{point}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-gray-900 rounded-2xl">
                <p className="text-xs text-gray-400 mb-1">Direct contact</p>
                <a
                  href="mailto:commercial@tsgalaxyfc.co.za"
                  className="flex items-center gap-2 text-sm font-semibold text-white hover:text-red-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-red-400" aria-hidden="true" />
                  commercial@tsgalaxyfc.co.za
                </a>
                <a
                  href="tel:+27137500060"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors mt-2"
                >
                  <Phone className="w-4 h-4 text-gray-500" aria-hidden="true" />
                  +27 13 750 0060
                </a>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Handshake className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Enquiry received</h3>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto">
                    Thank you for your interest in partnering with TS Galaxy FC.
                    The commercial team will be in touch shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-semibold text-red-600 hover:text-red-700"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="pf-company" className="block text-xs font-bold text-gray-700 mb-1.5">
                        Company name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="pf-company"
                        type="text"
                        required
                        value={form.company}
                        onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200 transition"
                        placeholder="e.g. Acme Corporation"
                      />
                    </div>
                    <div>
                      <label htmlFor="pf-contact" className="block text-xs font-bold text-gray-700 mb-1.5">
                        Contact person <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="pf-contact"
                        type="text"
                        required
                        value={form.contact}
                        onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200 transition"
                        placeholder="Full name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="pf-email" className="block text-xs font-bold text-gray-700 mb-1.5">
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="pf-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200 transition"
                        placeholder="name@company.co.za"
                      />
                    </div>
                    <div>
                      <label htmlFor="pf-phone" className="block text-xs font-bold text-gray-700 mb-1.5">
                        Phone <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="pf-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200 transition"
                        placeholder="+27 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pf-interest" className="block text-xs font-bold text-gray-700 mb-1.5">
                      Partnership interest <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="pf-interest"
                      required
                      value={form.interest}
                      onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200 transition"
                    >
                      <option value="">Select an area…</option>
                      <option>Main Club Partnership</option>
                      <option>Matchday Partnership</option>
                      <option>Kit / Technical Partnership</option>
                      <option>Academy Partnership</option>
                      <option>TS Galaxy Queens Partnership</option>
                      <option>Digital Content Partnership</option>
                      <option>Community Campaign</option>
                      <option>Media Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="pf-budget" className="block text-xs font-bold text-gray-700 mb-1.5">
                      Budget range <span className="text-gray-400 font-medium">(optional)</span>
                    </label>
                    <select
                      id="pf-budget"
                      value={form.budget}
                      onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200 transition"
                    >
                      <option value="">Prefer not to say</option>
                      <option>Under R50,000</option>
                      <option>R50,000 – R200,000</option>
                      <option>R200,000 – R500,000</option>
                      <option>R500,000 – R1,000,000</option>
                      <option>Over R1,000,000</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="pf-message" className="block text-xs font-bold text-gray-700 mb-1.5">
                      Message <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="pf-message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200 transition resize-none"
                      placeholder="Tell us about your brand and how you'd like to connect with TS Galaxy FC…"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="pf-consent"
                      type="checkbox"
                      required
                      checked={form.consent}
                      onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))}
                      className="mt-0.5 w-4 h-4 accent-red-600 flex-shrink-0"
                    />
                    <label htmlFor="pf-consent" className="text-xs text-gray-600 leading-relaxed">
                      I agree to be contacted about partnership opportunities with TS Galaxy FC.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!formValid}
                    className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    <Handshake className="w-4 h-4" aria-hidden="true" />
                    Submit Partnership Enquiry
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    Or email us directly at{' '}
                    <a href="mailto:commercial@tsgalaxyfc.co.za" className="text-red-600 underline">
                      commercial@tsgalaxyfc.co.za
                    </a>
                  </p>

                  <p className="text-center text-[10px] text-gray-400">
                    Form submission handling to be connected to the commercial team backend.
                  </p>

                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 10: RELATED LINKS
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 py-16">

        <div className="text-center mb-8">
          <h2 className="font-black text-2xl lg:text-3xl text-gray-900">Explore The Rockets</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {RELATED_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => navigate(link.href)}
              className="group bg-gray-50 hover:bg-red-600 border border-gray-100 hover:border-red-600 rounded-2xl p-5 text-left transition-all"
            >
              <p className="font-bold text-sm text-gray-900 group-hover:text-white mb-1 transition-colors">
                {link.label}
              </p>
              <p className="text-xs text-gray-500 group-hover:text-red-100 transition-colors leading-relaxed">
                {link.description}
              </p>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-white mt-2 transition-colors" />
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 11: FINAL CTA
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gray-950 text-white overflow-hidden py-20 lg:py-28">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)',
            backgroundSize: '12px 12px',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <img
            src={LOGO.favicon.png256}
            alt=""
            aria-hidden="true"
            className="w-[500px] opacity-[0.03] object-contain"
          />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/20 rounded-full blur-3xl -translate-y-1/2" />

        <div className="relative container mx-auto px-4 lg:px-6 text-center">
          <span className="text-[10px] font-black text-red-400 tracking-[0.25em] uppercase">
            Ready to Connect
          </span>
          <h2 className="font-black text-4xl lg:text-6xl mt-3 mb-5 leading-[0.95]">
            Build with<br />
            <span className="text-red-500">The Rockets.</span>
          </h2>
          <p className="text-gray-400 text-base max-w-lg mx-auto mb-8">
            Partner with TS Galaxy FC and connect your brand to football, supporters,
            community and ambition.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={scrollToForm}
              className="flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors"
            >
              <Handshake className="w-4 h-4" aria-hidden="true" />
              Become a Partner
            </button>
            <button
              onClick={() => navigate('/fixtures')}
              className="flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
            >
              View Fixtures
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              onClick={() => navigate('/the-club')}
              className="flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
            >
              Explore The Club
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
