
import React, { useState } from 'react';
import { Camera, Upload, Loader2, Sparkles, CheckCircle2, AlertCircle, BrainCircuit } from 'lucide-react';
import { identifyCarFromImage } from '../services/gemini';

const Inventory: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [identifiedData, setIdentifiedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setIdentifiedData(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const runIdentification = async () => {
    if (!selectedImage) return;
    setIsIdentifying(true);
    setError(null);

    try {
      const base64 = selectedImage.split(',')[1];
      const result = await identifyCarFromImage(base64);
      setIdentifiedData(result);
    } catch (err) {
      setError("AI was unable to process the image. Please try another angle or different lighting.");
      console.error(err);
    } finally {
      setIsIdentifying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Sell Smarter with AI</h1>
        <p className="text-gray-500 mt-2">Upload a photo of your car, and our AI will automatically fill in the details for your listing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <div
            className={`relative border-2 border-dashed rounded-xl overflow-hidden transition-all ${
              selectedImage ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
            } aspect-video flex flex-col items-center justify-center p-4`}
          >
            {selectedImage ? (
              <img src={selectedImage} alt="Preview" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-600">Drag & drop or click to upload</p>
                <p className="text-xs text-gray-400 mt-1">JPEG, PNG up to 10MB</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageUpload}
            />
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setSelectedImage(null)}
              className="flex-1 py-3 px-4 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              disabled={!selectedImage || isIdentifying}
            >
              Clear
            </button>
            <button
              onClick={runIdentification}
              disabled={!selectedImage || isIdentifying}
              className="flex-[2] py-3 px-4 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isIdentifying ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Identify with AI
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results/Form Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            Listing Preview
            {identifiedData && <CheckCircle2 className="text-green-500" size={18} />}
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm flex items-start gap-3">
              <AlertCircle className="shrink-0" size={18} />
              {error}
            </div>
          )}

          {!identifiedData && !isIdentifying && !error && (
            <div className="py-12 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <BrainCircuit className="mx-auto mb-2 opacity-20" size={48} />
              <p className="text-sm">Run AI analysis to see details here</p>
            </div>
          )}

          {isIdentifying && (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-10 bg-gray-100 rounded-lg"></div>
              ))}
            </div>
          )}

          {identifiedData && (
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Make</label>
                <input
                  type="text"
                  defaultValue={identifiedData.make}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Model</label>
                <input
                  type="text"
                  defaultValue={identifiedData.model}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Year</label>
                  <input
                    type="number"
                    defaultValue={identifiedData.year}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Condition</label>
                  <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Fair</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Detected Features</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {identifiedData.features?.map((f: string, idx: number) => (
                    <span key={idx} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium border border-indigo-100">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="w-full py-4 mt-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors"
              >
                Submit Listing
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
