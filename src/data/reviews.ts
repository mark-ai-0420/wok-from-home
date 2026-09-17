export interface Review {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  favoriteOrder: string;
  fbVerified?: boolean;
}

export const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Mitch F. Olarve',
    role: 'Facebook Community Collaborator & Customer',
    location: 'Indang, Cavite',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Nagpa-cater kami ng Pancit Canton-Sotanghon bilao at Chicken Cordon Bleu para sa family salu-salo dito sa Indang. Super sarap ng timpla, siksik sa rekado at hindi tinipid sa sahog! Saktong-sakto sa panlasang Pinoy at legit na pagkaing tatak chef.',
    favoriteOrder: 'Pancit Canton-Sotanghon Bilao + Chicken Cordon Bleu Tray',
    fbVerified: true
  },
  {
    id: '2',
    name: 'Capt. Aris & Maricar Del Mundo',
    role: 'Weekend Family Salu-salo Host',
    location: 'Daine 2 (Near WFH Kitchen), Indang',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Daine 2 pick-up was super smooth! Mainit-init pa nung kinuha namin yung Special Overload Lomi at Homemade Lumpiang Shanghai. Napakalapot ng sabaw, overloaded sa chicharon at meatballs. Perfect sa malamig na panahon dito sa upland Cavite!',
    favoriteOrder: 'Special Overload Lomi Barkada Bowl + Lumpiang Shanghai Platter',
    fbVerified: true
  },
  {
    id: '3',
    name: 'Kiko & Tina Mendoza',
    role: 'Birthday Celebration Host',
    location: 'Mendez-Nuñez, Cavite',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Pinadeliver namin sa Mendez yung Fried Chicken + Spaghetti Pan Bundle plus Creamy Carbonara para sa birthday party. Dumating on-time, sobrang crispy pa rin ng chicken at panalo yung cheesy sweet-style sauce sa mga bata. Sulit na sulit!',
    favoriteOrder: 'Fried Chicken + Spaghetti Bundle & Creamy Carbonara Pan',
    fbVerified: true
  },
  {
    id: '4',
    name: 'Rowena Alcantara-Reyes',
    role: 'Reunion Organizer',
    location: 'Alfonso, Cavite',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Literal na abot-kaya sa bulsa pero pang-hotel catering ang presentation at lasa. Umorder kami ng Crispy Bagnet tray at Puto Cheese bilao. Malutong hanggang huling kagat, at yung puto cheese napakalambot kahit lumamig. 10/10!',
    favoriteOrder: 'Crispy Bagnet / Lechon Kawali Tray + Puto Cheese Bilao',
    fbVerified: true
  }
];

export const CAVITE_AREAS = [
  // TIER 1: Indang Proper & Core Barangays (₱30 – ₱60)
  { barangay: 'Daine 1 & Daine 2 (Kitchen Base)', town: 'Indang', fee: 30, estimatedMinutes: '10-20 mins', available: true, tag: 'Kitchen Hub' },
  { barangay: 'Poblacion (Bgy 1 - 4)', town: 'Indang', fee: 40, estimatedMinutes: '15-25 mins', available: true, tag: 'Town Proper' },
  { barangay: 'Bancod / CVSU Main Campus', town: 'Indang', fee: 40, estimatedMinutes: '15-25 mins', available: true, tag: 'Campus Hub' },
  { barangay: 'Kaytapos & Alulod', town: 'Indang', fee: 50, estimatedMinutes: '20-30 mins', available: true, tag: 'Fast Delivery' },
  { barangay: 'Tambo Kulit & Tambo Ilaya', town: 'Indang', fee: 50, estimatedMinutes: '20-35 mins', available: true, tag: 'Active Zone' },
  { barangay: 'Mahabang Kahoy & Guyam', town: 'Indang', fee: 60, estimatedMinutes: '25-35 mins', available: true, tag: 'Active Zone' },
  { barangay: 'Carasuche & Banaba Lejos', town: 'Indang', fee: 60, estimatedMinutes: '25-40 mins', available: true, tag: 'Active Zone' },

  // TIER 2: Neighboring Upland Cavite Towns (₱80 – ₱180)
  { barangay: 'Mendez Town Proper & Palocpoc', town: 'Mendez-Nuñez', fee: 80, estimatedMinutes: '25-40 mins', available: true, tag: 'Neighboring Town' },
  { barangay: 'Alfonso Town Proper & Luksuhin', town: 'Alfonso', fee: 100, estimatedMinutes: '30-45 mins', available: true, tag: 'Neighboring Town' },
  { barangay: 'Trece Martires City Proper', town: 'Trece Martires', fee: 120, estimatedMinutes: '35-50 mins', available: true, tag: 'City Hub' },
  { barangay: 'Amadeo Town Proper (Coffee Capital)', town: 'Amadeo', fee: 130, estimatedMinutes: '35-50 mins', available: true, tag: 'Neighboring Town' },
  { barangay: 'Tagaytay City Ridge & Mendez Boundary', town: 'Tagaytay City', fee: 180, estimatedMinutes: '45-60 mins', available: true, tag: 'Scenic Ridge' },
];
