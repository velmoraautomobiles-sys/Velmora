import React from 'react';
import { Shield, Sparkles, Truck, Award, Zap, Car, Bike, Key, Calendar, Globe2, ArrowRight, MessageCircle, DollarSign, Gauge, Flame, Mail } from 'lucide-react';
import { CurrencyMode } from '../types';
import { DEALER_WHATSAPP_LINK, DEALER_EMAIL, getDealerMailtoLink } from '../utils/whatsapp';

interface HeroProps {
  onOpenQuiz: () => void;
  onOpenAddVehicle: () => void;
  onOpenSellModal: () => void;
  onExploreClick: () => void;
  currencyMode: CurrencyMode;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuiz, onOpenAddVehicle, onOpenSellModal, onExploreClick }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#080B12] via-[#0E1320] to-[#07090F] border-b border-amber-500/20 text-slate-100 py-12 lg:py-16 carbon-pattern">
      {/* High-Performance Atelier Ambient Halos */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.07] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 px-3.5 py-1.5 rounded-full bg-[#121726]/90 border border-amber-500/30 text-amber-200 text-xs font-semibold shadow-lg backdrop-blur-md font-telemetry">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <Globe2 className="w-3.5 h-3.5 text-amber-400" />
              <span>GLOBAL DEALERSHIP: US • UK • CA • AU • MONACO • DE • SA</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
              Buy, Sell, Rent & Lease <br className="hidden sm:block" />
              <span className="gold-gradient-text">
                Supercars, Bikes, Saloons & Heavy Haulers.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Velmora Automobiles is an international automotive brokerage and premier showroom offering certified acquisitions, daily/weekly luxury rentals, bespoke corporate leasing, and <strong className="text-emerald-300 font-bold">direct vehicle buyouts from private owners</strong> with same-day wire settlement across hypercars, executive sedans, superbikes, and commercial haulers. Complete with multi-country homologation and transparent pricing in <strong className="text-amber-300 font-bold">USD ($) and GBP (£)</strong>.
            </p>

            {/* Service Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 font-telemetry">
              <button
                onClick={onOpenSellModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 text-xs font-bold shadow-md transition-all hover:scale-105"
              >
                <DollarSign className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                <span>We Buy Cars (Instant Cash / Wire)</span>
              </button>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111726] border border-amber-500/20 text-slate-200 text-xs font-semibold shadow-sm">
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>Direct Purchase & Title</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111726] border border-cyan-500/20 text-slate-200 text-xs font-semibold shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                <span>Daily & Weekly Rental</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111726] border border-slate-700 text-slate-200 text-xs font-semibold shadow-sm">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>12-48 Mo. Bespoke Lease</span>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-500 text-black font-black text-sm tracking-wide transition-all shadow-xl shadow-amber-500/20 hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Explore Full Showroom</span>
                <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
              </button>

              <button
                onClick={onOpenSellModal}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 hover:text-white border border-emerald-500/50 hover:border-emerald-400 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 hover:scale-105"
              >
                <DollarSign className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                <span>Sell Your Car to Us</span>
              </button>

              <button
                onClick={onOpenQuiz}
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-[#121726] hover:bg-[#1A2238] text-slate-200 hover:text-white border border-cyan-500/30 hover:border-cyan-400 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Matchmaker AI</span>
              </button>

              <a
                href={DEALER_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-[#0F2218] hover:bg-[#163324] text-emerald-200 hover:text-white border border-emerald-500/50 hover:border-emerald-400 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`mailto:${DEALER_EMAIL}?subject=${encodeURIComponent('Inquiry - Velmora Automobiles Dealership')}`}
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-[#0F1726] hover:bg-[#17253C] text-cyan-200 hover:text-white border border-cyan-500/50 hover:border-cyan-400 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105"
                title={`Email: ${DEALER_EMAIL}`}
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Email Desk</span>
              </a>

              <button
                onClick={onOpenAddVehicle}
                className="w-full sm:w-auto px-3.5 py-3.5 rounded-xl bg-[#0F1420] hover:bg-[#172033] text-slate-300 border border-slate-700 hover:border-amber-400/40 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>+ Consign</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-left">
              <div className="flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">7-Country Homologation</h4>
                  <p className="text-[11px] text-slate-400">US, UK, CA, AU, Monaco, DE & SA</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Global Enclosed Transit</h4>
                  <p className="text-[11px] text-slate-400">Insured sea/air/trailer freight</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Dual Currency Escrow</h4>
                  <p className="text-[11px] text-slate-400">USD ($) & GBP (£) accounts</p>
                </div>
              </div>
            </div>

          </div>

          {/* Featured Visual Spotlight */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-[#0D121F] group p-1.5">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80"
                  alt="Porsche 911 GT3 RS"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/40 to-transparent" />
                
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-black font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-lg font-telemetry">
                    ATELIER SPOTLIGHT
                  </span>
                  <span className="bg-[#0D121F]/90 text-amber-200 border border-amber-500/30 font-bold text-xs px-2.5 py-1 rounded-full backdrop-blur-md font-telemetry">
                    Buy • Rent • Lease
                  </span>
                </div>

                {/* Bottom Card Content */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0E1424]/95 border border-amber-500/30 backdrop-blur-md shadow-2xl">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider font-telemetry">Homologated: US, UK, DE, MC</span>
                      <h3 className="text-lg font-bold text-white font-display">Porsche 911 GT3 RS</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5 font-telemetry">
                        <span className="text-amber-300 font-bold">518 HP</span>
                        <span>•</span>
                        <span className="text-cyan-300">0-60: 3.0s</span>
                        <span>•</span>
                        <span>Rent: $2,800/d</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-telemetry font-bold">OUTRIGHT PRICE</span>
                      <span className="text-xl font-black text-amber-300 block font-telemetry">$345,000</span>
                      <span className="text-xs font-semibold text-slate-300 font-telemetry">£272,550</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars Category Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Pillar 1: Supercars */}
          <div 
            onClick={onExploreClick}
            className="p-5 rounded-2xl bg-[#0E1322] border border-amber-500/20 hover:border-amber-400 hover:bg-[#141A2D] cursor-pointer transition-all hover:scale-[1.02] group shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/[0.04] rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-3 rounded-xl bg-[#172036] text-amber-400 group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-amber-500 group-hover:text-black transition-all border border-amber-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400/80 uppercase tracking-widest font-telemetry">10 ALLOCATIONS</span>
                <h3 className="text-base font-bold text-white font-display">Supercars</h3>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Ferrari, McLaren, Lamborghini, Bugatti, Porsche & Aston Martin. Buy, rent or lease.
            </p>
          </div>

          {/* Pillar 2: Normal Vehicles */}
          <div 
            onClick={onExploreClick}
            className="p-5 rounded-2xl bg-[#0E1322] border border-cyan-500/20 hover:border-cyan-400 hover:bg-[#141A2D] cursor-pointer transition-all hover:scale-[1.02] group shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/[0.04] rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-3 rounded-xl bg-[#172036] text-cyan-300 group-hover:bg-cyan-400 group-hover:text-black transition-all border border-cyan-500/30">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-cyan-400/80 uppercase tracking-widest font-telemetry">10 VEHICLES</span>
                <h3 className="text-base font-bold text-white font-display">Executive & Daily</h3>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              BMW, Mercedes, Audi, Toyota, Honda, Range Rover & Tesla. Luxury sedans and daily SUVs.
            </p>
          </div>

          {/* Pillar 3: Bikes */}
          <div 
            onClick={onExploreClick}
            className="p-5 rounded-2xl bg-[#0E1322] border border-rose-500/20 hover:border-rose-400 hover:bg-[#141A2D] cursor-pointer transition-all hover:scale-[1.02] group shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/[0.04] rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-3 rounded-xl bg-[#172036] text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all border border-rose-500/30">
                <Bike className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-rose-400/80 uppercase tracking-widest font-telemetry">10 BIKES</span>
                <h3 className="text-base font-bold text-white font-display">Superbikes</h3>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Ducati Panigale, Kawasaki Ninja H2, BMW S1000RR, Yamaha R1, Harley Road Glide.
            </p>
          </div>

          {/* Pillar 4: Trucks */}
          <div 
            onClick={onExploreClick}
            className="p-5 rounded-2xl bg-[#0E1322] border border-emerald-500/20 hover:border-emerald-400 hover:bg-[#141A2D] cursor-pointer transition-all hover:scale-[1.02] group shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/[0.04] rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-3 rounded-xl bg-[#172036] text-emerald-400 group-hover:bg-emerald-400 group-hover:text-black transition-all border border-emerald-500/30">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest font-telemetry">6 HAULERS</span>
                <h3 className="text-base font-bold text-white font-display">Heavy Rigs</h3>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Ford F-450 Super Duty, Peterbilt 579, Freightliner Cascadia, Ram TRX, Kenworth W990.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};



