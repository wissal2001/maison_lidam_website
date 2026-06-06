import { useState } from 'react';
import { MapPin, TruckIcon } from 'lucide-react';

const deliveryZones = [
  { zone: 'Zone 1', areas: 'Massy, Palaiseau, Verrières-le-Buisson (91 proche)', price: '0-2 €', codes: ['91600', '91120', '91370'] },
  { zone: 'Zone 2', areas: 'Essonne (91), Val-de-Marne (94)', price: '5 €', codes: ['91', '94'] },
  { zone: 'Zone 3', areas: 'Paris (75), Hauts-de-Seine (92)', price: '7 €', codes: ['75', '92'] },
  { zone: 'Zone 4', areas: 'Seine-Saint-Denis (93), Yvelines (78)', price: '8 €', codes: ['93', '78'] },
  { zone: 'Zone 5', areas: 'Val-d\'Oise (95), Seine-et-Marne (77)', price: '10 €', codes: ['95', '77'] },
  { zone: 'Hors IDF', areas: 'Autres départements', price: 'Sur devis', codes: [] }
];

function getDeliveryInfo(postalCode: string) {
  if (!postalCode) return null;

  const code = postalCode.trim();

  for (const zone of deliveryZones) {
    for (const zoneCode of zone.codes) {
      if (code.startsWith(zoneCode)) {
        return zone;
      }
    }
  }

  return deliveryZones[deliveryZones.length - 1];
}

export function DeliverySection() {
  const [postalCode, setPostalCode] = useState('');
  const deliveryInfo = getDeliveryInfo(postalCode);

  return (
    <section id="livraison" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#2D4A2A] mb-4">
            Livraison en Île-de-France
          </h2>
          <p className="text-lg text-[#4A2F1A]/80">
            Selon mes disponibilités · Remise en main propre possible
          </p>
        </div>

        {/* Postal Code Widget */}
        <div className="bg-[#FAF6EE] border-2 border-[#C8A84B] rounded-2xl p-8 mb-12 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-[#C8A84B]" />
            <h3 className="font-heading text-2xl font-bold text-[#2D4A2A]">
              Calculez vos frais de livraison
            </h3>
          </div>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Entrez votre code postal (ex: 91120)"
            className="w-full px-6 py-4 border-2 border-[#2D4A2A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A84B] text-lg mb-4"
          />

          {deliveryInfo && (
            <div className="bg-white rounded-lg p-6 border-2 border-[#2D4A2A]/10">
              <div className="flex items-start gap-4">
                <TruckIcon className="w-8 h-8 text-[#2D4A2A] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-bold text-xl text-[#2D4A2A] mb-1">
                    {deliveryInfo.zone}
                  </div>
                  <div className="text-[#4A2F1A]/70 mb-2">
                    {deliveryInfo.areas}
                  </div>
                  <div className="text-2xl font-bold text-[#C8A84B]">
                    Frais : {deliveryInfo.price}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Zones Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-[#2D4A2A] text-white">
                <th className="px-6 py-4 text-left font-heading text-lg">Zone</th>
                <th className="px-6 py-4 text-left font-heading text-lg">Départements / Villes</th>
                <th className="px-6 py-4 text-right font-heading text-lg">Frais de livraison</th>
              </tr>
            </thead>
            <tbody>
              {deliveryZones.map((zone, index) => (
                <tr
                  key={index}
                  className={`border-b border-[#2D4A2A]/10 ${
                    index % 2 === 0 ? 'bg-[#FAF6EE]' : 'bg-white'
                  } hover:bg-[#e8e2d5] transition-colors`}
                >
                  <td className="px-6 py-4 font-semibold text-[#2D4A2A]">
                    {zone.zone}
                  </td>
                  <td className="px-6 py-4 text-[#4A2F1A]">
                    {zone.areas}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-[#C8A84B]">
                    {zone.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note */}
        <div className="mt-8 bg-[#FFF9E6] border border-[#C8A84B]/30 rounded-lg p-6 max-w-3xl mx-auto">
          <p className="text-[#4A2F1A] text-center">
            💡 <strong>Note importante :</strong> Je suis étudiante — ma disponibilité est vérifiée
            à chaque commande. Merci de me contacter en avance pour les grandes occasions !
          </p>
        </div>
      </div>
    </section>
  );
}
