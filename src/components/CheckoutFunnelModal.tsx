import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Truck, 
  CreditCard, 
  Lock, 
  Flame, 
  PhoneCall, 
  AlertCircle,
  Clock,
  CheckCircle2,
  Percent,
  DollarSign,
  Globe2,
  Key,
  Calendar,
  Building,
  Mail,
  MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Vehicle, UpsellOption, DownsellOffer, FunnelState, ServiceIntent, CurrencyMode } from '../types';
import { UPSELL_OPTIONS, DOWNSELL_OFFER } from '../data/upsells';
import { formatUSD, formatGBP } from '../utils/currency';
import { DEALER_WHATSAPP_LINK, DEALER_EMAIL, getDealerMailtoLink } from '../utils/whatsapp';

interface CheckoutFunnelModalProps {
  funnelState: FunnelState;
  onClose: () => void;
  onUpdateFunnel: (updater: (prev: FunnelState) => FunnelState) => void;
  onCompletePurchase: () => void;
  currencyMode?: CurrencyMode;
}

export const CheckoutFunnelModal: React.FC<CheckoutFunnelModalProps> = ({
  funnelState,
  onClose,
  onUpdateFunnel,
  onCompletePurchase,
  currencyMode = 'DUAL'
}) => {
  if (!funnelState.isOpen || !funnelState.vehicle) return null;

  const vehicle = funnelState.vehicle;
  const serviceIntent: ServiceIntent = funnelState.serviceIntent || 'BUY';

  // Countdown timer for urgency offer (10 minutes)
  const [timeLeft, setTimeLeft] = useState(600);
  const [activeCurrency, setActiveCurrency] = useState<'USD' | 'GBP'>('USD');
  const [selectedCountry, setSelectedCountry] = useState<string>('United States');

  useEffect(() => {
    if (funnelState.step === 'CONFIRMATION') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [funnelState.step]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Toggle Upsell selection
  const toggleUpsell = (upsellId: string) => {
    onUpdateFunnel((prev) => {
      const exists = prev.selectedUpsells.includes(upsellId);
      return {
        ...prev,
        selectedUpsells: exists 
          ? prev.selectedUpsells.filter((id) => id !== upsellId)
          : [...prev.selectedUpsells, upsellId]
      };
    });
  };

  // Filter relevant upsells by vehicle category
  const relevantUpsells = UPSELL_OPTIONS.filter((u) => {
    if (vehicle.category === 'BIKE') {
      return u.id !== 'truck-expedition-pack';
    }
    if (vehicle.category === 'TRUCK') {
      return u.id !== 'bike-gear-kit';
    }
    if (vehicle.category === 'SUPERCAR') {
      return u.id !== 'bike-gear-kit';
    }
    return u.id !== 'bike-gear-kit' && u.id !== 'truck-expedition-pack';
  });

  // Calculate Subtotals
  const selectedUpsellObjs = UPSELL_OPTIONS.filter((u) => funnelState.selectedUpsells.includes(u.id));
  const upsellTotalUSD = selectedUpsellObjs.reduce((acc, u) => acc + u.price, 0);
  const downsellCostUSD = funnelState.acceptedDownsell ? DOWNSELL_OFFER.discountedPrice : 0;
  
  // Base calculation based on intent
  const dailyRentRate = vehicle.dailyRentalRate || Math.round(vehicle.price * 0.0075);
  const monthlyLeaseRate = vehicle.monthlyLeaseRate || Math.round(vehicle.price * 0.018);

  let baseVehicleAmountUSD = 500;
  if (serviceIntent === 'BUY') {
    baseVehicleAmountUSD = funnelState.purchaseType === 'RESERVE_DEPOSIT' ? 500 : vehicle.price;
  } else if (serviceIntent === 'RENT') {
    baseVehicleAmountUSD = (dailyRentRate * 3) + 1000; // 3 days rental + $1000 security deposit
  } else if (serviceIntent === 'LEASE') {
    baseVehicleAmountUSD = monthlyLeaseRate + 1500; // 1st month + lease acquisition fee
  }

  const grandTotalUSD = baseVehicleAmountUSD + upsellTotalUSD + downsellCostUSD;

  // Handle Stepping
  const handleNextFromUpsells = () => {
    if (funnelState.selectedUpsells.length === 0 && !funnelState.acceptedDownsell) {
      onUpdateFunnel((prev) => ({ ...prev, step: 'DOWNSELL' }));
    } else {
      onUpdateFunnel((prev) => ({ ...prev, step: 'CHECKOUT' }));
    }
  };

  const handleAcceptDownsell = () => {
    onUpdateFunnel((prev) => ({ ...prev, acceptedDownsell: true, step: 'CHECKOUT' }));
  };

  const handleDeclineDownsell = () => {
    onUpdateFunnel((prev) => ({ ...prev, acceptedDownsell: false, step: 'CHECKOUT' }));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resCode = `GG-${selectedCountry.slice(0, 2).toUpperCase()}-${Math.floor(Math.random() * 899999 + 100000)}`;

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    onUpdateFunnel((prev) => ({
      ...prev,
      step: 'CONFIRMATION',
      reservationCode: resCode
    }));

    onCompletePurchase();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col text-slate-100 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Urgency Header Bar */}
        {funnelState.step !== 'CONFIRMATION' && (
          <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-4 py-2 text-slate-950 font-bold text-xs flex items-center justify-between tracking-wide">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 fill-slate-950 text-slate-950 animate-bounce" />
              <span>GEAR GLIDE VIP ACQUISITION & HOMOLOGATION LOCK</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>Offer Expires in: <strong className="underline">{formatTimer(timeLeft)}</strong></span>
            </div>
          </div>
        )}

        {/* Modal Close & Step Bar */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-[10px] font-bold tracking-widest uppercase">
                Step {funnelState.step === 'UPSALE' ? '1 of 3: Priority Add-ons' : funnelState.step === 'DOWNSELL' ? 'Special Concession Offer' : funnelState.step === 'CHECKOUT' ? '2 of 3: Finalize Order' : '3 of 3: Verified'}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-emerald-400 uppercase">
                {serviceIntent === 'BUY' ? 'Vehicle Purchase' : serviceIntent === 'RENT' ? 'Rental Booking' : 'Lease Agreement'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-serif">
              {funnelState.step === 'UPSALE' && 'Upgrade & Protect Prior to Finalizing'}
              {funnelState.step === 'DOWNSELL' && 'Wait! Exclusive Pre-Checkout Concierge Pack'}
              {funnelState.step === 'CHECKOUT' && 'Secure VIP Allocation & Contract'}
              {funnelState.step === 'CONFIRMATION' && '🎉 Order Secured & Stock Locked!'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: UPSELL SELECTION */}
        {funnelState.step === 'UPSALE' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            
            {/* Vehicle Summary Banner */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-4">
              <img src={vehicle.images[0]} alt={vehicle.name} referrerPolicy="no-referrer" className="w-20 h-14 object-cover rounded-xl border border-slate-700" />
              <div className="flex-1">
                <span className="text-[10px] text-amber-400 font-bold tracking-widest uppercase">{vehicle.year} {vehicle.make}</span>
                <h3 className="text-base font-bold text-white">{vehicle.name}</h3>
                <span className="text-xs text-slate-400">
                  Base Acquisition: {formatUSD(vehicle.price)} ({formatGBP(vehicle.price)})
                </span>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-xs text-emerald-400 font-bold block">Certified for US, UK, CA, AU, Monaco</span>
                <span className="text-[10px] text-slate-400">Dual Currency Escrow Protected</span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Recommended Pre-Handover Factory Upgrades
              </h3>
              <p className="text-xs text-slate-400">
                Select exclusive options below. Save up to 45% when authorized before dispatching your vehicle.
              </p>
            </div>

            {/* Upsell Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relevantUpsells.map((upsell) => {
                const isSelected = funnelState.selectedUpsells.includes(upsell.id);
                return (
                  <div
                    key={upsell.id}
                    onClick={() => toggleUpsell(upsell.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                      isSelected 
                        ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/10' 
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {upsell.popularChoice && (
                      <span className="absolute -top-2.5 right-4 bg-amber-500 text-slate-950 font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Most Popular
                      </span>
                    )}

                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isSelected ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-700'}`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <h4 className="text-xs font-bold text-white">{upsell.title}</h4>
                        </div>
                      </div>

                      <p className="text-xs text-amber-400 font-semibold">{upsell.tagline}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{upsell.description}</p>

                      <ul className="space-y-1 pt-1">
                        {upsell.benefits.map((b, idx) => (
                          <li key={idx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-800 flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-black text-amber-400">+{formatUSD(upsell.price)}</span>
                        <span className="text-xs font-bold text-slate-300">({formatGBP(upsell.price)})</span>
                        <span className="text-[10px] text-slate-500 line-through">{formatUSD(upsell.originalPrice)}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">
                        {isSelected ? '✓ Added' : '+ Add Option'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Stepping Buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                Selected Add-ons: <strong className="text-amber-400 font-mono text-sm">{formatUSD(upsellTotalUSD)} ({formatGBP(upsellTotalUSD)})</strong>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onUpdateFunnel((prev) => ({ ...prev, step: 'CHECKOUT' }))}
                  className="px-4 py-3 rounded-xl border border-slate-700 text-slate-300 hover:text-white font-medium text-xs flex-1 sm:flex-none"
                >
                  Skip Add-ons
                </button>

                <button
                  onClick={handleNextFromUpsells}
                  className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 flex-1 sm:flex-none"
                >
                  <span>Continue to Checkout</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* STEP 1.5: DOWNSELL POPUP OFFER */}
        {funnelState.step === 'DOWNSELL' && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto animate-pulse">
              <Percent className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Special One-Time Concession (77% OFF)
              </span>
              <h3 className="text-2xl font-bold text-white font-serif">{DOWNSELL_OFFER.title}</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                {DOWNSELL_OFFER.description}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Special Checkout Price:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-amber-400">{formatUSD(DOWNSELL_OFFER.discountedPrice)}</span>
                    <span className="text-sm font-bold text-slate-300">({formatGBP(DOWNSELL_OFFER.discountedPrice)})</span>
                    <span className="text-xs text-slate-500 line-through">{formatUSD(DOWNSELL_OFFER.originalPrice)}</span>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-2.5 py-1 rounded-lg">
                  Save {formatUSD(DOWNSELL_OFFER.originalPrice - DOWNSELL_OFFER.discountedPrice)}
                </span>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                {DOWNSELL_OFFER.benefits.map((b, i) => (
                  <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleAcceptDownsell}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-500/20"
              >
                YES! Add VIP Care Pass for Only {formatUSD(DOWNSELL_OFFER.discountedPrice)} ({formatGBP(DOWNSELL_OFFER.discountedPrice)})
              </button>

              <button
                onClick={handleDeclineDownsell}
                className="text-xs text-slate-400 hover:text-slate-200 underline font-medium"
              >
                No thanks, proceed to checkout without protection
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CHECKOUT FORM & CONTRACT LOCK */}
        {funnelState.step === 'CHECKOUT' && (
          <form onSubmit={handleFinalSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Customer & Country info */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Acquisition Mode Banner */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {serviceIntent === 'BUY' ? <Key className="w-5 h-5 text-amber-400" /> : serviceIntent === 'RENT' ? <Calendar className="w-5 h-5 text-emerald-400" /> : <Building className="w-5 h-5 text-blue-400" />}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Intent</span>
                      <strong className="text-xs text-white">
                        {serviceIntent === 'BUY' ? 'Outright Vehicle Purchase & Escrow' : serviceIntent === 'RENT' ? 'VIP Daily/Weekly Rental Booking' : '12-48 Month Long-Term Lease'}
                      </strong>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {serviceIntent === 'BUY' ? '$500 / £385 Refundable Lock' : serviceIntent === 'RENT' ? '3-Day Booking + Deposit' : 'First Month Advance'}
                  </span>
                </div>

                {/* Country Destination Selector */}
                <div>
                  <label className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                    Destination Country for Registration & Delivery
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
                    {['United States', 'United Kingdom', 'Canada', 'Australia', 'Monaco', 'Germany', 'Saudi Arabia'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedCountry(c)}
                        className={`py-2 px-1 rounded-xl text-[11px] font-bold border transition-all text-center ${
                          selectedCountry === c ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md' : 'bg-slate-950 text-slate-400 border-slate-800'
                        }`}
                      >
                        {c === 'United States' ? '🇺🇸 USA' : c === 'United Kingdom' ? '🇬🇧 UK' : c === 'Canada' ? '🇨🇦 CAN' : c === 'Australia' ? '🇦🇺 AUS' : c === 'Monaco' ? '🇲🇨 MON' : c === 'Germany' ? '🇩🇪 DEU' : '🇸🇦 SAU'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer Info Fields */}
                <div className="space-y-3.5 pt-1">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-widest block">
                    Buyer & Signatory Information
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Full Legal / Corporate Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lord Alexander Sterling"
                        value={funnelState.customerInfo.fullName}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateFunnel((prev) => ({
                            ...prev,
                            customerInfo: { ...prev.customerInfo, fullName: val }
                          }));
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Email for Vault Access & Docs *</label>
                      <input
                        type="email"
                        required
                        placeholder="alexander@domain.com"
                        value={funnelState.customerInfo.email}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateFunnel((prev) => ({
                            ...prev,
                            customerInfo: { ...prev.customerInfo, email: val }
                          }));
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Phone Number (Direct SMS) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 019-2834"
                        value={funnelState.customerInfo.phone}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateFunnel((prev) => ({
                            ...prev,
                            customerInfo: { ...prev.customerInfo, phone: val }
                          }));
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Delivery City & Postal Code *</label>
                      <input
                        type="text"
                        required
                        placeholder="London, SW1A 1AA / Beverly Hills 90210"
                        value={funnelState.customerInfo.city}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateFunnel((prev) => ({
                            ...prev,
                            customerInfo: { ...prev.customerInfo, city: val }
                          }));
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Escrow Guarantee Box */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    Protected under <strong>Gear Glide Global Escrow Trust</strong>. 
                    All funds held securely in escrow until vehicle inspection & title handover.
                  </span>
                </div>

              </div>

              {/* Right Column: Order Summary with Dual Currency */}
              <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">
                      Acquisition Summary
                    </h3>
                    <span className="text-[11px] font-bold text-slate-400">
                      {selectedCountry}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <img src={vehicle.images[0]} alt={vehicle.name} referrerPolicy="no-referrer" className="w-16 h-12 object-cover rounded-lg border border-slate-800" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{vehicle.name}</h4>
                      <span className="text-[10px] text-slate-400">VIN: {vehicle.governmentSpecs.vinNumber}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs pt-2 border-t border-slate-800">
                    <div className="flex justify-between text-slate-300">
                      <span>Vehicle Allocation ({serviceIntent === 'BUY' ? 'Lock Deposit' : serviceIntent === 'RENT' ? '3-Day Rent + Deposit' : 'First Month Advance'}):</span>
                      <span className="font-mono text-white">{formatUSD(baseVehicleAmountUSD)} ({formatGBP(baseVehicleAmountUSD)})</span>
                    </div>

                    {selectedUpsellObjs.map((u) => (
                      <div key={u.id} className="flex justify-between text-slate-400 text-[11px]">
                        <span className="truncate max-w-[180px]">• {u.title}:</span>
                        <span className="font-mono text-amber-400">+{formatUSD(u.price)} ({formatGBP(u.price)})</span>
                      </div>
                    ))}

                    {funnelState.acceptedDownsell && (
                      <div className="flex justify-between text-slate-400 text-[11px]">
                        <span>• VIP Care & Concierge Pass:</span>
                        <span className="font-mono text-amber-400">+{formatUSD(DOWNSELL_OFFER.discountedPrice)} ({formatGBP(DOWNSELL_OFFER.discountedPrice)})</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-300 pt-1">
                      <span>Customs Clearance & MSO Title Prep:</span>
                      <span className="text-emerald-400 font-bold">Included ($0 / £0)</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Total Due Today</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-amber-400">{formatUSD(grandTotalUSD)}</span>
                        <span className="text-base font-bold text-slate-300">/ {formatGBP(grandTotalUSD)}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      100% Refundable
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Lock & Authorize Order ({formatUSD(grandTotalUSD)} / {formatGBP(grandTotalUSD)})</span>
                </button>

              </div>

            </div>
          </form>
        )}

        {/* STEP 3: CONFIRMATION SCREEN */}
        {funnelState.step === 'CONFIRMATION' && (
          <div className="p-8 text-center space-y-6 flex-1 overflow-y-auto max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest">
                Acquisition Confirmed • Global Stock Locked
              </span>
              <h3 className="text-3xl font-extrabold text-white font-serif">Vehicle Allocation Reserved</h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto">
                Congratulations, <strong>{funnelState.customerInfo.fullName || 'Valued Client'}</strong>! 
                Your allocation for the <strong>{vehicle.name}</strong> has been secured in our global vault for dispatch to <strong>{selectedCountry}</strong>. 
                Our executive concierge director will contact you via phone and email within 15 minutes.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs text-left">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Reservation Tracking Code:</span>
                <span className="font-mono font-bold text-amber-400 text-sm">{funnelState.reservationCode}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Vehicle VIN:</span>
                <span className="font-mono text-slate-200">{vehicle.governmentSpecs.vinNumber}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Target Region & Customs:</span>
                <span className="text-emerald-400 font-bold">{selectedCountry} (100% Cleared)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Doorstep Handover:</span>
                <span className="text-white font-bold">Within 48 Hours via Enclosed Air-Ride Transporter</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={DEALER_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-[#101F18] hover:bg-[#172E24] border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Concierge</span>
              </a>

              <a
                href={getDealerMailtoLink(
                  `Confirmed Order [${funnelState.reservationCode}]: ${vehicle.name}`,
                  `Hello Velmora Automobiles Dealership,\n\nI have completed the online reservation for ${vehicle.name}.\n\nReservation Code: ${funnelState.reservationCode}\nVIN: ${vehicle.governmentSpecs.vinNumber}\nClient Name: ${funnelState.customerInfo.fullName || 'Valued Client'}\nPhone: ${funnelState.customerInfo.phone || 'N/A'}\nCountry: ${selectedCountry}\n\nPlease email me the final invoice and wire transfer receipt.\n\nThank you.`
                )}
                className="px-5 py-3 rounded-xl bg-[#0F1726] hover:bg-[#182338] border border-cyan-500/50 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                title={`Email: ${DEALER_EMAIL}`}
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Email: {DEALER_EMAIL}</span>
              </a>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-500/20 font-telemetry"
              >
                Return to Showroom
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

