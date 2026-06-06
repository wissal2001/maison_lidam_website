import { X } from 'lucide-react';
import { useState } from 'react';
import { CartItem } from './CartDrawer';

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onEditOrder: () => void;
  cartItems: CartItem[];
  postalCode: string;
  deliveryFee: number;
  total: number;
}

export function OrderForm({ isOpen, onClose, onEditOrder, cartItems, postalCode, deliveryFee, total }: OrderFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    date: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [instagramCopied, setInstagramCopied] = useState(false);

  const buildOrderMessage = () => {
    const items = cartItems
      .map(
        (item) =>
          `- ${item.product.name} x${item.quantity} = ${((item.product.price || 0) * item.quantity).toFixed(2)}€`
      )
      .join('\n');

    return [
      '🛍️ *Nouvelle commande Maison Lidam*',
      '',
      `👤 *Client :* ${formData.firstName} ${formData.lastName}`,
      `📞 *Contact :* ${formData.contact}`,
      `📅 *Date souhaitée :* ${formData.date}`,
      `📍 *Code postal :* ${postalCode}`,
      '',
      '📦 *Commande :*',
      items,
      '',
      `💰 *Sous-total :* ${(total - deliveryFee).toFixed(2)}€`,
      `🚚 *Livraison :* ${deliveryFee.toFixed(2)}€`,
      `💵 *Total :* ${total.toFixed(2)}€`,
      formData.message ? `\n💬 *Message :* ${formData.message}` : '',
    ].join('\n');
  };

  const handleWhatsApp = () => {
    const message = buildOrderMessage();
    const url = `https://wa.me/33764258783?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleInstagram = () => {
    navigator.clipboard.writeText(buildOrderMessage());
    setInstagramCopied(true);
  };

  const handleOpenInstagram = () => {
    window.open('https://ig.me/m/maison.lidam', '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const subtotal = total - deliveryFee;

  if (!isOpen) return null;

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 bg-black/50 overflow-y-auto">
        <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
          {/* Header */}
          <div className="text-center p-6 border-b border-[#2D4A2A]/10">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="font-heading text-2xl font-bold text-[#2D4A2A]">
              Commande prête !
            </h2>
            <p className="text-[#4A2F1A]/70 mt-1">
              Merci {formData.firstName} ! Vérifiez votre récapitulatif avant d'envoyer.
            </p>
          </div>

          {/* Recap */}
          <div className="p-6">
            <div className="bg-[#FAF6EE] rounded-xl p-5 space-y-3">
              {/* Client info */}
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center gap-2">
                  <span>👤</span>
                  <span className="text-[#2D4A2A] font-medium">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📞</span>
                  <span className="text-[#4A2F1A]">{formData.contact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span className="text-[#4A2F1A]">{formData.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span className="text-[#4A2F1A]">{postalCode}</span>
                </div>
              </div>

              <div className="border-t border-[#2D4A2A]/10 pt-3" />

              {/* Cart items */}
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-[#2D4A2A]">{item.product.name} <span className="text-[#4A2F1A]/60">x{item.quantity}</span></span>
                    <span className="font-semibold text-[#C8A84B]">
                      {((item.product.price || 0) * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#2D4A2A]/10 pt-3 space-y-1 text-sm">
                <div className="flex justify-between text-[#4A2F1A]/70">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-[#4A2F1A]/70">
                  <span>Livraison</span>
                  <span>{deliveryFee.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between font-bold text-[#2D4A2A] text-base pt-1">
                  <span>Total</span>
                  <span className="text-[#C8A84B]">{total.toFixed(2)} €</span>
                </div>
              </div>

              {formData.message && (
                <>
                  <div className="border-t border-[#2D4A2A]/10 pt-3" />
                  <div className="text-sm">
                    <span className="text-[#4A2F1A]/50 text-xs">Message :</span>
                    <p className="text-[#4A2F1A] mt-0.5">{formData.message}</p>
                  </div>
                </>
              )}

              <div className="border-t border-[#2D4A2A]/10 pt-3">
                <button
                  onClick={onEditOrder}
                  className="text-sm text-[#4A2F1A]/50 hover:text-[#2D4A2A] transition-colors flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Modifier la commande
                </button>
              </div>
            </div>

            <div className="border-t border-[#2D4A2A]/10 my-5" />

            {!instagramCopied ? (
              <>
                <p className="text-sm text-[#4A2F1A]/60 text-center mb-4">
                  Envoyer ma commande
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleWhatsApp}
                    className="flex flex-col items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl hover:bg-[#20BD5A] transition-colors font-medium"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="text-sm">WhatsApp</span>
                  </button>

                  <button
                    onClick={handleInstagram}
                    className="flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white py-4 rounded-xl hover:opacity-90 transition-opacity font-medium"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 010 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z"/>
                    </svg>
                    <span className="text-sm">Instagram</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-gray-50 rounded-xl p-6 text-center space-y-4">
                <div className="text-4xl">📋</div>
                <p className="text-sm text-[#4A2F1A]/80 font-medium">
                  Message copié !
                </p>
                <p className="text-xs text-[#4A2F1A]/60">
                  Collez le message dans votre conversation Instagram
                </p>
                <button
                  onClick={handleOpenInstagram}
                  className="w-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Ouvrir Instagram
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-[#2D4A2A]/10 p-4 text-center">
            <button
              onClick={onClose}
              className="text-sm text-[#4A2F1A]/50 hover:text-[#2D4A2A] transition-colors"
            >
              Fermer
            </button>
          </div>
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
              <strong className="text-[#C8A84B]">💳 Acompte requis :</strong> Après vérification de votre commande, un acompte (via PayPal ou virement bancaire)
              est requis pour confirmer votre commande.
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
