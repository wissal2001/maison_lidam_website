export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  price: number | null;
  unit: string;
  category: 'gateaux' | 'mini-sales' | 'plateaux' | 'plats';
  emoji: string;
  images?: string[];
  videos?: string[];
}

export const products: Product[] = [
  // GÂTEAUX MAROCAINS
  {
    id: 'cornes-gazelle',
    name: 'Cornes de gazelle classiques',
    description: 'Amandes, eau de fleur d\'oranger, gomme arabique',
    fullDescription: 'Délicieuses cornes de gazelle préparées selon la recette traditionnelle marocaine. Pâte fine remplie d\'amandes parfumées à l\'eau de fleur d\'oranger et à la gomme arabique.',
    price: 8,
    unit: 'douzaine',
    category: 'gateaux',
    emoji: '🌙',
    images: ['/images/corne-de-gazelle.jpeg']
  },
  // {
  //   id: 'richbond',
  //   name: 'Gâteaux richbond',
  //   description: 'Fondants, noix de coco et amandes',
  //   fullDescription: 'Gâteaux fondants à la noix de coco et aux amandes, une douceur irrésistible pour accompagner votre thé.',
  //   price: 7,
  //   unit: 'douzaine',
  //   category: 'gateaux',
  //   emoji: '🥥',
  //   images: ['/images/fekas.webp']
  // },
  // {
  //   id: 'sables',
  //   name: 'Sablés maison (خبز الدار)',
  //   description: 'Recette traditionnelle, cuisson dorée',
  //   fullDescription: 'Sablés marocains préparés selon la recette traditionnelle de nos grand-mères. Texture fondante et dorée à point.',
  //   price: 0.5,
  //   unit: 'pièce',
  //   category: 'gateaux',
  //   emoji: '🍪',
  //   images: ['/images/fekas.webp']
  // },
  // {
  //   id: 'louz',
  //   name: 'Louz (gâteau aux amandes)',
  //   description: 'Amandes du terroir, miel pur',
  //   fullDescription: 'Gâteaux aux amandes pur beurre, parfumés au miel. Une spécialité incontournable des pâtisseries marocaines.',
  //   price: 9,
  //   unit: 'douzaine',
  //   category: 'gateaux',
  //   emoji: '🌰',
  //   images: ['/images/fekas.webp']
  // },
  // {
  //   id: 'pink-coco',
  //   name: 'Box Pink Coco',
  //   description: 'Boules coco roses, format cadeau',
  //   fullDescription: 'Jolies boules à la noix de coco teintées en rose, présentées dans une box cadeau. Parfait pour offrir !',
  //   price: 12,
  //   unit: 'box de 12',
  //   category: 'gateaux',
  //   emoji: '💗',
  //   images: ['/images/fekas.webp']
  // },
  {
    id: 'cookies',
    name: 'Cookies à la marocaine (3 versions)',
    description: 'Pinky · Greeny · Yellowy',
    fullDescription: 'Cookies marocains revisités en trois versions colorées : rose (Pinky), vert (Greeny) et jaune (Yellowy). Un mélange unique de tradition et de modernité.',
    price: 8,
    unit: 'douzaine',
    category: 'gateaux',
    emoji: '🍬',
    images: ['/images/corne-de-gazelle.jpeg','/images/fekas.webp', '/images/fekas.webp']
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
  // },
  // {
  //   id: 'makrout',
  //   name: 'Makrout aux dattes',
  //   description: 'Semoule, dattes, huile d\'argan',
  //   fullDescription: 'Gâteaux de semoule farcis aux dattes et parfumés à l\'huile d\'argan. Un classique de la pâtisserie maghrébine.',
  //   price: 9,
  //   unit: 'douzaine',
  //   category: 'gateaux',
  //   emoji: '📅',
  //   images: ['/images/fekas.webp']
  // },

  // MINI-SALÉS & BUFFET
  {
    id: 'mini-pizzas',
    name: 'Mini pizzas maison',
    description: 'Sauce tomate, fromage, garniture fraîche',
    fullDescription: 'Mini pizzas préparées maison avec une pâte légère, sauce tomate maison, fromage et garnitures fraîches au choix.',
    price: 8,
    unit: 'douzaine',
    category: 'mini-sales',
    emoji: '🍕',
    images: ['/images/fekas.webp'],
  },
  // {
  //   id: 'feuillete-sales',
  //   name: 'Feuilletés salés assortis',
  //   description: 'Thon, fromage, viande hachée',
  //   fullDescription: 'Assortiment de feuilletés croustillants garnis au thon, fromage ou viande hachée épicée.',
  //   price: 9,
  //   unit: 'douzaine',
  //   category: 'mini-sales',
  //   emoji: '🥐',
  //   images: ['/images/fekas.webp']
  // },
  {
    id: 'plateau-sale-30',
    name: 'Plateau varié salé 30 pièces',
    description: 'Mix mini-salés + cornichons + sauces',
    fullDescription: 'Plateau complet de 30 pièces avec assortiment de mini-salés, cornichons et sauces maison. Parfait pour un apéritif ou un buffet.',
    price: 25,
    unit: 'plateau',
    category: 'mini-sales',
    emoji: '🍽️',
    images: ['/images/fekas.webp']
  },
  // {
  //   id: 'pain-maison',
  //   name: 'Pain maison (khobz)',
  //   description: 'Cuit du jour, format individuel',
  //   fullDescription: 'Pain marocain traditionnel cuit le jour même. Moelleux à l\'intérieur, croustillant à l\'extérieur.',
  //   price: 0.5,
  //   unit: 'pièce',
  //   category: 'mini-sales',
  //   emoji: '🥖',
  //   images: ['/images/fekas.webp']
  // },
  {
    id: 'buffet-sale-sur-mesure',
    name: 'Buffet complet salé',
    description: 'Quantité & contenu sur mesure',
    fullDescription: 'Buffet salé entièrement personnalisé selon vos besoins : nombre de personnes, types de mini-salés, accompagnements. Contactez-moi pour un devis adapté à votre événement.',
    price: null,
    unit: 'sur devis',
    category: 'mini-sales',
    emoji: '🎉',
    images: ['/images/fekas.webp']
  },

  // PLATEAUX
  {
    id: 'plateau-sucre-20',
    name: 'Plateau assortiment sucré 20 pièces',
    description: 'Mix gâteaux marocains signature',
    fullDescription: 'Plateau de 20 pièces avec une sélection de nos meilleurs gâteaux marocains : cornes de gazelle, sablés, louz, cookies...',
    price: 18,
    unit: 'plateau',
    category: 'plateaux',
    emoji: '🎁',
    images: ['/images/fekas.webp']
  },
  {
    id: 'plateau-prestige-30',
    name: 'Plateau Oriental Prestige 30 pièces',
    description: 'Sélection premium, présentation soignée',
    fullDescription: 'Notre plateau prestige avec 30 pièces de pâtisseries fines marocaines, soigneusement sélectionnées et présentées. Idéal pour les grandes occasions.',
    price: 30,
    unit: 'plateau',
    category: 'plateaux',
    emoji: '✨',
    images: ['/images/fekas.webp']
  },
  {
    id: 'box-cadeau',
    name: 'Box cadeau personnalisée',
    description: 'Contenu & packaging sur mesure',
    fullDescription: 'Box entièrement personnalisée selon vos envies : choix des pâtisseries, couleurs, message personnalisé. Parfait pour offrir lors d\'occasions spéciales.',
    price: null,
    unit: 'sur devis',
    category: 'plateaux',
    emoji: '🎀',
    images: ['/images/fekas.webp']
  },
  {
    id: 'plateau-varie-maison',
    name: 'Plateau Varié Maison Lidam',
    description: 'Sucré + salé, idéal événement',
    fullDescription: 'Notre plateau signature mixant sucré et salé, parfait pour vos événements. Composition personnalisable selon le nombre de personnes.',
    price: null,
    unit: 'sur devis',
    category: 'plateaux',
    emoji: '🏡',
    images: ['/images/fekas.webp']
  },
];
