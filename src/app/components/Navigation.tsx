import { ShoppingCart, Menu, X, MessageCircle, Camera } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  cartItemCount: number;
  onCartClick: () => void;
  onDevisClick: () => void;
}

export function Navigation({ cartItemCount, onCartClick, onDevisClick }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showContactMenu, setShowContactMenu] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/33764258783', '_blank');
    setShowContactMenu(false);
    setIsMobileMenuOpen(false);
  };

  const handleInstagram = () => {
    window.open('https://www.instagram.com/maison.lidam/', '_blank');
    setShowContactMenu(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#2D4A2A]/15 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#2D4A2A] flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <div className="font-heading text-xl font-semibold text-[#2D4A2A]">Maison Lidam</div>
              <div className="font-heading italic text-xs text-[#C8A84B]">Fait Maison</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('boutique')} className="text-[#2D4A2A] hover:text-[#C8A84B] transition-colors">
              Boutique
            </button>
            <button onClick={() => scrollToSection('devis')} className="text-[#2D4A2A] hover:text-[#C8A84B] transition-colors">
              Événements
            </button>
            <button onClick={() => scrollToSection('livraison')} className="text-[#2D4A2A] hover:text-[#C8A84B] transition-colors">
              Livraison
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-[#2D4A2A] hover:text-[#C8A84B] transition-colors">
              FAQ
            </button>
            <div className="relative">
              <button
                onClick={() => setShowContactMenu(!showContactMenu)}
                className="text-[#2D4A2A] hover:text-[#C8A84B] transition-colors flex items-center gap-1"
              >
                Contact
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showContactMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowContactMenu(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#2D4A2A]/10 py-2 z-20">
                    <button
                      onClick={handleWhatsApp}
                      className="w-full px-4 py-3 text-sm text-[#2D4A2A] hover:bg-[#FAF6EE] transition-colors flex items-center gap-3"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      WhatsApp
                    </button>
                    <button
                      onClick={handleInstagram}
                      className="w-full px-4 py-3 text-sm text-[#2D4A2A] hover:bg-[#FAF6EE] transition-colors flex items-center gap-3"
                    >
                      <Camera className="w-4 h-4 text-[#E4405F]" />
                      Instagram
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={onDevisClick}
              className="hidden sm:block bg-[#C8A84B] text-[#2D4A2A] px-6 py-2 rounded-lg hover:bg-[#b89940] transition-colors"
            >
              Devis personnalisé
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 text-[#2D4A2A] hover:text-[#C8A84B] transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C8A84B] text-[#2D4A2A] text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#2D4A2A]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#2D4A2A]/15">
          <div className="px-4 py-4 space-y-3">
            <button onClick={() => scrollToSection('boutique')} className="block w-full text-left py-2 text-[#2D4A2A] hover:text-[#C8A84B]">
              Boutique
            </button>
            <button onClick={() => scrollToSection('devis')} className="block w-full text-left py-2 text-[#2D4A2A] hover:text-[#C8A84B]">
              Événements
            </button>
            <button onClick={() => scrollToSection('livraison')} className="block w-full text-left py-2 text-[#2D4A2A] hover:text-[#C8A84B]">
              Livraison
            </button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left py-2 text-[#2D4A2A] hover:text-[#C8A84B]">
              FAQ
            </button>
            <div className="space-y-1">
              <div className="text-sm text-[#2D4A2A]/50 font-medium px-2 pt-2 pb-1">Contact</div>
              <button
                onClick={handleWhatsApp}
                className="block w-full text-left py-2 px-2 text-[#2D4A2A] hover:text-[#C8A84B] transition-colors flex items-center gap-3"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                WhatsApp
              </button>
              <button
                onClick={handleInstagram}
                className="block w-full text-left py-2 px-2 text-[#2D4A2A] hover:text-[#C8A84B] transition-colors flex items-center gap-3"
              >
                <Camera className="w-4 h-4 text-[#E4405F]" />
                Instagram
              </button>
            </div>
            <button
              onClick={onDevisClick}
              className="block w-full bg-[#C8A84B] text-[#2D4A2A] px-6 py-2 rounded-lg hover:bg-[#b89940] transition-colors"
            >
              Devis personnalisé
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
