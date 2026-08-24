import React from 'react';
import { Car, PhoneCall, ShieldCheck, Mail, MapPin, Award, MessageCircle, ArrowUpRight, DollarSign } from 'lucide-react';
import { DEALER_WHATSAPP_LINK, DEALER_EMAIL } from '../utils/whatsapp';

interface FooterProps {
  onOpenSellModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSellModal }) => {
  return (
    <footer className="bg-[#0C0E14] border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center text-slate-950 font-black text-sm shadow-md font-telemetry">
                VA
              </div>
              <span className="font-display font-extrabold text-lg text-white">VELMORA AUTOMOBILES</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Certified luxury automotive & superbike dealership showroom. We specialize in vehicle sales, daily luxury rentals, long-term corporate leasing, and <strong className="text-emerald-300">direct cash buyouts for private car owners willing to sell</strong>.
            </p>
            <div className="pt-1 flex flex-col gap-2">
              {onOpenSellModal && (
                <button
                  onClick={onOpenSellModal}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-200 font-bold transition-all text-xs shadow-md"
                >
                  <DollarSign className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                  <span>Sell Your Car (Get Instant Cash Offer)</span>
                </button>
              )}
              <a
                href={DEALER_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#181E2D] hover:bg-[#222A3E] border border-slate-700 hover:border-emerald-400/50 text-white font-bold transition-all text-xs shadow-md"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp (Direct Dealer)</span>
              </a>
              <a
                href={`mailto:${DEALER_EMAIL}?subject=${encodeURIComponent('Inquiry - Velmora Automobiles Showroom')}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#131C2E] hover:bg-[#1A263E] border border-cyan-500/40 hover:border-cyan-400 text-cyan-200 font-bold transition-all text-xs shadow-md"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Email: {DEALER_EMAIL}</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 text-sm">Dealership Showroom</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Sports Cars, Supercars & GTs</li>
              <li>WorldSBK Superbikes & Cruisers</li>
              <li>Heavy-Duty Commercial & Tow Trucks</li>
              <li>High-Performance 4x4 Off-Road Pickups</li>
              <li>Next-Gen Electric Cars & Supertrucks</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 text-sm">We Buy Private Vehicles</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="text-slate-300 font-semibold flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Instant Wire & Cash Offers</span>
              </li>
              <li>• Direct purchase from private car owners</li>
              <li>• We payoff existing bank loans & leases</li>
              <li>• Free insured enclosed doorstep transport</li>
              <li>• US, UK, CA, AU, Monaco, DE & SA Pickup</li>
              <li>• Fast appraisals on luxury cars & superbikes</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white mb-1 text-sm">Dealer Concierge Hotline</h4>
            
            {/* WhatsApp Link Card */}
            <a
              href={DEALER_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-[#141824] border border-slate-700 hover:border-slate-500 block transition-all group shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-emerald-300 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  WhatsApp Online 24/7
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div className="text-white font-bold text-sm mt-1 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Message Dealer Directly</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Instant response on buying your car, lease terms & sales</p>
            </a>

            {/* Email Link Card */}
            <a
              href={`mailto:${DEALER_EMAIL}?subject=${encodeURIComponent('Inquiry - Velmora Automobiles Dealership')}`}
              className="p-3.5 rounded-2xl bg-[#0F1726] border border-cyan-500/40 hover:border-cyan-400 block transition-all group shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-cyan-300 uppercase tracking-widest flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-cyan-400" />
                  Official Dealer Inbox
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div className="text-white font-bold text-xs mt-1 flex items-center gap-2 truncate">
                <span className="text-cyan-300 select-all">{DEALER_EMAIL}</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Direct inquiries, invoice dispatch & private owner submissions</p>
            </a>

            <div className="flex items-center gap-2 text-slate-300 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-cyan-300" />
              <span>100% Secure SSL & Escrow Encryption</span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 VELMORA AUTOMOBILES Dealership. All Rights Reserved. Compliant with US DOT, EPA, UK VCA, TÜV (Germany), and SASO (Saudi Arabia) Standards.</span>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${DEALER_EMAIL}?subject=${encodeURIComponent('Inquiry - Velmora Automobiles Dealership')}`}
              className="text-cyan-300 hover:text-white hover:underline flex items-center gap-1.5 font-semibold"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{DEALER_EMAIL}</span>
            </a>
            <a
              href={DEALER_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white hover:underline flex items-center gap-1 font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dealer WhatsApp Desk</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};



