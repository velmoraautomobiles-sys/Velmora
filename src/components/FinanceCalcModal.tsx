import React, { useState } from 'react';
import { X, Calculator, ShieldCheck, ArrowRight, Key, Calendar, Building, Globe2 } from 'lucide-react';
import { Vehicle, ServiceIntent, CurrencyMode } from '../types';
import { formatUSD, formatGBP, USD_TO_GBP_RATE } from '../utils/currency';

interface FinanceCalcModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  onSelectVehicleToCheckout?: (v: Vehicle, intent?: ServiceIntent) => void;
  currencyMode?: CurrencyMode;
}

export const FinanceCalcModal: React.FC<FinanceCalcModalProps> = ({
  isOpen,
  onClose,
  vehicles,
  onSelectVehicleToCheckout,
  currencyMode = 'DUAL'
}) => {
  if (!isOpen) return null;

  const [activeMode, setActiveMode] = useState<ServiceIntent>('BUY');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(vehicles[0]?.id || '');
  
  // Finance state
  const [downPayment, setDownPayment] = useState<number>(20000);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<number>(4.9);
  const [tradeInValue, setTradeInValue] = useState<number>(10000);

  // Rental state
  const [rentalDays, setRentalDays] = useState<number>(3);
  const [includeChauffeur, setIncludeChauffeur] = useState<boolean>(false);

  // Lease state
  const [leaseMonths, setLeaseMonths] = useState<number>(36);
  const [annualMiles, setAnnualMiles] = useState<number>(10000);

  const vehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];
  const vehiclePrice = vehicle ? vehicle.price : 150000;
  const dailyRentUSD = vehicle?.dailyRentalRate || Math.round(vehiclePrice * 0.0075);
  const monthlyLeaseBase = vehicle?.monthlyLeaseRate || Math.round(vehiclePrice * 0.018);

  // Finance calculation
  const principal = Math.max(0, vehiclePrice - downPayment - tradeInValue);
  const monthlyInterestRate = interestRate / 100 / 12;
  const monthlyFinancePayment = monthlyInterestRate > 0 
    ? (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) / (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1)
    : principal / loanTermMonths;

  // Rental calculation
  const totalRentalUSD = (dailyRentUSD * rentalDays) + (includeChauffeur ? 450 * rentalDays : 0);

  // Lease calculation
  const monthlyLeaseAdjusted = leaseMonths === 12 
    ? monthlyLeaseBase * 1.25 
    : leaseMonths === 24 
    ? monthlyLeaseBase * 1.1 
    : leaseMonths === 48 
    ? monthlyLeaseBase * 0.9 
    : monthlyLeaseBase;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 text-slate-100 font-sans max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                Global $/£ Financial Estimator
              </span>
              <h2 className="text-xl font-bold font-serif text-white">Purchase, Rental & Lease Calculator</h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector (Buy / Rent / Lease) */}
        <div className="grid grid-cols-3 gap-2 mb-6 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveMode('BUY')}
            className={`py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeMode === 'BUY' ? 'bg-amber-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Financing (Buy)</span>
          </button>

          <button
            onClick={() => setActiveMode('RENT')}
            className={`py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeMode === 'RENT' ? 'bg-emerald-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Rental Cost</span>
          </button>

          <button
            onClick={() => setActiveMode('LEASE')}
            className={`py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeMode === 'LEASE' ? 'bg-blue-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Lease Schedule</span>
          </button>
        </div>

        <div className="space-y-5">
          {/* Vehicle Selector */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
              Select Vehicle from Showroom ({vehicles.length} In Stock)
            </label>
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.year} {v.make} {v.model} — {formatUSD(v.price)} ({formatGBP(v.price)})
                </option>
              ))}
            </select>
          </div>

          {/* Mode 1: Buy Financing */}
          {activeMode === 'BUY' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Down Payment ($ USD / £ GBP)</label>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono"
                  />
                  <span className="text-[10px] text-slate-400">≈ {formatGBP(downPayment)}</span>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Trade-in Allowance ($ USD / £ GBP)</label>
                  <input
                    type="number"
                    value={tradeInValue}
                    onChange={(e) => setTradeInValue(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-emerald-400 font-mono font-bold"
                  />
                  <span className="text-[10px] text-slate-400">≈ {formatGBP(tradeInValue)}</span>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Loan Term (Months)</label>
                  <select
                    value={loanTermMonths}
                    onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                  >
                    <option value={36}>36 Months (3 Years)</option>
                    <option value={48}>48 Months (4 Years)</option>
                    <option value={60}>60 Months (5 Years)</option>
                    <option value={72}>72 Months (6 Years)</option>
                    <option value={84}>84 Months (7 Years)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">APR Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono"
                  />
                </div>
              </div>

              {/* Finance Result Banner */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-amber-400 uppercase tracking-widest block font-bold">
                    Estimated Monthly Payment
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-amber-400 font-mono">
                      {formatUSD(monthlyFinancePayment)}
                    </span>
                    <span className="text-lg font-bold text-slate-300">
                      / {formatGBP(monthlyFinancePayment)}
                    </span>
                    <span className="text-xs text-slate-400">/mo</span>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-400">
                  <div>Net Financed: <strong className="text-white">{formatUSD(principal)} ({formatGBP(principal)})</strong></div>
                  <div className="text-[10px] text-emerald-400 font-bold">0.9% APR Subsidized Rates Available</div>
                </div>
              </div>
            </div>
          )}

          {/* Mode 2: Rental Estimator */}
          {activeMode === 'RENT' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Rental Duration (Days)</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={rentalDays}
                    onChange={(e) => setRentalDays(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">VIP Concierge & Chauffeur Option</label>
                  <button
                    type="button"
                    onClick={() => setIncludeChauffeur(!includeChauffeur)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      includeChauffeur ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-950 text-slate-400 border-slate-700'
                    }`}
                  >
                    {includeChauffeur ? '✓ Chauffeur Included ($450/day)' : '+ Add VIP Dedicated Chauffeur'}
                  </button>
                </div>
              </div>

              {/* Rental Result Banner */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest block font-bold">
                    Total Rental Booking ({rentalDays} Days)
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-emerald-400 font-mono">
                      {formatUSD(totalRentalUSD)}
                    </span>
                    <span className="text-lg font-bold text-slate-300">
                      / {formatGBP(totalRentalUSD)}
                    </span>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-400">
                  <div>Daily Base: <strong className="text-white">{formatUSD(dailyRentUSD)}/d ({formatGBP(dailyRentUSD)}/d)</strong></div>
                  <div className="text-[10px] text-emerald-400 font-bold">Full VIP Insurance & 200 Miles/Day</div>
                </div>
              </div>
            </div>
          )}

          {/* Mode 3: Lease Schedule */}
          {activeMode === 'LEASE' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Lease Term Duration</label>
                  <select
                    value={leaseMonths}
                    onChange={(e) => setLeaseMonths(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                  >
                    <option value={12}>12 Months (Short Term Lease)</option>
                    <option value={24}>24 Months (2 Years)</option>
                    <option value={36}>36 Months (3 Years - Recommended)</option>
                    <option value={48}>48 Months (4 Years)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Annual Mileage Allowance</label>
                  <select
                    value={annualMiles}
                    onChange={(e) => setAnnualMiles(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                  >
                    <option value={7500}>7,500 miles/year</option>
                    <option value={10000}>10,000 miles/year</option>
                    <option value={12000}>12,000 miles/year</option>
                    <option value={15000}>15,000 miles/year</option>
                  </select>
                </div>
              </div>

              {/* Lease Result Banner */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-blue-400 uppercase tracking-widest block font-bold">
                    Monthly Lease Rate ({leaseMonths} Mo Term)
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-blue-400 font-mono">
                      {formatUSD(monthlyLeaseAdjusted)}
                    </span>
                    <span className="text-lg font-bold text-slate-300">
                      / {formatGBP(monthlyLeaseAdjusted)}
                    </span>
                    <span className="text-xs text-slate-400">/mo</span>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-400">
                  <div>Due at Signing: <strong className="text-white">{formatUSD(monthlyLeaseAdjusted)}</strong> ($0 Down Option)</div>
                  <div className="text-[10px] text-blue-400 font-bold">Section 179 Corporate Tax Deductible</div>
                </div>
              </div>
            </div>
          )}

          {onSelectVehicleToCheckout && vehicle && (
            <button
              onClick={() => {
                onClose();
                onSelectVehicleToCheckout(vehicle, activeMode);
              }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <span>
                {activeMode === 'BUY' ? 'Apply Financing & Reserve Vehicle' : activeMode === 'RENT' ? 'Book Rental with Calculated Rates' : 'Submit Lease Application'}
              </span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

