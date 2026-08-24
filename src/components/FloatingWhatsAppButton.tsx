import React, { useState } from 'react';
import { MessageCircle, X, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';
import { DEALER_WHATSAPP_LINK } from '../utils/whatsapp';

export const FloatingWhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
      
      {/* Quick Info Callout Popup */}
      {showTooltip && (
        <div className="relative max-w-xs p-3.5 rounded-2xl bg-[#151821] border border-zinc-700 text-zinc-100 shadow-2xl backdrop-blur-md animate-fade-in text-xs hidden sm:block">
          <button 
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss tooltip"
            className="absolute top-2 right-2 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <span className="font-extrabold text-white uppercase tracking-wider text-[10px]">
              Dealer VIP Concierge Active
            </span>
          </div>

          <p className="text-[11px] text-zinc-300 leading-relaxed">
            Need live video walkaround, custom financing, or instant rental/lease quote? Chat directly on WhatsApp.
          </p>

          <div className="mt-2 pt-2 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-[10px] text-zinc-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-zinc-300" />
              Direct Dealership Line
            </span>
            <a
              href={DEALER_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-black text-white hover:underline flex items-center gap-0.5"
            >
              <span>Chat Now</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Main WhatsApp Floating Action Button */}
      <a
        href={DEALER_WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#181C26] hover:bg-zinc-800 text-white font-extrabold text-xs tracking-wide shadow-2xl hover:scale-105 active:scale-95 transition-all border border-zinc-600 hover:border-zinc-400"
        title="Chat with Dealer on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 text-emerald-400 fill-emerald-400/20" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-zinc-950"></span>
        </div>
        
        <div className="text-left hidden sm:block">
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold leading-tight">
            Direct Dealer Chat
          </span>
          <span className="text-xs font-black text-white leading-tight">
            WhatsApp Online
          </span>
        </div>
      </a>

    </aside>
  );
};
