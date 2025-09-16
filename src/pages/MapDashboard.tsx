import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockReports } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VanillaMap } from "@/components/ui/vanilla-map";
import { ArrowLeft } from "lucide-react";

const MapDashboard = () => {
  const navigate = useNavigate();
  const [reports] = useState(mockReports);
  const [mapView, setMapView] = useState<'reports' | 'heatmap'>('reports');

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Green Header */}
      <header className="bg-gradient-header text-primary-foreground shadow-government">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleBackToDashboard}
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-light"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-government">SAHAYAK PORTAL - MAP VIEW</h1>
                <p className="text-sm opacity-90">Government of Jharkhand - Live Issue Map</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-primary">Live Issue Map Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-semibold text-green-800 mb-2">✅ Interactive Civic Reports Map</h3>
                    <p className="text-sm text-green-700">View individual reports or heat map analysis of issue frequency.</p>
                  </div>
                  
                  {/* Toggle Controls */}
                  <div className="flex bg-white rounded-lg p-1 border">
                    <button
                      onClick={() => setMapView('reports')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        mapView === 'reports'
                          ? 'bg-blue-500 text-white shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      📍 Individual Reports
                    </button>
                    <button
                      onClick={() => setMapView('heatmap')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        mapView === 'heatmap'
                          ? 'bg-red-500 text-white shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      🔥 Heat Map
                    </button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <VanillaMap 
                    height="500px" 
                    reports={reports} 
                    onMarkerClick={(reportId) => navigate(`/report/${reportId}`)} 
                    viewMode={mapView}
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-2 bg-white rounded border">
                    <div className="font-semibold text-blue-600">{reports.length}</div>
                    <div className="text-gray-600">Total Reports</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded border">
                    <div className="font-semibold text-red-600">{reports.filter(r => r.urgency === 'critical').length}</div>
                    <div className="text-gray-600">Critical</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded border">
                    <div className="font-semibold text-yellow-600">{reports.filter(r => r.status === 'pending').length}</div>
                    <div className="text-gray-600">Pending</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded border">
                    <div className="font-semibold text-green-600">{reports.filter(r => r.status === 'completed').length}</div>
                    <div className="text-gray-600">Completed</div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded">
                  <h4 className="font-semibold text-blue-800 mb-2">Legend:</h4>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Critical</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span>High</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Medium</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Low</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MapDashboard;