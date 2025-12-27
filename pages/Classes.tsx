
import React, { useState, useMemo } from 'react';
import { GYM_CLASSES } from '../constants.tsx';
import { Search, Filter, Clock, Users, Timer } from 'lucide-react';

const Classes: React.FC = () => {
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    return GYM_CLASSES.filter(c => 
      (category === 'All' || c.category === category) &&
      (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.trainer.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [category, searchTerm]);

  return (
    <div className="bg-zinc-950 min-h-screen text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">STUDIO SCHEDULE</h1>
            <p className="text-zinc-500 font-medium">Book your spot in the elite training sessions.</p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="text" 
                placeholder="Search class or trainer..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {['All', 'Yoga', 'HIIT', 'Strength', 'Cardio'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold border transition-all whitespace-nowrap ${
                category === cat 
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/20' 
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(cls => (
            <div key={cls.id} className="group bg-zinc-900 rounded-[2.5rem] border border-zinc-800 overflow-hidden hover:border-emerald-500/50 transition-all shadow-xl">
              <div className="relative h-56 overflow-hidden">
                <img src={cls.image} alt={cls.name} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    cls.intensity === 'High' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-black'
                  }`}>
                    {cls.intensity} Intensity
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight mb-1">{cls.name}</h3>
                    <p className="text-emerald-500 text-sm font-bold uppercase tracking-wider">{cls.trainer}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-zinc-950 p-4 rounded-2xl flex items-center gap-3">
                    <Clock size={16} className="text-zinc-500" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-zinc-500">Starts</div>
                      <div className="text-sm font-bold">{cls.time}</div>
                    </div>
                  </div>
                  <div className="bg-zinc-950 p-4 rounded-2xl flex items-center gap-3">
                    <Timer size={16} className="text-zinc-500" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-zinc-500">Duration</div>
                      <div className="text-sm font-bold">{cls.duration}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-emerald-500" />
                    <span className="text-sm font-bold text-zinc-400">
                      {cls.availableSpots} spots left
                    </span>
                  </div>
                  <button 
                    disabled={cls.availableSpots === 0}
                    className={`px-8 py-3 rounded-2xl font-black text-sm transition-all ${
                      cls.availableSpots === 0 
                      ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20'
                    }`}
                  >
                    {cls.availableSpots === 0 ? 'Waitlist' : 'Book Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;
