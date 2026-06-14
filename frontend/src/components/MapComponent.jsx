import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const crimes = [
  { id: 1, lat: 13.0827, lng: 80.2707, type: 'Theft', severity: 4, area: 'Anna Nagar' },
  { id: 2, lat: 13.0604, lng: 80.2496, type: 'Assault', severity: 8, area: 'T Nagar' },
  { id: 3, lat: 12.9784, lng: 80.2184, type: 'Vandalism', severity: 6, area: 'Velachery' },
  { id: 4, lat: 13.0100, lng: 80.2200, type: 'Burglary', severity: 9, area: 'Guindy' }
];

const getMarkerColor = (severity) => {
  if (severity <= 4) return '#22c55e'; // green-500
  if (severity <= 7) return '#eab308'; // yellow-500
  return '#ef4444'; // red-500
};

const MapComponent = () => {
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
            center={[crime.lat, crime.lng]}
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
                <p className="text-slate-600 text-sm">Location: {crime.area}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
