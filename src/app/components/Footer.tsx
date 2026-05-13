import { useState } from 'react';
import {
  Facebook, Twitter, Instagram, Youtube,
  MapPin, Phone, Mail, ChevronRight,
  Calendar, ShoppingBag, CreditCard, Ticket,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { LOGO } from '@/lib/assets';

// ─── Data ────────────────────────────────────────────────────────────────────

const MATCHDAY_LINKS = [
  { label: 'Fixtures & Results', path: '/fixtures'  },
  { label: 'Log Table',          path: '/fixtures'  },
  { label: 'Match Centre',       path: '/fixtures'  },
  { label: 'Latest News',        path: '/news'      },
];

const CLUB_LINKS = [
  { label: 'The Club',         path: '/the-club'   },
  { label: 'Squad',            path: '/squad'      },
  { label: 'Academy',         path: '/academy'    },
  { label: 'TS Galaxy Queens', path: '/queens'     },
  { label: 'Partners',         path: '/partners'   },
  { label: 'Membership',       path: '/membership' },
];

const SOCIAL_LINKS = [
  { Icon: Facebook,  label: 'Facebook',  href: 'https://facebook.com/TSGalaxyFC'  },
  { Icon: Twitter,   label: 'X/Twitter', href: 'https://twitter.com/TSGalaxyFC'   },
  { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com/TSGalaxyFC' },
  { Icon: Youtube,   label: 'YouTube',   href: 'https://youtube.com/@TSGalaxyFC'  },
];

const MATCHDAY_CARDS = [
  { Icon: Calendar,    label: 'Next Match',    sub: 'Follow upcoming Rockets fixtures.',  path: '/fixtures'   },
  { Icon: Ticket,      label: 'Tickets',        sub: 'Secure your seat at Mbombela.',      path: '/membership' },
  { Icon: ShoppingBag, label: 'Official Shop',  sub: 'Wear the colours of The Rockets.',   path: '/shop'       },
  { Icon: CreditCard,  label: 'Membership',     sub: 'Join the Rockets family.',           path: '/membership' },
];

const STRIPE = {
  backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)',
  backgroundSize: '18px 18px',
};

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  return (
    <footer aria-label="TS Galaxy FC site footer">

      {/* ── Statement band ───────────────────────────────────────────────── */}
      <div className="relative bg-gray-950 overflow-hidden">
        {/* Textures */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={STRIPE} aria-hidden="true" />
        <div className="absolute -bottom-24 right-1/4 w-[500px] h-[500px] bg-red-700 rounded-full blur-[140px] opacity-[0.12] pointer-events-none" aria-hidden="true" />
        {/* Badge watermark */}
        <img
          src={LOGO.favicon.png256}
          alt=""
          aria-hidden="true"
          className="absolute right-6 top-1/2 -translate-y-1/2 w-40 h-40 lg:w-56 lg:h-56 opacity-[0.05] pointer-events-none select-none"
        />

        <div className="relative z-10 container mx-auto px-4 lg:px-6 py-10 lg:py-14">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Copy */}
            <div className="max-w-xl">
              <p className="text-[11px] font-black text-red-500 uppercase tracking-widest mb-3">The Rockets</p>
              <h2 className="font-black text-3xl lg:text-4xl text-white leading-tight mb-3">
                The Rockets live here.
              </h2>
              <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                Fixtures, results, official merchandise, membership and club stories — all from the
                digital home of TS Galaxy FC.
              </p>
            </div>
            {/* CTAs */}
            <div className="flex flex-wrap gap-3 lg:flex-shrink-0">
              <button
                onClick={() => navigate('/fixtures')}
                className="bg-red-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-red-500 transition-colors"
              >
                View Fixtures
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="bg-white/10 text-white px-6 py-3 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors"
              >
                Shop Official Kit
              </button>
              <button
                onClick={() => navigate('/membership')}
                className="bg-transparent text-white px-6 py-3 rounded-xl font-bold text-sm border border-white/15 hover:border-white/30 transition-colors"
              >
                Join Membership
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Matchday cards strip ─────────────────────────────────────────── */}
      <div className="bg-gray-900 border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-6 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {MATCHDAY_CARDS.map(({ Icon, label, sub, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-red-600/30 rounded-xl p-3.5 text-left transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-red-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 transition-colors">
                  <Icon className="w-4 h-4 text-red-400 group-hover:text-white transition-colors" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-black text-xs text-white leading-tight group-hover:text-red-400 transition-colors">{label}</p>
                  <p className="text-[10px] text-gray-500 leading-tight mt-0.5 truncate">{sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main footer content ──────────────────────────────────────────── */}
      <div className="bg-gray-900 border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-6 py-10 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

            {/* Col 1: Club identity */}
            <div>
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-3 mb-5"
                aria-label="TS Galaxy FC — go to home page"
              >
                <img
                  src={LOGO.favicon.png64}
                  alt="TS Galaxy FC badge"
                  className="w-12 h-12 flex-shrink-0"
                  width={48}
                  height={48}
                />
                <div className="leading-tight">
                  <p className="font-black text-base text-white leading-tight">TS Galaxy FC</p>
                  <p className="text-[10px] text-gray-500 tracking-widest uppercase leading-tight">The Rockets</p>
                </div>
              </button>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                The official digital home of TS Galaxy FC — fixtures, results, news, merchandise and
                matchday updates from Mpumalanga's Rockets.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-2" role="list" aria-label="TS Galaxy FC social media">
                {SOCIAL_LINKS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="listitem"
                    aria-label={`Follow TS Galaxy FC on ${label}`}
                    className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-white" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Matchday */}
            <div>
              <h3 className="font-black text-xs text-white uppercase tracking-widest mb-4">Matchday</h3>
              <ul className="space-y-2" role="list">
                {MATCHDAY_LINKS.map(({ label, path }) => (
                  <li key={label} role="listitem">
                    <button
                      onClick={() => navigate(path)}
                      className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-400 transition-colors text-left group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-red-500 flex-shrink-0" aria-hidden="true" />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: The Club */}
            <div>
              <h3 className="font-black text-xs text-white uppercase tracking-widest mb-4">The Club</h3>
              <ul className="space-y-2" role="list">
                {CLUB_LINKS.map(({ label, path }) => (
                  <li key={label} role="listitem">
                    <button
                      onClick={() => navigate(path)}
                      className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-400 transition-colors text-left group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-red-500 flex-shrink-0" aria-hidden="true" />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Stay Close */}
            <div>
              <h3 className="font-black text-xs text-white uppercase tracking-widest mb-4">Stay Close</h3>

              {/* Contact */}
              <ul className="space-y-3 mb-6">
                <li>
                  <a
                    href="mailto:info@tsgalaxyfc.co.za"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" aria-hidden="true" />
                    info@tsgalaxyfc.co.za
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+27137500060"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" aria-hidden="true" />
                    +27 (0) 13 750 0060
                  </a>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-500">
                  <MapPin className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Mbombela Stadium,<br />Mpumalanga, South Africa</span>
                </li>
              </ul>

              {/* Newsletter */}
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Supporter updates</p>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Match alerts, club news, ticket updates and shop releases.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-2"
                aria-label="Subscribe to supporter updates"
              >
                <label htmlFor="footer-email" className="sr-only">Your email address</label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  autoComplete="email"
                  className="flex-1 min-w-0 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-red-600 text-white px-3 py-2 rounded-lg text-xs font-black hover:bg-red-500 transition-colors flex-shrink-0"
                  aria-label="Subscribe to supporter updates"
                >
                  Go
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* ── Legal bar ────────────────────────────────────────────────────── */}
      <div className="bg-black border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Legal links */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-gray-600">
              <button className="hover:text-gray-400 transition-colors">Privacy Policy</button>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <button className="hover:text-gray-400 transition-colors">Terms of Use</button>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <button className="hover:text-gray-400 transition-colors">POPIA</button>
            </div>
            {/* Copyright */}
            <p className="text-[11px] text-gray-600 text-center sm:text-right">
              © 2026 TS Galaxy FC. All rights reserved.
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
}
