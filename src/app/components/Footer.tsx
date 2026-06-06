import { Instagram } from 'lucide-react';

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#2D4A2A] text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#C8A84B] flex items-center justify-center text-[#2D4A2A]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <div className="font-heading text-xl font-semibold">Maison Lidam</div>
                <div className="font-heading italic text-sm text-[#C8A84B]">with love</div>
              </div>
            </div>
            <p className="text-sm text-white/80">
              Traiteur Marocain Maison · IDF · with love
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => scrollToSection('boutique')} className="hover:text-[#C8A84B] transition-colors">
                  Boutique
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('devis')} className="hover:text-[#C8A84B] transition-colors">
                  Devis personnalisé
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('livraison')} className="hover:text-[#C8A84B] transition-colors">
                  Livraison
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-[#C8A84B] transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Suivez-nous</h3>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/maison.lidam/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#C8A84B] transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm">@maison.lidam</span>
              </a>
              <a
                href="https://www.tiktok.com/@dar.el.banat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#C8A84B] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                <span className="text-sm">@dar.el.banat</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 text-center space-y-2">
          <p className="text-sm text-white/80">
            Artisan indépendant — commandes privées uniquement
          </p>
          <p className="text-xs text-white/60">
            Prix indicatifs, susceptibles de varier selon la commande
          </p>
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Maison Lidam. Fait avec 💚 en Île-de-France.
          </p>
        </div>
      </div>
    </footer>
  );
}
