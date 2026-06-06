export function TrustBanner() {
  const features = [
    {
      emoji: '🏺',
      title: '100% Fait maison artisanal'
    },
    {
      emoji: '🚗',
      title: 'Livraison IDF selon disponibilité'
    },
    {
      emoji: '💳',
      title: 'Acompte sécurisé PayPal'
    },
    {
      emoji: '💬',
      title: 'Réponse sous 24-48h'
    }
  ];

  return (
    <div className="bg-white border-y border-[#2D4A2A]/15 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-2">
              <div className="text-4xl">{feature.emoji}</div>
              <div className="text-sm text-[#2D4A2A]">{feature.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
