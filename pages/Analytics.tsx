
import React, { useState, useEffect } from 'react';
import { ProgressPrediction } from '../types';
import { predictFitnessProgress } from '../services/gemini';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Flame, Target, TrendingUp, Calendar, Zap, Loader2 } from 'lucide-react';

const Analytics: React.FC = () => {
  const [prediction, setPrediction] = useState<ProgressPrediction | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await predictFitnessProgress({
        currentWeight: 80,
        avgBurn: 2400,
        workoutsPerWeek: 4
      });
      setPrediction(res);
      setLoading(false);
    };
    fetch();
  }, []);

  const data = [
    { day: 'Mon', burn: 2100, goal: 2000 },
    { day: 'Tue', burn: 2600, goal: 2000 },
    { day: 'Wed', burn: 1800, goal: 2000 },
    { day: 'Thu', burn: 3100, goal: 2000 },
    { day: 'Fri', burn: 2400, goal: 2000 },
    { day: 'Sat', burn: 2800, goal: 2000 },
    { day: 'Sun', burn: 1500, goal: 2000 },
  ];

  return (
    <div className="bg-zinc-950 min-h-screen text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl font-black tracking-tighter mb-2">METRIC ENGINE</h1>
          <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">Biometric Forecasting & Progress Analytics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Main Forecast Card */}
          <div className="md:col-span-2 bg-emerald-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-emerald-900/40 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-5xl font-black tracking-tighter mb-4">GOAL ESTIMATE</h2>
                <p className="text-emerald-100 font-bold text-lg mb-2">Target reached by:</p>
                <div className="text-2xl font-black bg-white/20 inline-block px-6 py-2 rounded-2xl">
                  {loading ? '---' : prediction?.estimatedGoalDate}
                </div>
              </div>
              <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md">
                <Target size={32} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="bg-black/10 p-6 rounded-3xl">
                <div className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-1">Monthly Delta</div>
                <div className="text-3xl font-black">-{prediction?.monthlyProgressRate}kg</div>
              </div>
              <div className="bg-black/10 p-6 rounded-3xl">
                <div className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-1">AI Confidence</div>
                <div className="text-3xl font-black">{prediction?.confidenceScore}%</div>
              </div>
            </div>
          </div>

          {/* Side Metrics */}
          <div className="space-y-6">
            <div className="bg-zinc-900 p-8 rounded-[2rem] border border-zinc-800">
              <div className="flex items-center gap-3 text-emerald-500 mb-6">
                <Flame size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Active Burn</span>
              </div>
              <h3 className="text-4xl font-black mb-2">{prediction?.burnRate}</h3>
              <p className="text-zinc-500 text-sm font-medium">Average kcal / 24hrs</p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-[2rem] border border-zinc-800">
              <div className="flex items-center gap-3 text-emerald-500 mb-6">
                <Zap size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Intensity Score</span>
              </div>
              <h3 className="text-4xl font-black mb-2">Elite</h3>
              <p className="text-zinc-500 text-sm font-medium">Top 5% of members</p>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-800">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <TrendingUp className="text-emerald-500" />
              Weekly Caloric Expenditure
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorBurn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
                  <YAxis hide />
                  <Tooltip contentStyle={{backgroundColor: '#18181b', border: 'none', borderRadius: '12px'}} />
                  <Area type="monotone" dataKey="burn" stroke="#10b981" fillOpacity={1} fill="url(#colorBurn)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-800">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <Calendar className="text-emerald-500" />
              Burn vs Goal
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
                  <YAxis hide />
                  <Tooltip contentStyle={{backgroundColor: '#18181b', border: 'none', borderRadius: '12px'}} />
                  <Bar dataKey="burn" fill="#10b981" radius={[8, 8, 0, 0]} barSize={40} />
                  <Bar dataKey="goal" fill="#27272a" radius={[8, 8, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
