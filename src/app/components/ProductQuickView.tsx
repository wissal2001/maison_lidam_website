import { X } from 'lucide-react';
import { Product } from './products';
import { MediaGallery } from './MediaGallery';

interface ProductQuickViewProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onDevisClick: () => void;
}

export function ProductQuickView({ product, onClose, onAddToCart, onDevisClick }: ProductQuickViewProps) {
  const hasPrice = product.price !== null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#2D4A2A]/10 p-4 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-[#2D4A2A]">Aperçu rapide</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#FAF6EE] rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-[#2D4A2A]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Product Media */}
          <MediaGallery
            images={product.images}
            productName={product.name}
            emoji={product.emoji}
          />

          {/* Product Info */}
          <h3 className="font-heading text-3xl font-bold text-[#2D4A2A] mb-3">
            {product.name}
          </h3>

          <p className="text-[#4A2F1A] mb-6">
            {product.fullDescription || product.description}
          </p>

          {/* Price */}
          <div className="mb-6 p-4 bg-[#FAF6EE] rounded-lg">
            {hasPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#C8A84B]">{product.price} €</span>
                <span className="text-[#4A2F1A]/70">/ {product.unit}</span>
              </div>
            ) : (
              <div className="text-xl text-[#C8A84B] font-semibold">
                Prix sur devis - Contactez-nous
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {hasPrice ? (
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="flex-1 bg-[#2D4A2A] text-white py-4 rounded-lg hover:bg-[#3D6338] transition-colors font-medium"
              >
                Ajouter au panier
              </button>
            ) : (
              <button
                onClick={() => {
                  onDevisClick();
                  onClose();
                }}
                className="flex-1 bg-[#C8A84B] text-[#2D4A2A] py-4 rounded-lg hover:bg-[#b89940] transition-colors font-medium"
              >
                Demander un devis
              </button>
            )}
            <button
              onClick={onClose}
              className="px-6 py-4 border-2 border-[#2D4A2A] text-[#2D4A2A] rounded-lg hover:bg-[#FAF6EE] transition-colors font-medium"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
