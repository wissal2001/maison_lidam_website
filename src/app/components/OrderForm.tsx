import { X } from 'lucide-react';
import { useState } from 'react';
import { CartItem } from './CartDrawer';

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  postalCode: string;
  deliveryFee: number;
  total: number;
}

export function OrderForm({ isOpen, onClose, cartItems, postalCode, deliveryFee, total }: OrderFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    date: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="font-heading text-2xl font-bold text-[#2D4A2A] mb-3">
            Commande envoyée !
          </h2>
          <p className="text-[#4A2F1A]/80 mb-4">
            Merci pour votre commande. Je vérifie ma disponibilité et vous contacte sous 24h pour confirmer.
          </p>
          <p className="text-sm text-[#4A2F1A]/60">
            Vous recevrez les instructions pour l'acompte de 20€ via PayPal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#2D4A2A]/10 p-6 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-[#2D4A2A]">Finaliser ma commande</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#FAF6EE] rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-[#2D4A2A]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Cart Summary */}
          <div className="bg-[#FAF6EE] rounded-lg p-4">
            <h3 className="font-semibold text-[#2D4A2A] mb-3">Récapitulatif</h3>
            <div className="space-y-2 text-sm">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <span>{item.product.name} x{item.quantity}</span>
                  <span className="font-semibold text-[#C8A84B]">
                    {((item.product.price || 0) * item.quantity).toFixed(2)} €
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#2D4A2A]/10 flex justify-between font-semibold">
                <span>Total (avec livraison)</span>
                <span className="text-[#C8A84B]">{total.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2D4A2A] mb-2">
                Prénom *
              </label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-2 border border-[#2D4A2A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D4A2A] mb-2">
                Nom *
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-2 border border-[#2D4A2A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D4A2A] mb-2">
              Instagram ou téléphone *
            </label>
            <input
              type="text"
              required
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="@votre_instagram ou 06 12 34 56 78"
              className="w-full px-4 py-2 border border-[#2D4A2A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D4A2A] mb-2">
              Date souhaitée *
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border border-[#2D4A2A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D4A2A] mb-2">
              Code postal (livraison)
            </label>
            <input
              type="text"
              value={postalCode}
              disabled
              className="w-full px-4 py-2 border border-[#2D4A2A]/20 rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D4A2A] mb-2">
              Message (allergies, précisions, heure de livraison...)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              placeholder="Ex: Allergie aux fruits à coque, livraison souhaitée vers 14h..."
              className="w-full px-4 py-2 border border-[#2D4A2A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
            />
          </div>

          {/* Payment Notice */}
          <div className="bg-[#FFF9E6] border-2 border-[#C8A84B] rounded-lg p-4">
            <p className="text-sm text-[#4A2F1A]">
              <strong className="text-[#C8A84B]">💳 Acompte requis :</strong> Un acompte de 20 € via PayPal
              est requis pour confirmer votre commande. Je vérifie ma disponibilité et vous contacte sous 24h.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#2D4A2A] text-white py-4 rounded-lg hover:bg-[#3D6338] transition-colors font-medium text-lg"
          >
            Envoyer ma commande
          </button>
        </form>
      </div>
    </div>
  );
}
