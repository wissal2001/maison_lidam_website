'use client'

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface MediaGalleryProps {
  images?: string[];
  productName: string;
  emoji?: string;
}

export function MediaGallery({ images, productName, emoji }: MediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const total = images?.length || 0;
  const showPlaceholder = total === 0;

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const goNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
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
    <>
      <div className="relative h-64 bg-[#FAF6EE] rounded-xl mb-6 overflow-hidden cursor-pointer">
        <div className="relative w-full h-full" onClick={() => setExpanded(true)}>
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
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-9 md:h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors text-[#2D4A2A]"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-5 h-5 md:w-4 md:h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-9 md:h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors text-[#2D4A2A]"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-5 h-5 md:w-4 md:h-4" />
              </button>
            </>
          )}

        {total > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {Array.from({ length: total }, (_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); goTo(i); }}
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

      {/* Expanded image overlay */}
      {expanded && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setExpanded(false)}
        >
          <button
            onClick={() => setExpanded(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative w-full max-w-4xl max-h-[85vh] aspect-square"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images![currentIndex]}
              alt={`${productName} - ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 100vw, 56rem"
              priority
            />
          </div>

          {total > 1 && (
            <>
              <button
                onClick={(e) => goPrev(e)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors text-white"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
              </button>
              <button
                onClick={(e) => goNext(e)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors text-white"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {Array.from({ length: total }, (_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); goTo(i); }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentIndex
                    ? 'bg-white w-5'
                    : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Aller à l'image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
