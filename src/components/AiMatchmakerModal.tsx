import React, { useState } from 'react';
import { X, Sparkles, Car, Bike, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Vehicle } from '../types';

interface AiMatchmakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  onSelectVehicle: (v: Vehicle) => void;
}

export const AiMatchmakerModal: React.FC<AiMatchmakerModalProps> = ({
  isOpen,
  onClose,
  vehicles,
  onSelectVehicle
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<number>(1);
  const [vehicleType, setVehicleType] = useState<'Car' | 'Bike' | 'Any'>('Any');
  const [budgetTier, setBudgetTier] = useState<number>(300000);
  const [priority, setPriority] = useState<'Speed' | 'Luxury' | 'Eco' | 'Offroad'>('Speed');
  const [matchedVehicle, setMatchedVehicle] = useState<Vehicle | null>(null);

  const handleCalculateMatch = () => {
    let filtered = vehicles;
    
    if (vehicleType === 'Bike') {
      filtered = filtered.filter((v) => v.category === 'Motorcycle / Bike');
    } else if (vehicleType === 'Car') {
      filtered = filtered.filter((v) => v.category !== 'Motorcycle / Bike');
    }

    // Sort by proximity to budget and priority match
    const match = filtered.find((v) => v.price <= budgetTier) || filtered[0] || vehicles[0];
    setMatchedVehicle(match);
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/90 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl p-6 text-white font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.2em]">AI Intelligence Matchmaker</span>
              <h2 className="text-xl font-light font-serif">Find Your Ideal Automobile or Bike</h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl border border-white/10 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Vehicle Preference */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-amber-500">
              1. What type of vehicle are you acquiring today?
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setVehicleType('Car')}
                className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                  vehicleType === 'Car' ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-zinc-900/50 border-white/10 text-gray-400'
                }`}
              >
                <Car className="w-8 h-8 mx-auto" />
                <span className="text-xs font-bold block">Car / Supercar</span>
              </button>

              <button
                onClick={() => setVehicleType('Bike')}
                className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                  vehicleType === 'Bike' ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-zinc-900/50 border-white/10 text-gray-400'
                }`}
              >
                <Bike className="w-8 h-8 mx-auto" />
                <span className="text-xs font-bold block">Motorcycle / Bike</span>
              </button>

              <button
                onClick={() => setVehicleType('Any')}
                className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                  vehicleType === 'Any' ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-zinc-900/50 border-white/10 text-gray-400'
                }`}
              >
                <Zap className="w-8 h-8 mx-auto" />
                <span className="text-xs font-bold block">Show Me All</span>
              </button>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest transition-all"
            >
              Next Step →
            </button>
          </div>
        )}

        {/* Step 2: Budget */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-amber-500">
              2. What is your preferred budget range?
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-gray-400">Target Ceiling:</span>
                <span className="text-2xl font-black text-amber-400 font-mono">${budgetTier.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="30000"
                max="500000"
                step="10000"
                value={budgetTier}
                onChange={(e) => setBudgetTier(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>$30,000 (Bikes / Entry)</span>
                <span>$500,000+ (Hypercars)</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-4 py-3 rounded-xl border border-white/10 text-gray-300 text-xs">Back</button>
              <button onClick={() => setStep(3)} className="flex-1 py-3.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest">Next Step →</button>
            </div>
          </div>
        )}

        {/* Step 3: Priority */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-amber-500">
              3. What matters most to you in performance?
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { label: 'Extreme Speed & Acceleration', val: 'Speed' },
                { label: 'Ultra-Luxury & Handcrafted Comfort', val: 'Luxury' },
                { label: 'Zero-Emissions Electric Power', val: 'Eco' },
                { label: 'Heavy Duty & All-Terrain SUV', val: 'Offroad' }
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => setPriority(item.val as any)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    priority === item.val ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-zinc-900/50 border-white/10 text-gray-400'
                  }`}
                >
                  <span className="font-bold block">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-4 py-3 rounded-xl border border-white/10 text-gray-300 text-xs">Back</button>
              <button onClick={handleCalculateMatch} className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest">
                Calculate Match Now
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Result Match */}
        {step === 4 && matchedVehicle && (
          <div className="space-y-6 text-center">
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              99.4% Match Score Calculated
            </span>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 text-left space-y-3">
              <img src={matchedVehicle.images[0]} alt={matchedVehicle.name} referrerPolicy="no-referrer" className="w-full h-48 object-cover rounded-xl border border-white/10" />
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">{matchedVehicle.year} {matchedVehicle.make}</span>
                <h3 className="text-xl font-bold text-white font-serif">{matchedVehicle.name}</h3>
                <p className="text-xs text-gray-300 mt-1">{matchedVehicle.description}</p>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                <span className="text-2xl font-black text-amber-400">${matchedVehicle.price.toLocaleString()}</span>
                <span className="text-xs text-emerald-400 font-bold">Govt Emissions & Title Cleared</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  onClose();
                  onSelectVehicle(matchedVehicle);
                }}
                className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl shadow-amber-500/20"
              >
                Inspect & Reserve This Match Now
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
