import React from 'react';
import { DollarSign, ShieldCheck, Truck, FileCheck, ArrowRight, MessageCircle, Sparkles, KeyRound, Mail } from 'lucide-react';
import { DEALER_WHATSAPP_LINK, DEALER_EMAIL, getDealerMailtoLink } from '../utils/whatsapp';

interface WeBuyCarsBannerProps {
  onOpenSellModal: () => void;
}

export const WeBuyCarsBanner: React.FC<WeBuyCarsBannerProps> = ({ onOpenSellModal }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 w-full">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B1412] via-[#0E1B17] to-[#0A1218] border border-emerald-500/40 shadow-2xl p-6 sm:p-8 lg:p-10 text-slate-100 carbon-pattern">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/[0.08] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/[0.06] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Statement */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10291F] border border-emerald-500/50 text-emerald-300 text-xs font-bold shadow-md font-telemetry">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <DollarSign className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
              <span>PRIVATE OWNER DIRECT ACQUISITION ESCROW</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display leading-tight">
              Looking to Sell Your Vehicle? <br className="hidden sm:block" />
              <span className="emerald-gradient-text">
                We Buy Directly from Owners Worldwide.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Whether you own a pristine exotic supercar, an executive sedan, a track-ready superbike, or a commercial heavy hauler, <strong className="text-white font-bold">Velmora Automobiles purchases vehicles directly from private owners</strong>. We provide instant competitive appraisals, same-day bank wire payouts, full loan/lease payoff handling, and complimentary enclosed doorstep transport worldwide.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onOpenSellModal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-950/50 hover:scale-105 flex items-center justify-center gap-2 font-telemetry"
              >
                <KeyRound className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                <span>Sell Your Car to Us (Instant Offer)</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <a
                href={`${DEALER_WHATSAPP_LINK}?text=${encodeURIComponent("Hello Velmora Automobiles Dealership, I am an owner looking to sell my vehicle. Please give me an instant buyout valuation.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-[#0E261B] hover:bg-[#143626] border border-emerald-500/50 hover:border-emerald-400 text-emerald-200 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 font-telemetry"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Desk</span>
              </a>

              <a
                href={getDealerMailtoLink(
                  "Private Vehicle Sale / Buyout Inquiry",
                  "Hello Velmora Automobiles Acquisition Desk,\n\nI am a vehicle owner looking to sell my car/bike/truck directly to the dealership.\n\nPlease find my vehicle details below:\n- Make/Model:\n- Year:\n- Mileage:\n- Condition:\n- Expected Asking Price:\n- Location:\n\nPlease contact me back with an instant valuation and buyout offer.\n\nThank you."
                )}
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-[#0D1826] hover:bg-[#142338] border border-cyan-500/50 hover:border-cyan-400 text-cyan-200 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 font-telemetry"
                title={`Email: ${DEALER_EMAIL}`}
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Email: {DEALER_EMAIL}</span>
              </a>
            </div>
          </div>

          {/* 4 Pillars of Owner Buyout */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <div className="p-4 rounded-2xl bg-[#0D1B17]/90 border border-emerald-500/30 shadow-md space-y-1.5 hover:border-emerald-400 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#142C21] text-emerald-300 flex items-center justify-center border border-emerald-500/40">
                <DollarSign className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h4 className="text-xs font-bold text-white font-telemetry">Same-Day Wire Payout</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Direct wire transfer or cashier check issued immediately upon digital inspection.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D1B17]/90 border border-cyan-500/30 shadow-md space-y-1.5 hover:border-cyan-400 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#132733] text-cyan-300 flex items-center justify-center border border-cyan-500/40">
                <FileCheck className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white font-telemetry">Loan & Lease Payoffs</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                We handle title transfer and directly pay off your bank finance or lease balance.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D1B17]/90 border border-amber-500/30 shadow-md space-y-1.5 hover:border-amber-400 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#262013] text-amber-400 flex items-center justify-center border border-amber-500/40">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white font-telemetry">Doorstep Pickup</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Free fully insured enclosed trailer transport dispatched directly to your garage.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D1B17]/90 border border-emerald-500/30 shadow-md space-y-1.5 hover:border-emerald-400 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#142C21] text-emerald-300 flex items-center justify-center border border-emerald-500/40">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white font-telemetry">7-Country Coverage</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Acquiring vehicles in US, UK, Canada, Australia, Monaco, Germany & Saudi Arabia.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

