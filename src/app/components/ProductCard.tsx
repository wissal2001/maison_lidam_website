import { Eye } from 'lucide-react';
import { Product } from './products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onDevisClick: () => void;
}

export function ProductCard({ product, onAddToCart, onQuickView, onDevisClick }: ProductCardProps) {
  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      gateaux: 'Gâteaux',
      'mini-sales': 'Mini-salés',
      plateaux: 'Plateaux',
      plats: 'Plats'
    };
    return labels[category] || category;
  };

  const hasPrice = product.price !== null;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#2D4A2A]/10">
      {/* Image Area with Emoji */}
      <div className="relative h-48 bg-gradient-to-br from-[#FAF6EE] to-[#e8e2d5] flex items-center justify-center">
        <div className="text-7xl">{product.emoji}</div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-[#2D4A2A] text-white px-3 py-1 rounded-full text-xs font-medium">
          {getCategoryLabel(product.category)}
        </div>

        {/* Quick View Button */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-[#FAF6EE]"
        >
          <Eye className="w-4 h-4 text-[#2D4A2A]" />
        </button>
      </div>

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
              <span className="text-2xl font-bold text-[#C8A84B]">{product.price} €</span>
              <span className="text-sm text-[#4A2F1A]/60">/ {product.unit}</span>
            </div>
          ) : (
            <div className="text-[#C8A84B] font-semibold">Sur devis</div>
          )}
        </div>

        {/* Action Button */}
        {hasPrice ? (
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-[#2D4A2A] text-white py-3 rounded-lg hover:bg-[#3D6338] transition-colors font-medium"
          >
            Ajouter au panier
          </button>
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
