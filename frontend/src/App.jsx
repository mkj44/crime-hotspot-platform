import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import MapComponent from './components/MapComponent'
import CitizenSafetyChecker from './components/CitizenSafetyChecker'
import PoliceDashboard from './components/PoliceDashboard'
import ReportCrime from './components/ReportCrime'
import { ShieldAlert } from 'lucide-react'

// Main Dashboard View component to combine Map and Safety Checker
const DashboardView = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2 flex flex-col">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Live Crime Heatmap</h2>
      </div>
      <MapComponent />
    </div>
    <div className="lg:col-span-1 flex flex-col pt-12">
      <CitizenSafetyChecker />
    </div>
  </div>
)

const NavLinks = () => {
  const location = useLocation();
  const getLinkClass = (path) => {
      return location.pathname === path 
        ? "text-blue-400 font-bold transition border-b-2 border-blue-400 pb-1" 
        : "text-slate-300 hover:text-white transition font-medium pb-1 border-b-2 border-transparent hover:border-slate-300";
  };
  
  return (
    <div className="hidden md:flex space-x-8">
      <Link to="/" className={getLinkClass('/')}>Dashboard</Link>
      <Link to="/report" className={getLinkClass('/report')}>Report Crime</Link>
      <Link to="/analytics" className={getLinkClass('/analytics')}>Analytics</Link>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
        {/* Navbar */}
        <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center gap-2">
                <ShieldAlert className="h-8 w-8 text-blue-400" />
                <span className="font-bold text-xl tracking-tight">Crime<span className="text-blue-400">Hotspot</span> Intel</span>
              </Link>
              
              <NavLinks />

              <div className="flex items-center">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition">
                  Login
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
          <Routes>
            <Route path="/" element={<DashboardView />} />
            <Route path="/report" element={<ReportCrime />} />
            <Route path="/analytics" element={
              <div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-6">Law Enforcement View</h2>
                <PoliceDashboard />
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
