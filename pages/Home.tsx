
import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Shield, Sparkles, Trophy, Flame, Users } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920"
            className="w-full h-full object-cover opacity-30 grayscale"
            alt="Gym background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <span className="inline-flex items-center space-x-2 px-4 py-2 mb-6 text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-400/10 border border-emerald-400/20 rounded-full">
              <Sparkles size={14} />
              <span>Next-Gen Fitness Intelligence</span>
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter">
              ELITE RESULTS <br />
              <span className="text-emerald-500">AI PRECISION.</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-10 leading-relaxed max-w-xl font-medium">
              Join the world's most advanced fitness ecosystem. AI-driven coaching, real-time pose analysis, and predictive metabolic tracking.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/workout-gen"
                className="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-emerald-500 transition-all text-center shadow-xl shadow-emerald-600/20 uppercase tracking-tight"
              >
                Start AI Training
              </Link>
              <Link
                to="/classes"
                className="bg-zinc-800/80 backdrop-blur-md text-white border border-zinc-700 px-10 py-5 rounded-2xl font-black text-lg hover:bg-zinc-700 transition-all text-center uppercase tracking-tight"
              >
                View Classes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'AI Form Guardian',
              desc: 'Upload a photo of your lift. Our neural network analyzes biomechanics to prevent injury.',
              icon: <Shield className="text-emerald-400" />,
              stat: '98% Accuracy'
            },
            {
              title: 'Metabolic Forecasting',
              desc: 'We predict your plateaus before they happen, adjusting intensity in real-time.',
              icon: <Activity className="text-emerald-400" />,
              stat: 'Real-time Sync'
            },
            {
              title: 'Dynamic Workouts',
              desc: 'Plans that evolve based on your sleep, stress, and previous session performance.',
              icon: <Flame className="text-emerald-400" />,
              stat: 'Daily Updates'
            }
          ].map((f, i) => (
            <div key={i} className="group bg-zinc-900/50 p-10 rounded-3xl border border-zinc-800 hover:border-emerald-500/50 transition-all">
              <div className="bg-zinc-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-500/10 transition-colors">
                {f.icon}
              </div>
              <div className="text-emerald-500 text-xs font-bold uppercase mb-2 tracking-widest">{f.stat}</div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{f.title}</h3>
              <p className="text-zinc-500 leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
