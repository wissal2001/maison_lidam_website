import { useState } from 'react';
import { products, Product } from './products';
import { ProductCard } from './ProductCard';
import { ProductQuickView } from './ProductQuickView';

type Category = 'all' | 'gateaux' | 'mini-sales' | 'plateaux';

interface CatalogProps {
  onAddToCart: (product: Product) => void;
  onDevisClick: () => void;
}

export function Catalog({ onAddToCart, onDevisClick }: CatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all' as Category, label: 'Tous' },
    { id: 'gateaux' as Category, label: 'Gâteaux' },
    { id: 'mini-sales' as Category, label: 'Mini-salés' },
    { id: 'plateaux' as Category, label: 'Plateaux' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <section id="boutique" className="py-16 bg-[#FAF6EE]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#2D4A2A] mb-4">
            Entrez dans l'Univers Maison Lidam
          </h2>
          <p className="text-lg text-[#4A2F1A]/80">
            Pâtisserie fine marocaine · Sur commande · Île-de-France
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#2D4A2A] text-white shadow-lg'
                  : 'bg-white text-[#2D4A2A] hover:bg-[#e8e2d5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={setQuickViewProduct}
              onDevisClick={onDevisClick}
            />
          ))}
        </div>

        {/* Quick View Modal */}
        {quickViewProduct && (
          <ProductQuickView
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            onAddToCart={onAddToCart}
            onDevisClick={onDevisClick}
          />
        )}
      </div>
    </section>
  );
}
