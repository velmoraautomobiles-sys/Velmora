export type VehicleCategory = 
  | 'All' 
  | 'Supercars'
  | 'Normal Vehicles'
  | 'Bikes' 
  | 'Trucks' 
  | 'Electric & Hybrid'
  | 'Cars'
  | 'Supercar' 
  | 'Luxury Sedan' 
  | 'SUV & Truck' 
  | 'Motorcycle / Bike';

export type ServiceIntent = 'ALL' | 'BUY' | 'RENT' | 'LEASE';
export type CurrencyMode = 'DUAL' | 'USD' | 'GBP';

export type PrimaryVehicleType = 'Supercar' | 'Normal Vehicle' | 'Bike' | 'Truck';

export interface GovernmentSpecs {
  emissionsGrade: string; // e.g. "Euro 6d-Final / Zero Emissions"
  safetyRating: string; // e.g. "5-Star NHTSA / Euro NCAP"
  roadTaxBand: string; // e.g. "Band A ($0/yr) / Tier 1"
  titleStatus: string; // e.g. "Clean Title / Direct MSO"
  importDutyStatus: string; // e.g. "Fully Cleared & Certified"
  registrationType: string; // e.g. "Commercial / Private Passenger"
  vinNumber: string; // e.g. "WP0ZZZ99ZNS29381"
  complianceCert: string; // e.g. "DOT, EPA & UK VCA Approved"
}

export interface TechnicalSpecs {
  engine: string; // e.g. "4.0L Twin-Turbo Flat-6"
  horsepower: number; // e.g. 502
  torque: string; // e.g. "346 lb-ft"
  acceleration0to60: string; // e.g. "2.7s"
  topSpeed: string; // e.g. "197 mph"
  transmission: string; // e.g. "7-Speed Dual-Clutch PDK"
  drivetrain: string; // e.g. "Rear-Wheel Drive"
  fuelEconomy: string; // e.g. "18 MPG / 320 mi Range"
  mileage: number; // e.g. 150
  year: number; // e.g. 2025
}

export interface Vehicle {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  category: VehicleCategory;
  price: number; // USD Base
  originalPrice?: number; // USD Base
  monthlyFinancing: number; // USD Base
  dailyRentalRate: number; // USD Base ($/day)
  monthlyLeaseRate: number; // USD Base ($/mo)
  availableForSale?: boolean;
  availableForRent?: boolean;
  availableForLease?: boolean;
  popularIn: string[]; // e.g. ['US', 'UK', 'Monaco', 'Canada', 'Australia']
  images: string[];
  description: string;
  keyFeatures: string[];
  specs: TechnicalSpecs;
  governmentSpecs: GovernmentSpecs;
  isPopular?: boolean;
  isHotDeal?: boolean;
  stockCount: number;
  liveViewersCount: number;
  location: string;
  badge?: string;
}

export interface UpsellOption {
  id: string;
  title: string;
  tagline: string;
  price: number;
  originalPrice: number;
  description: string;
  iconName: string;
  popularChoice?: boolean;
  benefits: string[];
}

export interface DownsellOffer {
  id: string;
  title: string;
  discountedPrice: number;
  originalPrice: number;
  savingsPercentage: number;
  description: string;
  benefits: string[];
}

export interface FunnelState {
  isOpen: boolean;
  vehicle: Vehicle | null;
  step: 'UPSALE' | 'DOWNSELL' | 'CHECKOUT' | 'CONFIRMATION';
  selectedUpsells: string[];
  acceptedDownsell: boolean;
  serviceIntent: 'BUY' | 'RENT' | 'LEASE';
  rentalDurationDays?: number;
  leaseDurationMonths?: number;
  purchaseType: 'RESERVE_DEPOSIT' | 'FULL_PAYMENT' | 'FINANCE_APP' | 'RENTAL_BOOKING' | 'LEASE_CONTRACT' | 'VIP_CALL';
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    country?: string;
    preferredDate?: string;
    notes?: string;
  };
  reservationCode?: string;
}

export interface FilterState {
  category: VehicleCategory;
  serviceIntent: ServiceIntent;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'horsepower' | 'newest';
  makeFilter: string;
  countryFilter: string;
}

