
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Classes from './pages/Classes';
import FormCheck from './pages/FormCheck';
import Analytics from './pages/Analytics';
import WorkoutGen from './pages/WorkoutGen';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-zinc-950">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/form-check" element={<FormCheck />} />
            <Route path="/progress" element={<Analytics />} />
            <Route path="/workout-gen" element={<WorkoutGen />} />
          </Routes>
        </main>
        <footer className="bg-zinc-950 border-t border-zinc-900 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-zinc-600 text-sm font-medium">
              &copy; {new Date().getFullYear()} FitAI Elite. Precision Fitness Powered by Gemini 3.
            </p>
          </div>
        </footer>
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;
