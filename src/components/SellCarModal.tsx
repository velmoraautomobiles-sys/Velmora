import React, { useState } from 'react';
import { X, DollarSign, CheckCircle2, Shield, Truck, FileText, ArrowRight, MessageCircle, Upload, Car, Bike, Sparkles, Building2, HelpCircle, Mail } from 'lucide-react';
import { DEALER_WHATSAPP_LINK, DEALER_EMAIL, getDealerMailtoLink } from '../utils/whatsapp';

interface SellCarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SellCarModal: React.FC<SellCarModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [vehicleType, setVehicleType] = useState<'Supercar' | 'Car' | 'Bike' | 'Truck'>('Car');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2023');
  const [mileage, setMileage] = useState('');
  const [condition, setCondition] = useState('Excellent');
  
  const [country, setCountry] = useState('United States');
  const [city, setCity] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'GBP'>('USD');
  const [hasLoan, setHasLoan] = useState<'No' | 'Yes'>('No');
  const [vinNumber, setVinNumber] = useState('');

  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [photoLinks, setPhotoLinks] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const generateWhatsAppSellLink = () => {
    const text = encodeURIComponent(
      `🏁 *VEHICLE SALE / BUYOUT INQUIRY - VELMORA AUTOMOBILES*\n\n` +
      `👤 *Owner:* ${ownerName || 'Private Owner'}\n` +
      `📱 *Contact:* ${ownerPhone || 'N/A'} | ${ownerEmail || 'N/A'}\n` +
      `📍 *Location:* ${city ? city + ', ' : ''}${country}\n\n` +
      `🚘 *Vehicle:* ${year} ${make} ${model} (${vehicleType})\n` +
      `⏱️ *Mileage:* ${mileage || 'N/A'}\n` +
      `✨ *Condition:* ${condition}\n` +
      `💰 *Asking Price:* ${currency === 'USD' ? '$' : '£'}${expectedPrice || 'Open to Fair Valuation'}\n` +
      `📑 *Outstanding Loan/Lease:* ${hasLoan}\n` +
      `🔢 *VIN:* ${vinNumber || 'Provided upon request'}\n` +
      (notes ? `📝 *Notes:* ${notes}\n` : '') +
      `\nI am ready to sell my vehicle and would like to receive an official instant buyout cash/wire offer.`
    );
    return `https://wa.me/message/CF6AEOLZUEDVJ1?text=${text}`;
  };

  const generateEmailSellLink = () => {
    const subject = `Vehicle Buyout Appraisal Request: ${year} ${make} ${model} (${ownerName || 'Private Owner'})`;
    const body = `Hello Velmora Automobiles Acquisition Desk,\n\nI have submitted my vehicle details for a direct cash/wire buyout appraisal.\n\nVehicle Details:\n- Type: ${vehicleType}\n- Vehicle: ${year} ${make} ${model}\n- Mileage: ${mileage} miles\n- Condition: ${condition}\n- Title Status: ${hasLoan ? 'Active Loan/Lease Balance' : 'Clean Title in Hand'}\n- Asking Valuation: ${currency === 'USD' ? '$' : '£'}${expectedPrice || 'Top Fair Market'}\n\nOwner Location:\n- Country: ${country}\n- City: ${city || 'N/A'}\n\nOwner Contact Information:\n- Name: ${ownerName || 'Vehicle Owner'}\n- Phone: ${ownerPhone || 'N/A'}\n- Email: ${ownerEmail || 'N/A'}\n\nPlease review and email me back with the official purchase offer and wire escrow steps.\n\nThank you,\n${ownerName || 'Vehicle Owner'}`;
    return getDealerMailtoLink(subject, body);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    setMake('');
    setModel('');
    setMileage('');
    setExpectedPrice('');
    setOwnerName('');
    setOwnerPhone('');
    setOwnerEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#0F121B] border border-slate-700/90 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Banner */}
        <div className="bg-gradient-to-r from-[#181F30] via-[#1E2840] to-[#181F30] p-6 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white text-slate-950 flex items-center justify-center shadow-lg shadow-white/10">
              <DollarSign className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Direct Private Buyout
                </span>
                <span className="text-[10px] font-bold text-slate-400">Same-Day Wire Payout</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-serif mt-0.5">
                We Buy Your Vehicle
              </h2>
              <p className="text-xs text-slate-300">
                Sell your supercar, luxury sedan, superbike, or truck directly to Velmora Automobiles.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-[#141824] hover:bg-[#1C2234] border border-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Benefits Ribbon */}
        <div className="grid grid-cols-3 bg-[#131722] border-b border-slate-800 text-[11px] p-3 text-center divide-x divide-slate-800">
          <div className="flex items-center justify-center gap-1.5 text-slate-200">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-semibold">Top Market Cash/Wire</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-slate-200">
            <Truck className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
            <span className="font-semibold">Free Doorstep Pickup</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-slate-200">
            <Shield className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
            <span className="font-semibold">Loan/Lease Payoff</span>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border text-center transition-all ${
                  step === 1 ? 'bg-white text-slate-950 border-white shadow-md' : 'bg-[#151A26] text-slate-400 border-slate-800'
                }`}
              >
                1. Vehicle Specs
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border text-center transition-all ${
                  step === 2 ? 'bg-white text-slate-950 border-white shadow-md' : 'bg-[#151A26] text-slate-400 border-slate-800'
                }`}
              >
                2. Price & Territory
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border text-center transition-all ${
                  step === 3 ? 'bg-white text-slate-950 border-white shadow-md' : 'bg-[#151A26] text-slate-400 border-slate-800'
                }`}
              >
                3. Photos & Contact
              </button>
            </div>

            {/* STEP 1: VEHICLE SPECIFICATIONS */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1.5 uppercase tracking-wider">
                    Select Vehicle Class:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'Supercar', label: 'Supercar / Exotic' },
                      { id: 'Car', label: 'Luxury / Daily Sedan' },
                      { id: 'Bike', label: 'Superbike / Motorcycle' },
                      { id: 'Truck', label: 'Heavy Truck / 4x4' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setVehicleType(t.id as any)}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                          vehicleType === t.id 
                            ? 'bg-[#1E273C] text-white border-cyan-400/80 shadow-md ring-1 ring-cyan-400/40' 
                            : 'bg-[#141824] text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Make / Brand *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Porsche, Ferrari, BMW"
                      value={make}
                      onChange={(e) => setMake(e.target.value)}
                      className="w-full bg-[#151A26] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Model *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 911 GT3 RS, M5, Panigale"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full bg-[#151A26] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Year</label>
                    <input
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="2024"
                      className="w-full bg-[#151A26] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Mileage (Miles / KM)</label>
                    <input
                      type="text"
                      placeholder="e.g. 4,200 miles"
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                      className="w-full bg-[#151A26] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Overall Condition</label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full bg-[#151A26] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Mint / Collector Grade (As New)">Mint / Collector Grade (As New)</option>
                      <option value="Excellent (Minimal Wear)">Excellent (Minimal Wear)</option>
                      <option value="Good (Standard Daily Driven)">Good (Standard Daily Driven)</option>
                      <option value="Fair (Requires Minor Detailing)">Fair (Requires Minor Detailing)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!make || !model) {
                        alert('Please specify the vehicle make and model.');
                        return;
                      }
                      setStep(2);
                    }}
                    className="w-full py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Continue to Price & Location</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PRICE & TERRITORY */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1.5 uppercase tracking-wider">
                    Vehicle Current Location (Country):
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: 'United States', flag: '🇺🇸', label: 'USA' },
                      { id: 'United Kingdom', flag: '🇬🇧', label: 'UK' },
                      { id: 'Canada', flag: '🇨🇦', label: 'Canada' },
                      { id: 'Australia', flag: '🇦🇺', label: 'Australia' },
                      { id: 'Monaco', flag: '🇲🇨', label: 'Monaco' },
                      { id: 'Germany', flag: '🇩🇪', label: 'Germany' },
                      { id: 'Saudi Arabia', flag: '🇸🇦', label: 'Saudi Arabia' },
                      { id: 'Other International', flag: '🌐', label: 'Other Global' }
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCountry(c.id)}
                        className={`p-2 rounded-xl border text-center font-bold transition-all ${
                          country === c.id 
                            ? 'bg-[#1E273C] text-white border-cyan-400 shadow-md ring-1 ring-cyan-400/40' 
                            : 'bg-[#141824] text-slate-400 border-slate-800'
                        }`}
                      >
                        <span className="mr-1">{c.flag}</span>
                        <span>{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">City / Region</label>
                    <input
                      type="text"
                      placeholder="e.g. Miami, FL / London / Munich / Riyadh"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#151A26] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">VIN / Chassis # (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. WP0AB2A98NS28..."
                      value={vinNumber}
                      onChange={(e) => setVinNumber(e.target.value)}
                      className="w-full bg-[#151A26] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-300">Expected Asking Price</label>
                      <div className="flex items-center gap-1 text-[11px]">
                        <button
                          type="button"
                          onClick={() => setCurrency('USD')}
                          className={`px-1.5 py-0.5 rounded ${currency === 'USD' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-400'}`}
                        >
                          $ USD
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrency('GBP')}
                          className={`px-1.5 py-0.5 rounded ${currency === 'GBP' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-400'}`}
                        >
                          £ GBP
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                        {currency === 'USD' ? '$' : '£'}
                      </span>
                      <input
                        type="text"
                        placeholder="e.g. 185,000"
                        value={expectedPrice}
                        onChange={(e) => setExpectedPrice(e.target.value)}
                        className="w-full bg-[#151A26] border border-slate-700 rounded-xl pl-8 pr-3.5 py-2.5 text-xs text-white font-bold placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Existing Loan or Lease to Pay Off?</label>
                    <select
                      value={hasLoan}
                      onChange={(e) => setHasLoan(e.target.value as any)}
                      className="w-full bg-[#151A26] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="No">No - Clean Title in Hand</option>
                      <option value="Yes">Yes - Dealer will handle loan payoff</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-3.5 px-4 rounded-xl bg-[#151A26] hover:bg-[#1C2234] border border-slate-700 text-slate-300 font-bold text-xs"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Continue to Contact Details</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT & SUBMISSION */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Sterling"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full bg-[#151A26] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">WhatsApp / Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                      className="w-full bg-[#151A26] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    className="w-full bg-[#151A26] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Photo Links or Cloud Drive URL (Optional)</label>
                  <input
                    type="text"
                    placeholder="https://photos.app.goo.gl/... or image URL"
                    value={photoLinks}
                    onChange={(e) => setPhotoLinks(e.target.value)}
                    className="w-full bg-[#151A26] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Options, Packages or Modifications</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Weissach Package, Akrapovic exhaust, ceramic brakes, clean Carfax, single owner..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#151A26] border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Primary Dual Actions: Instant WhatsApp or In-App Valuation */}
                <div className="pt-2 space-y-2">
                  <a
                    href={generateWhatsAppSellLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-[#1E2538] hover:bg-[#252E46] border border-slate-600 hover:border-emerald-400/80 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl group"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>Send Directly via WhatsApp to Dealer</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="py-3 px-4 rounded-xl bg-[#151A26] hover:bg-[#1C2234] border border-slate-700 text-slate-300 font-bold text-xs"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                      <span>Submit In-App Valuation Request</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </form>
        ) : (
          /* Submission Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest bg-[#181E2D] px-3.5 py-1 rounded-full border border-cyan-500/30">
                Valuation Dossier Received
              </span>
              <h3 className="text-2xl font-black text-white font-serif">
                Thank You, {ownerName || 'Vehicle Owner'}
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Your <strong className="text-white">{year} {make} {model}</strong> buyout submission has been transmitted to our senior acquisition team. An official cash & wire offer will be dispatched within <strong className="text-cyan-300">1 to 2 hours</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#141824] border border-slate-800 max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Vehicle:</span>
                <span className="font-bold text-white">{year} {make} {model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Territory:</span>
                <span className="font-bold text-white">{city ? city + ', ' : ''}{country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Asking Valuation:</span>
                <span className="font-bold text-emerald-400">{currency === 'USD' ? '$' : '£'}{expectedPrice || 'Top Fair Appraisal'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Doorstep Transport:</span>
                <span className="font-bold text-white">Complimentary Enclosed Trailer</span>
              </div>
            </div>

            <div className="space-y-3 max-w-md mx-auto">
              <a
                href={generateWhatsAppSellLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#1E2538] hover:bg-[#252E46] border border-slate-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Expedite via Private WhatsApp Chat</span>
              </a>

              <a
                href={generateEmailSellLink()}
                className="w-full py-3.5 rounded-xl bg-[#101929] hover:bg-[#162238] border border-cyan-500/50 hover:border-cyan-400 text-cyan-200 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                title={`Email details directly to ${DEALER_EMAIL}`}
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Email Details to {DEALER_EMAIL}</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs uppercase tracking-wider transition-all"
              >
                Close & Return to Showroom
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
