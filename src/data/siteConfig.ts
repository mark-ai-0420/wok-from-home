import { SiteConfig } from '../types';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  store: {
    storeName: "Wok From Home",
    branchName: "Indang",
    kitchenAddress: "Daine 2, Indang, Cavite (Near Daine Barangay Hall)",
    kitchenShort: "Daine 2, Indang, Cavite",
    landmarkNote: "Near Daine Barangay Hall",
    contactPhone: "0917 123 4567",
    contactPhoneFormatted: "+63 917 123 4567",
    coveredTowns: ["Indang", "Mendez", "Alfonso", "Trece Martires", "Amadeo", "Tagaytay"]
  },
  hours: {
    days: "Monday – Sunday",
    openTime: "10:30 AM",
    closeTime: "8:30 PM",
    displayFull: "Open: 10:30 AM – 8:30 PM Daily",
    peakHoursNote: "Peak lunch hours: 11:30 AM – 1:30 PM. Advance ordering is highly encouraged for large team bilao orders!"
  },
  social: {
    facebookPageUrl: "https://www.facebook.com/p/Wok-From-Home-61560294841858/",
    facebookPageId: "61560294841858",
    messengerUrl: "https://m.me/61560294841858",
    followerCountNote: "60+ Suki"
  },
  voucher: {
    code: "WOKINDANG",
    discountAmount: 20,
    description: "₱20 OFF",
    isActive: true
  },
  copy: {
    tagline: "Your Go-To Chef Pinoy Food Favorites",
    headlinePillars: "MAINIT. SIKSIK SA REKADO. ABOT-KAYA.",
    subHeadline: "Ang pagkaing tatak chef, narito na sa Indang! Tikman ang paboritong Pancit Canton-Sotanghon Bilaos, Special Overload Lomi, Creamy Carbonara & Baked Mac Pans, at Fried Chicken Family Bundles. Bagong luto at siksik sa rekado para sa bawat salu-salo!",
    announcementText: "Wok From Home • Indang, Cavite: Your go-to Chef Pinoy Food Favorites!",
    startingLomiPrice: 160,
    startingBilaoPrice: 650
  },
  paymentMethods: ["GCash", "Cash on Delivery (COD)", "Maya"],
  deliveryAreas: [
    { barangay: 'Daine 1 & Daine 2 (Kitchen Base)', town: 'Indang', fee: 30, estimatedMinutes: '10-20 mins', available: true },
    { barangay: 'Poblacion (Bgy 1 - 4)', town: 'Indang', fee: 40, estimatedMinutes: '15-25 mins', available: true },
    { barangay: 'Bancod / CVSU Main Campus', town: 'Indang', fee: 40, estimatedMinutes: '15-25 mins', available: true },
    { barangay: 'Kaytapos & Alulod', town: 'Indang', fee: 50, estimatedMinutes: '20-30 mins', available: true },
    { barangay: 'Tambo Kulit & Tambo Ilaya', town: 'Indang', fee: 50, estimatedMinutes: '20-35 mins', available: true },
    { barangay: 'Mahabang Kahoy & Guyam', town: 'Indang', fee: 60, estimatedMinutes: '25-35 mins', available: true },
    { barangay: 'Carasuche & Banaba Lejos', town: 'Indang', fee: 60, estimatedMinutes: '25-40 mins', available: true },
    { barangay: 'Mendez Town Proper & Palocpoc', town: 'Mendez-Nuñez', fee: 80, estimatedMinutes: '25-40 mins', available: true },
    { barangay: 'Alfonso Town Proper & Luksuhin', town: 'Alfonso', fee: 100, estimatedMinutes: '30-45 mins', available: true },
    { barangay: 'Trece Martires City Proper', town: 'Trece Martires', fee: 120, estimatedMinutes: '35-50 mins', available: true },
    { barangay: 'Amadeo Town Proper (Coffee Capital)', town: 'Amadeo', fee: 130, estimatedMinutes: '35-50 mins', available: true },
    { barangay: 'Tagaytay City Ridge & Mendez Boundary', town: 'Tagaytay City', fee: 180, estimatedMinutes: '45-60 mins', available: true }
  ]
};
