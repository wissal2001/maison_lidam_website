import Image from 'next/image';
import { X, Eye, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Product } from './products';
import { CartItem } from './CartDrawer';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, unitType?: string) => void;
  onQuickView: (product: Product) => void;
  onDevisClick: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, unitType?: string) => void;
  onRemoveItem: (productId: string, unitType?: string) => void;
}

export function ProductCard({
  product, onAddToCart, onQuickView, onDevisClick,
  cartItems, onUpdateQuantity, onRemoveItem
}: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [unitType, setUnitType] = useState(product.unitOptions?.[0]?.id || '');
  const [expandedImage, setExpandedImage] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else {
        setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    }
  };

  const selectedOption = product.unitOptions?.find(o => o.id === unitType);
  const unitPrice = selectedOption?.price ?? product.price;
  const unitLabel = selectedOption?.unit ?? product.unit;

  const cartItem = cartItems.find(item => item.product.id === product.id && item.unitType === unitType);
  const quantity = cartItem?.quantity || 0;
  const hasPrice = product.price !== null;
  const images = product.images || [];
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (justAdded) {
      const timer = setTimeout(() => setJustAdded(false), 800);
      return () => clearTimeout(timer);
    }
  }, [justAdded]);

  const handleAdd = () => {
    onAddToCart(product, unitType);
    setJustAdded(true);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      gateaux: 'Gâteaux',
      'mini-sales': 'Mini-salés',
      plateaux: 'Plateaux',
      plats: 'Plats'
    };
    return labels[category] || category;
  };

  return (
    <div className={`group bg-white rounded-xl shadow-sm transition-all duration-300 overflow-hidden border ${
      justAdded
        ? 'border-[#2D4A2A] shadow-md shadow-green-900/10'
        : 'border-[#2D4A2A]/10 hover:shadow-xl'
    }`}>
      <style>{`
        @keyframes qty-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.35); }
        }
      `}</style>

      {/* Image Area */}
      <div
        className="relative h-48 bg-gradient-to-br from-[#FAF6EE] to-[#e8e2d5] flex items-center justify-center overflow-hidden cursor-pointer"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images[imageIndex] ? (
          <Image
            src={images[imageIndex]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onClick={() => setExpandedImage(true)}
          />
        ) : (
          <div className="text-7xl" onClick={() => setExpandedImage(true)}>{product.emoji}</div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-[#2D4A2A] text-white px-3 py-1 rounded-full text-xs font-medium">
          {getCategoryLabel(product.category)}
        </div>

        {/* Quick View Button */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-md hover:bg-[#FAF6EE]"
        >
          <Eye className="w-4 h-4 text-[#2D4A2A]" />
        </button>

        {/* Image Navigation */}
        {hasMultipleImages && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 md:w-7 md:h-7 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm text-[#2D4A2A]"
              aria-label="Image précédente"
            >
              <ChevronLeft className="w-5 h-5 md:w-4 md:h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 md:w-7 md:h-7 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm text-[#2D4A2A]"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-5 h-5 md:w-4 md:h-4" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-1">
              {Array.from({ length: images.length }, (_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 md:w-1.5 md:h-1.5 rounded-full ${
                    i === imageIndex ? 'bg-white w-4 md:w-3' : 'bg-white/60'
                  } transition-all`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Expanded image overlay */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setExpandedImage(false)}
        >
          <button
            onClick={() => setExpandedImage(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative w-full max-w-4xl max-h-[85vh] aspect-square"
            onClick={(e) => e.stopPropagation()}
          >
            {images[imageIndex] ? (
              <Image
                src={images[imageIndex]}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 56rem"
                priority
              />
            ) : null}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading text-xl font-semibold text-[#2D4A2A] mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-[#4A2F1A]/70 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-4">
          {hasPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#C8A84B]">{unitPrice} €</span>
              <span className="text-sm text-[#4A2F1A]/60">/ {unitLabel}</span>
            </div>
          ) : (
            <div className="text-[#C8A84B] font-semibold">Sur devis</div>
          )}
        </div>

        {/* Unit Options */}
        {product.unitOptions && (
          <div className="flex gap-2 mb-3">
            {product.unitOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setUnitType(option.id)}
                className={`flex-1 text-xs py-1.5 rounded-md border transition-colors ${
                  unitType === option.id
                    ? 'border-[#2D4A2A] bg-[#2D4A2A]/5 text-[#2D4A2A] font-medium'
                    : 'border-[#2D4A2A]/10 text-[#4A2F1A]/60 hover:border-[#2D4A2A]/30'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {/* Action Button or Quantity Controls */}
        {hasPrice ? (
          quantity > 0 ? (
            <div className="flex items-center justify-between bg-[#FAF6EE] rounded-lg p-1">
              <button
                onClick={() => {
                  if (quantity === 1) {
                    onRemoveItem(product.id, unitType);
                  } else {
                    onUpdateQuantity(product.id, quantity - 1, unitType);
                  }
                }}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-[#e8e2d5] transition-colors text-[#2D4A2A]"
                aria-label="Diminuer la quantité"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span
                key={`qty-${quantity}`}
                className="font-bold text-[#2D4A2A] text-lg min-w-[2rem] text-center"
                style={{ animation: 'qty-bounce 0.3s ease-out' }}
              >
                {quantity}
              </span>
              <button
                onClick={handleAdd}
                className="w-10 h-10 flex items-center justify-center bg-[#2D4A2A] rounded-lg hover:bg-[#3D6338] transition-colors text-white"
                aria-label="Augmenter la quantité"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="w-full bg-[#2D4A2A] text-white py-3 rounded-lg hover:bg-[#3D6338] transition-colors font-medium"
            >
              Ajouter au panier
            </button>
          )
        ) : (
          <button
            onClick={onDevisClick}
            className="w-full bg-[#C8A84B] text-[#2D4A2A] py-3 rounded-lg hover:bg-[#b89940] transition-colors font-medium"
          >
            Demander un devis
          </button>
        )}
      </div>
    </div>
  );
}
