import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Zap, 
  Gauge, 
  CheckCircle2, 
  Truck, 
  Lock, 
  Eye, 
  Building2, 
  Award,
  ArrowRight,
  Calculator,
  RotateCcw,
  Key,
  Calendar,
  Building,
  Globe2,
  Check,
  MessageCircle,
  Mail
} from 'lucide-react';
import { Vehicle, ServiceIntent, CurrencyMode } from '../types';
import { formatUSD, formatGBP } from '../utils/currency';
import { DEALER_WHATSAPP_LINK, DEALER_EMAIL, getDealerMailtoLink } from '../utils/whatsapp';

interface VehicleDetailsModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onProceedToFunnel: (v: Vehicle, intent?: ServiceIntent) => void;
  onOpenCalc: () => void;
  currencyMode?: CurrencyMode;
}

export const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({
  vehicle,
  onClose,
  onProceedToFunnel,
  onOpenCalc,
  currencyMode = 'DUAL'
}) => {
  if (!vehicle) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'SERVICES' | 'GOVT' | 'TECH' | 'FEATURES'>('SERVICES');
  const [activeServiceIntent, setActiveServiceIntent] = useState<ServiceIntent>('BUY');
  const [rotationAngle, setRotationAngle] = useState(0);

  const dailyRentUSD = vehicle.dailyRentalRate || Math.round(vehicle.price * 0.0075);
  const monthlyLeaseUSD = vehicle.monthlyLeaseRate || vehicle.monthlyFinancing || Math.round(vehicle.price * 0.018);

  const priceUSD = formatUSD(vehicle.price);
  const priceGBP = formatGBP(vehicle.price);

  const rentUSD = `${formatUSD(dailyRentUSD)}/day`;
  const rentGBP = `${formatGBP(dailyRentUSD)}/day`;

  const leaseUSD = `${formatUSD(monthlyLeaseUSD)}/mo`;
  const leaseGBP = `${formatGBP(monthlyLeaseUSD)}/mo`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-[#151821] border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 bg-[#0E1015] border-b border-zinc-800 flex items-center justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black text-white uppercase tracking-widest">{vehicle.category}</span>
              <span className="text-xs text-zinc-400">• VIN: {vehicle.governmentSpecs.vinNumber}</span>
              {vehicle.popularIn && vehicle.popularIn.length > 0 && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-200 bg-[#181C26] px-2 py-0.5 rounded border border-zinc-700">
                  <Globe2 className="w-3 h-3 text-zinc-300" />
                  Certified in {vehicle.popularIn.join(', ')}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-serif">{vehicle.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#181C26] border border-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Image Showcase & 360 Simulator */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Main Photo / 360 Stage */}
              <div className="relative rounded-2xl overflow-hidden bg-[#0E1015] border border-zinc-800 aspect-[16/10]">
                <img
                  src={vehicle.images[activeImageIndex] || vehicle.images[0]}
                  alt={vehicle.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-300"
                  style={{ filter: `hue-rotate(${rotationAngle}deg)` }}
                />

                {/* Live Urgency Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-[#0E1015]/90 backdrop-blur-md border border-zinc-700 text-zinc-200 text-xs px-3 py-1.5 rounded-full font-semibold">
                  <Eye className="w-3.5 h-3.5 text-zinc-300 animate-pulse" />
                  <span>{vehicle.liveViewersCount} prospective buyers viewing right now</span>
                </div>

                {/* 360 Simulator Dial Overlay */}
                <div className="absolute bottom-3 right-3 bg-[#0E1015]/90 backdrop-blur-md border border-zinc-700 p-2 rounded-xl flex items-center gap-2 text-xs text-zinc-300">
                  <RotateCcw className="w-4 h-4 text-zinc-300" />
                  <span>Interactive Angle Hue</span>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={rotationAngle}
                    onChange={(e) => setRotationAngle(Number(e.target.value))}
                    className="w-20 accent-white cursor-pointer"
                  />
                </div>
              </div>

              {/* Gallery Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-1">
                {vehicle.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative rounded-xl overflow-hidden border-2 w-24 h-16 shrink-0 transition-all ${
                      activeImageIndex === idx ? 'border-white scale-95 shadow-md shadow-white/10' : 'border-zinc-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Global Homologation & Guarantee Box */}
              <div className="p-4 rounded-2xl bg-[#181C26] border border-zinc-700 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Award className="w-5 h-5 text-zinc-300" />
                  <span>Global Availability & Compliance Guarantee</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Every vehicle in our showroom is ready for direct purchase, daily/weekly rental, or 12-48 month business leasing across the <strong className="text-white">United States, United Kingdom, Canada, Australia, Monaco, Germany, and Saudi Arabia</strong>. All payments & contracts accepted in <strong className="text-white">USD ($) or GBP (£)</strong> with full escrow protection.
                </p>
              </div>

            </div>

            {/* Right Column: Pricing & Service Options */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
              
              {/* Service Intent Selector (Buy, Rent, Lease) */}
              <div className="p-1.5 bg-[#0E1015] rounded-2xl border border-zinc-800 grid grid-cols-3 gap-1.5 text-xs font-bold">
                <button
                  onClick={() => setActiveServiceIntent('BUY')}
                  className={`py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                    activeServiceIntent === 'BUY'
                      ? 'bg-white text-zinc-950 font-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Key className="w-4 h-4" />
                  <span>Buy Outright</span>
                </button>

                <button
                  onClick={() => setActiveServiceIntent('RENT')}
                  className={`py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                    activeServiceIntent === 'RENT'
                      ? 'bg-white text-zinc-950 font-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Rent (Daily)</span>
                </button>

                <button
                  onClick={() => setActiveServiceIntent('LEASE')}
                  className={`py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                    activeServiceIntent === 'LEASE'
                      ? 'bg-white text-zinc-950 font-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>Lease (Mo)</span>
                </button>
              </div>

              {/* Pricing & Lock Card */}
              <div className="p-5 rounded-2xl bg-[#0E1015] border border-zinc-800 space-y-4">
                {activeServiceIntent === 'BUY' && (
                  <div>
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-xs text-zinc-400 uppercase tracking-widest block font-semibold">
                          Outright Purchase Price
                        </span>
                        <div className="text-2xl sm:text-3xl font-black text-white">
                          {priceUSD} <span className="text-lg font-bold text-zinc-300">/ {priceGBP}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-zinc-300 font-bold block">Financing From</span>
                        <span className="text-sm font-bold text-white block">{formatUSD(vehicle.monthlyFinancing)}/mo</span>
                        <span className="text-xs text-zinc-400">{formatGBP(vehicle.monthlyFinancing)}/mo</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-2">
                      Includes direct MSO Title, 100% customs clearance, DOT/EPA certificates and enclosed transport.
                    </p>
                  </div>
                )}

                {activeServiceIntent === 'RENT' && (
                  <div>
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-xs text-zinc-300 uppercase tracking-widest block font-bold">
                          Daily Rental Rate
                        </span>
                        <div className="text-2xl sm:text-3xl font-black text-white">
                          {rentUSD} <span className="text-lg font-bold text-zinc-300">/ {rentGBP}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-zinc-400 font-bold block">Weekly Rate</span>
                        <span className="text-sm font-bold text-white block">{formatUSD(dailyRentUSD * 6)}/wk</span>
                        <span className="text-xs text-zinc-400">{formatGBP(dailyRentUSD * 6)}/wk</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-2">
                      Minimum 1 day rental. Fully comprehensive VIP insurance & 200 miles/day included.
                    </p>
                  </div>
                )}

                {activeServiceIntent === 'LEASE' && (
                  <div>
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-xs text-zinc-300 uppercase tracking-widest block font-bold">
                          Corporate & Personal Lease
                        </span>
                        <div className="text-2xl sm:text-3xl font-black text-white">
                          {leaseUSD} <span className="text-lg font-bold text-zinc-300">/ {leaseGBP}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-zinc-400 font-bold block">Standard Term</span>
                        <span className="text-sm font-bold text-white">24 - 36 Mo.</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-2">
                      $0 down options available. Section 179 tax deduction eligible in US & UK corporate expensing.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#151821] border border-zinc-800 text-zinc-300 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-zinc-300" />
                    <span>Global Delivery</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#151821] border border-zinc-800 text-zinc-300 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-zinc-300" />
                    <span>$500 Refundable Lock</span>
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={() => onProceedToFunnel(vehicle, activeServiceIntent)}
                  className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-wider bg-white hover:bg-zinc-200 text-zinc-950 shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <span>
                    {activeServiceIntent === 'BUY' ? 'Reserve & Buy Vehicle' : activeServiceIntent === 'RENT' ? 'Book Rental Dates' : 'Apply for Lease'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-zinc-950 stroke-[3]" />
                </button>

                {/* Direct Concierge Contact Buttons: WhatsApp & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={DEALER_WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3 rounded-xl bg-[#101F18] hover:bg-[#162D23] border border-emerald-500/40 hover:border-emerald-400 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg group"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Dealer</span>
                  </a>

                  <a
                    href={getDealerMailtoLink(
                      `Inquiry on ${vehicle.year} ${vehicle.make} ${vehicle.model} (${activeServiceIntent})`,
                      `Hello Velmora Automobiles Dealership,\n\nI am interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} for ${activeServiceIntent === 'BUY' ? 'Purchase' : activeServiceIntent === 'RENT' ? 'Rental' : 'Leasing'}.\n\nVehicle Price: ${priceUSD} / ${priceGBP}\n\nPlease contact me back with purchase/lease terms and reservation availability.\n\nThank you.`
                    )}
                    className="py-3 px-3 rounded-xl bg-[#121927] hover:bg-[#182338] border border-cyan-500/40 hover:border-cyan-400 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg group"
                    title={`Email dealer at ${DEALER_EMAIL}`}
                  >
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span className="truncate">Email: {DEALER_EMAIL}</span>
                  </a>
                </div>

                <button
                  onClick={onOpenCalc}
                  className="w-full py-2.5 rounded-xl bg-[#151821] border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-zinc-300" />
                  <span>Customize Dual $/£ Finance & Lease Calculator</span>
                </button>
              </div>

              {/* Tabs Navigation */}
              <div className="space-y-3">
                <div className="flex border-b border-zinc-800 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('SERVICES')}
                    className={`pb-3 px-3 text-xs font-bold tracking-wider border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
                      activeTab === 'SERVICES' ? 'border-white text-white font-extrabold' : 'border-transparent text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Rent & Lease Terms</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('GOVT')}
                    className={`pb-3 px-3 text-xs font-bold tracking-wider border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
                      activeTab === 'GOVT' ? 'border-white text-white font-extrabold' : 'border-transparent text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Government Specs</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('TECH')}
                    className={`pb-3 px-3 text-xs font-bold tracking-wider border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
                      activeTab === 'TECH' ? 'border-white text-white font-extrabold' : 'border-transparent text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Performance</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('FEATURES')}
                    className={`pb-3 px-3 text-xs font-bold tracking-wider border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
                      activeTab === 'FEATURES' ? 'border-white text-white font-extrabold' : 'border-transparent text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Features</span>
                  </button>
                </div>

                {/* Tab Content 0: Services Breakdown */}
                {activeTab === 'SERVICES' && (
                  <div className="space-y-2.5 bg-[#0E1015] p-4 rounded-2xl border border-zinc-800 text-xs">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-zinc-300 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Direct Purchase:</strong> Includes MSO title transfer, registration in US/UK/CA/AU/Monaco, and door-to-door enclosed shipping.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-zinc-300 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Daily & Weekly Rental:</strong> $2,800/d ({rentGBP}) with zero mileage penalties under 200 miles/day, chauffeur options, and airport concierge drop-off.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-zinc-300 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">12-48 Month Leasing:</strong> Low upfront capital, customizable annual mileage, and purchase buyout clause at term completion.
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content 1: Government & Compliance Specs */}
                {activeTab === 'GOVT' && (
                  <div className="space-y-2 bg-[#0E1015] p-4 rounded-2xl border border-zinc-800 text-xs">
                    <div className="flex justify-between py-1 border-b border-zinc-800">
                      <span className="text-zinc-400 font-medium">Emissions Standard:</span>
                      <span className="font-bold text-white">{vehicle.governmentSpecs.emissionsGrade}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-zinc-800">
                      <span className="text-zinc-400 font-medium">Government Safety Rating:</span>
                      <span className="font-bold text-white">{vehicle.governmentSpecs.safetyRating}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-zinc-800">
                      <span className="text-zinc-400 font-medium">Annual Road Tax Band:</span>
                      <span className="font-bold text-zinc-200">{vehicle.governmentSpecs.roadTaxBand}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-zinc-800">
                      <span className="text-zinc-400 font-medium">Title & Origin Status:</span>
                      <span className="font-bold text-zinc-200">{vehicle.governmentSpecs.titleStatus}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-zinc-800">
                      <span className="text-zinc-400 font-medium">Import Customs Clearance:</span>
                      <span className="font-bold text-zinc-200">{vehicle.governmentSpecs.importDutyStatus}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-zinc-400 font-medium">DOT / EPA / UK VCA Compliance:</span>
                      <span className="font-bold text-white">{vehicle.governmentSpecs.complianceCert}</span>
                    </div>
                  </div>
                )}

                {/* Tab Content 2: Technical Performance */}
                {activeTab === 'TECH' && (
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#0E1015] border border-zinc-800">
                      <span className="text-zinc-400 block text-[10px]">Engine / Motor</span>
                      <span className="font-bold text-white text-xs">{vehicle.specs.engine}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0E1015] border border-zinc-800">
                      <span className="text-zinc-400 block text-[10px]">Horsepower</span>
                      <span className="font-bold text-white">{vehicle.specs.horsepower} HP</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0E1015] border border-zinc-800">
                      <span className="text-zinc-400 block text-[10px]">0-60 mph Time</span>
                      <span className="font-bold text-zinc-200">{vehicle.specs.acceleration0to60}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0E1015] border border-zinc-800">
                      <span className="text-zinc-400 block text-[10px]">Top Speed</span>
                      <span className="font-bold text-white">{vehicle.specs.topSpeed}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0E1015] border border-zinc-800">
                      <span className="text-zinc-400 block text-[10px]">Transmission</span>
                      <span className="font-bold text-zinc-200">{vehicle.specs.transmission}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0E1015] border border-zinc-800">
                      <span className="text-zinc-400 block text-[10px]">Fuel / Range</span>
                      <span className="font-bold text-white">{vehicle.specs.fuelEconomy}</span>
                    </div>
                  </div>
                )}

                {/* Tab Content 3: Key Features */}
                {activeTab === 'FEATURES' && (
                  <div className="space-y-1.5 bg-[#0E1015] p-4 rounded-2xl border border-zinc-800 text-xs">
                    {vehicle.keyFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-zinc-300 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

