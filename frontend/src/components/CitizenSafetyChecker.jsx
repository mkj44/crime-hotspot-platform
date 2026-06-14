import { Search, ShieldAlert, ShieldCheck, MapPin, Loader2 } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const CitizenSafetyChecker = () => {
  const [location, setLocation] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkSafety = async (e) => {
    e.preventDefault();
    if (!location) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    // Simple mock mapping to represent location risk
    let locationRisk = 1; // Default low risk
    if (location.toLowerCase().includes('velachery')) locationRisk = 3;
    else if (location.toLowerCase().includes('nagar')) locationRisk = 2;

    const mlApiUrl = import.meta.env.VITE_ML_API_URL || 'http://localhost:8000';
    
    try {
      const response = await axios.post(`${mlApiUrl}/predict`, {
        hour: date.getHours(),
        day: date.getDay(),
        location_risk: locationRisk,
        weather: 0 // Mock clear weather
      });

      const data = response.data;
      if (data.error) {
          setError(data.error);
          setLoading(false);
          return;
      }

      // Convert ML response to UI elements
      let score = 20;
      let status = 'Safe';
      let recs = 'Normal precautions apply.';

      if (data.expected_crime === 'Assault' || data.highest_probability > 0.6) {
          score = 85;
          status = 'High Risk';
          recs = 'Avoid travelling alone. High probability of ' + data.expected_crime + '.';
      } else if (data.expected_crime === 'Theft' || data.expected_crime === 'Vandalism') {
          score = 45;
          status = 'Moderate';
          recs = 'Stay alert in crowded places. Watch out for ' + data.expected_crime + '.';
      }

      setResult({ score, status, recommendations: recs, mlData: data });
    } catch (err) {
      console.error(err);
      setError('Failed to connect to ML Prediction API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center text-slate-800">
        <MapPin className="mr-2 h-5 w-5 text-blue-500" /> Citizen Safety Checker
      </h2>
      <p className="text-sm text-slate-500 mb-4">Enter a location to check its predicted safety score in real-time using our ML model.</p>
      
      <form onSubmit={checkSafety} className="flex gap-2 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Enter an area (e.g. Velachery)"
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
        </div>
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center min-w-[80px]">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Check'}
        </button>
      </form>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm mb-4 border border-red-200">
          {error}
        </div>
      )}

      {result && (
        <div className={`p-4 rounded-lg border ${result.score > 60 ? 'bg-red-50 border-red-200' : result.score > 30 ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-bold text-lg flex items-center ${result.score > 60 ? 'text-red-700' : result.score > 30 ? 'text-yellow-700' : 'text-green-700'}`}>
              {result.score > 60 ? <ShieldAlert className="mr-2 h-5 w-5" /> : <ShieldCheck className="mr-2 h-5 w-5" />}
              {result.status}
            </h3>
            <span className={`text-2xl font-black ${result.score > 60 ? 'text-red-600' : result.score > 30 ? 'text-yellow-600' : 'text-green-600'}`}>
              {result.score}/100
            </span>
          </div>
          
          {result.mlData && (
             <div className="mt-3 p-3 bg-white/60 rounded border border-slate-200/50 text-xs text-slate-600">
                 <p className="font-semibold mb-1 text-slate-700">AI Prediction Insights:</p>
                 <ul className="grid grid-cols-2 gap-1">
                    {Object.entries(result.mlData.probability_distribution).map(([crime, prob]) => (
                        <li key={crime} className="flex justify-between">
                            <span>{crime}:</span> 
                            <span className="font-mono font-medium">{Math.round(prob * 100)}%</span>
                        </li>
                    ))}
                 </ul>
             </div>
          )}

          <div className="mt-4 pt-3 border-t border-slate-200/50">
            <p className="text-slate-700 text-sm"><strong>Recommendation:</strong> {result.recommendations}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitizenSafetyChecker;
