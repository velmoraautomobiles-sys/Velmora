import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, Trophy, Car, Bike, Truck, RefreshCw, Zap } from 'lucide-react';
import { Vehicle } from '../types';
import { formatUSD, formatGBP } from '../utils/currency';

interface CarMatchmakerQuizProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  onSelectVehicle: (v: Vehicle) => void;
}

export const CarMatchmakerQuiz: React.FC<CarMatchmakerQuizProps> = ({
  isOpen,
  onClose,
  vehicles,
  onSelectVehicle
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [drivingStyle, setDrivingStyle] = useState<'SUPERCAR' | 'NORMAL' | 'BIKE' | 'TRUCK'>('SUPERCAR');
  const [budget, setBudget] = useState<'ANY' | 'UNDER_100K' | '100K_300K' | 'OVER_300K'>('ANY');
  const [matchedVehicle, setMatchedVehicle] = useState<Vehicle | null>(null);

  const handleCalculateMatch = () => {
    let matches = vehicles.filter(v => {
      if (drivingStyle === 'SUPERCAR') return v.category === 'Supercars' || v.category === 'Supercar';
      if (drivingStyle === 'NORMAL') return v.category === 'Cars' || v.category === 'Luxury Sedan' || v.category === 'Electric & Hybrid';
      if (drivingStyle === 'BIKE') return v.category === 'Bikes' || v.category === 'Motorcycle / Bike';
      if (drivingStyle === 'TRUCK') return v.category === 'Trucks' || v.category === 'SUV & Truck';
      return true;
    });

    if (matches.length === 0) {
      matches = [...vehicles];
    }

    if (budget === 'UNDER_100K') {
      const budgetMatches = matches.filter(v => v.price <= 100000);
      if (budgetMatches.length > 0) matches = budgetMatches;
    } else if (budget === '100K_300K') {
      const budgetMatches = matches.filter(v => v.price > 100000 && v.price <= 300000);
      if (budgetMatches.length > 0) matches = budgetMatches;
    } else if (budget === 'OVER_300K') {
      const budgetMatches = matches.filter(v => v.price > 300000);
      if (budgetMatches.length > 0) matches = budgetMatches;
    }

    const best = matches[Math.floor(Math.random() * matches.length)] || vehicles[0];
    setMatchedVehicle(best);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-xl bg-[#151821] border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden text-zinc-100 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#0E1015] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-extrabold text-sm">
            <Sparkles className="w-5 h-5 text-cyan-300" />
            <span>Gear Glide Private Vehicle Matchmaker</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-[#181C26] border border-zinc-700 text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold font-serif text-white">Select Preferred Automotive Class</h3>
                <p className="text-xs text-zinc-400">Identify your primary vehicle category for purchase, daily rental, or long-term lease.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDrivingStyle('SUPERCAR')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    drivingStyle === 'SUPERCAR' ? 'border-white bg-[#181C26] text-white' : 'border-zinc-800 bg-[#0E1015] text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <Zap className="w-6 h-6 text-white mb-2" />
                  <h4 className="font-bold text-sm">Supercars & Hypercars</h4>
                  <p className="text-[11px] text-zinc-400">Ferrari, Lamborghini, McLaren, Porsche GT3, Aston Martin</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDrivingStyle('NORMAL')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    drivingStyle === 'NORMAL' ? 'border-white bg-[#181C26] text-white' : 'border-zinc-800 bg-[#0E1015] text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <Car className="w-6 h-6 text-zinc-200 mb-2" />
                  <h4 className="font-bold text-sm">Luxury Sedans & Saloons</h4>
                  <p className="text-[11px] text-zinc-400">Mercedes S-Class, BMW 7, Lucid Sapphire, Land Rover, Audi RS</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDrivingStyle('BIKE')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    drivingStyle === 'BIKE' ? 'border-white bg-[#181C26] text-white' : 'border-zinc-800 bg-[#0E1015] text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <Bike className="w-6 h-6 text-zinc-200 mb-2" />
                  <h4 className="font-bold text-sm">Superbikes & Tourers</h4>
                  <p className="text-[11px] text-zinc-400">Ducati Panigale V4, BMW M1000RR, Kawasaki H2R, Harley CVO</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDrivingStyle('TRUCK')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    drivingStyle === 'TRUCK' ? 'border-white bg-[#181C26] text-white' : 'border-zinc-800 bg-[#0E1015] text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <Truck className="w-6 h-6 text-zinc-200 mb-2" />
                  <h4 className="font-bold text-sm">Commercial & 4x4 Haulers</h4>
                  <p className="text-[11px] text-zinc-400">Ford Raptor R, RAM TRX, GMC Hummer EV, Peterbilt Heavy Duty</p>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-extrabold text-sm transition-all"
              >
                Proceed to Investment Range →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold font-serif text-white">Target Investment Range</h3>
                <p className="text-xs text-zinc-400">Select your intended purchase or lease acquisition cap.</p>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'UNDER_100K', label: 'Under $100,000 (£77,000)', sub: 'Superbikes, Harley Tourers, Everyday Luxury' },
                  { id: '100K_300K', label: '$100,000 – $300,000 (£77k – £230k)', sub: 'Heavy Duty Trucks, Raptor R, Luxury Sedans, 911 GT3' },
                  { id: 'OVER_300K', label: '$300,000+ (£230,000+)', sub: 'Hypercars, SF90 Stradale, Revuelto, Custom Commercial Haulers' },
                  { id: 'ANY', label: 'Show All Options (No Price Limit)', sub: 'Full access to 36 global allocations' }
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBudget(b.id as any)}
                    className={`w-full p-4 rounded-2xl border text-left flex justify-between items-center transition-all ${
                      budget === b.id ? 'border-white bg-[#181C26] text-white' : 'border-zinc-800 bg-[#0E1015] text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-sm text-white">{b.label}</h4>
                      <p className="text-xs text-zinc-400">{b.sub}</p>
                    </div>
                    {budget === b.id && <Check className="w-5 h-5 text-white" />}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-xl bg-zinc-800 text-zinc-300 font-bold text-xs"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleCalculateMatch}
                  className="flex-1 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-black text-sm uppercase tracking-wider shadow-lg transition-all"
                >
                  Generate Ideal Match Now
                </button>
              </div>
            </div>
          )}

          {step === 3 && matchedVehicle && (
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-white text-xs font-bold border border-zinc-700">
                <Trophy className="w-4 h-4 text-zinc-300" /> 99.8% Match Score Found
              </div>

              <h3 className="text-2xl font-extrabold text-white font-serif">{matchedVehicle.name}</h3>

              <div className="relative rounded-2xl overflow-hidden border border-zinc-700 bg-[#0E1015] h-56">
                <img src={matchedVehicle.images[0]} alt={matchedVehicle.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1015] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div className="text-left">
                    <span className="text-xs text-zinc-400">{matchedVehicle.specs.horsepower} HP • 0-60: {matchedVehicle.specs.acceleration0to60}</span>
                    <div className="text-xl font-black text-white">{formatUSD(matchedVehicle.price)} <span className="text-sm font-bold text-zinc-400">({formatGBP(matchedVehicle.price)})</span></div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-white text-zinc-950 font-bold uppercase">
                    {matchedVehicle.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectVehicle(matchedVehicle);
                  }}
                  className="flex-1 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all"
                >
                  <span>View Details & Secure Allocation</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-xl bg-zinc-800 text-zinc-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-zinc-700"
                >
                  <RefreshCw className="w-4 h-4" /> Retake
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};


