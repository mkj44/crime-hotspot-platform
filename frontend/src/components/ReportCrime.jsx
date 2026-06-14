import { ShieldAlert, Send } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const ReportCrime = () => {
  const [formData, setFormData] = useState({ crimeType: 'Theft', locationName: '', severity: 5, description: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simple mock coordinates generator based on location name
    const lat = 13.0 + (Math.random() * 0.1);
    const lng = 80.2 + (Math.random() * 0.1);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    try {
        await axios.post(`${apiUrl}/api/crimes`, {
            crimeType: formData.crimeType,
            description: formData.description,
            severity: parseInt(formData.severity),
            latitude: lat,
            longitude: lng
        });
        alert('Crime report submitted successfully to the backend!');
        setFormData({ crimeType: 'Theft', locationName: '', severity: 5, description: '' });
    } catch (err) {
        console.error(err);
        alert('Failed to submit report. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-slate-800">
        <ShieldAlert className="mr-3 h-6 w-6 text-red-500" /> Report an Incident
      </h2>
      <p className="text-slate-500 mb-6">If this is an emergency, please call the police immediately. Use this form for non-emergency reporting.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Crime Type</label>
          <select 
            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
            value={formData.crimeType} onChange={e => setFormData({...formData, crimeType: e.target.value})}
          >
            <option>Theft</option>
            <option>Assault</option>
            <option>Vandalism</option>
            <option>Burglary</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Location Area</label>
          <input 
            type="text" required placeholder="e.g. Velachery"
            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.locationName} onChange={e => setFormData({...formData, locationName: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Severity (1-10)</label>
          <input 
            type="range" min="1" max="10" 
            className="w-full"
            value={formData.severity} onChange={e => setFormData({...formData, severity: e.target.value})}
          />
          <div className="text-right text-sm text-slate-500 font-medium">Current Selection: {formData.severity}</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea 
            rows="4" placeholder="Describe what happened..."
            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
          ></textarea>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center transition">
          <Send className="w-5 h-5 mr-2" /> {loading ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

export default ReportCrime;
