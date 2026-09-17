export type MenuCategory = 
  | 'all' 
  | 'pancit' 
  | 'pasta' 
  | 'bundles' 
  | 'ulam-trays' 
  | 'others' 
  | 'special-lomi';

export interface SizeOption {
  size: 'S' | 'M' | 'L' | 'XL' | 'Half' | 'Whole' | '6pcs' | '8pcs' | '10pcs' | '20pcs' | '25pcs' | '50pcs';
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number; // Base or starting price
  priceDisplay?: string; // e.g. "₱650 – ₱1,050"
  sizes?: SizeOption[];
  description: string;
  ingredients?: string;
  rekadoHighlights: string[];
  spiceLevel?: 0 | 1 | 2 | 3;
  isBestSeller?: boolean;
  isChefSpecial?: boolean;
  isPreOrder?: boolean;
  servings?: string; // e.g. "Party Tray (S / M / L / XL)"
  image: string;
}

export interface CartItem {
  cartId: string;
  itemId?: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  image?: string;
  customDetails?: string[];
  spiceLevel?: number | string;
}

export interface DeliveryLocation {
  barangay: string;
  town: string;
  fee: number;
  estimatedMinutes: string;
  available: boolean;
}

export interface OperatingHoursConfig {
  days: string;              // e.g. "Monday – Sunday"
  openTime: string;          // e.g. "10:30 AM"
  closeTime: string;         // e.g. "8:30 PM"
  displayFull: string;       // e.g. "Open: 10:30 AM – 8:30 PM Daily"
  peakHoursNote: string;     // e.g. "Peak lunch hours: 11:30 AM – 1:30 PM..."
}

export interface SocialLinksConfig {
  facebookPageUrl: string;   // e.g. "https://www.facebook.com/p/Wok-From-Home-61560294841858/"
  facebookPageId: string;    // e.g. "61560294841858"
  messengerUrl: string;      // e.g. "https://m.me/61560294841858"
  followerCountNote?: string;
}

export interface VoucherConfig {
  code: string;              // e.g. "WOKINDANG"
  discountAmount: number;    // e.g. 20
  description: string;       // e.g. "₱20 OFF"
  isActive: boolean;
}

export interface StoreLocationConfig {
  storeName: string;         // "Wok From Home"
  branchName: string;        // "Indang"
  kitchenAddress: string;    // "Daine 2, Indang, Cavite (Near Daine Barangay Hall)"
  kitchenShort: string;      // "Daine 2, Indang, Cavite"
  landmarkNote: string;      // "Near Daine Barangay Hall"
  contactPhone: string;      // "0917 123 4567"
  contactPhoneFormatted: string; // "+63 917 123 4567"
  coveredTowns: string[];    // ['Indang', 'Mendez', 'Alfonso', 'Trece Martires', 'Amadeo', 'Tagaytay']
}

export interface SiteCopyConfig {
  tagline: string;
  headlinePillars: string;
  subHeadline: string;
  announcementText: string;
  startingLomiPrice: number;
  startingBilaoPrice: number;
}

export interface SiteConfig {
  store: StoreLocationConfig;
  hours: OperatingHoursConfig;
  social: SocialLinksConfig;
  voucher: VoucherConfig;
  copy: SiteCopyConfig;
  paymentMethods: string[];
  deliveryAreas: DeliveryLocation[];
}
