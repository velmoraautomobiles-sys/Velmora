import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  Flame, 
  Check, 
  ArrowRight, 
  AlertCircle, 
  Clock, 
  Lock, 
  PhoneCall, 
  CreditCard, 
  FileText, 
  Gift,
  CheckCircle2,
  Key,
  Calendar,
  Building,
  Globe2,
  MessageCircle,
  Mail
} from 'lucide-react';
import { Vehicle, ServiceIntent, CurrencyMode } from '../types';
import { UPSELL_OPTIONS, DOWNSELL_OFFER } from '../data/upsells';
import { formatUSD, formatGBP } from '../utils/currency';
import { DEALER_WHATSAPP_LINK, DEALER_EMAIL, getDealerMailtoLink } from '../utils/whatsapp';

interface SalesFunnelModalProps {
  isOpen: boolean;
  vehicle: Vehicle | null;
  onClose: () => void;
  voucherDiscount?: number;
  currencyMode?: CurrencyMode;
  initialServiceIntent?: ServiceIntent;
}

export const SalesFunnelModal: React.FC<SalesFunnelModalProps> = ({
  isOpen,
  vehicle,
  onClose,
  voucherDiscount = 0,
  currencyMode = 'DUAL',
  initialServiceIntent = 'BUY'
}) => {
  if (!isOpen || !vehicle) return null;

  const [step, setStep] = useState<'UPSELL' | 'DOWNSELL' | 'CHECKOUT' | 'CONFIRMATION'>('UPSELL');
  const [serviceIntent, setServiceIntent] = useState<ServiceIntent>(initialServiceIntent || 'BUY');
  const [selectedCountry, setSelectedCountry] = useState('United States');
  
  // Pre-select category specific upsell
  const defaultUpsells = vehicle.category === 'BIKE' 
    ? ['bike-gear-kit', 'warranty-5yr']
    : vehicle.category === 'TRUCK'
    ? ['truck-expedition-pack', 'ceramic-shield']
    : ['warranty-5yr', 'ceramic-shield'];

  const [selectedUpsellIds, setSelectedUpsellIds] = useState<string[]>(defaultUpsells);
  const [acceptedDownsell, setAcceptedDownsell] = useState(false);
  const [purchaseType, setPurchaseType] = useState<'RESERVE_DEPOSIT' | 'FULL_PAYMENT' | 'FINANCE_APP'>('RESERVE_DEPOSIT');

  // Customer Form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Escrow Wire Transfer / Card');
  
  // Timer for Urgency
  const [timeLeft, setTimeLeft] = useState(899); // 14:59 mins
  const [reservationCode, setReservationCode] = useState('');

  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const toggleUpsell = (id: string) => {
    setSelectedUpsellIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Filter relevant upsells by vehicle category
  const relevantUpsells = UPSELL_OPTIONS.filter((u) => {
    if (vehicle.category === 'BIKE') return u.id !== 'truck-expedition-pack';
    if (vehicle.category === 'TRUCK') return u.id !== 'bike-gear-kit';
    if (vehicle.category === 'SUPERCAR') return u.id !== 'bike-gear-kit';
    return u.id !== 'bike-gear-kit' && u.id !== 'truck-expedition-pack';
  });

  // Calculations
  const upsellsTotalUSD = selectedUpsellIds.reduce((sum, id) => {
    const item = UPSELL_OPTIONS.find((u) => u.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const downsellCostUSD = acceptedDownsell ? DOWNSELL_OFFER.discountedPrice : 0;
  
  const dailyRentRate = vehicle.dailyRentalRate || Math.round(vehicle.price * 0.0075);
  const monthlyLeaseRate = vehicle.monthlyLeaseRate || Math.round(vehicle.price * 0.018);

  let baseAmountUSD = 500;
  if (serviceIntent === 'BUY') {
    baseAmountUSD = purchaseType === 'RESERVE_DEPOSIT' ? 500 : vehicle.price;
  } else if (serviceIntent === 'RENT') {
    baseAmountUSD = (dailyRentRate * 3) + 1000;
  } else if (serviceIntent === 'LEASE') {
    baseAmountUSD = monthlyLeaseRate + 1500;
  }

  const grandTotalUSD = Math.max(0, baseAmountUSD + upsellsTotalUSD + downsellCostUSD - voucherDiscount);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleDeclineUpsells = () => {
    if (!acceptedDownsell && selectedUpsellIds.length === 0) {
      setStep('DOWNSELL');
    } else {
      setStep('CHECKOUT');
    }
  };

  const handleProceedToCheckout = () => {
    if (selectedUpsellIds.length === 0 && !acceptedDownsell) {
      setStep('DOWNSELL');
    } else {
      setStep('CHECKOUT');
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    const code = `GGA-${selectedCountry.slice(0, 2).toUpperCase()}-${Math.floor(Math.random() * 899999 + 100000)}`;
    setReservationCode(code);
    setStep('CONFIRMATION');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto font-sans">
      <div 
        className="relative w-full max-w-4xl bg-[#151821] border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-[#0E1015] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white uppercase tracking-widest">
                  Gear Glide VIP Acquisition & Service Vault
                </span>
                <span className="text-xs text-zinc-400">• Step {step === 'UPSELL' ? '1' : step === 'DOWNSELL' ? 'Special Deal' : step === 'CHECKOUT' ? '2' : '3'} of 3</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white font-serif">{vehicle.name}</h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181C26] border border-zinc-700 text-zinc-200 text-xs font-mono font-bold">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span>Allocation Lock: {formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#181C26] border border-zinc-700 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Funnel Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* ================= STEP 1: UPSELL SCREEN ================= */}
          {step === 'UPSELL' && (
            <div className="space-y-6">
              
              {/* Service Intent Selector in Upsell */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0E1015] border border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 font-bold uppercase">Transaction Plan:</span>
                  <div className="flex gap-1.5">
                    {(['BUY', 'RENT', 'LEASE'] as ServiceIntent[]).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setServiceIntent(mode)}
                        className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                          serviceIntent === mode
                            ? 'bg-white text-zinc-950 shadow-md'
                            : 'bg-[#181C26] text-zinc-400 border border-zinc-700'
                        }`}
                      >
                        {mode === 'BUY' ? 'Buy Direct' : mode === 'RENT' ? 'VIP Rent' : 'Lease Plan'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">Dual Currency Base</span>
                  <span className="text-xs font-bold text-white font-mono">
                    {formatUSD(vehicle.price)} <span className="text-zinc-400">({formatGBP(vehicle.price)})</span>
                  </span>
                </div>
              </div>

              {/* Urgency Alert Header */}
              <div className="p-4 rounded-2xl bg-[#181C26] border border-zinc-700 flex items-start gap-3">
                <Gift className="w-6 h-6 text-zinc-200 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-extrabold text-white">
                    ⚡ Pre-Handover Factory Upgrades & Accessories (Save up to 45%)
                  </h3>
                  <p className="text-xs text-zinc-300">
                    Authorize factory warranty, ceramic protection, or performance equipment before dispatch to unlock wholesale rates in US, UK, Canada, Australia, and Monaco.
                  </p>
                </div>
              </div>

              {/* Upsell Options Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400">
                  Recommended Tailored Factory Upgrades for this {vehicle.category}:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relevantUpsells.map((item) => {
                    const isSelected = selectedUpsellIds.includes(item.id);

                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleUpsell(item.id)}
                        className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between relative ${
                          isSelected
                            ? 'bg-[#181C26] border-white ring-1 ring-white shadow-lg shadow-white/5'
                            : 'bg-[#0E1015] border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {item.popularChoice && (
                          <span className="absolute -top-2.5 right-4 bg-white text-zinc-950 font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Popular Choice
                          </span>
                        )}

                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                                isSelected ? 'bg-white border-white text-zinc-950' : 'border-zinc-700 bg-[#151821]'
                              }`}>
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <h5 className="font-bold text-xs text-white">{item.title}</h5>
                            </div>
                          </div>

                          <p className="text-[11px] text-zinc-300 font-semibold">{item.tagline}</p>
                          <p className="text-[11px] text-zinc-400 leading-relaxed">{item.description}</p>
                          
                          <div className="space-y-1 pt-1">
                            {item.benefits.map((b, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 text-[10px] text-zinc-300">
                                <CheckCircle2 className="w-3 h-3 text-zinc-400 shrink-0" />
                                <span>{b}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-zinc-800 flex items-baseline justify-between">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs font-bold text-white">+{formatUSD(item.price)}</span>
                            <span className="text-[10px] font-bold text-zinc-400">({formatGBP(item.price)})</span>
                            <span className="text-[10px] text-zinc-500 line-through block">{formatUSD(item.originalPrice)}</span>
                          </div>
                          <span className="text-[10px] text-white font-bold uppercase">
                            {isSelected ? '✓ Added' : '+ Add to Order'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 rounded-2xl bg-[#0E1015] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-zinc-400 block">Selected Upgrades Total</span>
                  <div className="text-lg font-black text-white">
                    +{formatUSD(upsellsTotalUSD)} <span className="text-xs font-bold text-zinc-400">({formatGBP(upsellsTotalUSD)})</span>
                  </div>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleDeclineUpsells}
                    className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors"
                  >
                    Skip Add-ons →
                  </button>

                  <button
                    onClick={handleProceedToCheckout}
                    className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-1.5"
                  >
                    <span>Proceed to Order Finalization</span>
                    <ArrowRight className="w-4 h-4 text-zinc-950 stroke-[3]" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ================= STEP 2: DOWNSELL SCREEN ================= */}
          {step === 'DOWNSELL' && (
            <div className="space-y-6 text-center max-w-2xl mx-auto py-4">
              
              <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-600 text-white flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold text-white uppercase tracking-widest bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">
                  Wait! One-Time VIP Concierge Downsell
                </span>
                <h3 className="text-2xl font-extrabold text-white font-serif">
                  Don't Dispatch Without Emergency Protection.
                </h3>
                <p className="text-xs text-zinc-300 max-w-md mx-auto">
                  {DOWNSELL_OFFER.description}
                </p>
              </div>

              {/* Downsell Offer Box */}
              <div className="p-6 rounded-3xl bg-[#0E1015] border-2 border-zinc-600 shadow-2xl text-left space-y-4 relative">
                <span className="absolute -top-3 right-6 bg-white text-zinc-950 font-black text-xs px-3 py-1 rounded-full shadow">
                  77% OFF — Save {formatUSD(651)} ({formatGBP(651)})
                </span>

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold text-white font-serif">{DOWNSELL_OFFER.title}</h4>
                    <p className="text-xs text-zinc-400">Essential International Roadside & Maintenance Shield</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">{formatUSD(DOWNSELL_OFFER.discountedPrice)}</span>
                      <span className="text-sm font-bold text-zinc-300">({formatGBP(DOWNSELL_OFFER.discountedPrice)})</span>
                    </div>
                    <span className="text-xs text-zinc-500 line-through block">{formatUSD(DOWNSELL_OFFER.originalPrice)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
                  {DOWNSELL_OFFER.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Downsell Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setAcceptedDownsell(true);
                    setStep('CHECKOUT');
                  }}
                  className="flex-1 py-4 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-xl"
                >
                  YES! Add VIP Care Pass for Only {formatUSD(DOWNSELL_OFFER.discountedPrice)} ({formatGBP(DOWNSELL_OFFER.discountedPrice)}) →
                </button>

                <button
                  onClick={() => {
                    setAcceptedDownsell(false);
                    setStep('CHECKOUT');
                  }}
                  className="px-6 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs"
                >
                  No thanks, continue without protection
                </button>
              </div>

            </div>
          )}

          {/* ================= STEP 3: CHECKOUT SCREEN ================= */}
          {step === 'CHECKOUT' && (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              
              {/* Destination Country Selection */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-white block">
                  1. Target Registration & Delivery Territory:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
                  {[
                    { id: 'United States', flag: '🇺🇸', label: 'USA' },
                    { id: 'United Kingdom', flag: '🇬🇧', label: 'UK' },
                    { id: 'Canada', flag: '🇨🇦', label: 'Canada' },
                    { id: 'Australia', flag: '🇦🇺', label: 'Australia' },
                    { id: 'Monaco', flag: '🇲🇨', label: 'Monaco' },
                    { id: 'Germany', flag: '🇩🇪', label: 'Germany' },
                    { id: 'Saudi Arabia', flag: '🇸🇦', label: 'Saudi Arabia' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCountry(c.id)}
                      className={`py-2 px-1 rounded-xl text-[11px] font-bold border transition-all text-center ${
                        selectedCountry === c.id 
                          ? 'bg-white text-zinc-950 border-white shadow-md font-black' 
                          : 'bg-[#0E1015] text-zinc-400 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      {c.flag} {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Acquisition Type Selector */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 block">
                  2. Active Acquisition Intent:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'BUY',
                      title: 'Outright Purchase',
                      desc: `${formatUSD(500)} / ${formatGBP(385)} refundable reservation deposit`,
                      icon: Key
                    },
                    {
                      id: 'RENT',
                      title: 'VIP Rental Booking',
                      desc: `3-Day allocation + ${formatUSD(1000)} (${formatGBP(770)}) deposit`,
                      icon: Calendar
                    },
                    {
                      id: 'LEASE',
                      title: 'Corporate / Personal Lease',
                      desc: `1st Month ${formatUSD(monthlyLeaseRate)} (${formatGBP(monthlyLeaseRate)}) advance`,
                      icon: Building
                    }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setServiceIntent(opt.id as ServiceIntent)}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        serviceIntent === opt.id
                          ? 'border-white bg-[#181C26] text-white shadow-lg'
                          : 'border-zinc-800 bg-[#0E1015] text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <opt.icon className="w-4 h-4 text-white" />
                        <h5 className="font-bold text-xs text-white">{opt.title}</h5>
                      </div>
                      <p className="text-[11px] text-zinc-400">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Details Form */}
              <div className="p-4 rounded-2xl bg-[#0E1015] border border-zinc-800 space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-zinc-300" />
                  <span>Buyer & Consignee Information</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-zinc-400 block mb-1 font-semibold">Full Legal / Entity Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Lord Alexander Sterling"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full bg-[#151821] border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1 font-semibold">Email for Escrow & Title Vault *</label>
                    <input
                      type="email"
                      placeholder="alexander@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-[#151821] border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1 font-semibold">Phone Number (Direct SMS) *</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 019-2831 / +44 20 7946 0912"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-[#151821] border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1 font-semibold">Delivery City & Territory *</label>
                    <input
                      type="text"
                      placeholder="London / Beverly Hills / Sydney / Monte-Carlo"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full bg-[#151821] border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white"
                    />
                  </div>
                </div>
              </div>

              {/* Final Invoice Order Summary with Dual Currency */}
              <div className="p-4 rounded-2xl bg-[#0E1015] border border-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Vehicle Allocation ({serviceIntent === 'BUY' ? 'Deposit Lock' : serviceIntent === 'RENT' ? '3-Day Rent + Deposit' : 'First Month Advance'}):</span>
                  <span className="font-bold text-white font-mono">{formatUSD(baseAmountUSD)} ({formatGBP(baseAmountUSD)})</span>
                </div>
                {selectedUpsellIds.length > 0 && (
                  <div className="flex justify-between text-zinc-400">
                    <span>Selected Protection Add-Ons ({selectedUpsellIds.length}):</span>
                    <span className="font-bold text-white font-mono">+{formatUSD(upsellsTotalUSD)} ({formatGBP(upsellsTotalUSD)})</span>
                  </div>
                )}
                {acceptedDownsell && (
                  <div className="flex justify-between text-zinc-400">
                    <span>1-Year Express VIP Care Pass:</span>
                    <span className="font-bold text-white font-mono">+{formatUSD(DOWNSELL_OFFER.discountedPrice)} ({formatGBP(DOWNSELL_OFFER.discountedPrice)})</span>
                  </div>
                )}
                {voucherDiscount > 0 && (
                  <div className="flex justify-between text-white font-bold">
                    <span>VIP Voucher Applied:</span>
                    <span>-{formatUSD(voucherDiscount)} ({formatGBP(voucherDiscount)})</span>
                  </div>
                )}
                <div className="flex justify-between items-end pt-3 border-t border-zinc-800 text-sm">
                  <div>
                    <span className="font-bold text-white block">Amount Due Today:</span>
                    <span className="text-[11px] text-zinc-400">Guaranteed via Gear Glide Escrow Trust</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">{formatUSD(grandTotalUSD)}</span>
                      <span className="text-base font-bold text-zinc-400">/ {formatGBP(grandTotalUSD)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-black text-sm uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Complete Order & Lock Vehicle Now ({formatUSD(grandTotalUSD)} / {formatGBP(grandTotalUSD)}) →</span>
              </button>

              {/* WhatsApp Live Dealer Assistance */}
              <div className="pt-1 text-center">
                <a
                  href={DEALER_WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-zinc-300 hover:text-white text-xs font-semibold hover:underline"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Have questions? Chat live with the Dealer Director on WhatsApp</span>
                </a>
              </div>

            </form>
          )}

          {/* ================= STEP 4: CONFIRMATION & DIGITAL INVOICE ================= */}
          {step === 'CONFIRMATION' && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-600 text-white flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-white uppercase tracking-widest">
                  Order & Stock Allocation Locked
                </span>
                <h3 className="text-2xl font-extrabold text-white font-serif">
                  Congratulations, {fullName || 'Valued Client'}!
                </h3>
                <p className="text-xs text-zinc-300">
                  Your vehicle reservation for the <strong className="text-white">{vehicle.name}</strong> has been secured in our global vault for dispatch to <strong className="text-white">{selectedCountry}</strong>.
                </p>
              </div>

              {/* Digital Invoice Badge */}
              <div className="p-6 rounded-3xl bg-[#0E1015] border border-zinc-800 text-left space-y-4 max-w-lg mx-auto text-xs">
                <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest">Reservation Code</span>
                    <div className="font-mono text-lg font-bold text-white">{reservationCode}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest">VIN Number</span>
                    <div className="font-mono text-xs text-zinc-200">{vehicle.governmentSpecs.vinNumber}</div>
                  </div>
                </div>

                <div className="space-y-1.5 text-zinc-300">
                  <div className="flex justify-between">
                    <span>Vehicle:</span>
                    <span className="font-bold text-white">{vehicle.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Intent Plan:</span>
                    <span className="font-bold text-white">{serviceIntent === 'BUY' ? 'Outright Purchase' : serviceIntent === 'RENT' ? 'VIP Daily Rental' : 'Long-Term Lease'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Territory:</span>
                    <span className="font-bold text-white">{selectedCountry} (100% Cleared)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Location:</span>
                    <span className="font-bold text-white">{city || 'Direct Residence'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Protection Add-ons:</span>
                    <span className="font-bold text-white">{selectedUpsellIds.length} Included</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#181C26] border border-zinc-700 text-zinc-300 text-[11px] leading-relaxed">
                  📞 A Velmora Automobiles Concierge Director will call <strong className="text-white">{phone || 'your number'}</strong> within 15 minutes to coordinate enclosed air-ride transport and title escrow.
                </div>

                {/* Contact Dealer Actions: WhatsApp & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={DEALER_WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Concierge</span>
                  </a>

                  <a
                    href={getDealerMailtoLink(
                      `Confirmed Reservation [${reservationCode}]: ${vehicle.year} ${vehicle.make} ${vehicle.model}`,
                      `Hello Velmora Automobiles Dealership,\n\nI have confirmed my reservation for the ${vehicle.year} ${vehicle.make} ${vehicle.model}.\n\nReservation Code: ${reservationCode}\nCustomer Name: ${fullName || 'N/A'}\nPhone: ${phone || 'N/A'}\nDelivery Location: ${city || 'N/A'}\n\nPlease dispatch the formal sales agreement and wiring escrow details.\n\nThank you,\n${fullName || 'Client'}`
                    )}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0F1726] hover:bg-[#17253C] border border-cyan-500/50 hover:border-cyan-400 text-cyan-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
                    title={`Email: ${DEALER_EMAIL}`}
                  >
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>Email: {DEALER_EMAIL}</span>
                  </a>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3.5 rounded-xl bg-[#181C26] hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Return to Showroom
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

