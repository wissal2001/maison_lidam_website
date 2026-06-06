import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Product } from './products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (postalCode: string) => void;
}

const deliveryZones: Record<string, { name: string; price: number }> = {
  '91600': { name: 'Zone 1', price: 0 },
  '91120': { name: 'Zone 1', price: 0 },
  '91370': { name: 'Zone 1', price: 2 },
  '91': { name: 'Zone 2', price: 5 },
  '94': { name: 'Zone 2', price: 5 },
  '75': { name: 'Zone 3', price: 7 },
  '92': { name: 'Zone 3', price: 7 },
  '93': { name: 'Zone 4', price: 8 },
  '78': { name: 'Zone 4', price: 8 },
  '95': { name: 'Zone 5', price: 10 },
  '77': { name: 'Zone 5', price: 10 }
};

function getDeliveryPrice(postalCode: string): number {
  if (!postalCode) return 0;

  const code = postalCode.trim();

  for (const [key, value] of Object.entries(deliveryZones)) {
    if (code.startsWith(key)) {
      return value.price;
    }
  }

  return 15;
}

export function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartDrawerProps) {
  const [postalCode, setPostalCode] = useState('');

  const subtotal = items.reduce((sum, item) => {
    return sum + (item.product.price || 0) * item.quantity;
  }, 0);

  const deliveryFee = getDeliveryPrice(postalCode);
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (items.length === 0) return;
    onCheckout(postalCode);
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
                  key={item.product.id}
                  className="bg-[#FAF6EE] rounded-lg p-4"
                >
                  <div className="flex gap-3 mb-3">
                    <div className="text-3xl">{item.product.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#2D4A2A] mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-[#4A2F1A]/70">
                        {item.product.price} € / {item.product.unit}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-2 hover:bg-white rounded-lg transition-colors h-fit"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="p-1 bg-white rounded hover:bg-[#e8e2d5] transition-colors"
                      >
                        <Minus className="w-4 h-4 text-[#2D4A2A]" />
                      </button>
                      <span className="w-8 text-center font-semibold text-[#2D4A2A]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 bg-white rounded hover:bg-[#e8e2d5] transition-colors"
                      >
                        <Plus className="w-4 h-4 text-[#2D4A2A]" />
                      </button>
                    </div>
                    <div className="font-bold text-[#C8A84B]">
                      {((item.product.price || 0) * item.quantity).toFixed(2)} €
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
            {/* Postal Code */}
            <div>
              <label className="block text-sm font-medium text-[#2D4A2A] mb-2">
                Code postal pour la livraison
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Ex: 91120"
                className="w-full px-4 py-2 border border-[#2D4A2A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
              />
            </div>

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-[#4A2F1A]">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              {postalCode && (
                <div className="flex justify-between text-[#4A2F1A]">
                  <span>Livraison</span>
                  <span>{deliveryFee.toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-[#2D4A2A] pt-2 border-t border-[#2D4A2A]/10">
                <span>Total</span>
                <span className="text-[#C8A84B]">{total.toFixed(2)} €</span>
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
      </div>
    </>
  );
}
