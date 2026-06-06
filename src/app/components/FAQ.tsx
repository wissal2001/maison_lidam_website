import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Comment passer commande ?',
    answer: 'Vous pouvez passer commande directement via notre boutique en ligne en ajoutant les produits à votre panier, ou en remplissant le formulaire de devis personnalisé pour une création sur mesure. Je vous contacte ensuite sous 24-48h pour confirmer.'
  },
  {
    question: 'Quels délais pour préparer ma commande ?',
    answer: 'Tout est préparé frais pour votre événement ! Je recommande de commander au minimum 3-5 jours à l\'avance pour les petites commandes, et 1-2 semaines pour les plateaux importants ou événements. Pour les grandes occasions (mariages, etc.), contactez-moi le plus tôt possible.'
  },
  {
    question: 'Comment confirmer et payer l\'acompte ?',
    answer: 'Après validation de votre commande et vérification de ma disponibilité, je vous envoie les instructions pour régler un acompte via PayPal ou virement bancaire. Cet acompte confirme votre réservation. Le solde restant est à régler à la livraison ou lors de la remise en main propre.'
  },
  {
    question: 'Livrez-vous partout en IDF ?',
    answer: 'Oui, je livre dans toute l\'Île-de-France selon mes disponibilités ! Les frais varient selon votre adresse de livraison. Vous pouvez calculer une estimation de vos frais de livraison en entrant votre code postal dans la section Livraison. Pour les départements hors IDF, contactez-moi pour un devis.'
  },
  {
    question: 'Proposez-vous des commandes sur mesure ?',
    answer: 'Absolument ! Je suis spécialisée dans les créations sur mesure. Que ce soit pour adapter les quantités, personnaliser un plateau, créer une box cadeau spéciale, ou préparer un menu complet pour votre événement, remplissez le formulaire de devis et décrivez-moi votre projet.'
  },
  {
    question: 'Peut-on voir des photos avant de commander ?',
    answer: 'Oui ! Retrouvez toutes mes créations sur Instagram @maison.lidam et TikTok @dar.el.banat. Vous y verrez des photos et vidéos de mes pâtisseries, plateaux et plats. N\'hésitez pas à me contacter si vous avez des questions sur un produit en particulier !'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-[#FAF6EE]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#2D4A2A] mb-4">
            Questions fréquentes
          </h2>
          <p className="text-lg text-[#4A2F1A]/80">
            Vous avez une question ? La réponse est peut-être ici !
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#2D4A2A]/10"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#FAF6EE] transition-colors"
              >
                <span className="font-semibold text-[#2D4A2A] text-lg pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#C8A84B] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-[#FAF6EE] border-t border-[#2D4A2A]/10">
                  <p className="text-[#4A2F1A]">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
