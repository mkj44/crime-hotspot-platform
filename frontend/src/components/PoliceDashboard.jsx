import { Activity, AlertTriangle, Users, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PoliceDashboard = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      try {
        const response = await axios.get(`${apiUrl}/api/reports`);
        setReports(response.data || []);
      } catch (error) {
        console.error("Failed to fetch reports", error);
      }
    };
    fetchReports();
  }, []);

  const stats = [
    { label: 'Total Crimes', value: reports.length.toString(), icon: Activity, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'High Risk Reports', value: reports.filter(r => r.severity > 7).length.toString(), icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
    { label: 'Active Patrols', value: '12', icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
  ];
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold mb-6 flex items-center text-slate-800">
        <Shield className="mr-2 h-5 w-5 text-indigo-500" /> Police Analytics Dashboard
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-4 border border-slate-100 rounded-lg flex items-center bg-slate-50">
            <div className={`p-3 rounded-full ${stat.bg} ${stat.color} mr-4`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-end mb-3">
          <h3 className="font-semibold text-slate-700">Recent Incident Reports</h3>
          <button className="text-sm text-blue-600 hover:underline font-medium">View All</button>
        </div>
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((report) => (
              <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-800">{report.type}</td>
                <td className="px-4 py-3 text-slate-600">{report.locationName}</td>
                <td className="px-4 py-3 text-slate-500">Recent</td>
                <td className="px-4 py-3"><span className="bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full text-xs font-semibold">{report.status || 'Pending'}</span></td>
                <td className="px-4 py-3"><button className="text-blue-600 hover:text-blue-800 font-medium">Dispatch</button></td>
              </tr>
              ))}
              {reports.length === 0 && (
                <tr>
                   <td colSpan="5" className="px-4 py-8 text-center text-slate-500">No recent incident reports.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PoliceDashboard;
