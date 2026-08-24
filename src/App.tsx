import React, { useState, useMemo } from 'react';
import { Vehicle, VehicleCategory, CurrencyMode } from './types';
import { INITIAL_VEHICLES } from './data/initialVehicles';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WeBuyCarsBanner } from './components/WeBuyCarsBanner';
import { VehicleCard } from './components/VehicleCard';
import { VehicleDetailsModal } from './components/VehicleDetailsModal';
import { VehicleManagerModal } from './components/VehicleManagerModal';
import { SellCarModal } from './components/SellCarModal';
import { CarMatchmakerQuiz } from './components/CarMatchmakerQuiz';
import { SalesFunnelModal } from './components/SalesFunnelModal';
import { ExitIntentModal } from './components/ExitIntentModal';
import { FinanceCalculator } from './components/FinanceCalculator';
import { ReviewsAndUrgency } from './components/ReviewsAndUrgency';
import { Footer } from './components/Footer';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { Filter, SlidersHorizontal, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const local = localStorage.getItem('gearglide_vehicles') || localStorage.getItem('apex_vehicles');
    if (local) {
      try {
        const parsed: Vehicle[] = JSON.parse(local);
        const existingIds = new Set(parsed.map(v => v.id));
        const missingDefaults = INITIAL_VEHICLES.filter(v => !existingIds.has(v.id));
        return [...parsed, ...missingDefaults];
      } catch (e) {
        return INITIAL_VEHICLES;
      }
    }
    return INITIAL_VEHICLES;
  });

  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>('DUAL');
  const [activeCategory, setActiveCategory] = useState<VehicleCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'horsepower'>('featured');

  // Modals & Funnel State
  const [quickViewVehicle, setQuickViewVehicle] = useState<Vehicle | null>(null);
  const [funnelVehicle, setFunnelVehicle] = useState<Vehicle | null>(null);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isSellCarOpen, setIsSellCarOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Saved Wishlist
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [voucherDiscount, setVoucherDiscount] = useState(0);

  const categories: VehicleCategory[] = [
    'All',
    'Cars',
    'Bikes',
    'Trucks',
    'Electric & Hybrid'
  ];

  const handleToggleSave = (id: string) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleAddVehicle = (newVeh: Vehicle) => {
    const updated = [newVeh, ...vehicles];
    setVehicles(updated);
    try {
      localStorage.setItem('gearglide_vehicles', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClaimVoucher = (amount: number) => {
    setVoucherDiscount(amount);
    // Trigger funnel for featured car
    if (vehicles.length > 0) {
      setFunnelVehicle(vehicles[0]);
    }
  };

  // Helper to match category
  const matchesActiveCategory = (cat: VehicleCategory, active: VehicleCategory) => {
    if (active === 'All') return true;
    if (active === 'Cars') {
      return cat === 'Cars' || cat === 'Supercar' || cat === 'Luxury Sedan';
    }
    if (active === 'Bikes') {
      return cat === 'Bikes' || cat === 'Motorcycle / Bike';
    }
    if (active === 'Trucks') {
      return cat === 'Trucks' || cat === 'SUV & Truck';
    }
    if (active === 'Electric & Hybrid') {
      return cat === 'Electric & Hybrid';
    }
    return cat === active;
  };

  // Filtered Inventory
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      if (showSavedOnly && !savedIds.includes(v.id)) return false;
      if (!matchesActiveCategory(v.category, activeCategory)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = v.name.toLowerCase().includes(q);
        const matchesMake = v.make.toLowerCase().includes(q);
        const matchesCat = v.category.toLowerCase().includes(q);
        const matchesGovt = v.governmentSpecs.emissionsGrade.toLowerCase().includes(q);
        const matchesVin = v.governmentSpecs.vinNumber.toLowerCase().includes(q);
        return matchesName || matchesMake || matchesCat || matchesGovt || matchesVin;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'horsepower') return b.specs.horsepower - a.specs.horsepower;
      return 0; // featured
    });
  }, [vehicles, activeCategory, searchQuery, sortBy, showSavedOnly, savedIds]);

  return (
    <div className="min-h-screen bg-[#0C0E14] text-slate-200 font-sans selection:bg-white selection:text-slate-950 flex flex-col justify-between">
      
      {/* Top Navbar */}
      <Navbar
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setShowSavedOnly(false);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAddVehicle={() => setIsAddVehicleOpen(true)}
        onOpenSellModal={() => setIsSellCarOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCalc={() => setIsCalcOpen(true)}
        savedCount={savedIds.length}
        onOpenSaved={() => setShowSavedOnly(!showSavedOnly)}
        totalInventoryCount={vehicles.length}
        currencyMode={currencyMode}
        onToggleCurrency={setCurrencyMode}
      />

      {/* Hero Showcase Section */}
      <Hero
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenAddVehicle={() => setIsAddVehicleOpen(true)}
        onOpenSellModal={() => setIsSellCarOpen(true)}
        onExploreClick={() => {
          const el = document.getElementById('showroom-inventory');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        currencyMode={currencyMode}
      />

      {/* We Buy Cars From Private Owners Highlight Banner */}
      <WeBuyCarsBanner onOpenSellModal={() => setIsSellCarOpen(true)} />

      {/* Main Showroom Inventory Section */}
      <main id="showroom-inventory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8 w-full">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white font-serif">
                {showSavedOnly ? 'Your Saved Vehicles' : `${activeCategory} Vault`}
              </h2>
              <span className="text-xs font-bold text-cyan-200 bg-[#181E2D] border border-cyan-500/30 px-3 py-0.5 rounded-full shadow-sm">
                {filteredVehicles.length} Listed
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Select any vehicle for direct government emissions, safety ratings, or instant acquisition lock.
            </p>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
            <span className="text-slate-400 flex items-center gap-1 font-medium">
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-300" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#141824] border border-slate-700 text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-400 font-semibold shadow-sm"
            >
              <option value="featured">Featured Showroom</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="horsepower">Horsepower (HP)</option>
            </select>

            {savedIds.length > 0 && (
              <button
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={`px-3 py-1.5 rounded-xl border font-bold flex items-center gap-1.5 transition-all ${
                  showSavedOnly ? 'bg-white text-slate-950 border-white font-black shadow-md' : 'bg-[#141824] text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
                <span>Saved ({savedIds.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Vehicles Cards Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onQuickView={(v) => setQuickViewVehicle(v)}
                onBuyReserve={(v) => setFunnelVehicle(v)}
                isSaved={savedIds.includes(vehicle.id)}
                onToggleSave={handleToggleSave}
                currencyMode={currencyMode}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center space-y-4 bg-[#141824] rounded-3xl border border-slate-800 shadow-xl">
            <Sparkles className="w-10 h-10 text-cyan-300 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-white">No Vehicles Matched Your Filter</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search query, resetting the category filters, or list a new automobile via consignment intake.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setShowSavedOnly(false);
              }}
              className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </main>

      {/* Client Reviews & Live Urgency Ticker */}
      <ReviewsAndUrgency />

      {/* Footer */}
      <Footer onOpenSellModal={() => setIsSellCarOpen(true)} />

      {/* Persistent Floating VIP WhatsApp Concierge Button */}
      <FloatingWhatsAppButton />

      {/* Modals & Drawers */}
      <VehicleDetailsModal
        vehicle={quickViewVehicle}
        onClose={() => setQuickViewVehicle(null)}
        onProceedToFunnel={(v) => {
          setQuickViewVehicle(null);
          setFunnelVehicle(v);
        }}
        onOpenCalc={() => {
          setQuickViewVehicle(null);
          setIsCalcOpen(true);
        }}
        currencyMode={currencyMode}
      />

      <VehicleManagerModal
        isOpen={isAddVehicleOpen}
        onClose={() => setIsAddVehicleOpen(false)}
        onAddVehicle={handleAddVehicle}
      />

      <SellCarModal
        isOpen={isSellCarOpen}
        onClose={() => setIsSellCarOpen(false)}
      />

      <CarMatchmakerQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        vehicles={vehicles}
        onSelectVehicle={(v) => {
          setIsQuizOpen(false);
          setFunnelVehicle(v);
        }}
      />

      <SalesFunnelModal
        isOpen={Boolean(funnelVehicle)}
        vehicle={funnelVehicle}
        onClose={() => setFunnelVehicle(null)}
        voucherDiscount={voucherDiscount}
      />

      <ExitIntentModal
        onClaimVoucher={handleClaimVoucher}
        featuredVehicle={vehicles[0] || null}
      />

      <FinanceCalculator
        isOpen={isCalcOpen}
        onClose={() => setIsCalcOpen(false)}
        vehicles={vehicles}
        selectedVehicle={quickViewVehicle}
        onSelectForPurchase={(v) => {
          setIsCalcOpen(false);
          setFunnelVehicle(v);
        }}
      />

    </div>
  );
}

