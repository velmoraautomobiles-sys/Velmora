import { UpsellOption, DownsellOffer } from '../types';

export const UPSELL_OPTIONS: UpsellOption[] = [
  {
    id: 'warranty-5yr',
    title: '5-Year Bumper-to-Bumper Platinum Global Warranty',
    tagline: 'Zero-Deductible Mechanical, Battery & Electrical Coverage',
    price: 2450,
    originalPrice: 4200,
    popularChoice: true,
    description: 'Comprehensive worldwide protection covering engine, gearbox, EV high-voltage battery, electronics, and roadside towing with zero deductible in US, UK, CA, AU, & Monaco.',
    iconName: 'ShieldCheck',
    benefits: [
      'Zero deductible on all factory-grade repairs',
      '24/7 International roadside assistance & flat-bed recovery',
      'Complimentary loaner luxury vehicle during service',
      'Fully transferable to next owner (boosts resale value)'
    ]
  },
  {
    id: 'ceramic-shield',
    title: 'Nano-Diamond 9H Ceramic Coating & Paint Shield',
    tagline: 'Self-Healing Scratch & Hydrophobic Armor (10-Year Guarantee)',
    price: 1290,
    originalPrice: 2200,
    popularChoice: false,
    description: 'Triple-layer liquid quartz armor applied by master detailing specialists prior to handover. Preserves deep mirror luster in all weather conditions.',
    iconName: 'Sparkles',
    benefits: [
      'Self-healing scratch resistance against stone chips',
      'Repels road grime, mineral deposits, salt, and bird droppings',
      '100% UV protection against paint oxidation and fading',
      'Includes interior full leather & Alcantara hydrophobic seal'
    ]
  },
  {
    id: 'vip-delivery',
    title: 'Enclosed Climate-Controlled Global VIP Transport',
    tagline: 'Direct White-Glove Air-Ride Delivery to Your Residence',
    price: 790,
    originalPrice: 1400,
    popularChoice: false,
    description: 'Delivered in a bespoke sealed transporter by white-glove technicians with zero added road miles and full telemetry tracking.',
    iconName: 'Truck',
    benefits: [
      'Enclosed air-ride trailer shields from weather and debris',
      'Delivery timed precisely to your personal schedule',
      'Comprehensive on-site vehicle handover and tech pairing',
      'Full tank of 98-octane premium fuel / 100% EV battery charge'
    ]
  },
  {
    id: 'bike-gear-kit',
    title: 'Dainese / Alpinestars Carbon Fiber Helmet & Aero Suit Kit',
    tagline: 'Bespoke Motorcycle Riding & Safety Package',
    price: 1490,
    originalPrice: 2600,
    popularChoice: false,
    description: 'Custom-fitted FIM homologated carbon helmet, airbag-equipped leather jacket, titanium knuckle gloves, and weather gear for bike buyers.',
    iconName: 'ShieldCheck',
    benefits: [
      'FIM & DOT approved ultra-light carbon racing helmet',
      'Smart D-Air wireless deployment safety airbag jacket',
      'Bluetooth intercom system pre-installed with HD audio',
      'Tailored sizing with free exchange guarantee'
    ]
  },
  {
    id: 'truck-expedition-pack',
    title: 'Heavy-Duty Towing & All-Terrain Cargo Equipment',
    tagline: 'Commercial Class V Hitch, 12,000 lb Winch & Retractable Bed Cover',
    price: 1850,
    originalPrice: 3100,
    popularChoice: false,
    description: 'Transform your truck with heavy-duty recovery gear, electric retractable bed cover, integrated air compressor, and tie-down rails.',
    iconName: 'Truck',
    benefits: [
      '12,000 lb synthetic rope waterproof electric winch',
      'Electric remote-operated locking aluminum tonneau cover',
      'Class V reinforced receiver hitch with digital brake controller',
      'Heavy-duty fold-out aluminum loading ramps'
    ]
  },
  {
    id: 'track-masterclass',
    title: 'Gear Glide Circuit Experience & Pro Driver Masterclass',
    tagline: '1-on-1 VIP Track Session with Certified Racing Driver',
    price: 1150,
    originalPrice: 1950,
    popularChoice: false,
    description: 'Unlock your supercar or sports machine’s full performance envelope safely on a premier Grand Prix circuit with live telemetry coaching.',
    iconName: 'Flame',
    benefits: [
      'Full day closed-track pass with VIP hospitality lounge',
      'Dual-camera telemetry recording & high-speed coaching',
      'Custom racing suit, helmet & fireproof gear provided',
      'Guest access pass with pit lane privileges'
    ]
  }
];

export const DOWNSELL_OFFER: DownsellOffer = {
  id: 'downsell-maintenance-pass',
  title: '1-Year Express VIP Care & Roadside Concierge Pass',
  discountedPrice: 199,
  originalPrice: 850,
  savingsPercentage: 77,
  description: 'Before you checkout: Claim our comprehensive concierge protection package at a fraction of the cost. Includes 2 complete synthetic oil changes, 210-point health check, and 12 months of global 24/7 recovery.',
  benefits: [
    '2 Free Full Synthetic / EV Multi-Point Diagnostics',
    '24/7 Flat-Tire, Lockout & Emergency Flat-Bed Recovery',
    'Priority Service Booking with guaranteed loaner vehicle',
    '100% Refundable within 30 days if unused'
  ]
};

