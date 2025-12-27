
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, Calendar, LineChart, Target, Camera, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: <Dumbbell size={20} /> },
    { path: '/classes', label: 'Classes', icon: <Calendar size={20} /> },
    { path: '/workout-gen', label: 'AI Plan', icon: <Target size={20} /> },
    { path: '/form-check', label: 'Form AI', icon: <Camera size={20} /> },
    { path: '/progress', label: 'Progress', icon: <LineChart size={20} /> },
  ];

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-emerald-500 font-bold text-2xl">
              <Dumbbell className="text-emerald-500" strokeWidth={2.5} />
              <span className="text-white">FitAI</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1.5 text-sm font-semibold transition-all px-3 py-2 rounded-lg ${
                  location.pathname === item.path
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            <button className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
