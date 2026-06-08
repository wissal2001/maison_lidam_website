import Image from 'next/image';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Product } from './products';

export interface CartItem {
  product: Product;
  quantity: number;
  unitType?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, unitType?: string) => void;
  onRemoveItem: (productId: string, unitType?: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartDrawerProps) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const subtotal = items.reduce((sum, item) => {
    const unitPrice = item.unitType && item.product.unitOptions
      ? item.product.unitOptions.find(o => o.id === item.unitType)?.price || item.product.price || 0
      : item.product.price || 0;
    return sum + unitPrice * item.quantity;
  }, 0);

  const handleCheckout = () => {
    if (items.length === 0) return;
    onCheckout();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#2D4A2A]/10 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-[#2D4A2A]">Mon panier</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#FAF6EE] rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-[#2D4A2A]" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-[#4A2F1A]/60">Votre panier est vide</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id + (item.unitType || '')}
                  className="bg-[#FAF6EE] rounded-lg p-4"
                >
                  <div className="flex gap-3 mb-3">
                    {item.product.images?.[0] ? (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer" onClick={() => setExpandedImage(item.product.images![0])}>
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      <div className="text-3xl">{item.product.emoji}</div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#2D4A2A] mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-[#4A2F1A]/70">
                        {item.unitType && item.product.unitOptions
                          ? `${item.product.unitOptions.find(o => o.id === item.unitType)?.price || item.product.price} € / ${item.product.unitOptions.find(o => o.id === item.unitType)?.unit || item.product.unit}`
                          : `${item.product.price} € / ${item.product.unit}`}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id, item.unitType)}
                      className="p-2 hover:bg-white rounded-lg transition-colors h-fit"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1), item.unitType)}
                        className="p-1 bg-white rounded hover:bg-[#e8e2d5] transition-colors"
                      >
                        <Minus className="w-4 h-4 text-[#2D4A2A]" />
                      </button>
                      <span className="w-8 text-center font-semibold text-[#2D4A2A]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.unitType)}
                        className="p-1 bg-white rounded hover:bg-[#e8e2d5] transition-colors"
                      >
                        <Plus className="w-4 h-4 text-[#2D4A2A]" />
                      </button>
                    </div>
                    <div className="font-bold text-[#C8A84B]">
                      {((item.unitType && item.product.unitOptions
                        ? item.product.unitOptions.find(o => o.id === item.unitType)?.price || item.product.price || 0
                        : item.product.price || 0) * item.quantity).toFixed(2)} €
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#2D4A2A]/10 p-6 space-y-4 bg-white">
            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-lg font-bold text-[#2D4A2A]">
                <span>Total</span>
                <span className="text-[#C8A84B]">{subtotal.toFixed(2)} €</span>
              </div>
            </div>

            {/* Note */}
            <div className="bg-[#FFF9E6] border border-[#C8A84B]/30 rounded-lg p-3">
              <p className="text-xs text-[#4A2F1A]">
                Prix indicatifs — confirmation après échange
              </p>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-[#2D4A2A] text-white py-3 rounded-lg hover:bg-[#3D6338] transition-colors font-medium"
            >
              Finaliser ma commande
            </button>
          </div>
        )}

        {/* Expanded image overlay */}
        {expandedImage && (
          <div
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setExpandedImage(null)}
          >
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <div
              className="relative w-full max-w-4xl max-h-[85vh] aspect-square"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={expandedImage}
                alt=""
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 56rem"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
