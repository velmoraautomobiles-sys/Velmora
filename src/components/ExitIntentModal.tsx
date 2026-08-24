import React, { useEffect, useState } from 'react';
import { X, Gift, Sparkles, Flame, ArrowRight, ShieldCheck } from 'lucide-react';
import { Vehicle } from '../types';

interface ExitIntentModalProps {
  onClaimVoucher: (discountAmount: number) => void;
  featuredVehicle: Vehicle | null;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({
  onClaimVoucher,
  featuredVehicle
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-lg bg-[#151821] border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden text-zinc-100 p-6 space-y-6 text-center animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#181C26] text-zinc-400 hover:text-white border border-zinc-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-white text-zinc-950 flex items-center justify-center mx-auto shadow-xl">
          <Sparkles className="w-8 h-8 stroke-[2.5] text-slate-950" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black text-cyan-200 uppercase tracking-widest bg-[#181E2D] px-3.5 py-1 rounded-full border border-cyan-500/30">
            Private Client Allocation Privilege
          </span>
          <h3 className="text-2xl font-black text-white font-serif">
            Unlock $2,500 / £1,975 Concierge Credit
          </h3>
          <p className="text-xs text-zinc-300 max-w-sm mx-auto">
            Reserve or inquire on any exotic supercar, luxury sedan, superbike, or commercial hauler today to receive an immediate <strong>$2,500 Acquisition Credit</strong> plus complimentary multi-stage ceramic detailing.
          </p>
        </div>

        {/* Promo Code Box */}
        <div className="p-4 rounded-2xl bg-[#0E1015] border border-zinc-800 space-y-2">
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">VIP Acquisition Code</span>
          <div className="font-mono text-xl font-black text-white tracking-wider">
            GLIDE2500-VIP
          </div>
          <p className="text-[11px] text-emerald-400 font-semibold">
            ✓ Automatically applied at reservation checkout • Fully Escrow Protected
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              setIsOpen(false);
              onClaimVoucher(2500);
            }}
            className="w-full py-4 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all"
          >
            <span>Apply Privilege & View Featured Allocation</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="text-xs text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            Continue browsing standard inventory
          </button>
        </div>

      </div>
    </div>
  );
};
