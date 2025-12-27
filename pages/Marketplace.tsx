
import React, { useState, useMemo } from 'react';
import { INITIAL_CARS } from '../constants.tsx';
import CarCard from '../components/CarCard';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [priceRange, setPriceRange] = useState(150000);

  const filteredCars = useMemo(() => {
    return INITIAL_CARS.filter(car => {
      const matchesSearch = 
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
        car.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || car.type === filterType;
      const matchesPrice = car.price <= priceRange;
      return matchesSearch && matchesType && matchesPrice;
    });
  }, [searchTerm, filterType, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Marketplace</h1>
          <p className="text-gray-500">Discover over 1,000+ available vehicles powered by real-time data.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl justify-end">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by make or model..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-white border border-gray-200 px-4 py-3 rounded-xl flex items-center gap-2 text-gray-600 hover:bg-gray-50 transition-colors">
            <SlidersHorizontal size={18} />
            <span className="font-medium">More Filters</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Filter size={18} />
              Vehicle Type
            </h3>
            <div className="space-y-3">
              {['All', 'SUV', 'Sedan', 'Truck', 'Electric', 'Sports'].map(type => (
                <label key={type} className="flex items-center group cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    checked={filterType === type}
                    onChange={() => setFilterType(type)}
                  />
                  <span className="ml-3 text-sm text-gray-600 group-hover:text-indigo-600 transition-colors">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
            <input
              type="range"
              min="10000"
              max="200000"
              step="5000"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
            />
            <div className="flex justify-between mt-3 text-sm font-medium text-gray-600">
              <span>$10k</span>
              <span className="text-indigo-600 font-bold">${(priceRange/1000).toFixed(0)}k</span>
              <span>$200k+</span>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="flex-1">
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                <Search className="text-gray-300" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No cars found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
              <button
                onClick={() => { setSearchTerm(''); setFilterType('All'); setPriceRange(200000); }}
                className="mt-6 text-indigo-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
