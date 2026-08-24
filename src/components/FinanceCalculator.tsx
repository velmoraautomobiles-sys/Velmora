import React, { useState } from 'react';
import { X, Calculator, DollarSign, Percent, Shield, ArrowRight } from 'lucide-react';
import { Vehicle } from '../types';

interface FinanceCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  selectedVehicle?: Vehicle | null;
  onSelectForPurchase: (v: Vehicle) => void;
}

export const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({
  isOpen,
  onClose,
  vehicles,
  selectedVehicle,
  onSelectForPurchase
}) => {
  if (!isOpen) return null;

  const activeVeh = selectedVehicle || vehicles[0];

  const [vehiclePrice, setVehiclePrice] = useState(activeVeh.price);
  const [downPayment, setDownPayment] = useState(25000);
  const [tradeInValue, setTradeInValue] = useState(15000);
  const [termMonths, setTermMonths] = useState(60);
  const [apr, setApr] = useState(4.9);

  // Math calculation
  const principal = Math.max(0, vehiclePrice - downPayment - tradeInValue);
  const monthlyRate = apr / 100 / 12;
  const estimatedMonthly = monthlyRate > 0 
    ? (principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) / (Math.pow(1 + monthlyRate, termMonths) - 1)
    : principal / termMonths;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl bg-[#151821] border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden text-zinc-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 bg-[#0E1015] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Calculator className="w-5 h-5 text-zinc-300" />
            <span>Interactive Automotive Financing & Trade-In Estimator</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-[#181C26] border border-zinc-700 text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[85vh]">
          
          {/* Monthly Estimate Banner */}
          <div className="p-6 rounded-2xl bg-[#181C26] border border-zinc-700 text-center space-y-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">
              Estimated Monthly Payment
            </span>
            <div className="text-4xl font-black text-white font-mono">
              ${Math.round(estimatedMonthly).toLocaleString()}
              <span className="text-xs text-zinc-400 font-normal">/month</span>
            </div>
            <p className="text-xs text-zinc-300">
              Total Financed Amount: <strong className="text-white">${Math.round(principal).toLocaleString()}</strong> across {termMonths} months @ {apr}% APR
            </p>
          </div>

          {/* Calculator Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            <div>
              <label className="text-zinc-400 block mb-1 font-semibold">Vehicle Price ($ USD)</label>
              <input
                type="number"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Number(e.target.value))}
                className="w-full bg-[#0E1015] border border-zinc-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="text-zinc-400 block mb-1 font-semibold">Cash Down Payment ($)</label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full bg-[#0E1015] border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="text-zinc-400 block mb-1 font-semibold">Estimated Trade-In Value ($)</label>
              <input
                type="number"
                value={tradeInValue}
                onChange={(e) => setTradeInValue(Number(e.target.value))}
                className="w-full bg-[#0E1015] border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 font-bold focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="text-zinc-400 block mb-1 font-semibold">Interest Rate APR (%)</label>
              <input
                type="number"
                step="0.1"
                value={apr}
                onChange={(e) => setApr(Number(e.target.value))}
                className="w-full bg-[#0E1015] border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white"
              />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="text-zinc-400 block mb-1 font-semibold">Loan Duration: {termMonths} Months</label>
              <div className="flex gap-2">
                {[36, 48, 60, 72, 84].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTermMonths(m)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      termMonths === m ? 'border-white bg-[#181C26] text-white' : 'border-zinc-800 bg-[#0E1015] text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {m} mo
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onSelectForPurchase(activeVeh);
              }}
              className="w-full py-4 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              <span>Apply Calculation & Lock Vehicle</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
