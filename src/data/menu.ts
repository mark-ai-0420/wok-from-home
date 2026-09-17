import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // 1. PANCIT TRAYS & BILAOS (Menu 1)
  {
    id: 'pancit-canton-sotanghon',
    name: 'Pancit Canton-Sotanghon',
    category: 'pancit',
    price: 750,
    priceDisplay: '₱750 – ₱1,100',
    description: 'The ultimate favorite combination of thick egg canton and delicate sotanghon glass noodles, wok-stirred with fresh mixed vegetables, tender chicken/pork meat, savory kikiam, and squid balls.',
    ingredients: 'canton, sotanghon, fresh mixed vegetables, chicken/pork meat, kikiam, squid balls',
    rekadoHighlights: ['Canton & Sotanghon Combo', 'Chicken & Pork Meat', 'Kikiam & Squid Balls', 'Cavite Fresh Veggies'],
    isBestSeller: true,
    isChefSpecial: true,
    servings: 'Party Bilao (S: 5-7 pax / M: 8-10 / L: 12-15 / XL: 18-20)',
    image: '/images/menu/pancit_sotanghon_bilao.jpg',
    sizes: [
      { size: 'S', label: 'Small (5-7 pax)', price: 750 },
      { size: 'M', label: 'Medium (8-10 pax)', price: 850 },
      { size: 'L', label: 'Large (12-15 pax)', price: 950 },
      { size: 'XL', label: 'Extra Large (18-20 pax)', price: 1100 }
    ]
  },
  {
    id: 'pancit-sotanghon-guisado',
    name: 'Pancit Sotanghon Guisado',
    category: 'pancit',
    price: 750,
    priceDisplay: '₱750 – ₱1,100',
    description: 'Silky sotanghon noodles infused with rich broth flavor, loaded with fresh mixed vegetables, chicken and pork meat, kikiam, and squid balls.',
    ingredients: 'sotanghon, fresh mixed vegetables, chicken/pork meat, kikiam, squid balls',
    rekadoHighlights: ['Sotanghon Glass Noodles', 'Chicken & Pork Meat', 'Kikiam & Squid Balls', 'Fresh Vegetables'],
    isBestSeller: false,
    servings: 'Party Bilao (S / M / L / XL)',
    image: '/images/menu/pancit_sotanghon_bilao.jpg',
    sizes: [
      { size: 'S', label: 'Small (5-7 pax)', price: 750 },
      { size: 'M', label: 'Medium (8-10 pax)', price: 850 },
      { size: 'L', label: 'Large (12-15 pax)', price: 950 },
      { size: 'XL', label: 'Extra Large (18-20 pax)', price: 1100 }
    ]
  },
  {
    id: 'pancit-canton-guisado',
    name: 'Pancit Canton Guisado',
    category: 'pancit',
    price: 650,
    priceDisplay: '₱650 – ₱1,050',
    description: 'Traditional wok-tossed egg noodles packed with fresh farm cabbage, carrots, bell peppers, chicken and pork meat, kikiam, and squid balls in savory soy-calamansi glaze.',
    ingredients: 'canton, fresh mixed vegetables, chicken/pork meat, kikiam, squid balls',
    rekadoHighlights: ['Thick Egg Canton', 'Savory Kikiam', 'Squid Balls', 'Pork & Chicken'],
    isBestSeller: true,
    servings: 'Party Bilao (S / M / L / XL)',
    image: '/images/menu/pancit_bilao_real.jpg',
    sizes: [
      { size: 'S', label: 'Small (5-7 pax)', price: 650 },
      { size: 'M', label: 'Medium (8-10 pax)', price: 750 },
      { size: 'L', label: 'Large (12-15 pax)', price: 850 },
      { size: 'XL', label: 'Extra Large (18-20 pax)', price: 1050 }
    ]
  },
  {
    id: 'pancit-bihon-guisado',
    name: 'Pancit Bihon Guisado',
    category: 'pancit',
    price: 650,
    priceDisplay: '₱650 – ₱1,050',
    description: 'Tender rice bihon noodles cooked in aromatic chicken broth and wok-tossed with fresh vegetables, chicken/pork meat, kikiam, and squid balls.',
    ingredients: 'bihon, fresh mixed vegetables, chicken/pork meat, kikiam, squid balls',
    rekadoHighlights: ['Rice Bihon Noodles', 'Flavorful Broth', 'Kikiam & Squid Balls', 'Toasted Garlic'],
    isBestSeller: false,
    servings: 'Party Bilao (S / M / L / XL)',
    image: '/images/menu/pancit_bilao_real.jpg',
    sizes: [
      { size: 'S', label: 'Small (5-7 pax)', price: 650 },
      { size: 'M', label: 'Medium (8-10 pax)', price: 750 },
      { size: 'L', label: 'Large (12-15 pax)', price: 850 },
      { size: 'XL', label: 'Extra Large (18-20 pax)', price: 1050 }
    ]
  },

  // 2. SPECIAL OVERLOAD LOMI (Newest Addition - Menu 4)
  {
    id: 'special-overload-lomi',
    name: 'Special Overload Lomi',
    category: 'special-lomi',
    price: 160,
    priceDisplay: '₱160 – ₱320',
    description: 'Newest addition to our menu! Thick, hearty egg noodles in steaming rich savory egg soup, overloaded with crispy chicharon, kikiam slices, savory meatballs, golden fried wontons, boiled egg, pork liver, and fresh calamansi & chili.',
    ingredients: 'thick lomi noodles, rich egg broth, chicharon, kikiam, meatballs, fried wontons, boiled egg, liver',
    rekadoHighlights: ['Crispy Chicharon', 'Fried Wontons', 'Kikiam & Meatballs', 'Boiled Egg & Liver', 'Thick Savory Broth'],
    isBestSeller: true,
    isChefSpecial: true,
    servings: 'Solo Overload or Barkada Sharing Bowl',
    image: '/images/menu/overload_lomi_bowl.jpg',
    sizes: [
      { size: 'S', label: 'Solo Overload Bowl', price: 160 },
      { size: 'L', label: 'Barkada Sharing Bowl (3-4 pax)', price: 320 }
    ]
  },

  // 3. PASTA TRAYS (Menu 1)
  {
    id: 'creamy-carbonara',
    name: 'Creamy Carbonara',
    category: 'pasta',
    price: 750,
    priceDisplay: '₱750 – ₱1,150',
    description: 'Al dente pasta coated in ultra-rich and velvety white cream sauce, studded with savory bacon crisps, sliced mushrooms, and finished with a generous layer of grated cheese.',
    rekadoHighlights: ['Rich Cream Sauce', 'Smoked Bacon Bits', 'Sliced Mushrooms', 'Grated Cheese'],
    isBestSeller: true,
    servings: 'Party Pan (S / M / L / XL)',
    image: '/images/menu/creamy_carbonara_pan.jpg',
    sizes: [
      { size: 'S', label: 'Small Pan (5-7 pax)', price: 750 },
      { size: 'M', label: 'Medium Pan (8-10 pax)', price: 850 },
      { size: 'L', label: 'Large Pan (12-15 pax)', price: 950 },
      { size: 'XL', label: 'Extra Large Pan (18-20 pax)', price: 1150 }
    ]
  },
  {
    id: 'baked-mac',
    name: 'Baked Mac',
    category: 'pasta',
    price: 750,
    priceDisplay: '₱750 – ₱1,150',
    description: 'Comforting elbow macaroni layered with meaty tomato-beef sauce and covered with a thick, golden blanket of melted quickmelt cheese and creamy béchamel.',
    rekadoHighlights: ['Meaty Tomato Sauce', 'Melted Quickmelt Cheese', 'Creamy Béchamel', 'Elbow Macaroni'],
    isBestSeller: true,
    servings: 'Party Pan (S / M / L / XL)',
    image: '/images/menu/baked_mac.jpg',
    sizes: [
      { size: 'S', label: 'Small Pan (5-7 pax)', price: 750 },
      { size: 'M', label: 'Medium Pan (8-10 pax)', price: 850 },
      { size: 'L', label: 'Large Pan (12-15 pax)', price: 950 },
      { size: 'XL', label: 'Extra Large Pan (18-20 pax)', price: 1150 }
    ]
  },
  {
    id: 'cheesy-spaghetti',
    name: 'Cheesy Spaghetti',
    category: 'pasta',
    price: 750,
    priceDisplay: '₱750 – ₱1,150',
    description: 'Pinoy-style sweet and savory spaghetti sauce with seasoned minced meat, sliced hotdogs, and topped with mountains of grated cheese.',
    rekadoHighlights: ['Pinoy Sweet-Style Sauce', 'Minced Meat & Hotdogs', 'Grated Cheese Overload'],
    isBestSeller: false,
    servings: 'Party Pan (S / M / L / XL)',
    image: '/images/menu/cheesy_spaghetti.jpg',
    sizes: [
      { size: 'S', label: 'Small Pan (5-7 pax)', price: 750 },
      { size: 'M', label: 'Medium Pan (8-10 pax)', price: 850 },
      { size: 'L', label: 'Large Pan (12-15 pax)', price: 950 },
      { size: 'XL', label: 'Extra Large Pan (18-20 pax)', price: 1150 }
    ]
  },
  {
    id: 'beefy-lasagna',
    name: 'Beefy Lasagna',
    category: 'pasta',
    price: 750,
    priceDisplay: '₱750 – ₱1,150',
    description: 'Rich layers of wide pasta sheets filled with savory spiced ground beef, robust tomato marinara, and decadent melted mozzarella and cheddar cheese.',
    rekadoHighlights: ['Pure Ground Beef', 'Layered Béchamel', 'Mozzarella & Cheddar'],
    isBestSeller: false,
    servings: 'Party Pan (S / M / L / XL)',
    image: '/images/menu/beefy_lasagna.jpg',
    sizes: [
      { size: 'S', label: 'Small Pan (5-7 pax)', price: 750 },
      { size: 'M', label: 'Medium Pan (8-10 pax)', price: 850 },
      { size: 'L', label: 'Large Pan (12-15 pax)', price: 950 },
      { size: 'XL', label: 'Extra Large Pan (18-20 pax)', price: 1150 }
    ]
  },

  // 4. FAMILY PAN BUNDLES (Menu 3)
  {
    id: 'bundle-chicken-spaghetti',
    name: '(A.) Fried Chicken + Spaghetti Pan Bundle',
    category: 'bundles',
    price: 870,
    priceDisplay: '₱870 (6 pcs) / ₱980 (8 pcs)',
    description: 'Box of golden crispy fried chicken (Original or Spicy) with savory gravy, bundled with a full pan of Pinoy Cheesy Spaghetti.',
    rekadoHighlights: ['Crispy Fried Chicken', 'Spaghetti Pan', 'Homemade Gravy', 'Choice of Original/Spicy'],
    isBestSeller: true,
    isChefSpecial: true,
    servings: 'Family Salo-salo (4-6 pax)',
    image: '/images/menu/chicken_pan_bundle.jpg',
    sizes: [
      { size: '6pcs', label: '6 pcs. Chicken + Spaghetti Pan', price: 870 },
      { size: '8pcs', label: '8 pcs. Chicken + Spaghetti Pan', price: 980 }
    ]
  },
  {
    id: 'bundle-chicken-carbonara',
    name: '(B.) Fried Chicken + Carbonara Pan Bundle',
    category: 'bundles',
    price: 870,
    priceDisplay: '₱870 (6 pcs) / ₱980 (8 pcs)',
    description: 'Box of crispy fried chicken (Original or Spicy) with house gravy, bundled with a creamy pan of rich Carbonara with bacon bits.',
    rekadoHighlights: ['Crispy Fried Chicken', 'Carbonara Pan', 'Bacon & Cheese', 'Choice of Original/Spicy'],
    isBestSeller: true,
    isChefSpecial: true,
    servings: 'Family Salo-salo (4-6 pax)',
    image: '/images/menu/chicken_pan_bundle.jpg',
    sizes: [
      { size: '6pcs', label: '6 pcs. Chicken + Carbonara Pan', price: 870 },
      { size: '8pcs', label: '8 pcs. Chicken + Carbonara Pan', price: 980 }
    ]
  },
  {
    id: 'bundle-chicken-palabok',
    name: '(C.) Fried Chicken + Palabok Pan Bundle',
    category: 'bundles',
    price: 850,
    priceDisplay: '₱850 (6 pcs) / ₱950 (8 pcs)',
    description: 'Box of fried chicken (Original or Spicy) paired with an authentic party pan of Palabok loaded with shrimp sauce, tinapa flakes, and crunchy chicharon.',
    rekadoHighlights: ['Crispy Fried Chicken', 'Palabok Pan', 'Shrimp Sauce & Tinapa', 'Choice of Original/Spicy'],
    isBestSeller: false,
    servings: 'Family Salo-salo (4-6 pax)',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { size: '6pcs', label: '6 pcs. Chicken + Palabok Pan', price: 850 },
      { size: '8pcs', label: '8 pcs. Chicken + Palabok Pan', price: 950 }
    ]
  },
  {
    id: 'bundle-chicken-pancit',
    name: '(D.) Fried Chicken + Pancit Guisado Pan Bundle',
    category: 'bundles',
    price: 850,
    priceDisplay: '₱850 (6 pcs) / ₱950 (8 pcs)',
    description: 'Box of crispy fried chicken (Original or Spicy) bundled with a hot party pan of Pancit Canton or Bihon Guisado.',
    rekadoHighlights: ['Crispy Fried Chicken', 'Pancit Guisado Pan', 'Chicken, Pork & Kikiam', 'Choice of Original/Spicy'],
    isBestSeller: false,
    servings: 'Family Salo-salo (4-6 pax)',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { size: '6pcs', label: '6 pcs. Chicken + Pancit Guisado Pan', price: 850 },
      { size: '8pcs', label: '8 pcs. Chicken + Pancit Guisado Pan', price: 950 }
    ]
  },

  // 5. CHICKEN / FISH & PORK / BEEF PARTY ULAM TRAYS (Menu 2 - Pre Order Now)
  {
    id: 'chicken-cordon-bleu',
    name: 'Chicken Cordon Bleu',
    category: 'ulam-trays',
    price: 850,
    priceDisplay: '₱850 – ₱1,650',
    description: 'Ground chicken meat rolled with sliced ham and quickmelt cheese, crumb-coated and fried golden brown, served with rich homemade Tartar sauce.',
    ingredients: 'ground chicken meat, ham, quickmelt cheese with Tartar sauce',
    rekadoHighlights: ['Quickmelt Cheese', 'Smoked Ham', 'Zesty Tartar Sauce'],
    isBestSeller: true,
    isPreOrder: true,
    servings: 'Party Ulam Tray (S / M / L / XL)',
    image: '/images/menu/chicken_cordon_bleu.jpg',
    sizes: [
      { size: 'S', label: 'Small Tray (5-7 pax)', price: 850 },
      { size: 'M', label: 'Medium Tray (8-10 pax)', price: 1050 },
      { size: 'L', label: 'Large Tray (12-15 pax)', price: 1350 },
      { size: 'XL', label: 'Extra Large Tray (18-20 pax)', price: 1650 }
    ]
  },
  {
    id: 'homemade-lumpiang-shanghai',
    name: 'Homemade Lumpiang Shanghai',
    category: 'ulam-trays',
    price: 650,
    priceDisplay: '₱650 – ₱1,100',
    description: 'Seasoned ground pork, carrots, celery, and red bell pepper wrapped in crisp wrappers and served with sweet & chili dipping sauce.',
    ingredients: 'ground pork meat, seasonings, carrots, celery, red bell pepper, with Sweet and Chili sauce',
    rekadoHighlights: ['Minced Pork & Veggies', 'Crispy Golden Wrappers', 'Sweet & Chili Sauce'],
    isBestSeller: true,
    isPreOrder: true,
    servings: 'Party Ulam Tray (S / M / L / XL)',
    image: '/images/menu/lumpiang_shanghai_platter.jpg',
    sizes: [
      { size: 'S', label: 'Small Tray (5-7 pax)', price: 650 },
      { size: 'M', label: 'Medium Tray (8-10 pax)', price: 850 },
      { size: 'L', label: 'Large Tray (12-15 pax)', price: 1100 },
      { size: 'XL', label: 'Extra Large Tray (18-20 pax)', price: 1350 }
    ]
  },
  {
    id: 'crispy-bagnet-lechon',
    name: 'Crispy Bagnet / Lechon Kawali',
    category: 'ulam-trays',
    price: 850,
    priceDisplay: '₱850 – ₱1,650',
    description: 'Tender pork belly with blistered, crunchy crackling, seasoned to perfection and served with rich liver Lechon sauce.',
    ingredients: 'pork fat and meat, seasonings, with Lechon sauce',
    rekadoHighlights: ['Ultra-Crispy Crackling', 'Savory Lechon Sauce', 'Tender Pork Belly'],
    isPreOrder: true,
    servings: 'Party Ulam Tray (S / M / L / XL)',
    image: '/images/menu/crispy_bagnet_lechon.jpg',
    sizes: [
      { size: 'S', label: 'Small Tray (5-7 pax)', price: 850 },
      { size: 'M', label: 'Medium Tray (8-10 pax)', price: 1150 },
      { size: 'L', label: 'Large Tray (12-15 pax)', price: 1450 },
      { size: 'XL', label: 'Extra Large Tray (18-20 pax)', price: 1650 }
    ]
  },
  {
    id: 'beef-stroganoff',
    name: 'Beef Stroganoff',
    category: 'ulam-trays',
    price: 950,
    priceDisplay: '₱950 – ₱1,750',
    description: 'Tender beef strips simmered in rich mushroom cream sauce with chef seasonings and garlic aromatics.',
    ingredients: 'beef, special seasonings, mushroom, flavorful sauce',
    rekadoHighlights: ['Tender Beef Strips', 'Sliced Mushrooms', 'Savory Cream Sauce'],
    isBestSeller: true,
    isPreOrder: true,
    servings: 'Party Ulam Tray (S / M / L / XL)',
    image: '/images/menu/beef_stroganoff.jpg',
    sizes: [
      { size: 'S', label: 'Small Tray (5-7 pax)', price: 950 },
      { size: 'M', label: 'Medium Tray (8-10 pax)', price: 1250 },
      { size: 'L', label: 'Large Tray (12-15 pax)', price: 1550 },
      { size: 'XL', label: 'Extra Large Tray (18-20 pax)', price: 1750 }
    ]
  },
  {
    id: 'chicken-ala-king',
    name: 'Chicken Ala King',
    category: 'ulam-trays',
    price: 750,
    priceDisplay: '₱750 – ₱1,400',
    description: 'Breaded chicken fillet bites tossed in special seasonings and covered in creamy Ala King sauce with sweet red and green bell peppers.',
    ingredients: 'chicken fillet, special seasonings, homemade breading, with Ala King sauce',
    rekadoHighlights: ['Chicken Fillet', 'Homemade Breading', 'Ala King Sauce'],
    isPreOrder: true,
    servings: 'Party Ulam Tray (S / M / L / XL)',
    image: '/images/menu/chicken_ala_king.jpg',
    sizes: [
      { size: 'S', label: 'Small Tray (5-7 pax)', price: 750 },
      { size: 'M', label: 'Medium Tray (8-10 pax)', price: 950 },
      { size: 'L', label: 'Large Tray (12-15 pax)', price: 1200 },
      { size: 'XL', label: 'Extra Large Tray (18-20 pax)', price: 1400 }
    ]
  },
  {
    id: 'fish-fillet-tartar',
    name: 'Fish Fillet with Tartar Sauce',
    category: 'ulam-trays',
    price: 750,
    priceDisplay: '₱750 – ₱1,400',
    description: 'Tender cream dory fillet coated in homemade seasoned breading mix, fried until crisp, and served with house Tartar sauce.',
    ingredients: 'cream dory fillet, special seasonings, homemade breading mix, with Tartar Sauce',
    rekadoHighlights: ['Cream Dory Fillet', 'Crunchy Breading', 'Tartar Sauce'],
    isPreOrder: true,
    servings: 'Party Ulam Tray (S / M / L / XL)',
    image: '/images/menu/fish_fillet_tartar.jpg',
    sizes: [
      { size: 'S', label: 'Small Tray (5-7 pax)', price: 750 },
      { size: 'M', label: 'Medium Tray (8-10 pax)', price: 950 },
      { size: 'L', label: 'Large Tray (12-15 pax)', price: 1200 },
      { size: 'XL', label: 'Extra Large Tray (18-20 pax)', price: 1400 }
    ]
  },
  {
    id: 'pork-pineapple',
    name: 'Pork Pineapple',
    category: 'ulam-trays',
    price: 800,
    priceDisplay: '₱800 – ₱1,550',
    description: 'Tender pork cubes simmered in a savory tomato reduction with juicy pineapple chunks for a tangy-sweet tropical flavor.',
    ingredients: 'pork, special seasonings, pineapple, tomato, flavorful sauce',
    rekadoHighlights: ['Juicy Pineapple', 'Tomato Reduction', 'Tender Pork'],
    isPreOrder: true,
    servings: 'Party Ulam Tray (S / M / L / XL)',
    image: '/images/menu/pork_pineapple.jpg',
    sizes: [
      { size: 'S', label: 'Small Tray (5-7 pax)', price: 800 },
      { size: 'M', label: 'Medium Tray (8-10 pax)', price: 1050 },
      { size: 'L', label: 'Large Tray (12-15 pax)', price: 1350 },
      { size: 'XL', label: 'Extra Large Tray (18-20 pax)', price: 1550 }
    ]
  },
  {
    id: 'classic-fried-chicken',
    name: 'Classic Fried Chicken Tray',
    category: 'ulam-trays',
    price: 700,
    priceDisplay: '₱700 – ₱1,450',
    description: 'Mixed-cut chicken marinated in signature chef seasonings, coated in crunchy homemade breading and served with savory gravy.',
    ingredients: 'mixed-cut chicken, special seasonings, homemade breading mix with Gravy sauce',
    rekadoHighlights: ['Mixed-cut Chicken', 'Homemade Gravy', 'Crispy Skin'],
    isPreOrder: true,
    servings: 'Party Tray (S / M / L / XL)',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { size: 'S', label: 'Small Tray (5-7 pax)', price: 700 },
      { size: 'M', label: 'Medium Tray (8-10 pax)', price: 950 },
      { size: 'L', label: 'Large Tray (12-15 pax)', price: 1250 },
      { size: 'XL', label: 'Extra Large Tray (18-20 pax)', price: 1450 }
    ]
  },

  // 6. OTHERS (Snacks & Desserts - Menu 3)
  {
    id: 'puto-cheese',
    name: 'Puto Cheese',
    category: 'others',
    price: 225,
    priceDisplay: '₱225 (Half) / ₱550 (Whole)',
    description: 'Soft and pillowy steamed rice cakes topped with melting cheese slices. The perfect traditional pairing with pancit and dinuguan.',
    rekadoHighlights: ['Soft Steamed Cakes', 'Melted Cheese Topping', 'Freshly Steamed'],
    servings: '25 pcs. Half or 50 pcs. Whole',
    image: '/images/menu/puto_cheese_platter.jpg',
    sizes: [
      { size: '25pcs', label: '25 pcs. (Half Order)', price: 225 },
      { size: '50pcs', label: '50 pcs. (Whole Order)', price: 550 }
    ]
  },
  {
    id: 'creamy-maja-blanca',
    name: 'Creamy Maja Blanca',
    category: 'others',
    price: 325,
    priceDisplay: '₱325 (Half) / ₱650 (Whole)',
    description: 'Rich and creamy coconut milk pudding filled with whole corn kernels, finished with a fragrant layer of grated cheese or golden latik.',
    rekadoHighlights: ['Pure Coconut Cream', 'Sweet Corn Kernels', 'Creamy Texture'],
    servings: 'Half Pan or Whole Pan',
    image: '/images/menu/creamy_maja_blanca.jpg',
    sizes: [
      { size: 'Half', label: 'Half Pan', price: 325 },
      { size: 'Whole', label: 'Whole Pan', price: 650 }
    ]
  },
  {
    id: 'nachos-overload',
    name: 'Nachos Overload',
    category: 'others',
    price: 150,
    priceDisplay: '₱150',
    description: 'Crunchy tortilla corn chips drizzled in warm cheese sauce, seasoned beef bits, fresh diced tomatoes, onions, and jalapeño slices.',
    rekadoHighlights: ['Crisp Corn Tortillas', 'Warm Melted Cheese', 'Seasoned Beef', 'Jalapeños'],
    servings: '1-2 pax sharing snack',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fries-overload',
    name: 'Fries Overload',
    category: 'others',
    price: 120,
    priceDisplay: '₱120',
    description: 'Golden thick-cut potato fries served fresh and hot, loaded with savory sauce, creamy cheese drizzle, and bacon crunch bits.',
    rekadoHighlights: ['Crispy Golden Fries', 'Cheese Sauce', 'Crunchy Bits'],
    servings: '1-2 pax snack',
    image: '/images/menu/fries_overload.jpg'
  },
  {
    id: 'cheese-sticks',
    name: 'Cheese Sticks',
    category: 'others',
    price: 50,
    priceDisplay: '₱50 (10 pcs) / ₱100 (20 pcs)',
    description: 'Golden, crispy spring roll wrapped cheddar cheese sticks fried to a crunchy finish, served with homemade sweet dipping sauce.',
    rekadoHighlights: ['Gooey Cheddar', 'Crunchy Wrapper', 'Sweet Dipping Sauce'],
    servings: '10 pcs or 20 pcs',
    image: '/images/menu/cheese_sticks.jpg',
    sizes: [
      { size: '10pcs', label: '10 pcs. Order', price: 50 },
      { size: '20pcs', label: '20 pcs. Order', price: 100 }
    ]
  }
];

// REAL SERVICES ACCEPTED (Direct from Menu 3):
export const BUSINESS_SERVICES = [
  { title: 'Bulk Orders', desc: 'Pre-ordered fiesta trays for large events, schools & offices.' },
  { title: 'Food Packs', desc: 'Individual packed meals for seminars, meetings & field staff.' },
  { title: 'Crew Meals', desc: 'Affordable, hearty daily lunches for construction, office & clinic crews.' },
  { title: 'Ulam Trays', desc: 'Ready-to-serve party ulam in S, M, L, and XL aluminum pans.' },
  { title: 'Bento Meals', desc: 'Organized meal compartments with ulam, rice, and sides.' },
  { title: 'Cater Food', desc: 'Full event catering packages tailored for your Cavite gathering.' }
];
