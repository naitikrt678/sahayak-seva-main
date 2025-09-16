import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Report } from '@/types';
import { Clock, MapPin, AlertTriangle, X } from 'lucide-react';
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

interface LiveMapDashboardProps {
  reports: Report[];
  isOpen: boolean;
  onClose: () => void;
}

const getUrgencyColor = (urgency?: string) => {
  switch (urgency) {
    case 'critical': return 'rgb(239, 68, 68)'; // red
    case 'high': return 'rgb(249, 115, 22)'; // orange
    case 'medium': return 'rgb(234, 179, 8)'; // yellow
    case 'low': return 'rgb(34, 197, 94)'; // green
    default: return 'rgb(107, 114, 128)'; // gray
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'in-process': return 'bg-blue-100 text-blue-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const createCustomIcon = (urgency?: string, status?: string) => {
  const color = getUrgencyColor(urgency);
  const opacity = status === 'completed' ? 0.6 : 1;
  
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); opacity: ${opacity};"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
    className: 'custom-marker'
  });
};

const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

export const LiveMapDashboard: React.FC<LiveMapDashboardProps> = ({ 
  reports, 
  isOpen, 
  onClose 
}) => {
  const [filteredReports, setFilteredReports] = useState<Report[]>(reports);
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Center of Jharkhand
  const jharkhandCenter: [number, number] = [23.6102, 85.2799];

  useEffect(() => {
    let filtered = reports;

    if (urgencyFilter !== 'all') {
      filtered = filtered.filter(report => report.urgency === urgencyFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(report => report.category === categoryFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    setFilteredReports(filtered);
  }, [reports, urgencyFilter, categoryFilter, statusFilter]);

  const categories = [...new Set(reports.map(r => r.category))];
  const urgencyLevels = ['critical', 'high', 'medium', 'low'];

  const urgencyStats = urgencyLevels.map(level => ({
    level,
    count: filteredReports.filter(r => r.urgency === level).length,
    color: getUrgencyColor(level)
  }));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-7xl h-[90vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-xl text-primary">Live Issues Dashboard</CardTitle>
            <p className="text-sm text-muted-foreground">
              Real-time map view of reported civic issues across Jharkhand
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col space-y-4">
          {/* Filters and Stats */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-process">In Process</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Urgency Legend */}
            <div className="flex gap-3">
              {urgencyStats.map(({ level, count, color }) => (
                <div key={level} className="flex items-center gap-1">
                  <div 
                    className="w-3 h-3 rounded-full border border-white"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs capitalize">{level}: {count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Container */}
          <div className="flex-1 rounded-lg overflow-hidden border" style={{ minHeight: '500px' }}>
            <MapContainer
              center={jharkhandCenter}
              zoom={7}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              <MapUpdater center={jharkhandCenter} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {filteredReports.map((report) => (
                <Marker
                  key={report.id}
                  position={[report.geolocation.lat, report.geolocation.lng]}
                  icon={createCustomIcon(report.urgency, report.status)}
                >
                  <Popup maxWidth={300}>
                    <div className="p-2 space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-sm">{report.requestId}</h3>
                          <p className="text-xs text-gray-600">{report.category}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Badge className={getStatusColor(report.status)} variant="secondary">
                            {report.status}
                          </Badge>
                          {report.urgency && (
                            <Badge 
                              variant="outline" 
                              style={{ 
                                borderColor: getUrgencyColor(report.urgency),
                                color: getUrgencyColor(report.urgency)
                              }}
                            >
                              {report.urgency}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Image */}
                      {report.image && (
                        <img 
                          src={report.image} 
                          alt={report.category}
                          className="w-full h-24 object-cover rounded"
                        />
                      )}

                      {/* Description */}
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {report.description}
                      </p>

                      {/* Location */}
                      <div className="flex items-start gap-1">
                        <MapPin className="h-3 w-3 text-gray-500 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {report.geolocation.address}
                        </p>
                      </div>

                      {/* Landmarks */}
                      {report.landmarks && (
                        <div className="flex items-start gap-1">
                          <AlertTriangle className="h-3 w-3 text-gray-500 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-gray-600">
                            Near: {report.landmarks}
                          </p>
                        </div>
                      )}

                      {/* Time & Date */}
                      <div className="flex items-center gap-1 pt-1 border-t">
                        <Clock className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-600">
                          {report.time}, {report.date}
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Summary Stats */}
          <div className="flex justify-between text-sm text-gray-600 pt-2 border-t">
            <span>Total Issues: {filteredReports.length}</span>
            <span>
              Critical: {filteredReports.filter(r => r.urgency === 'critical').length} | 
              Pending: {filteredReports.filter(r => r.status === 'pending').length} | 
              Completed: {filteredReports.filter(r => r.status === 'completed').length}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};