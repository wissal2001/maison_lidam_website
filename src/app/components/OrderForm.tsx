import Image from 'next/image';
import { X } from 'lucide-react';
import { useState } from 'react';
import { CartItem } from './CartDrawer';

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onEditBasket: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, unitType?: string) => void;
  onRemoveItem: (productId: string, unitType?: string) => void;
}

function getDeliveryPrice(postalCode: string): number {
  if (!postalCode) return 0;

  const deliveryZones: Record<string, number> = {
    '91600': 0,
    '91120': 0,
    '91370': 2,
    '91': 5,
    '94': 5,
    '75': 7,
    '92': 7,
    '93': 8,
    '78': 8,
    '95': 10,
    '77': 10
  };

  const code = postalCode.trim();

  for (const [key, value] of Object.entries(deliveryZones)) {
    if (code.startsWith(key)) {
      return value;
    }
  }

  return 15;
}

export function OrderForm({ isOpen, onClose, onEditBasket, cartItems, onUpdateQuantity, onRemoveItem }: OrderFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    date: '',
    deliveryMode: '' as '' | 'retrait' | 'livraison',
    deliveryAddress: '',
    deliveryPostalCode: '',
    message: '',
    paymentMethod: '',
    paymentOther: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [instagramCopied, setInstagramCopied] = useState(false);
  const [validationError, setValidationError] = useState('');

  const subtotal = cartItems.reduce(
    (sum, item) => {
      const unitPrice = item.unitType && item.product.unitOptions
        ? item.product.unitOptions.find(o => o.id === item.unitType)?.price || item.product.price || 0
        : item.product.price || 0;
      return sum + unitPrice * item.quantity;
    },
    0
  );
  const deliveryFee = formData.deliveryMode === 'livraison'
    ? getDeliveryPrice(formData.deliveryPostalCode)
    : 0;
  const total = subtotal + deliveryFee;

  const buildOrderMessage = () => {
    const items = cartItems
      .map(
        (item) => {
          const unitPrice = item.unitType && item.product.unitOptions
            ? item.product.unitOptions.find(o => o.id === item.unitType)?.price || item.product.price || 0
            : item.product.price || 0;
          const unitLabel = item.unitType && item.product.unitOptions
            ? item.product.unitOptions.find(o => o.id === item.unitType)?.unit || item.product.unit
            : item.product.unit;
          return `- ${item.product.name} x${item.quantity}${item.unitType ? ` (${unitLabel})` : ''} = ${(unitPrice * item.quantity).toFixed(2)}€`;
        }
      )
      .join('\n');

    const getPaymentLabel = () => {
      if (formData.paymentMethod === 'paypal') return 'Paypal';
      if (formData.paymentMethod === 'virement') return 'Virement bancaire';
      return 'Autre (' + (formData.paymentOther || 'à préciser') + ')';
    };

    const deliveryInfo = formData.deliveryMode === 'retrait'
      ? 'Retrait sur place - Massy-Atlantis 91300 (adresse exacte transmise après confirmation)'
      : formData.deliveryMode === 'livraison'
        ? `Livraison : ${formData.deliveryAddress} (${formData.deliveryPostalCode})`
        : 'Non specifie';

    const lines = [
      '*Nouvelle commande Maison Lidam*',
      '',
      `*Client :* ${formData.firstName} ${formData.lastName}`,
      `*Telephone :* ${formData.contact}`,
      `*Date souhaitee :* ${formData.date}`,
      `${deliveryInfo}`,
      `*Acompte :* ${getPaymentLabel()}`,
      '',
      '*Commande :*',
      items,
      '',
      `*Sous-total :* ${subtotal.toFixed(2)}€`,
    ];

    if (formData.deliveryMode === 'livraison') {
      lines.push(`*Livraison :* ${deliveryFee.toFixed(2)}€`);
    }

    lines.push(`*Total :* ${total.toFixed(2)}€`);

    if (formData.message) {
      lines.push('', `*Message :* ${formData.message}`);
    }

    return lines.join('\n');
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
    setValidationError('');
    if (!formData.deliveryMode) {
      setValidationError('Veuillez sélectionner un mode de réception.');
      return;
    }
    if (!formData.paymentMethod) {
      setValidationError('Veuillez sélectionner un moyen de paiement pour l\'acompte.');
      return;
    }
    setSubmitted(true);
  };

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
              {/* Informations */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#2D4A2A] text-sm">Informations</span>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-[#4A2F1A]/50 hover:text-[#2D4A2A] transition-colors flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Modifier
                </button>
              </div>
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
                  <span className="text-[#4A2F1A]">
                    {formData.deliveryMode === 'retrait'
                      ? 'Retrait sur place - Massy-Atlantis 91300 (adresse exacte transmise après confirmation)'
                      : formData.deliveryMode === 'livraison'
                        ? `${formData.deliveryAddress} (${formData.deliveryPostalCode})`
                        : 'Non spécifié'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💳</span>
                  <span className="text-[#4A2F1A]">
                    Acompte : {formData.paymentMethod === 'paypal' ? 'Paypal' : formData.paymentMethod === 'virement' ? 'Virement bancaire' : formData.paymentMethod === 'autre' ? `Autre (${formData.paymentOther || 'à préciser'})` : 'Non spécifié'}
                  </span>
                </div>
                {formData.message && (
                  <div className="pt-2 border-t border-dashed border-[#2D4A2A]/20">
                    <span className="text-[#4A2F1A]/50 text-xs">Message :</span>
                    <p className="text-[#4A2F1A] text-sm mt-0.5">{formData.message}</p>
                  </div>
                )}
              </div>

              <div className="border-t border-[#2D4A2A]/20 pt-3" />

              {/* Panier */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#2D4A2A] text-sm">Panier</span>
                <button
                  type="button"
                  onClick={onEditBasket}
                  className="text-sm text-[#4A2F1A]/50 hover:text-[#2D4A2A] transition-colors flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Modifier
                </button>
              </div>
              <div className="space-y-2">
                {cartItems.map((item) => {
                  const unitPrice = item.unitType && item.product.unitOptions
                    ? item.product.unitOptions.find(o => o.id === item.unitType)?.price || item.product.price || 0
                    : item.product.price || 0;
                  const unitLabel = item.unitType && item.product.unitOptions
                    ? item.product.unitOptions.find(o => o.id === item.unitType)?.unit || item.product.unit
                    : item.product.unit;
                  return (
                    <div key={item.product.id + (item.unitType || '')} className="flex items-center gap-3 text-sm">
                      {item.product.images?.[0] ? (
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                      ) : (
                        <div className="text-2xl w-10 h-10 flex items-center justify-center flex-shrink-0">{item.product.emoji}</div>
                      )}
                      <span className="flex-1 text-[#2D4A2A]">{item.product.name} <span className="text-[#4A2F1A]/60">x{item.quantity}{item.unitType ? ` (${unitLabel})` : ''}</span></span>
                      <span className="font-semibold text-[#C8A84B]">
                        {(unitPrice * item.quantity).toFixed(2)} €
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-1 text-sm">
                {formData.deliveryMode === 'livraison' && (
                  <>
                    <div className="border-t border-dashed border-[#2D4A2A]/20 pt-3 flex justify-between text-[#4A2F1A]/70">
                      <span>Sous Total</span>
                      <span>{subtotal.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-[#4A2F1A]/70">
                      <span>Livraison (estimation)</span>
                      <span>{deliveryFee.toFixed(2)} €</span>
                    </div>
                  </>
                )}
                <div className="border-t border-dashed border-[#2D4A2A]/20 pt-3 flex justify-between font-bold text-[#2D4A2A] text-base">
                  <span>Total</span>
                  <span className="text-[#C8A84B]">{total.toFixed(2)} €</span>
                </div>
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
                Nom
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-2 border border-[#2D4A2A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D4A2A] mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="06 12 34 56 78"
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

          {/* Delivery Mode */}
          <div>
            <label className="block text-sm font-medium text-[#2D4A2A] mb-2">
              📍 Mode de réception *
            </label>
            <div className="space-y-2">
              <label
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  formData.deliveryMode === 'retrait'
                    ? 'border-[#2D4A2A] bg-white'
                    : 'border-[#2D4A2A]/10 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryMode"
                  value="retrait"
                  checked={formData.deliveryMode === 'retrait'}
                  onChange={(e) => setFormData({ ...formData, deliveryMode: e.target.value as '' | 'retrait' | 'livraison' })}
                  className="accent-[#2D4A2A]"
                />
                <div>
                  <span className="text-sm font-medium text-[#2D4A2A]">Retrait Sur Place</span>
                  <p className="text-xs text-[#4A2F1A]/60"> Massy-Atlantis 91300. Adresse exacte transmise après confirmation.</p>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  formData.deliveryMode === 'livraison'
                    ? 'border-[#2D4A2A] bg-white'
                    : 'border-[#2D4A2A]/10 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryMode"
                  value="livraison"
                  checked={formData.deliveryMode === 'livraison'}
                  onChange={(e) => setFormData({ ...formData, deliveryMode: e.target.value as '' | 'retrait' | 'livraison' })}
                  className="accent-[#2D4A2A]"
                />
                <div>
                  <span className="text-sm font-medium text-[#2D4A2A]">Livraison</span>
                  <p className="text-xs text-[#4A2F1A]/60">Frais estimés selon le code postal</p>
                </div>
              </label>
            </div>

            {formData.deliveryMode === 'livraison' && (
              <div className="space-y-3 pt-3">
                <div>
                  <label className="block text-sm font-medium text-[#2D4A2A] mb-2">
                    Adresse complète
                  </label>
                  <input
                    type="text"
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    placeholder="Numéro, rue, ville..."
                    className="w-full px-4 py-2 border border-[#2D4A2A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D4A2A] mb-2">
                    Code postal *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.deliveryPostalCode}
                    onChange={(e) => setFormData({ ...formData, deliveryPostalCode: e.target.value })}
                    placeholder="Ex: 91120"
                    className="w-full px-4 py-2 border border-[#2D4A2A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
                  />
                  {formData.deliveryPostalCode && (
                    <p className="text-xs text-[#C8A84B] mt-1">
                      Frais de livraison estimés : {deliveryFee.toFixed(2)} €
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Acompte */}
          <div>
            <label className="block text-sm font-medium text-[#2D4A2A] mb-2">
              Acompte *
            </label>
            <div className="flex gap-2">
              {[
                { value: 'paypal', label: 'Paypal', desc: '(recommandé)' },
                { value: 'virement', label: 'Virement', desc: '' },
                { value: 'autre', label: 'Autre', desc: '(à préciser)' },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex-1 flex items-center justify-center gap-1.5 p-2 rounded-lg border cursor-pointer transition-colors text-sm ${
                    formData.paymentMethod === option.value
                      ? 'border-[#2D4A2A] bg-[#2D4A2A]/5 text-[#2D4A2A]'
                      : 'border-[#2D4A2A]/10 bg-white text-[#4A2F1A]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={option.value}
                    checked={formData.paymentMethod === option.value}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="sr-only"
                  />
                  <span>
                    {option.label} <span className="text-[#4A2F1A]/50">{option.desc}</span>
                  </span>
                </label>
              ))}
            </div>
            {formData.paymentMethod === 'autre' && (
              <input
                type="text"
                value={formData.paymentOther}
                onChange={(e) => setFormData({ ...formData, paymentOther: e.target.value })}
                placeholder="Précisez le moyen de paiement..."
                className="w-full px-4 py-2 border border-[#2D4A2A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A84B] text-sm mt-2"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D4A2A] mb-2">
              Message (précisions, heure de livraison, allergies, demandes spéciales...)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              placeholder="Ex: Allergie aux fruits à coque, livraison souhaitée vers 14h..."
              className="w-full px-4 py-2 border border-[#2D4A2A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
            />
          </div>

          {/* Submit Button */}
          {validationError && (
            <p className="text-red-500 text-sm text-center">{validationError}</p>
          )}
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
