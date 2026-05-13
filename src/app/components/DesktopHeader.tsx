import { ShoppingBag, Ticket } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { LOGO } from '@/lib/assets';
import { NAV_ITEMS, isNavActive } from '@/lib/nav-data';
import { useCart } from '@/context/CartContext';

export function DesktopHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();

  return (
    <header className="hidden lg:block sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm" role="banner">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-3">

          {/* Logo / Club identity */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 flex-shrink-0"
            aria-label="TS Galaxy FC – go to home page"
          >
            <img
              src={LOGO.favicon.png64}
              alt="TS Galaxy FC badge"
              className="w-12 h-12 flex-shrink-0"
              width={48}
              height={48}
            />
            <div className="leading-tight">
              <h1 className="font-bold text-lg text-gray-900 leading-tight">TS Galaxy FC</h1>
              <p className="text-[10px] text-gray-500 tracking-widest uppercase leading-tight">The Rockets</p>
            </div>
          </button>

          {/* Primary navigation */}
          <nav className="flex items-center gap-5 xl:gap-7" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const active = isNavActive(item.path, location.pathname);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  aria-current={active ? 'page' : undefined}
                  className={`text-sm font-medium transition-colors relative pb-0.5 whitespace-nowrap ${
                    active
                      ? 'text-red-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-red-600 after:rounded-full'
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* CTA buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => window.open('https://www.ticketpros.co.za', '_blank')}
              className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors"
              aria-label="Buy match tickets"
            >
              <Ticket className="w-4 h-4" aria-hidden="true" />
              Tickets
            </button>
            {itemCount > 0 ? (
              <button
                onClick={() => navigate('/checkout')}
                className="relative flex items-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors"
                aria-label={`Go to cart — ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                Cart
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-yellow-400 text-black text-[10px] font-black rounded-full flex items-center justify-center leading-none">
                  {itemCount}
                </span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/shop')}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors"
                aria-label="Go to official shop"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                Shop
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
