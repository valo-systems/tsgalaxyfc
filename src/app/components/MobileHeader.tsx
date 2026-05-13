import { Ticket, Menu, X, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router';
import { LOGO } from '@/lib/assets';
import { useNav } from './NavContext';
import { useCart } from '@/context/CartContext';

export function MobileHeader() {
  const navigate = useNavigate();
  const { menuOpen, toggleMenu } = useNav();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm lg:hidden" role="banner">
      <div className="flex items-center justify-between px-4 h-16">

        {/* Club identity */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 min-w-0 flex-shrink-0"
          aria-label="TS Galaxy FC – go to home page"
        >
          <img
            src={LOGO.favicon.png64}
            alt="TS Galaxy FC badge"
            className="w-10 h-10 flex-shrink-0"
            width={40}
            height={40}
          />
          <div className="min-w-0 leading-tight">
            <p className="font-bold text-sm text-gray-900 leading-tight whitespace-nowrap">TS Galaxy FC</p>
            <p className="text-[9px] text-gray-400 leading-tight tracking-widest uppercase whitespace-nowrap">The Rockets</p>
          </div>
        </button>

        {/* Action buttons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => window.open('https://www.ticketpros.co.za', '_blank')}
            className="flex items-center gap-1.5 bg-gray-900 text-white pl-3 pr-3.5 py-2 rounded-lg font-semibold text-xs hover:bg-gray-800 transition-colors"
            aria-label="View tickets"
          >
            <Ticket className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Tickets</span>
          </button>

          {itemCount > 0 && (
            <button
              onClick={() => navigate('/checkout')}
              className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              aria-label={`Go to cart — ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
            >
              <ShoppingBag className="w-4 h-4" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 bg-yellow-400 text-black text-[9px] font-black rounded-full flex items-center justify-center leading-none">
                {itemCount}
              </span>
            </button>
          )}

          <button
            onClick={toggleMenu}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors ml-1"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen
              ? <X className="w-5 h-5 text-gray-700" aria-hidden="true" />
              : <Menu className="w-5 h-5 text-gray-700" aria-hidden="true" />
            }
          </button>
        </div>

      </div>
    </header>
  );
}
