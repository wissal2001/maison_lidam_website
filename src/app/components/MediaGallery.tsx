'use client'

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MediaGalleryProps {
  images?: string[];
  productName: string;
  emoji?: string;
}

export function MediaGallery({ images, productName, emoji }: MediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = images?.length || 0;
  const showPlaceholder = total === 0;

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  if (showPlaceholder) {
    return (
      <div className="relative h-64 bg-gradient-to-br from-[#FAF6EE] to-[#e8e2d5] rounded-xl flex items-center justify-center mb-6">
        <div className="text-9xl">{emoji}</div>
      </div>
    );
  }

  return (
    <div className="relative h-64 bg-[#FAF6EE] rounded-xl mb-6 overflow-hidden">
      <div className="relative w-full h-full">
        <Image
          src={images![currentIndex]}
          alt={`${productName} - ${currentIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 672px) 100vw, 42rem"
        />
      </div>

      {total > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors text-[#2D4A2A]"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors text-[#2D4A2A]"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {total > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {Array.from({ length: total }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex
                  ? 'bg-[#2D4A2A] w-4'
                  : 'bg-white/70 hover:bg-white'
              }`}
              aria-label={`Aller à l'image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
