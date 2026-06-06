import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
  title: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  cta1?: string;
  cta2?: string;
}

const slides: HeroSlide[] = [
  {
    title: 'Bienvenue chez Maison Lidam',
    subtitle: 'Traiteur marocain maison · Île-de-France',
    bgColor: '#2D4A2A',
    textColor: '#FAF6EE',
    cta1: 'Découvrir la boutique',
    cta2: 'Demander un devis'
  },
  {
    title: 'Plateaux & Buffets pour vos événements',
    subtitle: 'Sur mesure, fait avec amour',
    bgColor: '#4A2F1A',
    textColor: '#C8A84B',
    cta1: 'Voir les plateaux',
    cta2: 'Devis personnalisé'
  },
  {
    title: 'Fait maison, avec amour',
    subtitle: 'Sur commande en Île-de-France',
    bgColor: '#FAF6EE',
    textColor: '#2D4A2A',
    cta1: 'Commander maintenant',
    cta2: 'Contactez-nous'
  }
];

interface HeroSliderProps {
  onBoutiqueClick: () => void;
  onDevisClick: () => void;
}

export function HeroSlider({ onBoutiqueClick, onDevisClick }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCta1Click = () => {
    if (currentSlide === 0 || currentSlide === 1 || currentSlide === 2) {
      onBoutiqueClick();
    }
  };

  const handleCta2Click = () => {
    onDevisClick();
  };

  const slide = slides[currentSlide];

  return (
    <div
      className="relative h-[500px] flex items-center justify-center transition-colors duration-700"
      style={{ backgroundColor: slide.bgColor }}
    >
      <div className="max-w-4xl mx-auto px-4 text-center z-10">
        <h1
          className="font-heading text-4xl md:text-6xl font-bold mb-4 transition-colors duration-700"
          style={{ color: slide.textColor }}
        >
          {slide.title}
        </h1>
        <p
          className="text-xl md:text-2xl mb-8 transition-colors duration-700"
          style={{ color: slide.textColor, opacity: 0.9 }}
        >
          {slide.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {slide.cta1 && (
            <button
              onClick={handleCta1Click}
              className="px-8 py-3 bg-[#C8A84B] text-[#2D4A2A] rounded-lg hover:bg-[#b89940] transition-colors font-medium"
            >
              {slide.cta1}
            </button>
          )}
          {slide.cta2 && (
            <button
              onClick={handleCta2Click}
              className="px-8 py-3 border-2 rounded-lg hover:bg-white/10 transition-colors font-medium"
              style={{
                borderColor: slide.textColor,
                color: slide.textColor
              }}
            >
              {slide.cta2}
            </button>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
        style={{ color: slide.textColor }}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
        style={{ color: slide.textColor }}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="w-3 h-3 rounded-full transition-all duration-300"
            style={{
              backgroundColor: currentSlide === index ? slide.textColor : `${slide.textColor}40`
            }}
          />
        ))}
      </div>
    </div>
  );
}
