import { useParams, useNavigate } from "react-router-dom";
import { mockReports } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { ArrowLeft, MapPin, Calendar, Clock, FileText, Headphones } from "lucide-react";

const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const report = mockReports.find(r => r.id === id);

  if (!report) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-xl font-semibold">Report not found</h1>
            <Button onClick={() => navigate("/dashboard")} className="mt-4">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDispatch = () => {
    navigate(`/workers/${report.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-header text-primary-foreground shadow-government">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/dashboard")}
              className="text-primary-foreground hover:bg-primary-light mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-government">Report Details</h1>
              <p className="text-sm opacity-90">Request ID: {report.requestId}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-primary">Submitted Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-2" />
                  <p>Citizen submitted image</p>
                  <p className="text-sm">(Demo: Image would display here)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Information */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-primary">Report Information</span>
                <StatusBadge status={report.status} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {report.date}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {report.time}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{report.category}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Area</p>
                <p>{report.area}</p>
              </div>
            </CardContent>
          </Card>

          {/* Location Details */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-primary">Location Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address
                </p>
                <p>{report.geolocation.address}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Latitude</p>
                  <p className="font-mono text-sm">{report.geolocation.lat}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Longitude</p>
                  <p className="font-mono text-sm">{report.geolocation.lng}</p>
                </div>
              </div>
              
              {report.landmarks && (
                <div>
                  <p className="text-sm text-muted-foreground">Landmarks</p>
                  <p>{report.landmarks}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Description and Notes */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-primary">Description & Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Problem Description</p>
                <p className="bg-muted p-3 rounded-lg">{report.description}</p>
              </div>
              
              {report.additionalNotes && (
                <div>
                  <p className="text-sm text-muted-foreground">Additional Notes</p>
                  <p className="bg-muted p-3 rounded-lg">{report.additionalNotes}</p>
                </div>
              )}
              
              {report.audioNote && (
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Headphones className="h-4 w-4" />
                    Audio Voice Note
                  </p>
                  <div className="bg-muted p-3 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">(Demo: Audio player would be here)</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Dispatch Button */}
        <div className="mt-8 text-center">
          <Button 
            onClick={handleDispatch}
            className="bg-success hover:bg-success/90 text-success-foreground px-12 py-3 text-lg font-semibold"
            size="lg"
          >
            DISPATCH
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ReportDetails;