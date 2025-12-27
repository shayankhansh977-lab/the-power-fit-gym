
import React, { useState } from 'react';
import { Target, Weight, Dumbbell, Activity, Loader2, FileText, ChevronRight } from 'lucide-react';
import { getPersonalizedWorkout } from '../services/gemini';
import { FitnessGoal } from '../types';

const WorkoutGen: React.FC = () => {
  const [goal, setGoal] = useState<FitnessGoal>({
    targetWeight: 75,
    currentWeight: 80,
    goalType: 'Fat Loss',
    activityLevel: 'Moderate',
    equipment: ['Dumbbells']
  });
  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const result = await getPersonalizedWorkout(goal);
      setPlan(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Config Panel */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <h1 className="text-4xl font-black tracking-tighter mb-6">PLAN ARCHITECT</h1>
              <p className="text-zinc-500 font-medium mb-10 leading-relaxed">
                Define your parameters. Our AI will craft a high-performance blueprint tailored to your biology.
              </p>

              <div className="space-y-6 bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-3 block">Primary Goal</label>
                  <div className="grid grid-cols-1 gap-2">
                    {['Fat Loss', 'Muscle Gain', 'Endurance'].map(g => (
                      <button
                        key={g}
                        onClick={() => setGoal({...goal, goalType: g as any})}
                        className={`text-left px-5 py-3 rounded-2xl text-sm font-bold transition-all border ${
                          goal.goalType === g 
                          ? 'bg-emerald-600 border-emerald-500 text-white' 
                          : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2 block">Weight (kg)</label>
                    <input 
                      type="number" 
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      value={goal.currentWeight}
                      onChange={e => setGoal({...goal, currentWeight: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2 block">Target</label>
                    <input 
                      type="number" 
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      value={goal.targetWeight}
                      onChange={e => setGoal({...goal, targetWeight: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <button
                  onClick={generate}
                  disabled={loading}
                  className="w-full bg-emerald-600 py-5 rounded-2xl font-black text-lg hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-3 mt-6"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Dumbbell />}
                  {loading ? 'Synthesizing...' : 'Build Elite Plan'}
                </button>
              </div>
            </div>
          </div>

          {/* Display Panel */}
          <div className="flex-1">
            {loading && (
              <div className="space-y-8 animate-pulse">
                <div className="h-12 bg-zinc-900 rounded-2xl w-1/3"></div>
                <div className="h-96 bg-zinc-900 rounded-[2.5rem]"></div>
              </div>
            )}

            {!plan && !loading && (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-zinc-900/30 rounded-[2.5rem] border border-dashed border-zinc-800 p-12 text-center">
                <FileText className="text-zinc-800 mb-6" size={64} />
                <h3 className="text-2xl font-black text-zinc-700">YOUR BLUEPRINT AWAITS</h3>
                <p className="text-zinc-600 max-w-sm mx-auto mt-4 font-medium">
                  Select your goals on the left to generate a comprehensive AI-powered training schedule.
                </p>
              </div>
            )}

            {plan && !loading && (
              <div className="bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-800 animate-in fade-in zoom-in duration-500">
                <div className="flex items-center gap-3 mb-10 text-emerald-500">
                  <Activity size={24} />
                  <h2 className="text-3xl font-black tracking-tight text-white uppercase">Generated Blueprint</h2>
                </div>
                <div className="prose prose-invert max-w-none text-zinc-300 font-medium leading-loose whitespace-pre-line">
                  {plan}
                </div>
                <div className="mt-12 flex gap-4">
                  <button className="flex-1 bg-zinc-800 py-4 rounded-2xl font-bold hover:bg-zinc-700 transition-colors">Download PDF</button>
                  <button className="flex-1 bg-emerald-600 py-4 rounded-2xl font-bold hover:bg-emerald-500 transition-colors">Save to Profile</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutGen;
