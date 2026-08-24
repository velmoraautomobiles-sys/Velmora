import React, { useState } from 'react';
import { 
  Car, 
  Bike, 
  Truck, 
  Zap, 
  Search, 
  PlusCircle, 
  Sparkles, 
  ShieldCheck, 
  Calculator, 
  Menu, 
  X, 
  Heart, 
  Globe2, 
  Key, 
  CalendarCheck,
  MessageCircle,
  DollarSign,
  Flame,
  Layers,
  Mail
} from 'lucide-react';
import { VehicleCategory, CurrencyMode } from '../types';
import { DEALER_WHATSAPP_LINK, DEALER_EMAIL } from '../utils/whatsapp';

interface NavbarProps {
  categories: VehicleCategory[];
  activeCategory: VehicleCategory;
  onSelectCategory: (cat: VehicleCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAddVehicle: () => void;
  onOpenSellModal: () => void;
  onOpenQuiz: () => void;
  onOpenCalc: () => void;
  savedCount: number;
  onOpenSaved: () => void;
  totalInventoryCount: number;
  currencyMode: CurrencyMode;
  onToggleCurrency: (mode: CurrencyMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenAddVehicle,
  onOpenSellModal,
  onOpenQuiz,
  onOpenCalc,
  savedCount,
  onOpenSaved,
  totalInventoryCount,
  currencyMode,
  onToggleCurrency
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getCategoryIcon = (cat: VehicleCategory) => {
    switch (cat) {
      case 'Supercars':
      case 'Supercar':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'Normal Vehicles':
      case 'Cars':
      case 'Luxury Sedan':
        return <Car className="w-3.5 h-3.5" />;
      case 'Bikes':
      case 'Motorcycle / Bike':
        return <Bike className="w-3.5 h-3.5" />;
      case 'Trucks':
      case 'SUV & Truck':
        return <Truck className="w-3.5 h-3.5" />;
      case 'Electric & Hybrid':
        return <Zap className="w-3.5 h-3.5" />;
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#080B12]/95 backdrop-blur-xl border-b border-amber-500/20 text-slate-100 shadow-2xl transition-all">
      {/* Top Banner Announcement */}
      <div className="bg-gradient-to-r from-[#0C0F18] via-[#1A2234] to-[#0C0F18] border-b border-white/[0.06] text-slate-200 text-xs py-1.5 px-4 text-center tracking-wide flex flex-wrap items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-black px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm font-telemetry">
            <Globe2 className="w-3 h-3 text-black" />
            7-NATION ATELIER
          </span>
          <span className="text-[11px] text-slate-300 hidden md:inline font-medium">
            US • UK • Canada • Australia • Monaco • Germany • Saudi Arabia
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-medium text-slate-200 text-[11px] hidden sm:inline">
            <strong className="text-amber-300 font-bold">Buy, Sell, Rent & Lease</strong> • Dual Currency Rates ($ USD / £ GBP)
          </span>
          <button
            onClick={onOpenSellModal}
            className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold shadow-sm transition-all hover:scale-105"
          >
            <DollarSign className="w-3 h-3 text-emerald-400 stroke-[2.5]" /> 
            <span>We Buy Cars — Instant Wire Offer →</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3.5 group cursor-pointer" onClick={() => onSelectCategory('All' as VehicleCategory)}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-cyan-400 to-amber-500 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition duration-500" />
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#121724] via-[#0A0D15] to-[#141A28] flex items-center justify-center border border-amber-400/50 shadow-xl">
                <Car className="w-6 h-6 text-amber-400 stroke-[2.2] group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-wider text-white font-display">
                  VELMORA <span className="gold-gradient-text">AUTOMOBILES</span>
                </span>
                <span className="text-[9px] font-black px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full uppercase tracking-widest font-telemetry">
                  ATELIER
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Hypercars • Saloons • Superbikes • Haulers</span>
                <span className="text-amber-400/80 font-telemetry font-bold">({totalInventoryCount} Active Vault)</span>
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/70" />
            <input
              type="text"
              placeholder="Search Ferrari, Bugatti, Ducati, Phantom, Kenworth..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#0E131E] border border-slate-700/80 focus:border-amber-400 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all shadow-inner font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Header Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Currency Switcher */}
            <div className="flex items-center bg-[#0D111A] p-1 rounded-xl border border-amber-500/30 text-xs font-bold shadow-lg font-telemetry">
              <button
                onClick={() => onToggleCurrency('DUAL')}
                className={`px-2.5 py-1 rounded-lg transition-all text-[11px] ${
                  currencyMode === 'DUAL' 
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-md font-black' 
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Show both Dollar ($) and Pound (£) prices"
              >
                Dual $/£
              </button>
              <button
                onClick={() => onToggleCurrency('USD')}
                className={`px-2 py-1 rounded-lg transition-all text-[11px] ${
                  currencyMode === 'USD' 
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-md font-black' 
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Show USD ($) prices"
              >
                $ USD
              </button>
              <button
                onClick={() => onToggleCurrency('GBP')}
                className={`px-2 py-1 rounded-lg transition-all text-[11px] ${
                  currencyMode === 'GBP' 
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-md font-black' 
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Show GBP (£) prices"
              >
                £ GBP
              </button>
            </div>

            {/* We Buy Cars Button */}
            <button
              onClick={onOpenSellModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/50 text-emerald-300 hover:text-emerald-100 text-xs font-bold shadow-md shadow-emerald-950/40 transition-all hover:scale-105"
              title="We buy cars directly from owners"
            >
              <DollarSign className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span>Sell Your Car</span>
            </button>

            {/* Vehicle Matchmaker Button */}
            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#131825] border border-cyan-500/30 hover:border-cyan-400 text-cyan-200 hover:text-white text-xs font-semibold shadow-sm transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Matchmaker</span>
            </button>

            {/* Calculator Button */}
            <button
              onClick={onOpenCalc}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#131825] border border-slate-700 hover:border-amber-400/50 text-slate-300 hover:text-white text-xs font-medium transition-all"
              title="Finance, Rent & Lease Calculator"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>Calc</span>
            </button>

            {/* Direct WhatsApp Dealer Link */}
            <a
              href={DEALER_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#101F18] hover:bg-[#162C22] border border-emerald-500/40 hover:border-emerald-400 text-emerald-200 hover:text-white text-xs font-bold transition-all shadow-md group hover:scale-105"
              title="Direct Private WhatsApp Concierge"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Direct Email Dealer Link */}
            <a
              href={`mailto:${DEALER_EMAIL}?subject=${encodeURIComponent('Inquiry - Velmora Automobiles Dealership')}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#121927] hover:bg-[#182338] border border-cyan-500/40 hover:border-cyan-400 text-cyan-200 hover:text-white text-xs font-bold transition-all shadow-md group hover:scale-105"
              title={`Email Dealer Concierge (${DEALER_EMAIL})`}
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Email</span>
            </a>

            {/* Consign Vehicle / Inventory Management */}
            <button
              onClick={onOpenAddVehicle}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-black font-black text-xs transition-all shadow-lg shadow-amber-500/20 hover:scale-105"
              title="Consign or List an Automobile"
            >
              <PlusCircle className="w-4 h-4 text-black stroke-[2.5]" />
              <span>Consign</span>
            </button>

            {/* Saved Wishlist */}
            <button
              onClick={onOpenSaved}
              className="relative p-2 rounded-xl bg-[#131825] border border-slate-700 hover:border-rose-400/50 text-slate-300 hover:text-white transition-all"
              title="Saved Vehicles"
            >
              <Heart className={`w-4 h-4 ${savedCount > 0 ? 'text-rose-400 fill-rose-400' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-full text-[9px] font-black flex items-center justify-center border-2 border-[#080B12]">
                  {savedCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenSellModal}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-1"
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sell Car</span>
            </button>
            <button
              onClick={() => onToggleCurrency(currencyMode === 'USD' ? 'GBP' : currencyMode === 'GBP' ? 'DUAL' : 'USD')}
              className="px-2 py-1.5 rounded bg-[#131825] border border-amber-500/40 text-[11px] font-bold text-amber-300 font-telemetry"
            >
              {currencyMode === 'DUAL' ? '$/£' : currencyMode === 'USD' ? '$' : '£'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#131825] text-slate-300 border border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-between border-t border-slate-800/80 py-2.5 overflow-x-auto no-scrollbar gap-2">
          <div className="flex items-center gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 font-telemetry tracking-wide ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-black shadow-lg shadow-amber-500/25 scale-[1.03]'
                    : 'bg-[#101522] text-slate-300 hover:bg-[#182032] hover:text-white border border-slate-800 hover:border-amber-500/40'
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4 text-xs text-slate-400 font-telemetry">
            <button 
              onClick={onOpenSellModal}
              className="flex items-center gap-1 text-emerald-300 font-bold hover:text-emerald-200 transition-colors"
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
              <span>We Buy Cars (Instant Wire)</span>
            </button>
            <span className="flex items-center gap-1 text-cyan-300 font-semibold">
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sale • Daily Rent • Long Lease</span>
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>7-Country Homologated</span>
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0D15] border-b border-amber-500/20 p-4 space-y-3 shadow-2xl">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search make, model or specs..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#121622] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100"
            />
          </div>
          
          <button
            onClick={() => { onOpenSellModal(); setMobileMenuOpen(false); }}
            className="w-full py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 shadow-md"
          >
            <DollarSign className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
            <span>We Buy Vehicles — Sell Your Car to Us</span>
          </button>

          <div className="grid grid-cols-3 gap-2 pt-1 text-center font-telemetry">
            <button
              onClick={() => { onToggleCurrency('DUAL'); setMobileMenuOpen(false); }}
              className={`py-2 rounded-lg text-xs font-bold border ${currencyMode === 'DUAL' ? 'bg-amber-400 text-black border-amber-400' : 'bg-[#121622] text-slate-300 border-slate-700'}`}
            >
              Dual ($/£)
            </button>
            <button
              onClick={() => { onToggleCurrency('USD'); setMobileMenuOpen(false); }}
              className={`py-2 rounded-lg text-xs font-bold border ${currencyMode === 'USD' ? 'bg-amber-400 text-black border-amber-400' : 'bg-[#121622] text-slate-300 border-slate-700'}`}
            >
              $ USD Only
            </button>
            <button
              onClick={() => { onToggleCurrency('GBP'); setMobileMenuOpen(false); }}
              className={`py-2 rounded-lg text-xs font-bold border ${currencyMode === 'GBP' ? 'bg-amber-400 text-black border-amber-400' : 'bg-[#121622] text-slate-300 border-slate-700'}`}
            >
              £ GBP Only
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { onOpenQuiz(); setMobileMenuOpen(false); }}
              className="py-2.5 rounded-lg bg-[#121622] text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Matchmaker</span>
            </button>

            <button
              onClick={() => { onOpenCalc(); setMobileMenuOpen(false); }}
              className="py-2.5 rounded-lg bg-[#121622] text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>Calculator</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => { onOpenAddVehicle(); setMobileMenuOpen(false); }}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-black text-center shadow-lg"
            >
              + Consign Vehicle
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              href={DEALER_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#0F2218] border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Concierge</span>
            </a>
            <a
              href={`mailto:${DEALER_EMAIL}?subject=${encodeURIComponent('Inquiry - Velmora Automobiles Dealership')}`}
              className="w-full py-2.5 rounded-xl bg-[#0F1726] border border-cyan-500/50 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Email: {DEALER_EMAIL}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};




