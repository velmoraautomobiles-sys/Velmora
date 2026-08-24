import React from 'react';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';
import { Vehicle } from '../types';

interface SavedVehiclesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedVehicles: Vehicle[];
  onRemoveSave: (id: string) => void;
  onSelectVehicle: (v: Vehicle) => void;
}

export const SavedVehiclesModal: React.FC<SavedVehiclesModalProps> = ({
  isOpen,
  onClose,
  savedVehicles,
  onRemoveSave,
  onSelectVehicle
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/90 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl p-6 text-white font-sans max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h2 className="text-xl font-light font-serif">Saved Favorites ({savedVehicles.length})</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl border border-white/10 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {savedVehicles.length === 0 ? (
          <div className="py-12 text-center text-gray-500 space-y-2">
            <p className="text-sm">No saved vehicles yet.</p>
            <p className="text-xs">Click the heart icon on any car or bike card to save it for later comparison.</p>
          </div>
        ) : (
          <div className="space-y-3 overflow-y-auto flex-1 pr-1">
            {savedVehicles.map((v) => (
              <div key={v.id} className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-between gap-4">
                <img src={v.images[0]} alt={v.name} referrerPolicy="no-referrer" className="w-20 h-14 object-cover rounded-xl border border-white/10" />
                
                <div className="flex-1">
                  <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">{v.year} {v.make}</span>
                  <h4 className="text-sm font-bold text-white">{v.name}</h4>
                  <span className="text-xs text-amber-400 font-mono font-bold">${v.price.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectVehicle(v);
                    }}
                    className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
                  >
                    Inspect
                  </button>
                  <button
                    onClick={() => onRemoveSave(v.id)}
                    className="p-2 rounded-xl border border-white/10 text-gray-400 hover:text-rose-400"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
