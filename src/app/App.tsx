import { BrowserRouter, Routes, Route } from 'react-router';
import { NavProvider } from './components/NavContext';
import { CartProvider } from '@/context/CartContext';
import { CheckoutPage } from './pages/CheckoutPage';
import { MobileHeader } from './components/MobileHeader';
import { DesktopHeader } from './components/DesktopHeader';
import { MobileMenu } from './components/MobileMenu';
import { MobileNav } from './components/MobileNav';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MatchCentrePage } from './pages/MatchCentrePage';
import { FixturesPage } from './pages/FixturesPage';
import { NewsPage } from './pages/NewsPage';
import { ArticlePage } from './pages/ArticlePage';
import { SquadPage } from './pages/SquadPage';
import { PlayerProfilePage } from './pages/PlayerProfilePage';
import { ShopPage } from './pages/ShopPage';
import { MembershipPage } from './pages/MembershipPage';
import { AcademyPage } from './pages/AcademyPage';
import { PartnersPage } from './pages/PartnersPage';
import { TheClubPage } from './pages/TheClubPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { QueensPage } from './pages/QueensPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Route - No headers/footers */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* All other routes with standard layout */}
        <Route
          path="/*"
          element={
            <CartProvider>
            <NavProvider>
              <div className="flex flex-col min-h-screen bg-white">
                {/* Fixed headers */}
                <MobileHeader />
                <DesktopHeader />

                {/* Full-screen mobile menu overlay */}
                <MobileMenu />

                {/* Page content — flex-1 fills remaining height; bottom padding clears mobile bottom nav */}
                <main className="flex-1 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/match/:id" element={<MatchCentrePage />} />
                    <Route path="/fixtures" element={<FixturesPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/news/:id" element={<ArticlePage />} />
                    <Route path="/squad" element={<SquadPage />} />
                    <Route path="/squad/:slug" element={<PlayerProfilePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/shop/:id" element={<ShopPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/membership" element={<MembershipPage />} />
                    <Route path="/academy" element={<AcademyPage />} />
                    <Route path="/partners" element={<PartnersPage />} />
                    <Route path="/the-club" element={<TheClubPage />} />
                    <Route path="/queens" element={<QueensPage />} />
                    <Route path="/design-system" element={<DesignSystemPage />} />
                  </Routes>
                </main>

                <Footer />

                {/* Persistent bottom nav — mobile only, fixed position, does not affect document flow */}
                <MobileNav />
              </div>
            </NavProvider>
            </CartProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
