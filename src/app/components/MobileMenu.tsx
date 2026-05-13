import { X, Ticket, ShoppingBag, ChevronRight, Users } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { LOGO } from '@/lib/assets';
import { NAV_ITEMS, isNavActive } from '@/lib/nav-data';
import { useNav } from './NavContext';

export function MobileMenu() {
  const { menuOpen, closeMenu } = useNav();
  const location = useLocation();
  const navigate = useNavigate();

  function go(path: string) {
    navigate(path);
    closeMenu();
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
        onClick={closeMenu}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 bottom-0 z-[80] w-full max-w-sm bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Red accent bar */}
        <div className="h-1 bg-red-600 flex-shrink-0" />

        {/* Header row */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <button
            onClick={() => go('/')}
            className="flex items-center gap-2.5"
            aria-label="TS Galaxy FC – go to home page"
          >
            <img src={LOGO.favicon.png64} alt="" className="w-9 h-9" width={36} height={36} />
            <div className="leading-tight">
              <p className="font-bold text-sm text-gray-900">TS Galaxy FC</p>
              <p className="text-[9px] text-gray-400 tracking-widest uppercase">The Rockets</p>
            </div>
          </button>
          <button
            onClick={closeMenu}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Primary nav links */}
        <nav className="flex-1 overflow-y-auto" aria-label="Mobile navigation">
          <ul className="py-2">
            {NAV_ITEMS.map((item) => {
              const active = isNavActive(item.path, location.pathname);
              return (
                <li key={item.path}>
                  <button
                    onClick={() => go(item.path)}
                    aria-current={active ? 'page' : undefined}
                    className={`w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors ${
                      active
                        ? 'text-red-600 bg-red-50'
                        : 'text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <span className={`text-[15px] font-semibold ${active ? 'text-red-600' : ''}`}>
                      {item.label}
                    </span>
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 ${active ? 'text-red-400' : 'text-gray-300'}`} />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA card at bottom */}
        <div className="flex-shrink-0 p-4 border-t border-gray-100 space-y-2" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
          <button
            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors"
            aria-label="Buy match tickets"
          >
            <Ticket className="w-4 h-4" aria-hidden="true" />
            Buy Tickets
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => go('/shop')}
              className="flex items-center justify-center gap-1.5 bg-red-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-red-700 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
              Shop Kit
            </button>
            <button
              onClick={() => go('/membership')}
              className="flex items-center justify-center gap-1.5 bg-white border border-gray-200 text-gray-800 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              <Users className="w-3.5 h-3.5" aria-hidden="true" />
              Join
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
