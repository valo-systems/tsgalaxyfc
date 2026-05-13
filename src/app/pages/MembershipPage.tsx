import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import {
  Check, X, ChevronRight, ChevronDown,
  Shield, Ticket, ShoppingBag, Users,
  CreditCard, Copy, CheckCircle,
  Calendar, Newspaper, BookOpen, Rocket,
} from 'lucide-react';
import { LOGO, SHOP_IMAGES, THE_CLUB_IMAGES } from '@/lib/assets';

// ─── Style constants ──────────────────────────────────────────────────────────

const STRIPE_BG = {
  backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)',
  backgroundSize: '20px 20px',
};

// ─── Data ────────────────────────────────────────────────────────────────────

type TierId = 'student' | 'white-card' | 'red-card' | 'black-card';

interface Tier {
  id: TierId;
  name: string;
  price: number;
  priceLabel: string;
  badge?: string;
  badgeCls?: string;
  accentCls: string;       // border colour
  headingCls: string;      // price colour
  ctaLabel: string;
  benefits: string[];
  featured?: boolean;
}

const TIERS: Tier[] = [
  {
    id: 'student',
    name: 'Student Membership',
    price: 200,
    priceLabel: 'R200',
    accentCls: 'border-gray-300',
    headingCls: 'text-gray-900',
    ctaLabel: 'Select Student',
    benefits: [
      "Supporter's T-shirt",
      'Membership Card',
    ],
  },
  {
    id: 'white-card',
    name: 'White Card',
    price: 400,
    priceLabel: 'R400',
    accentCls: 'border-gray-300',
    headingCls: 'text-gray-900',
    ctaLabel: 'Select White Card',
    benefits: [
      "Supporter's T-shirt",
      'Membership Card',
    ],
  },
  {
    id: 'red-card',
    name: 'Red Card',
    price: 2250,
    priceLabel: 'R2,250',
    badge: 'Matchday Benefits',
    badgeCls: 'bg-red-600 text-white',
    accentCls: 'border-red-500',
    headingCls: 'text-red-600',
    ctaLabel: 'Select Red Card',
    featured: true,
    benefits: [
      'Replica Shirt',
      "Supporter's T-shirt",
      'Bucket Hat',
      '15x Home Game Tickets',
      'Membership Card',
    ],
  },
  {
    id: 'black-card',
    name: 'Black Card',
    price: 3500,
    priceLabel: 'R3,500',
    badge: 'Premium',
    badgeCls: 'bg-gray-900 text-white',
    accentCls: 'border-gray-900',
    headingCls: 'text-gray-900',
    ctaLabel: 'Select Black Card',
    benefits: [
      'Replica Shirt (Home Only)',
      "Supporter's T-shirt",
      'Tracksuit',
      'Cap',
      '15x Home Game Tickets',
      'Membership Card',
    ],
  },
];

// All possible benefits (for comparison table)
const ALL_BENEFITS = [
  'Price',
  "Supporter's T-shirt",
  'Membership Card',
  'Replica Shirt',
  'Bucket Hat',
  'Tracksuit',
  'Cap',
  '15x Home Game Tickets',
];

const TSHIRT_SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL'];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Choose your membership',
    body: 'Select the tier that suits you — Student, White, Red or Black Card.',
  },
  {
    step: 2,
    title: 'Complete your details',
    body: 'Submit the membership form with your contact details, T-shirt size and preferred branch area.',
  },
  {
    step: 3,
    title: 'Make your payment',
    body: 'Transfer your membership fee to the club account. Use your Name & Surname as the payment reference.',
  },
  {
    step: 4,
    title: 'Club confirmation',
    body: 'The club will confirm your membership and arrange your membership benefits.',
  },
];

