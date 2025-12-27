
import React, { useState } from 'react';
import { INITIAL_CARS } from '../constants.tsx';
import { UserPreferences, Car } from '../types';
import { getCarRecommendation } from '../services/gemini';
import CarCard from '../components/CarCard';
import { Sparkles, BrainCircuit, Loader2, ArrowRight } from 'lucide-react';

const Recommendations: React.FC = () => {
  const [prefs, setPrefs] = useState<UserPreferences>({
    budget: 50000,
    type: 'SUV',
    primaryUse: 'Commuting',
    passengerCapacity: 5
  });
  const [recommended, setRecommended] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const findMatches = async () => {
    setIsLoading(true);
    try {
      const ids = await getCarRecommendation(prefs, INITIAL_CARS);
      const matches = INITIAL_CARS.filter(c => ids.includes(c.id));
      setRecommended(matches);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Input Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-white/20 p-2 rounded-xl">
                <BrainCircuit size={28} />
              </div>
              <h2 className="text-2xl font-bold">Personalized AI Matcher</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium opacity-80 mb-2">Maximum Budget</label>
                <input
                  type="number"
                  className="w-full bg-indigo-500/50 border border-indigo-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-white placeholder-indigo-200"
                  value={prefs.budget}
                  onChange={(e) => setPrefs({...prefs, budget: parseInt(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium opacity-80 mb-2">Body Type</label>
                <select
                  className="w-full bg-indigo-500/50 border border-indigo-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-white appearance-none"
                  value={prefs.type}
                  onChange={(e) => setPrefs({...prefs, type: e.target.value})}
                >
                  {['SUV', 'Sedan', 'Truck', 'Electric', 'Sports'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium opacity-80 mb-2">Primary Use Case</label>
                <select
                  className="w-full bg-indigo-500/50 border border-indigo-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-white appearance-none"
                  value={prefs.primaryUse}
                  onChange={(e) => setPrefs({...prefs, primaryUse: e.target.value})}
                >
                  {['Commuting', 'Family', 'Off-roading', 'Luxury/Status', 'Business'].map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium opacity-80 mb-2">Min Passenger Capacity</label>
                <div className="flex justify-between items-center space-x-4">
                  {[2, 4, 5, 7].map(n => (
                    <button
                      key={n}
                      onClick={() => setPrefs({...prefs, passengerCapacity: n})}
                      className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                        prefs.passengerCapacity === n ? 'bg-white text-indigo-600' : 'bg-indigo-500/50 text-white hover:bg-indigo-400'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={findMatches}
                disabled={isLoading}
                className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-extrabold text-lg shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center space-x-2 mt-4"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <span>Generate AI Picks</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1">
          {recommended.length > 0 ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center space-x-2 text-indigo-600">
                <Sparkles size={24} />
                <h2 className="text-2xl font-extrabold">Top Matches For You</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommended.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="bg-gray-50 p-6 rounded-full mb-6">
                <Sparkles className="text-gray-300" size={48} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Ready for your perfect match?</h2>
              <p className="text-gray-500 max-w-sm">
                Our AI considers depreciation curves, maintenance frequency, and user satisfaction scores to find your ideal vehicle.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
