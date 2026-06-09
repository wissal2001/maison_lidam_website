import { useState } from 'react';

interface CustomQuoteFormProps {
  onClose?: () => void;
}

export function CustomQuoteForm({ onClose }: CustomQuoteFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    creationType: '',
    eventType: '',
    date: '',
    guestCount: '',
    description: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = buildQuoteMessage();
    const url = `https://wa.me/33764258783?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        contact: '',
        creationType: '',
        eventType: '',
        date: '',
        guestCount: '',
        description: ''
      });
    }, 3000);
  };

  const buildQuoteMessage = () => {
    const typeLabels: Record<string, string> = {
      'plateau-gateaux': 'Plateau de gâteaux marocains',
      'mini-sales': 'Mini-salés / Buffet',
      'plat-traditionnel': 'Plat traditionnel',
      'plateau-mixte': 'Plateau mixte sucré-salé',
      'box-cadeau': 'Box cadeau',
      'autre': 'Autre / Sur mesure'
    };
    const eventLabels: Record<string, string> = {
      'anniversaire': 'Anniversaire',
      'mariage': 'Mariage',
      'naissance': 'Naissance',
      'aqiqa': 'Aqiqa',
      'ceremonie': 'Cérémonie religieuse',
      'famille': 'Réunion familiale',
      'professionnel': 'Événement professionnel',
      'autre': 'Autre'
    };
    const lines = [
      '*Nouvelle demande de devis*',
      '',
      `*Client :* ${formData.firstName} ${formData.lastName}`,
      `*Contact :* ${formData.contact}`,
      `*Type :* ${typeLabels[formData.creationType] || formData.creationType}`,
      `*Événement :* ${eventLabels[formData.eventType] || formData.eventType}`,
      `*Date souhaitée :* ${formData.date}`,
      formData.guestCount ? `*Nombre de personnes :* ${formData.guestCount}` : '',
      '',
      '*Description :*',
      formData.description
    ].filter(Boolean);
    return lines.join('\n');
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-auto">
        <div className="text-6xl mb-4">✨</div>
        <h2 className="font-heading text-2xl font-bold text-[#2D4A2A] mb-3">
          Demande envoyée !
        </h2>
        <p className="text-[#4A2F1A]/80">
          Merci pour votre demande. Je vous réponds sous 24-48h avec un devis personnalisé.
        </p>
      </div>
    );
  }

  return (
    <section id="devis" className="py-16 bg-[#2D4A2A]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#FAF6EE] mb-4">
            Une idée sur mesure ? Parlons-en !
          </h2>
          <p className="text-lg text-[#FAF6EE]/80 max-w-2xl mx-auto">
            "Bonjour ! Je cherche des plateaux de sablés et louz pour 20 personnes, vous proposez ça ?"
            <br />
            <strong className="text-[#C8A84B]">→ Oui, tout est possible !</strong> Dites-moi ce dont vous avez besoin.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 space-y-6">
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
              Téléphone
            </label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="06 12 34 56 78"
              className="w-full px-4 py-2 border border-[#2D4A2A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D4A2A] mb-2">
              Type de création *
            </label>
            <select
              required
              value={formData.creationType}
              onChange={(e) => setFormData({ ...formData, creationType: e.target.value })}
              className="w-full px-4 py-2 border border-[#2D4A2A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
            >
              <option value="">Sélectionnez...</option>
              <option value="plateau-gateaux">Plateau de gâteaux marocains</option>
              <option value="mini-sales">Mini-salés / Buffet</option>
              <option value="plat-traditionnel">Plat traditionnel</option>
              <option value="plateau-mixte">Plateau mixte sucré-salé</option>
              <option value="box-cadeau">Box cadeau</option>
              <option value="autre">Autre / Sur mesure</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D4A2A] mb-2">
              Événement *
            </label>
            <select
              required
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
              className="w-full px-4 py-2 border border-[#2D4A2A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
            >
              <option value="">Sélectionnez...</option>
              <option value="anniversaire">Anniversaire</option>
              <option value="mariage">Mariage</option>
              <option value="naissance">Naissance</option>
              <option value="aqiqa">Aqiqa</option>
              <option value="ceremonie">Cérémonie religieuse</option>
              <option value="famille">Réunion familiale</option>
              <option value="professionnel">Événement professionnel</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                Nombre de personnes
              </label>
              <input
                type="number"
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                placeholder="Ex: 20"
                className="w-full px-4 py-2 border border-[#2D4A2A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D4A2A] mb-2">
              Description de votre projet *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={5}
              placeholder="Ex: Bonjour ! Je cherche un plateau de sablés et louz pour 20 personnes, mariage le 15 juillet, livraison à Évry. Budget environ 40€. Des photos disponibles ?"
              className="w-full px-4 py-2 border border-[#2D4A2A]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A84B]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#C8A84B] text-[#2D4A2A] py-4 rounded-none hover:bg-[#b89940] transition-colors font-medium text-lg"
          >
            Envoyer ma demande
          </button>
        </form>
      </div>
    </section>
  );
}
