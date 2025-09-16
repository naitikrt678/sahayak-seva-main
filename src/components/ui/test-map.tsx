import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

interface TestMapProps {
  height?: string;
}

export const TestMap: React.FC<TestMapProps> = ({ height = '400px' }) => {
  const [mapKey, setMapKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Jharkhand center coordinates
  const center: [number, number] = [23.6102, 85.2799];

  useEffect(() => {
    // Force re-render and stop loading after a delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      setMapKey(prev => prev + 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleError = (err: any) => {
    console.error('Map error:', err);
    setError('Failed to load map tiles');
    setIsLoading(false);
  };

  if (error) {
    return (
      <div 
        style={{ height, width: '100%' }} 
        className="flex items-center justify-center bg-gray-100 border rounded"
      >
        <div className="text-center p-4">
          <p className="text-red-600 mb-2">Map Error</p>
          <p className="text-sm text-gray-600">{error}</p>
          <button 
            onClick={() => {
              setError(null);
              setIsLoading(true);
              setMapKey(prev => prev + 1);
            }}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height, width: '100%', position: 'relative' }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10 rounded">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      
      <div className="w-full h-full border rounded">
        <MapContainer
          key={mapKey}
          center={center}
          zoom={7}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          whenReady={() => {
            console.log('Map container ready!');
            setTimeout(() => setIsLoading(false), 500);
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center}>
            <Popup>
              <div>
                <h3>Test Marker</h3>
                <p>Jharkhand, India</p>
                <p>If you can see this, the map is working!</p>
                <p>Coordinates: {center[0]}, {center[1]}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};