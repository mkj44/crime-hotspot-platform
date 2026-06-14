import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const mockCrimes = [
  { id: 1, latitude: 13.0827, longitude: 80.2707, type: 'Theft', severity: 4, locationName: 'Anna Nagar' },
  { id: 2, latitude: 13.0604, longitude: 80.2496, type: 'Assault', severity: 8, locationName: 'T Nagar' },
  { id: 3, latitude: 12.9784, longitude: 80.2184, type: 'Vandalism', severity: 6, locationName: 'Velachery' },
  { id: 4, latitude: 13.0100, longitude: 80.2200, type: 'Burglary', severity: 9, locationName: 'Guindy' }
];

const getMarkerColor = (severity) => {
  if (severity <= 4) return '#22c55e'; // green-500
  if (severity <= 7) return '#eab308'; // yellow-500
  return '#ef4444'; // red-500
};

const MapComponent = () => {
  const [crimes, setCrimes] = useState([]);

  useEffect(() => {
    const fetchCrimes = async () => {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      try {
        const response = await axios.get(`${apiUrl}/api/reports`);
        if (response.data && response.data.length > 0) {
           setCrimes(response.data);
        } else {
           setCrimes(mockCrimes); // Fallback to mock if db is empty
        }
      } catch (error) {
        console.error("Failed to fetch crimes from backend, using mock data.", error);
        setCrimes(mockCrimes);
      }
    };
    fetchCrimes();
  }, []);

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg border border-slate-200">
      <MapContainer center={[13.04, 80.24]} zoom={12} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {crimes.map(crime => (
          <CircleMarker
            key={crime.id}
            center={[crime.latitude || crime.location?.y || 0, crime.longitude || crime.location?.x || 0]}
            radius={20}
            pathOptions={{ 
                color: getMarkerColor(crime.severity), 
                fillColor: getMarkerColor(crime.severity), 
                fillOpacity: 0.6,
                weight: 2
            }}
          >
            <Popup>
              <div className="p-1">
                <strong className="text-slate-800">{crime.type}</strong>
                <p className="text-slate-600 text-sm mt-1">Severity: {crime.severity}/10</p>
                <p className="text-slate-600 text-sm">Location: {crime.locationName}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
