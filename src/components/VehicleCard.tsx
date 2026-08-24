import React, { useState } from 'react';
import { 
  Eye, 
  Flame, 
  Gauge, 
  Zap, 
  ShieldCheck, 
  Heart, 
  ArrowRight,
  FileText,
  Key,
  Calendar,
  Building,
  Globe2,
  MessageCircle,
  DollarSign
} from 'lucide-react';
import { Vehicle, CurrencyMode, ServiceIntent } from '../types';
import { formatUSD, formatGBP } from '../utils/currency';
import { DEALER_WHATSAPP_LINK } from '../utils/whatsapp';

interface VehicleCardProps {
  vehicle: Vehicle;
  onQuickView: (v: Vehicle) => void;
  onBuyReserve: (v: Vehicle, intent?: ServiceIntent) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  currencyMode?: CurrencyMode;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onQuickView,
  onBuyReserve,
  isSaved,
  onToggleSave,
  currencyMode = 'DUAL'
}) => {
  const [activeIntentTab, setActiveIntentTab] = useState<ServiceIntent>('BUY');

  const dailyRentUSD = vehicle.dailyRentalRate || Math.round(vehicle.price * 0.0075);
  const monthlyLeaseUSD = vehicle.monthlyLeaseRate || vehicle.monthlyFinancing || Math.round(vehicle.price * 0.018);

  const priceUSD = formatUSD(vehicle.price);
  const priceGBP = formatGBP(vehicle.price);

  const rentUSD = `${formatUSD(dailyRentUSD)}/d`;
  const rentGBP = `${formatGBP(dailyRentUSD)}/d`;

  const leaseUSD = `${formatUSD(monthlyLeaseUSD)}/mo`;
  const leaseGBP = `${formatGBP(monthlyLeaseUSD)}/mo`;

  return (
    <div className="group rounded-3xl bg-[#0D111D] border border-amber-500/20 hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl relative carbon-pattern">
      
      {/* Top Image Container */}
      <div className="relative h-60 sm:h-64 overflow-hidden bg-[#07090F]">
        <img
          src={vehicle.images[0]}
          alt={vehicle.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D111D] via-transparent to-black/60" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 max-w-[70%]">
          {vehicle.badge && (
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-black font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md font-telemetry">
              {vehicle.badge}
            </span>
          )}
          <span className="bg-[#0E1424]/90 text-amber-200 border border-amber-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md font-telemetry">
            {vehicle.category}
          </span>
        </div>

        {/* Saved Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(vehicle.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-[#0E1424]/90 hover:bg-[#1A2338] border border-amber-500/30 text-slate-300 hover:text-white transition-colors z-10 backdrop-blur-md"
          title="Save vehicle"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-400 fill-rose-400' : ''}`} />
        </button>

        {/* Country Availability Tag */}
        {vehicle.popularIn && vehicle.popularIn.length > 0 && (
          <div className="absolute top-11 left-3 flex items-center gap-1 text-[10px] font-semibold bg-[#0A0E18]/90 text-slate-300 border border-amber-500/20 px-2 py-0.5 rounded-md backdrop-blur-md z-10 font-telemetry">
            <Globe2 className="w-3 h-3 text-amber-400" />
            <span>{vehicle.popularIn.slice(0, 3).join(', ')}</span>
          </div>
        )}

        {/* Urgent Live Viewers & Stock Badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-medium z-10 font-telemetry">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0A0E18]/90 text-slate-200 border border-slate-700/80 backdrop-blur-md">
            <Eye className="w-3.5 h-3.5 text-cyan-300" />
            <span>{vehicle.liveViewersCount} viewing</span>
          </span>

          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#141C2D]/95 text-amber-300 border border-amber-500/40 backdrop-blur-md font-bold">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{vehicle.stockCount} Available</span>
          </span>
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          <div className="flex justify-between items-start gap-2">
            <div>
              <span className="text-[11px] text-amber-400/90 font-bold tracking-widest uppercase font-telemetry">
                {vehicle.year} • {vehicle.make}
              </span>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors font-display">
                {vehicle.name}
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed font-normal">
            {vehicle.description}
          </p>
        </div>

        {/* Quick Specs Grid */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#090C16] border border-amber-500/20 text-[11px] font-telemetry">
          <div className="flex items-center gap-1.5 text-slate-200">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span><strong className="text-white">{vehicle.specs.horsepower}</strong> HP</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-200">
            <Gauge className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
            <span>0-60: <strong className="text-white">{vehicle.specs.acceleration0to60}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300 col-span-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate" title={vehicle.governmentSpecs.emissionsGrade}>
              Govt: {vehicle.governmentSpecs.emissionsGrade}
            </span>
          </div>
        </div>

        {/* Service Options Tab Bar (Buy / Rent / Lease) */}
        <div className="bg-[#080B13] p-1 rounded-xl border border-slate-800 flex items-center text-xs font-semibold font-telemetry">
          <button
            onClick={() => setActiveIntentTab('BUY')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
              activeIntentTab === 'BUY'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Key className="w-3 h-3" />
            <span>Buy</span>
          </button>
          <button
            onClick={() => setActiveIntentTab('RENT')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
              activeIntentTab === 'RENT'
                ? 'bg-cyan-400 text-black font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3 h-3" />
            <span>Rent</span>
          </button>
          <button
            onClick={() => setActiveIntentTab('LEASE')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
              activeIntentTab === 'LEASE'
                ? 'bg-slate-200 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building className="w-3 h-3" />
            <span>Lease</span>
          </button>
        </div>

        {/* Dynamic Pricing Box Based on Active Intent Tab */}
        <div className="pt-2 border-t border-slate-800 space-y-3 font-telemetry">
          {activeIntentTab === 'BUY' && (
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] text-amber-400 uppercase tracking-wider block font-bold">
                  Purchase Price
                </span>
                <div className="flex flex-col">
                  {currencyMode === 'DUAL' ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-amber-300">{priceUSD}</span>
                      <span className="text-sm font-bold text-slate-300">{priceGBP}</span>
                    </div>
                  ) : currencyMode === 'USD' ? (
                    <span className="text-xl font-black text-amber-300">{priceUSD}</span>
                  ) : (
                    <span className="text-xl font-black text-amber-300">{priceGBP}</span>
                  )}
                  {vehicle.originalPrice && (
                    <span className="text-[10px] text-slate-500 line-through">
                      was {formatUSD(vehicle.originalPrice)} / {formatGBP(vehicle.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-cyan-300 font-bold block">
                  Financing From
                </span>
                <span className="text-xs font-bold text-slate-100 block">
                  {formatUSD(vehicle.monthlyFinancing)}/mo
                </span>
                <span className="text-[10px] text-slate-400">
                  {formatGBP(vehicle.monthlyFinancing)}/mo
                </span>
              </div>
            </div>
          )}

          {activeIntentTab === 'RENT' && (
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] text-cyan-300 uppercase tracking-wider block font-bold">
                  Daily Rental Rate
                </span>
                <div className="flex flex-col">
                  {currencyMode === 'DUAL' ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-cyan-300">{rentUSD}</span>
                      <span className="text-sm font-bold text-slate-300">{rentGBP}</span>
                    </div>
                  ) : currencyMode === 'USD' ? (
                    <span className="text-xl font-black text-cyan-300">{rentUSD}</span>
                  ) : (
                    <span className="text-xl font-black text-cyan-300">{rentGBP}</span>
                  )}
                  <span className="text-[10px] text-slate-400">Includes Full Insurance & Unlimited Miles</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-medium">Weekly Rate</span>
                <span className="text-xs font-bold text-slate-100 block">
                  {formatUSD(dailyRentUSD * 6)}/wk
                </span>
                <span className="text-[10px] text-slate-400">
                  {formatGBP(dailyRentUSD * 6)}/wk
                </span>
              </div>
            </div>
          )}

          {activeIntentTab === 'LEASE' && (
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] text-slate-300 uppercase tracking-wider block font-bold">
                  Monthly Lease (24-36 Mo)
                </span>
                <div className="flex flex-col">
                  {currencyMode === 'DUAL' ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-white">{leaseUSD}</span>
                      <span className="text-sm font-bold text-slate-300">{leaseGBP}</span>
                    </div>
                  ) : currencyMode === 'USD' ? (
                    <span className="text-xl font-black text-white">{leaseUSD}</span>
                  ) : (
                    <span className="text-xl font-black text-white">{leaseGBP}</span>
                  )}
                  <span className="text-[10px] text-emerald-400">$0 Down & Tax Deductible</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-medium">Term Options</span>
                <span className="text-xs font-bold text-slate-100">12, 24, 36 & 48 Mo.</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onQuickView(vehicle)}
                className="px-3 py-2.5 rounded-xl bg-[#141A2D] hover:bg-[#1D2540] text-slate-200 border border-slate-700 hover:border-amber-400/40 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Full Telemetry</span>
              </button>

              <button
                onClick={() => onBuyReserve(vehicle, activeIntentTab)}
                className="px-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-xs transition-all shadow-md flex items-center justify-center gap-1 hover:scale-105"
              >
                <span>
                  {activeIntentTab === 'BUY' ? 'Acquire' : activeIntentTab === 'RENT' ? 'Book Rental' : 'Lease Plan'}
                </span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>

            <a
              href={DEALER_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-[#0B1511] hover:bg-[#12241C] border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 hover:text-white text-[11px] font-bold transition-all flex items-center justify-center gap-2 group/wa shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover/wa:scale-110 transition-transform" />
              <span>WhatsApp Concierge regarding this {vehicle.make}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};


