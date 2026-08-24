import React, { useEffect, useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, Award, Truck, Lock, Building2 } from 'lucide-react';

export const ReviewsAndUrgency: React.FC = () => {
  const [tickerIndex, setTickerIndex] = useState(0);

  const tickerItems = [
    'Julian M. (Beverly Hills, CA) — Allocated: Porsche 911 GT3 RS with Platinum Warranty & Enclosed Freight',
    'Tariq A. (Riyadh, Saudi Arabia) — Dispatched: Ferrari 296 GTB via VIP Air Cargo',
    'Klaus W. (Munich, Germany) — Delivered: BMW M 1000 RR Superbike (TÜV Certified)',
    'David R. (Mayfair, London) — Completed: Mercedes-AMG G 63 Grand Edition (UK VCA Cleared)'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerItems.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-[#0C0E14] border-t border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Live Showroom Activity Ticker */}
        <div className="p-3.5 rounded-2xl bg-[#141824] border border-slate-700 flex items-center justify-between text-xs overflow-hidden shadow-lg">
          <div className="flex items-center gap-2 text-white font-bold shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>LIVE DEALERSHIP ACTIVITY:</span>
          </div>
          <div className="truncate text-slate-300 font-medium px-3 animate-fade-in">
            {tickerItems[tickerIndex]}
          </div>
          <div className="hidden sm:block text-[10px] text-cyan-300 font-mono shrink-0">
            Real-Time Verified Escrow
          </div>
        </div>

        {/* Client Reviews Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1 text-white text-sm font-bold bg-[#181E2D] border border-slate-700 px-3.5 py-1 rounded-full shadow-sm">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1 text-white font-extrabold">4.97 / 5.0 Rating</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
              Trusted by Collectors & Enthusiasts Worldwide
            </h2>
            <p className="text-xs text-slate-400">Over 420 luxury automobiles & bikes delivered with zero defects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Harrison Vance',
                location: 'Munich, Germany',
                car: 'Purchased Porsche 911 GT3 RS',
                review: 'The TÜV homologation specs and import duty docs were completely transparent. Enclosed trailer delivery arrived with 0 miles added.',
                stars: 5
              },
              {
                name: 'Sheikh Faisal Al-Saud',
                location: 'Riyadh, Saudi Arabia',
                car: 'Purchased Lamborghini Revuelto & Ducati',
                review: 'Added the 5-Year Platinum Warranty and Escrow protection. White-glove air cargo handling directly to our private garage in Riyadh.',
                stars: 5
              },
              {
                name: 'Dr. Evelyn Thorne',
                location: 'London / Monaco',
                car: 'Purchased Ferrari SF90 & McLaren 750S',
                review: 'Dual USD ($) & GBP (£) escrow settlement was instantaneous. Verified emissions compliance and unmatched concierge service.',
                stars: 5
              }
            ].map((r, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#141824] border border-slate-800 space-y-3 shadow-lg hover:border-slate-700 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-white">{r.name}</h4>
                    <span className="text-[11px] text-slate-400">{r.location}</span>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(r.stars)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <span className="text-[11px] font-bold text-cyan-200 block">{r.car}</span>
                <p className="text-xs text-slate-400 leading-relaxed italic">"{r.review}"</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
