
import React, { useState } from 'react';
import { Camera, Sparkles, Loader2, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { analyzeWorkoutForm } from '../services/gemini';

const FormCheck: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    try {
      const res = await analyzeWorkoutForm(image.split(',')[1]);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tighter mb-4">FORM GUARDIAN AI</h1>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            Instant biomechanical analysis. Upload a photo of your lift to identify safety risks and optimize performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload Panel */}
          <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800">
            <div className={`relative border-2 border-dashed rounded-3xl overflow-hidden aspect-[4/3] flex items-center justify-center mb-8 transition-all ${
              image ? 'border-emerald-500 bg-emerald-500/5' : 'border-zinc-800 hover:border-zinc-700'
            }`}>
              {image ? (
                <img src={image} alt="Workout" className="w-full h-full object-contain" />
              ) : (
                <div className="text-center p-8">
                  <div className="bg-zinc-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Camera className="text-zinc-500" size={32} />
                  </div>
                  <p className="text-zinc-400 font-bold mb-1">Click to Capture or Upload</p>
                  <p className="text-zinc-600 text-sm">Clear full-body shots work best</p>
                </div>
              )}
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleUpload} />
            </div>

            <button
              onClick={startAnalysis}
              disabled={!image || isAnalyzing}
              className="w-full bg-emerald-600 py-5 rounded-2xl font-black text-lg hover:bg-emerald-500 disabled:opacity-50 transition-all shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-3"
            >
              {isAnalyzing ? <Loader2 className="animate-spin" /> : <Sparkles />}
              {isAnalyzing ? 'Analyzing Biomechanics...' : 'Run Safety Analysis'}
            </button>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {!result && !isAnalyzing && (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-zinc-900/50 rounded-[2.5rem] border border-dashed border-zinc-800">
                <Info className="text-zinc-700 mb-4" size={48} />
                <h3 className="text-zinc-500 font-bold">Waiting for input...</h3>
                <p className="text-zinc-600 text-sm max-w-xs mt-2">Upload a photo to see real-time corrections and safety scores.</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="space-y-4 animate-pulse">
                <div className="h-32 bg-zinc-900 rounded-3xl"></div>
                <div className="h-48 bg-zinc-900 rounded-3xl"></div>
              </div>
            )}

            {result && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 mb-6">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-3xl font-black tracking-tight">{result.exercise}</h3>
                      <p className="text-emerald-500 font-bold text-sm uppercase">AI Safety Report</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-black ${result.safetyScore > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {result.safetyScore}%
                      </div>
                      <div className="text-[10px] font-bold text-zinc-500 uppercase">Form Score</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                      <AlertTriangle size={14} className="text-amber-500" />
                      Required Corrections
                    </h4>
                    {result.errors.map((err: string, i: number) => (
                      <div key={i} className="bg-zinc-950 p-4 rounded-2xl border-l-4 border-amber-500 text-zinc-300 font-medium">
                        {err}
                      </div>
                    ))}
                  </div>

                  <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-2 text-emerald-400">
                      <CheckCircle size={18} />
                      <span className="text-xs font-black uppercase tracking-widest">Pro Insight</span>
                    </div>
                    <p className="text-zinc-300 font-medium italic">"{result.proTip}"</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCheck;