const RELATED = [
  { label: 'Fixtures',  sub: 'View upcoming home matches.',         path: '/fixtures',   Icon: Calendar    },
  { label: 'Shop',      sub: 'Browse official merchandise.',        path: '/shop',       Icon: ShoppingBag },
  { label: 'News',      sub: 'Follow latest club updates.',         path: '/news',       Icon: Newspaper   },
  { label: 'Teams',     sub: 'Meet the players.',                   path: '/squad',      Icon: Users       },
  { label: 'Academy',   sub: 'Discover the development pathway.',   path: '/academy',    Icon: Rocket      },
];

// ─── MembershipCardMockup ─────────────────────────────────────────────────────

function MembershipCardMockup({ tier }: { tier?: Tier }) {
  const displayTier = tier ?? TIERS[3]; // default Black Card
  return (
    <div className="relative w-full max-w-[340px] mx-auto">
      {/* Card */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 rounded-2xl overflow-hidden shadow-2xl aspect-[1.586/1] border border-white/10">
        {/* Red top bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 to-red-500" />
        {/* Subtle diagonal stripes */}
        <div className="absolute inset-0 opacity-[0.03]" style={STRIPE_BG} />
        {/* Badge watermark */}
        <img
          src={LOGO.favicon.png256}
          alt=""
          aria-hidden="true"
          className="absolute -right-6 -bottom-6 w-32 h-32 opacity-[0.07] pointer-events-none select-none"
        />

        {/* Content */}
        <div className="relative z-10 p-5 h-full flex flex-col justify-between">
          {/* Top row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src={LOGO.favicon.png64} alt="TS Galaxy FC" className="w-8 h-8" />
              <div>
                <p className="text-white font-black text-[10px] leading-tight">TS GALAXY FC</p>
                <p className="text-gray-400 text-[9px] leading-tight">OFFICIAL MEMBERSHIP</p>
              </div>
            </div>
            {displayTier.badge && (
              <span className="text-[9px] font-black uppercase tracking-widest bg-red-600 text-white px-2 py-0.5 rounded-full">
                {displayTier.badge}
              </span>
            )}
          </div>

          {/* Middle */}
          <div>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">Member Name</p>
            <p className="text-white font-black text-lg leading-tight">Supporter Name</p>
          </div>

          {/* Bottom row */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-0.5">Membership</p>
              <p className="text-white font-black text-sm">{displayTier.name}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-0.5">Season</p>
              <p className="text-white font-black text-sm">2025/26</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shadow glow */}
      <div className="absolute inset-0 rounded-2xl bg-red-600/10 blur-xl -z-10 scale-90 translate-y-4" aria-hidden="true" />
    </div>
  );
}

// ─── TierCard ─────────────────────────────────────────────────────────────────

function TierCard({
  tier, selected, onSelect,
}: { tier: Tier; selected: boolean; onSelect: () => void }) {
  return (
    <div className={`relative bg-white rounded-2xl border-2 overflow-hidden flex flex-col transition-all duration-200 shadow-sm hover:shadow-lg ${
      selected ? 'border-red-600 shadow-red-100' : tier.accentCls
    }`}>
      {tier.badge && (
        <div className={`${tier.badgeCls} text-center py-2 text-[11px] font-black uppercase tracking-widest`}>
          {tier.badge}
        </div>
      )}
      {!tier.badge && <div className="h-8" />}

      <div className="p-5 lg:p-6 flex flex-col flex-1">
        <h3 className="font-black text-base lg:text-lg text-gray-900 mb-1">{tier.name}</h3>
        <p className={`font-black text-3xl lg:text-4xl mb-1 ${tier.headingCls}`}>{tier.priceLabel}</p>
        <p className="text-xs text-gray-400 mb-5">per season</p>

        <ul className="space-y-2.5 mb-6 flex-1">
          {tier.benefits.map(b => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>

        <button
          onClick={onSelect}
          aria-pressed={selected}
          className={`w-full py-3 rounded-xl font-black text-sm transition-all ${
            selected
              ? 'bg-red-600 text-white ring-2 ring-red-600 ring-offset-2'
              : tier.featured
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          {selected ? 'Selected ✓' : tier.ctaLabel}
        </button>
      </div>
    </div>
  );
}

// ─── ComparisonTable ──────────────────────────────────────────────────────────

function benefitValue(tier: Tier, benefit: string): string | null {
  if (benefit === 'Price') return tier.priceLabel;
  // exact match in benefits
  if (tier.benefits.some(b => b.toLowerCase().includes(benefit.toLowerCase().replace('(home only)', '').trim()))) {
    return '✓';
  }
  return null;
}

function ComparisonTable() {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden lg:block overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-950 text-white">
              <th className="text-left px-5 py-4 font-black text-xs uppercase tracking-widest w-1/3">Benefit</th>
              {TIERS.map(t => (
                <th key={t.id} className="text-center px-4 py-4 font-black text-xs uppercase tracking-widest">
                  <span className="block">{t.name}</span>
                  <span className={`text-base font-black ${t.id === 'red-card' ? 'text-red-400' : 'text-gray-300'}`}>{t.priceLabel}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALL_BENEFITS.filter(b => b !== 'Price').map((benefit, idx) => (
              <tr key={benefit} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-5 py-3.5 font-semibold text-gray-700">{benefit}</td>
                {TIERS.map(t => {
                  const val = benefitValue(t, benefit);
                  return (
                    <td key={t.id} className="text-center px-4 py-3.5">
                      {val === '✓'
                        ? <Check className="w-4 h-4 text-green-500 mx-auto" aria-label="Included" />
                        : <X className="w-4 h-4 text-gray-300 mx-auto" aria-label="Not included" />
                      }
                    </td>
                  );
                })}
              </tr>
            ))}
            {/* Price row last */}
            <tr className="bg-gray-950 text-white">
              <td className="px-5 py-4 font-black text-xs uppercase tracking-widest">Total Price</td>
              {TIERS.map(t => (
                <td key={t.id} className={`text-center px-4 py-4 font-black text-lg ${t.id === 'red-card' ? 'text-red-400' : ''}`}>
                  {t.priceLabel}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile comparison cards */}
      <div className="lg:hidden space-y-4">
        {TIERS.map(t => (
          <div key={t.id} className={`bg-white rounded-2xl border-2 overflow-hidden ${t.accentCls}`}>
            <div className={`px-4 py-3 flex items-center justify-between ${t.featured ? 'bg-red-600 text-white' : 'bg-gray-950 text-white'}`}>
              <span className="font-black text-sm">{t.name}</span>
              <span className="font-black text-xl">{t.priceLabel}</span>
            </div>
            <div className="p-4">
              {ALL_BENEFITS.filter(b => b !== 'Price').map(benefit => {
                const has = benefitValue(t, benefit) === '✓';
                return (
                  <div key={benefit} className={`flex items-center justify-between py-2 border-b border-gray-50 last:border-0 ${has ? '' : 'opacity-40'}`}>
                    <span className="text-sm text-gray-700">{benefit}</span>
                    {has
                      ? <Check className="w-4 h-4 text-green-500" aria-label="Included" />
                      : <X className="w-4 h-4 text-gray-300" aria-label="Not included" />
                    }
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── CopyButton ───────────────────────────────────────────────────────────────

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all ${
        copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      aria-label={copied ? 'Copied' : `Copy ${label}`}
    >
      {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

// ─── MembershipPage ───────────────────────────────────────────────────────────

export function MembershipPage() {
  const navigate = useNavigate();
  const formRef  = useRef<HTMLDivElement>(null);

  // form state
  const [selectedTier, setSelectedTier] = useState<TierId | ''>('');
  const [firstName,    setFirstName]    = useState('');
  const [lastName,     setLastName]     = useState('');
  const [idNumber,     setIdNumber]     = useState('');
  const [gender,       setGender]       = useState('');
  const [phone,        setPhone]        = useState('');
  const [altPhone,     setAltPhone]     = useState('');
  const [email,        setEmail]        = useState('');
  const [address,      setAddress]      = useState('');
  const [branch,       setBranch]       = useState('');
  const [occupation,   setOccupation]   = useState('');
  const [shirtSize,    setShirtSize]    = useState('');
  const [consent1,     setConsent1]     = useState(false);
  const [consent2,     setConsent2]     = useState(false);
  const [submitted,    setSubmitted]    = useState(false);
  const [termsOpen,    setTermsOpen]    = useState(false);

  const activeTier = TIERS.find(t => t.id === selectedTier);

  function selectAndScroll(tierId: TierId) {
    setSelectedTier(tierId);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (consent1 && consent2 && selectedTier) setSubmitted(true);
  }

  const inputCls = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors";
  const labelCls = "block text-xs font-black text-gray-700 mb-1.5";

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          § 1  HERO
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative bg-gray-950 text-white overflow-hidden"
        aria-label="TS Galaxy FC Club Membership"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <img src={THE_CLUB_IMAGES.stadium01} alt="" className="w-full h-full object-cover object-[center_40%]" />
          <div className="absolute inset-0 bg-gray-950/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/55 to-gray-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={STRIPE_BG} aria-hidden="true" />
        <img src={LOGO.favicon.png256} alt="" aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-48 lg:w-72 opacity-[0.05] pointer-events-none select-none" />

        <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-16 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">

            {/* Left: copy */}
            <div className="flex-1 min-w-0 pb-10 lg:pb-0">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" aria-hidden="true" />
                <span className="text-[11px] font-black tracking-widest text-gray-200 uppercase">Club Membership</span>
              </div>

              <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-tight mb-3">
                <span className="block">Become a</span>
                <span className="block text-red-400">Rockets Member.</span>
              </h1>

              <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6 max-w-lg">
                Join the TS Galaxy FC family and get closer to the club with official supporter benefits, merchandise and matchday access.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => document.getElementById('membership-tiers')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-red-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-red-500 transition-colors text-center"
                >
                  Choose Membership
                </button>
                <button
                  onClick={() => document.getElementById('membership-benefits')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors text-center"
                >
                  View Benefits
                </button>
              </div>

              {/* Quick tier price strip */}
              <div className="flex flex-wrap gap-3 mt-6">
                {TIERS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => selectAndScroll(t.id)}
                    className="flex items-center gap-1.5 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full text-xs font-bold text-gray-200 hover:bg-white/20 transition-colors"
                  >
                    <span>{t.name}</span>
                    <span className={t.id === 'red-card' ? 'text-red-400' : 'text-gray-400'}>{t.priceLabel}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: card mockup */}
            <div className="lg:w-[320px] xl:w-[360px] flex-shrink-0">
              <MembershipCardMockup tier={activeTier} />
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 2  WHY JOIN
          ══════════════════════════════════════════════════════════════ */}
      <section id="membership-benefits" className="container mx-auto px-4 lg:px-6 mt-14 lg:mt-16" aria-labelledby="why-join-heading">
        <div className="text-center mb-8">
          <span className="text-[11px] font-black text-red-600 uppercase tracking-widest">Member Benefits</span>
          <h2 id="why-join-heading" className="font-black text-2xl lg:text-3xl text-gray-900 tracking-tight mt-1">
            Get closer to The Rockets
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              Icon: CreditCard,
              title: 'Official Supporter Identity',
              body: 'Get your membership card and become part of the official TS Galaxy FC supporter family.',
            },
            {
              Icon: Ticket,
              title: 'Matchday Benefits',
              body: 'Selected tiers include home game tickets — up to 15 home matches per season.',
            },
            {
              Icon: ShoppingBag,
              title: 'Official Merchandise',
              body: 'Supporter shirts, replica shirts, bucket hats, caps and tracksuits depending on your tier.',
            },
            {
              Icon: Users,
              title: 'Club Connection',
              body: 'Stay connected to fixtures, news, shop releases and official supporter updates.',
            },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-red-600" aria-hidden="true" />
              </div>
              <h3 className="font-black text-sm text-gray-900 mb-2">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 3  TIER CARDS
          ══════════════════════════════════════════════════════════════ */}
      <section id="membership-tiers" className="container mx-auto px-4 lg:px-6 mt-14 lg:mt-16" aria-labelledby="tiers-heading">
        <div className="text-center mb-8">
          <span className="text-[11px] font-black text-red-600 uppercase tracking-widest">Membership Options</span>
          <h2 id="tiers-heading" className="font-black text-2xl lg:text-3xl text-gray-900 tracking-tight mt-1">
            Choose your membership
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
            Select the tier that suits you — all tiers include an official Membership Card.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TIERS.map(tier => (
            <TierCard key={tier.id} tier={tier} selected={selectedTier === tier.id} onSelect={() => selectAndScroll(tier.id)} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 4  COMPARISON
          ══════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 mt-14 lg:mt-16" aria-labelledby="comparison-heading">
        <div className="mb-6">
          <span className="text-[11px] font-black text-red-600 uppercase tracking-widest">Side by Side</span>
          <h2 id="comparison-heading" className="font-black text-2xl lg:text-3xl text-gray-900 tracking-tight mt-1">
            Tier comparison
          </h2>
        </div>
        <ComparisonTable />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 5  HOW IT WORKS
          ══════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 mt-14 lg:mt-16" aria-labelledby="how-heading">
        <div className="text-center mb-8">
          <span className="text-[11px] font-black text-red-600 uppercase tracking-widest">Simple Process</span>
          <h2 id="how-heading" className="font-black text-2xl lg:text-3xl text-gray-900 tracking-tight mt-1">
            How membership works
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOW_IT_WORKS.map(({ step, title, body }) => (
            <div key={step} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center mb-4">
                <span className="text-white font-black text-base">{step}</span>
              </div>
              <h3 className="font-black text-sm text-gray-900 mb-2">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
              {/* connector line — desktop only */}
              {step < HOW_IT_WORKS.length && (
                <div className="hidden lg:block absolute top-9 -right-2.5 w-5 h-0.5 bg-gray-200" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 6  MEMBERSHIP FORM + SUMMARY
          ══════════════════════════════════════════════════════════════ */}
      <section
        ref={formRef}
        id="membership-form"
        className="container mx-auto px-4 lg:px-6 mt-14 lg:mt-16"
        aria-labelledby="form-heading"
      >
        <div className="mb-6">
          <span className="text-[11px] font-black text-red-600 uppercase tracking-widest">Join The Club</span>
          <h2 id="form-heading" className="font-black text-2xl lg:text-3xl text-gray-900 tracking-tight mt-1">
            Membership Signup
          </h2>
          <p className="text-gray-500 text-sm mt-1 max-w-xl">
            Choose your membership tier and submit your details. The club will use these to process your membership.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── Form ── */}
          <div className="flex-1 min-w-0">
            {submitted ? (
              <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-8 text-center">
                <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                <h3 className="font-black text-xl text-gray-900 mb-2">Application Submitted!</h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto mb-4">
                  Your membership application has been received. The club will contact you to confirm your membership and payment.
                </p>
                <p className="text-xs text-gray-400 mb-6">
                  Remember to make your bank transfer using <strong>Name & Surname</strong> as your reference.
                </p>
                <button onClick={() => document.getElementById('payment-info')?.scrollIntoView({ behavior: 'smooth' })} className="bg-red-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-red-700 transition-colors">
                  View Payment Details
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                {/* A. Personal Details */}
                <fieldset className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-6">
                  <legend className="font-black text-sm text-gray-900 px-1 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-red-600 text-white text-[10px] font-black flex items-center justify-center">A</span>
                    Personal Details
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="mem-first" className={labelCls}>First Name <span className="text-red-500">*</span></label>
                      <input id="mem-first" type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="mem-last" className={labelCls}>Last Name <span className="text-red-500">*</span></label>
                      <input id="mem-last" type="text" required value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="mem-id" className={labelCls}>ID Number <span className="text-red-500">*</span></label>
                      <input id="mem-id" type="text" required value={idNumber} onChange={e => setIdNumber(e.target.value)} placeholder="SA ID number" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="mem-gender" className={labelCls}>Gender <span className="text-red-500">*</span></label>
                      <select id="mem-gender" required value={gender} onChange={e => setGender(e.target.value)} className={inputCls}>
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                </fieldset>

                {/* B. Contact Details */}
                <fieldset className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-6">
                  <legend className="font-black text-sm text-gray-900 px-1 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-red-600 text-white text-[10px] font-black flex items-center justify-center">B</span>
                    Contact Details
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="mem-phone" className={labelCls}>Phone Number <span className="text-red-500">*</span></label>
                      <input id="mem-phone" type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+27 XX XXX XXXX" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="mem-altphone" className={labelCls}>Alternate Number</label>
                      <input id="mem-altphone" type="tel" value={altPhone} onChange={e => setAltPhone(e.target.value)} placeholder="Optional" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="mem-email" className={labelCls}>Email Address <span className="text-red-500">*</span></label>
                      <input id="mem-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="mem-address" className={labelCls}>Address <span className="text-red-500">*</span></label>
                      <input id="mem-address" type="text" required value={address} onChange={e => setAddress(e.target.value)} placeholder="Physical address" className={inputCls} />
                    </div>
                  </div>
                </fieldset>

                {/* C. Supporter Details */}
                <fieldset className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-6">
                  <legend className="font-black text-sm text-gray-900 px-1 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-red-600 text-white text-[10px] font-black flex items-center justify-center">C</span>
                    Supporter Details
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="mem-branch" className={labelCls}>Preferred Branch Area</label>
                      <input id="mem-branch" type="text" value={branch} onChange={e => setBranch(e.target.value)} placeholder="e.g. Nelspruit, Secunda…" className={inputCls} />
                      <p className="text-[11px] text-gray-400 mt-1">Type the area you are from.</p>
                    </div>
                    <div>
                      <label htmlFor="mem-occupation" className={labelCls}>Occupation</label>
                      <input id="mem-occupation" type="text" value={occupation} onChange={e => setOccupation(e.target.value)} placeholder="Your occupation" className={inputCls} />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="mem-shirtsize" className={labelCls}>T-shirt Size <span className="text-red-500">*</span></label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {TSHIRT_SIZES.map(s => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setShirtSize(s)}
                            aria-pressed={shirtSize === s}
                            className={`min-w-[52px] h-11 px-3 rounded-xl font-black text-sm border-2 transition-all ${shirtSize === s ? 'border-red-600 bg-red-50 text-red-600' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </fieldset>

                {/* D. Membership Selection */}
                <fieldset className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-6">
                  <legend className="font-black text-sm text-gray-900 px-1 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-red-600 text-white text-[10px] font-black flex items-center justify-center">D</span>
                    Membership Selection <span className="text-red-500 ml-1">*</span>
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TIERS.map(t => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTier(t.id)}
                        aria-pressed={selectedTier === t.id}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${selectedTier === t.id ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div>
                          <p className={`font-black text-sm ${selectedTier === t.id ? 'text-red-600' : 'text-gray-900'}`}>{t.name}</p>
                          {t.badge && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${t.badgeCls}`}>{t.badge}</span>}
                        </div>
                        <p className={`font-black text-lg flex-shrink-0 ml-3 ${selectedTier === t.id ? 'text-red-600' : 'text-gray-900'}`}>{t.priceLabel}</p>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* E. Consent */}
                <fieldset className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-6">
                  <legend className="font-black text-sm text-gray-900 px-1 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-red-600 text-white text-[10px] font-black flex items-center justify-center">E</span>
                    Consent
                  </legend>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" required checked={consent1} onChange={e => setConsent1(e.target.checked)} className="mt-0.5 w-4 h-4 accent-red-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600 leading-relaxed">
                        I confirm that the details provided are correct and accurate. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" required checked={consent2} onChange={e => setConsent2(e.target.checked)} className="mt-0.5 w-4 h-4 accent-red-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600 leading-relaxed">
                        I agree to be contacted by TS Galaxy FC about my membership and consent to my details being used for membership purposes. <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>
                </fieldset>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={!selectedTier || !consent1 || !consent2}
                    className="flex-1 bg-red-600 text-white font-black text-sm py-4 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Membership Application
                  </button>
                  <a
                    href="https://wa.me/27137500060?text=Hi%20TS%20Galaxy%20FC!%20I%27d%20like%20to%20enquire%20about%20club%20membership."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white font-black text-sm px-6 py-4 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    <Shield className="w-4 h-4" aria-hidden="true" />
                    WhatsApp Support
                  </a>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  Submission handling to be connected to club database. Your application will be reviewed by the club membership team.
                </p>
              </form>
            )}
          </div>

          {/* ── Sticky summary sidebar ── */}
          <aside className="lg:w-72 xl:w-80 flex-shrink-0 lg:sticky lg:top-[89px]" aria-label="Selected membership summary">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gray-950 px-5 py-4">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Your Selection</p>
                {activeTier ? (
                  <>
                    <p className="font-black text-white text-lg leading-tight">{activeTier.name}</p>
                    <p className="text-red-400 font-black text-2xl mt-0.5">{activeTier.priceLabel}</p>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm">No tier selected yet</p>
                )}
              </div>
              <div className="p-5">
                {activeTier ? (
                  <>
                    <p className="text-xs font-black text-gray-700 mb-3 uppercase tracking-wide">Includes:</p>
                    <ul className="space-y-2 mb-5">
                      {activeTier.benefits.map(b => (
                        <li key={b} className="flex items-start gap-2 text-xs text-gray-600">
                          <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-xs text-gray-400 mb-5">Select a membership tier above to see what's included.</p>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <p className="text-xs font-black text-amber-800 mb-0.5">Payment Reference</p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Use your <strong>Name &amp; Surname</strong> as the payment reference when making your bank transfer.
                  </p>
                </div>

                {!activeTier && (
                  <button
                    onClick={() => document.getElementById('membership-tiers')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mt-4 w-full bg-red-600 text-white font-black text-xs py-3 rounded-xl hover:bg-red-700 transition-colors"
                  >
                    Choose a Tier
                  </button>
                )}
              </div>
            </div>

            {/* Membership card preview — desktop */}
            <div className="mt-4 hidden lg:block">
              <MembershipCardMockup tier={activeTier} />
            </div>
          </aside>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 7  PAYMENT INFORMATION
          ══════════════════════════════════════════════════════════════ */}
      <section id="payment-info" className="container mx-auto px-4 lg:px-6 mt-14 lg:mt-16" aria-labelledby="payment-heading">
        <div className="mb-6">
          <span className="text-[11px] font-black text-red-600 uppercase tracking-widest">Bank Transfer</span>
          <h2 id="payment-heading" className="font-black text-2xl lg:text-3xl text-gray-900 tracking-tight mt-1">
            Membership Payment Information
          </h2>
          <p className="text-gray-500 text-sm mt-1 max-w-xl">
            Memberships are payable by bank transfer after submitting your application. Use your Name &amp; Surname as the payment reference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Bank details card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-950 px-5 py-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-white font-black text-sm">Bank Transfer Payment</p>
                <p className="text-gray-400 text-[11px]">Online payment coming soon</p>
              </div>
            </div>
            <div className="p-5 space-y-3">
              {[
                { label: 'Bank Name',        value: 'ABSA Business Account' },
                { label: 'Account Number',   value: '4097382207',          copyable: true },
                { label: 'Account Holder',   value: 'TSGalaxyFC',           copyable: true },
                { label: 'Reference',        value: 'Name & Surname',       highlight: true },
              ].map(({ label, value, copyable, highlight }) => (
                <div key={label} className={`flex items-center justify-between py-3 border-b border-gray-50 last:border-0 ${highlight ? 'bg-amber-50 -mx-5 px-5 rounded-xl' : ''}`}>
                  <div>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-wide">{label}</p>
                    <p className={`font-black text-sm mt-0.5 ${highlight ? 'text-amber-700' : 'text-gray-900'}`}>{value}</p>
                  </div>
                  {copyable && <CopyButton text={value} label={label} />}
                </div>
              ))}
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                The club will confirm membership processing after application and payment review.
              </p>
            </div>
          </div>

          {/* Steps after payment */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-black text-sm text-gray-900 mb-4">After you apply</h3>
            <ol className="space-y-4">
              {[
                { n: 1, text: 'Submit your membership application form.' },
                { n: 2, text: 'Transfer your membership fee to the ABSA account.' },
                { n: 3, text: 'Use your Name & Surname as the payment reference.' },
                { n: 4, text: 'The club will contact you to confirm your membership and arrange your benefits.' },
              ].map(({ n, text }) => (
                <li key={n} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                  <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 8  TERMS ACCORDION
          ══════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 mt-10" aria-labelledby="terms-heading">
        <button
          onClick={() => setTermsOpen(o => !o)}
          className="flex items-center justify-between w-full bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 text-left"
          aria-expanded={termsOpen}
          id="terms-heading"
        >
          <span className="font-black text-sm text-gray-900">Important Notes &amp; Terms</span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${termsOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        {termsOpen && (
          <div className="bg-white rounded-b-2xl border-x border-b border-gray-100 shadow-sm px-5 py-4 -mt-2">
            <ul className="space-y-2 text-xs text-gray-600 leading-relaxed">
              {[
                'Terms and conditions apply.',
                'Membership benefits depend on the selected membership option.',
                'Payment reference must be your Name & Surname exactly.',
                'Club confirmation may be required before membership is completed.',
                'Merchandise sizes and availability may be confirmed by the club.',
                'TS Galaxy FC reserves the right to adjust membership terms.',
              ].map(term => (
                <li key={term} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0" aria-hidden="true" />
                  {term}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 9  RELATED LINKS
          ══════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 mt-14 lg:mt-16" aria-labelledby="related-heading">
        <h2 id="related-heading" className="font-black text-xl lg:text-2xl text-gray-900 tracking-tight mb-5">
          Explore TS Galaxy FC
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {RELATED.map(({ label, sub, path, Icon }) => (
            <button key={label} onClick={() => navigate(path)}
              className="group bg-white rounded-2xl border border-gray-100 p-5 text-left shadow-sm hover:shadow-md hover:border-red-100 transition-all">
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
      </section>

      {/* ══════════════════════════════════════════════════════════════
          § 10  FINAL CTA
          ══════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 lg:px-6 mt-14 mb-16 lg:mt-16 lg:mb-20">
        <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 rounded-2xl overflow-hidden text-white p-8 lg:p-12 text-center shadow-xl">
          <div className="absolute inset-0 opacity-[0.04]" style={STRIPE_BG} aria-hidden="true" />
          <img src={LOGO.favicon.png256} alt="" aria-hidden="true"
            className="absolute right-4 bottom-0 w-32 h-32 lg:w-48 lg:h-48 opacity-[0.06] pointer-events-none select-none" />
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="font-black text-2xl lg:text-3xl mb-3 leading-tight">
              Join the Rockets family.
            </h2>
            <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-7">
              Become part of the official TS Galaxy FC supporter community and stay close to the club.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => document.getElementById('membership-tiers')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-red-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-red-500 transition-colors"
              >
                Choose Membership
              </button>
              <button
                onClick={() => navigate('/fixtures')}
                className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors"
              >
                View Fixtures
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors"
              >
                Shop Official Kit
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
