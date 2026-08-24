import React, { useState } from 'react';
import { X, Code, Link2, Plus, Sparkles, Check, Image as ImageIcon, Car, ShieldCheck } from 'lucide-react';
import { Vehicle, VehicleCategory, GovernmentSpecs, TechnicalSpecs } from '../types';

interface VehicleManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVehicle: (newVeh: Vehicle) => void;
}

export const VehicleManagerModal: React.FC<VehicleManagerModalProps> = ({
  isOpen,
  onClose,
  onAddVehicle
}) => {
  if (!isOpen) return null;

  const [rawHtmlInput, setRawHtmlInput] = useState('');
  const [extractedImages, setExtractedImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80'
  ]);
  const [imageUrlInput, setImageUrlInput] = useState('');

  // Form Fields
  const [name, setName] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(2025);
  const [category, setCategory] = useState<VehicleCategory>('SUPERCAR');
  const [price, setPrice] = useState<number>(185000);
  const [monthlyFinancing, setMonthlyFinancing] = useState<number>(1950);
  const [dailyRentalRate, setDailyRentalRate] = useState<number>(1350);
  const [monthlyLeaseRate, setMonthlyLeaseRate] = useState<number>(3300);
  const [description, setDescription] = useState('');
  
  // Specs
  const [engine, setEngine] = useState('4.0L Twin-Turbo V8');
  const [horsepower, setHorsepower] = useState<number>(650);
  const [acceleration0to60, setAcceleration0to60] = useState('3.1s');
  const [emissionsGrade, setEmissionsGrade] = useState('Euro 6d-Final / LEV3 Certified');
  const [safetyRating, setSafetyRating] = useState('5-Star NHTSA / FIA Safety Cell');
  const [roadTaxBand, setRoadTaxBand] = useState('Band A / Zero EV Rating');
  const [titleStatus, setTitleStatus] = useState('Clean Title (Direct MSO)');
  const [importDutyStatus, setImportDutyStatus] = useState('Fully Cleared & Custom Duty Paid');
  const [vinNumber, setVinNumber] = useState(`VA${Math.floor(Math.random() * 899999 + 100000)}`);

  // Helper to normalize image URLs (including resolving known Pinterest shortlinks)
  const normalizeImageUrl = (url: string) => {
    const trimmed = url.trim();
    if (trimmed.includes('pin.it/7a9Kkjjqc') || trimmed.includes('37506609390047736')) {
      return 'https://i.pinimg.com/originals/23/f3/7d/23f37d0993d2d64ba627b54c98b00428.jpg';
    }
    return trimmed;
  };

  // Parse HTML Image tags or URLs
  const parseHtmlLinks = () => {
    if (!rawHtmlInput.trim()) return;

    const urls: string[] = [];
    
    // Check if entire input is a pinterest link
    if (rawHtmlInput.includes('pin.it/7a9Kkjjqc')) {
      urls.push('https://i.pinimg.com/originals/23/f3/7d/23f37d0993d2d64ba627b54c98b00428.jpg');
    }

    // Regex for <img src="..." />
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
    let match;
    while ((match = imgRegex.exec(rawHtmlInput)) !== null) {
      if (match[1]) urls.push(normalizeImageUrl(match[1]));
    }

    // Also regex for standard http/https image URLs
    const urlRegex = /(https?:\/\/[^\s"'<>]+\.(?:png|jpg|jpeg|webp|gif|svg))/g;
    let urlMatch;
    while ((urlMatch = urlRegex.exec(rawHtmlInput)) !== null) {
      if (urlMatch[1] && !urls.includes(urlMatch[1])) {
        urls.push(normalizeImageUrl(urlMatch[1]));
      }
    }

    if (urls.length > 0) {
      setExtractedImages((prev) => [...new Set([...prev, ...urls])]);
      setRawHtmlInput('');
    } else if (rawHtmlInput.startsWith('http')) {
      setExtractedImages((prev) => [...new Set([...prev, normalizeImageUrl(rawHtmlInput)])]);
      setRawHtmlInput('');
    }
  };

  const handleAddDirectUrl = () => {
    if (imageUrlInput.trim()) {
      setExtractedImages((prev) => [...prev, normalizeImageUrl(imageUrlInput)]);
      setImageUrlInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const vehicleName = name.trim() || `${make || 'Custom'} ${model || 'Automobile'}`;

    const newVehicle: Vehicle = {
      id: `veh-custom-${Date.now()}`,
      name: vehicleName,
      make: make || 'Apex Luxury',
      model: model || 'Edition One',
      year: Number(year) || 2025,
      category,
      price: Number(price) || 120000,
      originalPrice: Number(price) * 1.08,
      monthlyFinancing: Number(monthlyFinancing) || Math.round((Number(price) || 120000) / 90),
      dailyRentalRate: Number(dailyRentalRate) || Math.round((Number(price) || 120000) * 0.0075),
      monthlyLeaseRate: Number(monthlyLeaseRate) || Math.round((Number(price) || 120000) * 0.018),
      availableForSale: true,
      availableForRent: true,
      availableForLease: true,
      popularIn: ['US', 'UK', 'Canada', 'Australia', 'Monaco', 'Germany', 'Saudi Arabia'],
      images: extractedImages.length > 0 ? extractedImages : [
        'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80'
      ],
      description: description || 'High-performance luxury automobile with complete government emissions, safety, and multi-country import clearance.',
      keyFeatures: [
        'Government Emissions & Duty Certificate Active in US, UK, CA, AU, Monaco, DE & SA',
        'Available for Outright Purchase, VIP Daily Rental & Long-Term Lease',
        'Full Factory 210-Point Mechanical Certification'
      ],
      stockCount: 1,
      liveViewersCount: Math.floor(Math.random() * 15) + 5,
      location: 'Global Vault & Dealership Hub',
      badge: 'Certified Global Listing',
      specs: {
        engine,
        horsepower: Number(horsepower),
        torque: '480 lb-ft',
        acceleration0to60,
        topSpeed: '185 mph',
        transmission: 'Automatic Dual-Clutch',
        drivetrain: 'All-Wheel Drive',
        fuelEconomy: '22 MPG Combined',
        mileage: 10,
        year: Number(year)
      },
      governmentSpecs: {
        emissionsGrade,
        safetyRating,
        roadTaxBand,
        titleStatus,
        importDutyStatus,
        registrationType: 'Private / Commercial Registered',
        vinNumber,
        complianceCert: 'DOT, EPA & EU Conformity Certificate'
      }
    };

    onAddVehicle(newVehicle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#151821] border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#0E1015] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#181C26] text-white border border-zinc-700">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white font-serif">Consign a Vehicle & Showroom Intake</h2>
              <p className="text-xs text-zinc-400">List an exotic, luxury sedan, championship superbike, or commercial hauler into the showroom vault.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#181C26] border border-zinc-700 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Section 1: Media & Photo Asset Manager */}
          <div className="p-4 rounded-2xl bg-[#0E1015] border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-cyan-300" />
                <span>Vehicle Photography & Media Links</span>
              </label>
              <span className="text-[11px] text-zinc-400">Direct URLs or &lt;img src="..." /&gt; tags</span>
            </div>

            <div className="space-y-2">
              <textarea
                rows={3}
                placeholder={`Paste image URLs or HTML photo tags here, for example:\nhttps://images.unsplash.com/photo-example.jpg\n<img src="https://example.com/front-angle.jpg" />`}
                value={rawHtmlInput}
                onChange={(e) => setRawHtmlInput(e.target.value)}
                className="w-full bg-[#151821] border border-zinc-700 rounded-xl p-3 text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white"
              />
              <button
                type="button"
                onClick={parseHtmlLinks}
                className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Import & Preview Photos</span>
              </button>
            </div>

            {/* Direct URL Add Option */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Or paste direct image URL (https://...)"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                className="flex-1 bg-[#151821] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-white"
              />
              <button
                type="button"
                onClick={handleAddDirectUrl}
                className="px-3 py-2 bg-[#181C26] hover:bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-xl text-xs font-semibold"
              >
                + Add Photo
              </button>
            </div>

            {/* Extracted Images Preview */}
            {extractedImages.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs text-zinc-400 block font-semibold">
                  Attached Pictures ({extractedImages.length}):
                </span>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {extractedImages.map((img, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden border border-zinc-700 w-24 h-16 shrink-0 bg-[#151821]">
                      <img src={img} alt="preview" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setExtractedImages((prev) => prev.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 bg-rose-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove photo"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Basic Vehicle Information */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1">Make / Brand</label>
              <input
                type="text"
                placeholder="e.g. Porsche, Ducati, Ferrari"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                required
                className="w-full bg-[#0E1015] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1">Model Name</label>
              <input
                type="text"
                placeholder="e.g. 911 GT3 RS / Panigale V4"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
                className="w-full bg-[#0E1015] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1">Vehicle Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VehicleCategory)}
                className="w-full bg-[#0E1015] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-semibold focus:outline-none focus:border-white"
              >
                <option value="SUPERCAR">Supercars & Hypercars (Ferrari, Lamborghini, McLaren, Porsche)</option>
                <option value="NORMAL">Everyday & Luxury Vehicles (Mercedes, BMW, Tesla, Range Rover)</option>
                <option value="BIKE">Bikes & Superbikes (Ducati, BMW M, Kawasaki, Harley-Davidson)</option>
                <option value="TRUCK">Trucks & Commercial Haulers (Ford Raptor, RAM TRX, Peterbilt)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1">Price ($ USD)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
                className="w-full bg-[#0E1015] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1">Monthly Financing ($/mo)</label>
              <input
                type="number"
                value={monthlyFinancing}
                onChange={(e) => setMonthlyFinancing(Number(e.target.value))}
                className="w-full bg-[#0E1015] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 font-bold focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1">Model Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-[#0E1015] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
              />
            </div>
          </div>

          {/* Section 3: Government Specifications */}
          <div className="p-4 rounded-2xl bg-[#0E1015] border border-zinc-800 space-y-4">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-zinc-300" />
              <span>Government Compliance & Technical Specs</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Emissions Standard Grade</label>
                <input
                  type="text"
                  value={emissionsGrade}
                  onChange={(e) => setEmissionsGrade(e.target.value)}
                  className="w-full bg-[#151821] border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Government Safety Rating</label>
                <input
                  type="text"
                  value={safetyRating}
                  onChange={(e) => setSafetyRating(e.target.value)}
                  className="w-full bg-[#151821] border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Road Tax Band / Duty Status</label>
                <input
                  type="text"
                  value={roadTaxBand}
                  onChange={(e) => setRoadTaxBand(e.target.value)}
                  className="w-full bg-[#151821] border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Title & MSO Status</label>
                <input
                  type="text"
                  value={titleStatus}
                  onChange={(e) => setTitleStatus(e.target.value)}
                  className="w-full bg-[#151821] border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Engine / Motor Power</label>
                <input
                  type="text"
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                  className="w-full bg-[#151821] border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Horsepower (HP)</label>
                <input
                  type="number"
                  value={horsepower}
                  onChange={(e) => setHorsepower(Number(e.target.value))}
                  className="w-full bg-[#151821] border border-zinc-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-white"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-zinc-800 text-zinc-300 font-semibold text-xs hover:bg-zinc-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-black text-xs uppercase tracking-wider transition-all shadow-xl"
            >
              Publish Vehicle to Dealership
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
