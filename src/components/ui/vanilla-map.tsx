import React, { useEffect, useRef, useState } from 'react';
import { Report } from '@/types';
import L from 'leaflet';
import 'leaflet.heat';

// Extend Leaflet types for heatLayer
declare module 'leaflet' {
  function heatLayer(latlngs: number[][], options?: any): any;
}

// Fix default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface VanillaMapProps {
  height?: string;
  reports?: Report[];
  onMarkerClick?: (reportId: string) => void;
  viewMode?: 'reports' | 'heatmap';
}

export const VanillaMap: React.FC<VanillaMapProps> = ({ height = '400px', reports = [], onMarkerClick, viewMode = 'reports' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const heatLayerRef = useRef<any>(null);
  const legendRef = useRef<any>(null);
  const [mapStatus, setMapStatus] = useState('Loading...');

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current && L) {
        try {
          // Create map only once
          if (!mapInstanceRef.current) {
            const map = L.map(mapRef.current).setView([23.6102, 85.2799], 7);
            
            // Add tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            mapInstanceRef.current = map;
            setMapStatus('Map loaded successfully! 🎉');
            console.log('Direct Leaflet import map created successfully!');
          }
        } catch (error) {
          console.error('Map initialization error:', error);
          setMapStatus(`Error: ${error}`);
        }
      } else {
        setMapStatus('Leaflet library not available');
      }
    };

    // Initialize map only once
    if (!mapInstanceRef.current) {
      initMap();
      const timer = setTimeout(initMap, 1000);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  // Separate useEffect for updating map content based on viewMode
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    
    const map = mapInstanceRef.current;
    
    // Clear existing markers and layers
    markersRef.current.forEach(marker => {
      map.removeLayer(marker);
    });
    markersRef.current = [];
    
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
      heatLayerRef.current = null;
    }
    
    if (legendRef.current) {
      map.removeControl(legendRef.current);
      legendRef.current = null;
    }

    // Function to get marker color based on urgency
    const getMarkerColor = (urgency?: string) => {
      switch (urgency) {
        case 'critical': return '#dc2626'; // red
        case 'high': return '#ea580c'; // orange
        case 'medium': return '#ca8a04'; // yellow
        case 'low': return '#16a34a'; // green
        default: return '#3b82f6'; // blue
      }
    };

    // Add markers or heatmap based on view mode
    if (viewMode === 'heatmap') {
      // Create heat map data points with proper intensity weights
      const heatMapData: number[][] = [];
      
      reports.forEach(report => {
        if (report.geolocation?.lat && report.geolocation?.lng) {
          // Weight based on urgency
          let baseIntensity = 0.3;
          switch (report.urgency) {
            case 'critical': baseIntensity = 1.0; break;
            case 'high': baseIntensity = 0.8; break;
            case 'medium': baseIntensity = 0.6; break;
            case 'low': baseIntensity = 0.4; break;
          }
          
          // Add main point
          heatMapData.push([
            report.geolocation.lat, 
            report.geolocation.lng, 
            baseIntensity
          ]);
          
          // Add cluster points for critical and high urgency to show intensity
          if (report.urgency === 'critical' || report.urgency === 'high') {
            const numClusterPoints = report.urgency === 'critical' ? 5 : 3;
            for (let i = 0; i < numClusterPoints; i++) {
              heatMapData.push([
                report.geolocation.lat + (Math.random() - 0.5) * 0.003,
                report.geolocation.lng + (Math.random() - 0.5) * 0.003,
                baseIntensity * (0.5 + Math.random() * 0.5)
              ]);
            }
          }
          
          // Add some medium intensity points around medium/low urgency areas
          if (report.urgency === 'medium') {
            for (let i = 0; i < 2; i++) {
              heatMapData.push([
                report.geolocation.lat + (Math.random() - 0.5) * 0.002,
                report.geolocation.lng + (Math.random() - 0.5) * 0.002,
                baseIntensity * 0.6
              ]);
            }
          }
        }
      });

      // Create the actual heatmap layer using Leaflet.heat with enhanced colors
      if (heatMapData.length > 0) {
        const heatLayer = (L as any).heatLayer(heatMapData, {
          radius: 40,          // Increased from 30 for more coverage
          blur: 25,            // Increased from 20 for smoother blending
          maxZoom: 17,
          max: 1.0,
          minOpacity: 0.3,     // Added minimum opacity for better visibility
          gradient: {
            0.1: '#000080',    // Deep blue for very low intensity
            0.2: '#0000FF',    // Bright blue
            0.3: '#00FFFF',    // Cyan
            0.4: '#00FF00',    // Bright green
            0.5: '#80FF00',    // Yellow-green
            0.6: '#FFFF00',    // Bright yellow
            0.7: '#FF8000',    // Orange
            0.8: '#FF4000',    // Red-orange
            0.9: '#FF0000',    // Bright red
            1.0: '#CC0000'     // Dark red for maximum intensity
          }
        }).addTo(map);
        
        heatLayerRef.current = heatLayer;
        console.log('Enhanced heatmap created with', heatMapData.length, 'data points');
      }
      
      // Add enhanced legend for heat map with updated colors
      const legend = (L as any).control({ position: 'bottomright' });
      legend.onAdd = function() {
        const div = L.DomUtil.create('div', 'info legend');
        div.innerHTML = `
          <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); min-width: 120px;">
            <h4 style="margin: 0 0 10px 0; font-size: 13px; font-weight: bold; color: #1f2937;">Issue Intensity</h4>
            <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 20px; height: 8px; background: linear-gradient(to right, #000080, #0000FF, #00FFFF, #00FF00, #80FF00, #FFFF00, #FF8000, #FF4000, #FF0000, #CC0000); border-radius: 4px;"></div>
                <span style="color: #374151;">Heat Gradient</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-top: 4px; color: #6b7280;">
                <span>Low</span>
                <span>High</span>
              </div>
              <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb; color: #6b7280;">
                Urgency Levels:<br>
                <span style="color: #dc2626;">● Critical</span> | 
                <span style="color: #ea580c;">● High</span><br>
                <span style="color: #ca8a04;">● Medium</span> | 
                <span style="color: #16a34a;">● Low</span>
              </div>
            </div>
          </div>
        `;
        return div;
      };
      legend.addTo(map);
      legendRef.current = legend;
      
    } else {
      // Individual Reports Mode (existing functionality)
      if (reports.length > 0) {
        reports.forEach(report => {
          if (report.geolocation?.lat && report.geolocation?.lng) {
            const color = getMarkerColor(report.urgency);
            
            // Create custom colored marker with larger click zone
            const customIcon = L.divIcon({
              html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 3px 6px rgba(0,0,0,0.4);"></div>`,
              className: 'custom-marker',
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            });

            const marker = L.marker([report.geolocation.lat, report.geolocation.lng], {
              icon: customIcon
            }).addTo(map);
            
            markersRef.current.push(marker);

            // Create popup content
            const popupContent = `
              <div style="min-width: 250px;">
                <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">${report.requestId}</h3>
                <p style="margin: 0 0 6px 0; color: #374151; font-size: 14px;"><strong>${report.category}</strong></p>
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px;">${report.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="background: ${color}; color: white; padding: 2px 6px; border-radius: 12px; font-size: 11px;">${report.urgency || 'N/A'}</span>
                  <span style="color: #6b7280; font-size: 12px;">${report.time}, ${report.date}</span>
                </div>
                <button 
                  onclick="window.handleReportClick('${report.id}')"
                  style="
                    background: #3b82f6; 
                    color: white; 
                    border: none; 
                    padding: 6px 12px; 
                    border-radius: 4px; 
                    cursor: pointer; 
                    font-size: 12px;
                    width: 100%;
                  "
                >
                  View Details
                </button>
              </div>
            `;

            marker.bindPopup(popupContent);
          }
        });

        // Set global click handler
        (window as any).handleReportClick = (reportId: string) => {
          if (onMarkerClick) {
            onMarkerClick(reportId);
          }
        };
      } else {
        // Add default marker if no reports
        const defaultMarker = L.marker([23.6102, 85.2799])
          .addTo(map)
          .bindPopup('Jharkhand, India<br>No reports to display')
          .openPopup();
        markersRef.current.push(defaultMarker);
      }
    }
  }, [reports, onMarkerClick, viewMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ height, width: '100%', position: 'relative' }}>
      <div 
        ref={mapRef} 
        style={{ height: '100%', width: '100%' }} 
        className="border rounded"
      />
      {mapStatus !== 'Map loaded successfully! 🎉' && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
          <div className="text-center p-4">
            <div className="text-lg mb-2">🗺️</div>
            <p className="text-sm text-gray-600">{mapStatus}</p>
          </div>
        </div>
      )}
    </div>
  );
};