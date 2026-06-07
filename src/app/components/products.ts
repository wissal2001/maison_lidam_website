export interface UnitOption {
  id: string;
  label: string;
  price: number;
  unit: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  price: number | null;
  unit: string;
  unitOptions?: UnitOption[];
  category: 'gateaux' | 'mini-sales' | 'plateaux' | 'plats';
  emoji: string;
  images?: string[];
  videos?: string[];
}

export const products: Product[] = [
  // ------------------------- GÂTEAUX MAROCAINS -------------------------
  {
    id: 'cornes-gazelle',
    name: 'Cornes de Gazelle (Kaab el Ghazal)',
    description: 'Amandes, eau de fleur d\'oranger, gomme arabique',
    fullDescription: 'Délicieuses cornes de gazelle préparées selon la recette traditionnelle marocaine. Pâte fine remplie d\'amandes parfumées à l\'eau de fleur d\'oranger et à la gomme arabique.',
    price: 8,
    unit: 'douzaine',
    unitOptions: [
      { id: 'weight', label: 'Au 250g', price: 12.5, unit: '250g' },
      { id: 'piece', label: "À l'unité", price: 1.5, unit: 'pièce' },
    ],
    category: 'gateaux',
    emoji: '🌙',
    images: ['/images/kaaba/kaaba_2.jpeg', '/images/kaaba/kaaba_0.png', '/images/kaaba/kaaba_1.png'],
  },
  {
    id: 'Saqiya-amandes',
    name: 'Gâteau aux Amandes et Sésame (Saqiya Amandes)',
    description: 'Amandes, eau de fleur d\'oranger, sésame',
    fullDescription: 'Délicieuses Saqiya préparées selon la recette traditionnelle marocaine. Amandes parfumées à l\'eau de fleur d\'oranger et enrobée de graines de sésame',
    price: 8,
    unit: 'douzaine',
    unitOptions: [
      { id: 'weight', label: 'Au 250g', price: 10, unit: '250g' },
      { id: 'piece', label: "À l'unité", price: 1, unit: 'pièce' },
    ],
    category: 'gateaux',
    emoji: '🌙',
    images: ['/images/saqiya/saqiya_0.jpeg', '/images/saqiya/saqiya_1.jpeg'],
  },
  {
    id: 'sables-chocolat-1',
    name: 'Sablés au Chocolat Maison',
    description: 'Beurre, chocolat noir, cacahuetes',
    fullDescription: 'Sablés marocains préparés selon une recette authentique. Texture fondante et dorée à point.',
    price: 8,
    unit: 'douzaine',
    unitOptions: [
      { id: 'weight', label: 'Au 250g', price: 8, unit: '250g' },
      { id: 'piece', label: "À l'unité", price: 0.6, unit: 'pièce' },
    ],
    category: 'gateaux',
    emoji: '🌙',
    images: ['/images/sables-chocolat-1/sables-chocolat-1_0.jpeg', '/images/sables-chocolat-1/sables-chocolat-1_1.jpeg'],
  },
  {
    id: 'richbond',
    name: 'Gâteaux Richbond',
    description: 'Fondants, noix de coco et amandes',
    fullDescription: 'Gâteaux fondants à la noix de coco et aux amandes, une douceur irrésistible pour accompagner votre thé.',
    price: 7,
    unit: 'douzaine',
    unitOptions: [
      { id: 'weight', label: 'Au 250g', price: 9, unit: '250g' },
      { id: 'piece', label: "À l'unité", price: 0.65, unit: 'pièce' },
    ],
    category: 'gateaux',
    emoji: '🥥',
    images: ['/images/richbond/richbond_3.jpeg','/images/richbond/richbond_0.jpeg', '/images/richbond/richbond_1.jpeg', '/images/richbond/richbond_2.jpeg'],
  },
  {
    id: 'Fekas',
    name: 'Gâteaux Fekas',
    description: 'Biscuits croquants aux fruits secs',
    fullDescription: 'Gâteaux Fekas, des biscuits marocains croquants aux fruits secs et épices, parfaits pour accompagner votre thé à la menthe.',
    price: 7,
    unit: 'douzaine',
    unitOptions: [
      { id: 'weight', label: 'Au 250g', price: 8, unit: '250g' },
      { id: 'piece', label: "À l'unité", price: 0.5, unit: 'pièce' },
    ],
    category: 'gateaux',
    emoji: '🥥',
    images: ['/images/fekas/fekas_1.jpeg', '/images/fekas/fekas_2.jpeg', '/images/fekas/fekas_0.jpeg'],
  },
  {
    id: 'cookies',
    name: 'Cookies à la marocaine (3 versions)',
    description: 'Pinky · Greeny · Yellowy',
    fullDescription: 'Cookies marocains revisités en trois versions colorées : rose (Pinky), vert (Greeny) et jaune (Yellowy). Un mélange unique de tradition et de modernité.',
    price: 8,
    unit: 'douzaine',
    unitOptions: [
      { id: 'weight', label: 'Au 250g', price: 8, unit: '250g' },
      { id: 'piece', label: "À l'unité", price: 1, unit: 'pièce' }
    ],
    category: 'gateaux',
    emoji: '🍬',
    images: ['/images/cookies/cookies_2.jpeg', '/images/cookies/cookies_0.jpeg', '/images/cookies/cookies_1.jpeg'],
  },
  {
    id: 'Zelija',
    name: 'Zelija aux Cacahuètes',
    description: 'Gâteau aux cacahuètes, chocolat et caramel beurre salé',
    fullDescription: 'Gâteau marocain aux cacahuètes, chocolat et caramel beurre salé, une délice pour les amateurs de douceur.',
    price: 8,
    unit: 'douzaine',
    unitOptions: [
      { id: 'weight', label: 'Au 250g', price: 8, unit: '250g' },
      { id: 'piece', label: "À l'unité", price: 1, unit: 'pièce' }
    ],
    category: 'gateaux',
    emoji: '🍬',
    images: ['/images/zelija/zelija_2.jpeg', '/images/zelija/zelija_0.jpeg', '/images/zelija/zelija_1.jpeg'],
  },
  {
    id: 'gateau-sesame-cacahuetes',
    name: 'Gâteau aux sésames et cacahuètes',
    description: 'Sésames, cacahuetes, chocolat noir',
    fullDescription: 'Sablés marocains préparés selon une recette authentique. Texture fondante et dorée à point.',
    price: 8,
    unit: 'douzaine',
    unitOptions: [
      { id: 'weight', label: 'Au 250g', price: 8, unit: '250g' },
      { id: 'piece', label: "À l'unité", price: 0.6, unit: 'pièce' },
    ],
    category: 'gateaux',
    emoji: '🌙',
    images: ['/images/gateau-sesame-cacahuetes/gateau-sesame-cacahuetes_0.jpeg', '/images/gateau-sesame-cacahuetes/gateau-sesame-cacahuetes_1.jpeg', '/images/gateau-sesame-cacahuetes/gateau-sesame-cacahuetes_2.jpeg'],
  },
  {
    id: 'ghriba',
    name: 'Gâteau noix de coco et semoule',
    description: 'Noix de coco, semoule, beurre',
    fullDescription: 'Ghriba marocaine à la noix de coco et semoule extra fondante, une douceur fondante et parfumée pour accompagner votre thé.',
    price: 8,
    unit: 'douzaine',
    unitOptions: [
      { id: 'weight', label: 'Au 250g', price: 8, unit: '250g' },
      { id: 'piece', label: "À l'unité", price: 0.6, unit: 'pièce' },
    ],
    category: 'gateaux',
    emoji: '🌙',
    images: ['/images/ghriba/ghriba_0.jpeg', '/images/ghriba/ghriba_1.jpeg'],
  },
  {
    id: 'Saqiya-cacahuetes',
    name: 'Gâteau aux Cacahuètes et Sésame (Saqiya Cacahuètes)',
    description: 'Cacahuètes, sésame, Chocolat',
    fullDescription: 'Délicieuses Saqiya préparées selon la recette traditionnelle marocaine. Cacahuètes enrobée de graines de sésame et chocolat',
    price: 8,
    unit: 'douzaine',
    unitOptions: [
      { id: 'weight', label: 'Au 250g', price: 10, unit: '250g' },
      { id: 'piece', label: "À l'unité", price: 1, unit: 'pièce' },
    ],
    category: 'gateaux',
    emoji: '🌙',
    images: ['/images/saqiya-cacahuete/saqiya-cacahuetes_0.jpeg', '/images/saqiya-cacahuete/saqiya-cacahuetes_1.jpeg'],
  },
  // {
  //   id: 'chebakia',
  //   name: 'Chebakia / Griwech',
  //   description: 'Miel, sésame, épices douces',
  //   fullDescription: 'Pâtisserie en forme de fleur, frite puis enrobée de miel et saupoudrée de sésame. Traditionnellement servie pendant le Ramadan.',
  //   price: 10,
  //   unit: 'douzaine',
  //   category: 'gateaux',
  //   emoji: '🌺',
  //   images: ['/images/fekas.webp']
  // }, Sellou??
  // ------------------------- MINI-SALÉS & BUFFET -------------------------
  {
    id: 'mini-pizzas',
    name: 'Mini Pizzas Maison',
    description: 'Sauce tomate, fromage, garniture fraîche (Thon/Végétarienne)',
    fullDescription: 'Mini pizzas préparées maison avec une pâte légère, sauce tomate maison, fromage et garnitures fraîches au choix (thon ou végétarienne). Parfaites pour vos apéritifs et buffets.',
    price: 10,
    unit: 'dizaine',
    unitOptions: [
      { id: 'dizaine', label: 'dizaine', price: 15, unit: 'dizaine' },
      { id: 'piece', label: "À l'unité", price: 1.75, unit: 'pièce' },
    ],
    category: 'mini-sales',
    emoji: '🍕',
    images: ['/images/mini-pizza/mini-pizza_2.jpeg', '/images/mini-pizza/mini-pizza_1.jpeg', '/images/mini-pizza/mini-pizza_0.jpeg'],
  },
  {
    id: 'mini-bastilla',
    name: 'Mini Bastilla',
    description: 'Pâte feuilletée, Amandes, viande/poisson, épices',
    fullDescription: 'Mini bastillas préparées maison avec une pâte feuilletée, amandes, viande/poisson et épices. Parfaites pour vos apéritifs et buffets.',
    price: 10,
    unit: 'dizaine',
    unitOptions: [
      { id: 'dizaine', label: 'dizaine', price: 40, unit: 'dizaine' },
      { id: 'piece', label: "À l'unité", price: 4.5, unit: 'pièce' },
    ],
    category: 'mini-sales',
    emoji: '🥧',
    images: ['/images/mini-bastilla/mini-bastilla_1.webp', '/images/mini-bastilla/mini-bastilla_0.jpeg'],
  },
  {
    id: 'mini-burgers',
    name: 'Mini Burgers',
    description: 'Pain maison, viande hachée, garniture fraîche',
    fullDescription: 'Mini burgers préparés maison avec un pain maison, de la viande hachée et des garnitures fraîches. Parfaits pour vos apéritifs et buffets.',
    price: 10,
    unit: 'dizaine',
    unitOptions: [
      { id: 'dizaine', label: 'dizaine', price: 27.5, unit: 'dizaine' },
      { id: 'piece', label: "À l'unité", price: 3, unit: 'pièce' },
    ],
    category: 'mini-sales',
    emoji: '🍔',
    images: ['/images/mini-burgers/mini-burgers_1.jpeg', '/images/mini-burgers/mini-burgers_0.jpeg'],
  },
  {
    id: 'mini-toastes',
    name: 'Mini Toastes',
    description: 'Pain grillé, garniture fraîche (Avocat/Thon/Végétarienne)',
    fullDescription: 'Mini toastes préparés maison avec un pain grillé, des garnitures fraîches. Parfaits pour vos apéritifs et buffets.',
    price: 10,
    unit: 'dizaine',
    unitOptions: [
      { id: 'dizaine', label: 'dizaine', price: 12.5, unit: 'dizaine' },
      { id: 'piece', label: "À l'unité", price: 1.5, unit: 'pièce' },
    ],
    category: 'mini-sales',
    emoji: '🍔',
    images: ['/images/mini-toastes/mini-toastes_1.webp', '/images/mini-toastes/mini-toastes_0.jpeg'],
  },
  {
    id: 'mini-brioches',
    name: 'Mini Brioches Garnies',
    description: 'Pain brioche, Pavot, garniture fraîche (Viande/Thon/Végétarienne), Fromage Cheddar',
    fullDescription: 'Mini brioches préparées maison avec un pain brioche moelleux, graines de pavot, garnitures fraîches (viande, thon ou végétarienne) et fromage cheddar. Parfaites pour vos apéritifs et buffets.',
    price: 10,
    unit: 'dizaine',
    unitOptions: [
      { id: 'dizaine', label: 'dizaine', price: 18, unit: 'dizaine' },
      { id: 'piece', label: "À l'unité", price: 2, unit: 'pièce' },
    ],
    category: 'mini-sales',
    emoji: '🍔',
    images: ['/images/mini-brioches/mini-brioches_0.jpeg'],
  },
  {
    id: 'mini-batbouts',
    name: 'Mini Batbouts Garnis',
    description: 'Pain batbout, garniture fraîche (Viande/Thon/Végétarienne)',
    fullDescription: 'Mini batbouts préparées maison avec un pain batbout, des garnitures fraîches. Parfaites pour vos apéritifs et buffets.',
    price: 10,
    unit: 'dizaine',
    unitOptions: [
      { id: 'dizaine', label: 'dizaine', price: 16, unit: 'dizaine' },
      { id: 'piece', label: "À l'unité", price: 1.75, unit: 'pièce' },
    ],
    category: 'mini-sales',
    emoji: '🍔',
    images: ['/images/mini-batbouts/mini-batbouts_0.png'],
  },
  {
    id: 'mini-sale-40',
    name: 'Plateau varié salé ± 40 pièces',
    description: 'Mix mini-salés pour apéritif ou buffet (assortiment sur mesure 5-7 types de mini-salés)',
    fullDescription: 'Plateau complet de environ 40 pièces avec assortiment de mini-salés. Parfait pour un apéritif ou un buffet.',
    price: 50,
    unit: 'plateau',
    category: 'mini-sales',
    emoji: '🍽️',
    images: ['/images/assortiments-sales/plateau-sale_0.jpeg']
  },
  {
    id: 'buffet-sale-sur-mesure',
    name: 'Buffet complet salé',
    description: 'Quantité & contenu sur mesure',
    fullDescription: 'Buffet salé entièrement personnalisé selon vos besoins : nombre de personnes, types de mini-salés, accompagnements. Contactez-moi pour un devis adapté à votre événement.',
    price: null,
    unit: 'sur devis',
    category: 'mini-sales',
    emoji: '🎉',
    images: ['/images/buffet/buffet_0.jpg']
  },

  // ------------------------- PLATEAUX -------------------------
  {
    id: 'plateau-sucre-25',
    name: 'Plateau Oriental Prestige ± 25 pièces',
    description: 'Mix gâteaux marocains signature',
    fullDescription: 'Plateau de environ 25 pièces avec une sélection aux choixde nos meilleurs gâteaux marocains : cornes de gazelle, sablés, louz, cookies...',
    price: 30,
    unit: 'plateau',
    category: 'plateaux',
    emoji: '🎁',
    images: ['/images/assortiments-sucres/plateau-sucre-26_0.jpeg']
  },
  {
    id: 'plateau-sucre-20',
    name: 'Plateau Oriental Prestige ± 20 pièces',
    description: 'Mix gâteaux marocains signature',
    fullDescription: 'Plateau de environ 20 pièces avec une sélection aux choixde nos meilleurs gâteaux marocains : cornes de gazelle, sablés, louz, cookies...',
    price: 25,
    unit: 'plateau',
    category: 'plateaux',
    emoji: '🎁',
    images: ['/images/assortiments-sucres/plateau-sucre-22_0.jpeg', '/images/assortiments-sucres/plateau-sucre-21_bis_0.jpeg', '/images/assortiments-sucres/plateau-sucre-21_0.jpeg']
  },
  {
    id: 'plateau-sale-40',
    name: 'Plateau varié salé ± 40 pièces',
    description: 'Mix mini-salés pour apéritif ou buffet (assortiment sur mesure 6-7 types de mini-salés)',
    fullDescription: 'Plateau complet de environ 40 pièces avec assortiment de mini-salés. Parfait pour un apéritif ou un buffet.',
    price: 50,
    unit: 'plateau',
    category: 'plateaux',
    emoji: '🍽️',
    images: ['/images/assortiments-sales/plateau-sale_0.jpeg']
  },
  {
    id: 'plateau-sale-25',
    name: 'Plateau varié salé ± 25 pièces',
    description: 'Mix mini-salés pour apéritif ou buffet (assortiment sur mesure 4-5 types de mini-salés)',
    fullDescription: 'Plateau complet de environ 25 pièces avec assortiment de mini-salés. Parfait pour un apéritif ou un buffet.',
    price: 30,
    unit: 'plateau',
    category: 'plateaux',
    emoji: '🍽️',
    images: ['/images/assortiments-sales/plateau-sale_0.jpeg']
  },
  {
    id: 'box-cadeau',
    name: 'Box/Coffret Cadeau Personnalisé',
    description: 'Contenu & packaging sur mesure',
    fullDescription: 'Box/Coffret entièrement personnalisé selon vos envies : choix des pâtisseries, couleurs, message personnalisé. Parfait pour offrir lors d\'occasions spéciales.',
    price: null,
    unit: 'sur devis',
    category: 'plateaux',
    emoji: '🎀',
    images: ['/images/box/box_4.jpeg', '/images/box/box_2.jpeg', '/images/box/box_1.jpeg', '/images/box/box_0.jpeg']
  },
  {
    id: 'plateau-varie-maison',
    name: 'Plateau 100% Personnalisé Maison Lidam',
    description: 'Sucré / salé, idéal événement',
    fullDescription: 'Notre plateau signature mixant sucré et/ou salé, parfait pour vos événements. Composition personnalisable selon vos préférences et le nombre de personnes.',
    price: null,
    unit: 'sur devis',
    category: 'plateaux',
    emoji: '🏡',
    images: ['/images/assortiments-sales/plateau-sale_0.jpeg', '/images/assortiments-sucres/plateau-sucre-36_0.jpeg']
  },
];
