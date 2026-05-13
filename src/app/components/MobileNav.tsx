import { Home, Calendar, ShoppingBag, CreditCard, Menu } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { isNavActive } from '@/lib/nav-data';
import { useNav } from './NavContext';

const BOTTOM_NAV_ITEMS = [
  { id: 'home',       label: 'Home',    icon: Home,        path: '/'           },
  { id: 'fixtures',   label: 'Matches', icon: Calendar,    path: '/fixtures'   },
  { id: 'shop',       label: 'Shop',    icon: ShoppingBag, path: '/shop'       },
  { id: 'membership', label: 'Member',  icon: CreditCard,  path: '/membership' },
] as const;

export function MobileNav() {
  const location = useLocation();
  const navigate  = useNavigate();
  const { menuOpen, toggleMenu } = useNav();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden"
      aria-label="Bottom navigation"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-5 h-16">

        {BOTTOM_NAV_ITEMS.map(({ id, label, icon: Icon, path }) => {
          const active = isNavActive(path, location.pathname);
          return (
            <button
              key={id}
              onClick={() => navigate(path)}
              aria-current={active ? 'page' : undefined}
              aria-label={label}
              className={`flex flex-col items-center justify-center gap-0.5 px-1 min-h-[44px] transition-colors ${
                active ? 'text-red-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span className="text-[10px] font-medium leading-tight whitespace-nowrap">{label}</span>
            </button>
          );
        })}

        {/* Menu button */}
        <button
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className={`flex flex-col items-center justify-center gap-0.5 px-1 min-h-[44px] transition-colors ${
            menuOpen ? 'text-red-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Menu className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
          <span className="text-[10px] font-medium leading-tight whitespace-nowrap">Menu</span>
        </button>

      </div>
    </nav>
  );
}
