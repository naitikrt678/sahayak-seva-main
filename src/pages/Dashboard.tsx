import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockReports, mockDispatchedWorkers } from "@/data/mockData";
import { Report, DispatchedWorker } from "@/types";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, LogOut, Eye, FileText, Clock, CheckCircle, Map, ArrowUpDown, Users, Phone, MapPin, Timer, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { format, parseISO, subDays, startOfDay } from 'date-fns';

type SortOption = 'date-time' | 'urgency' | 'none';
type SortOrder = 'asc' | 'desc';

interface StatsComponentProps {
  reports: Report[];
}

const StatsComponent: React.FC<StatsComponentProps> = ({ reports }) => {
  const [chartType, setChartType] = useState<'reports-over-time' | 'category-breakdown' | 'urgency-distribution' | 'area-analysis' | 'status-overview'>('reports-over-time');
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | 'all'>('7days');

  // Process data for reports over time
  const getReportsOverTime = () => {
    const now = new Date();
    const days = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 365;
    const timeData: { [key: string]: number } = {};
    
    // Initialize with zeros
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(now, i);
      const dateStr = format(date, 'MM/dd');
      timeData[dateStr] = 0;
    }
    
    // Count reports for each day
    reports.forEach(report => {
      const [day, month, year] = report.date.split('/');
      const reportDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      const dateStr = format(reportDate, 'MM/dd');
      if (timeData.hasOwnProperty(dateStr)) {
        timeData[dateStr]++;
      }
    });
    
    return Object.entries(timeData).map(([date, count]) => ({ date, reports: count }));
  };

  // Process data for category breakdown
  const getCategoryBreakdown = () => {
    const categoryData: { [key: string]: number } = {};
    reports.forEach(report => {
      categoryData[report.category] = (categoryData[report.category] || 0) + 1;
    });
    return Object.entries(categoryData).map(([category, count]) => ({ category, count }));
  };

  // Process data for urgency distribution
  const getUrgencyDistribution = () => {
    const urgencyData: { [key: string]: number } = {
      'critical': 0,
      'high': 0,
      'medium': 0,
      'low': 0
    };
    reports.forEach(report => {
      if (report.urgency) {
        urgencyData[report.urgency]++;
      }
    });
    return Object.entries(urgencyData).map(([urgency, count]) => ({ 
      urgency: urgency.charAt(0).toUpperCase() + urgency.slice(1), 
      count 
    }));
  };

  // Process data for area analysis
  const getAreaAnalysis = () => {
    const areaData: { [key: string]: number } = {};
    reports.forEach(report => {
      areaData[report.area] = (areaData[report.area] || 0) + 1;
    });
    return Object.entries(areaData)
      .map(([area, count]) => ({ area, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 areas
  };

  // Process data for status overview
  const getStatusOverview = () => {
    const statusData: { [key: string]: number } = {
      'pending': 0,
      'in-process': 0,
      'completed': 0
    };
    reports.forEach(report => {
      statusData[report.status]++;
    });
    return Object.entries(statusData).map(([status, count]) => ({ 
      status: status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' '), 
      count 
    }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
  const URGENCY_COLORS = { 'Critical': '#DC2626', 'High': '#EA580C', 'Medium': '#CA8A04', 'Low': '#16A34A' };
  const STATUS_COLORS = { 'Pending': '#F59E0B', 'In process': '#3B82F6', 'Completed': '#10B981' };

  const renderChart = () => {
    switch (chartType) {
      case 'reports-over-time':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={getReportsOverTime()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="reports" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'category-breakdown':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={getCategoryBreakdown()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'urgency-distribution':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={getUrgencyDistribution()}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ urgency, count, percent }) => `${urgency}: ${count} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="count"
              >
                {getUrgencyDistribution().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={URGENCY_COLORS[entry.urgency as keyof typeof URGENCY_COLORS]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'area-analysis':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={getAreaAnalysis()} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="area" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'status-overview':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={getStatusOverview()}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, count, percent }) => `${status}: ${count} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="count"
              >
                {getStatusOverview().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <label className="text-sm font-medium">Chart Type:</label>
            <Select value={chartType} onValueChange={(value: any) => setChartType(value)}>
              <SelectTrigger className="w-48 mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reports-over-time">Reports Over Time</SelectItem>
                <SelectItem value="category-breakdown">Category Breakdown</SelectItem>
                <SelectItem value="urgency-distribution">Urgency Distribution</SelectItem>
                <SelectItem value="area-analysis">Area Analysis</SelectItem>
                <SelectItem value="status-overview">Status Overview</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {chartType === 'reports-over-time' && (
            <div>
              <label className="text-sm font-medium">Time Range:</label>
              <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
                <SelectTrigger className="w-32 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">7 Days</SelectItem>
                  <SelectItem value="30days">30 Days</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{reports.length}</div>
            <div className="text-sm text-gray-600">Total Reports</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {reports.filter(r => r.urgency === 'critical').length}
            </div>
            <div className="text-sm text-gray-600">Critical Issues</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {reports.filter(r => r.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {reports.filter(r => r.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </Card>
      </div>

      {/* Main Chart */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            {chartType === 'reports-over-time' && 'Reports Trend Over Time'}
            {chartType === 'category-breakdown' && 'Reports by Category'}
            {chartType === 'urgency-distribution' && 'Urgency Level Distribution'}
            {chartType === 'area-analysis' && 'Top 10 Areas by Report Count'}
            {chartType === 'status-overview' && 'Status Distribution'}
          </h3>
        </div>
        {renderChart()}
      </Card>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Summary */}
        <Card className="p-4">
          <h4 className="font-semibold mb-3">Category Summary</h4>
          <div className="space-y-2">
            {getCategoryBreakdown().slice(0, 5).map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{item.category}</span>
                <Badge variant="secondary">{item.count}</Badge>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Top Problem Areas */}
        <Card className="p-4">
          <h4 className="font-semibold mb-3">Top Problem Areas</h4>
          <div className="space-y-2">
            {getAreaAnalysis().slice(0, 5).map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{item.area}</span>
                <Badge variant="outline">{item.count} reports</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState(mockReports);
  const [sortBy, setSortBy] = useState<SortOption>('none');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [dispatchedWorkers] = useState<DispatchedWorker[]>(mockDispatchedWorkers);
  const [isWorkersDialogOpen, setIsWorkersDialogOpen] = useState(false);
  const [isStatsDialogOpen, setIsStatsDialogOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const handleReportClick = (reportId: string) => {
    navigate(`/report/${reportId}`);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const getUrgencyColor = (urgency?: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const parseDateTime = (date: string, time: string) => {
    const [day, month, year] = date.split('/');
    const [timeStr, period] = time.split(' ');
    const [hours, minutes] = timeStr.split(':');
    let hour24 = parseInt(hours);
    
    if (period === 'PM' && hour24 !== 12) {
      hour24 += 12;
    } else if (period === 'AM' && hour24 === 12) {
      hour24 = 0;
    }
    
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), hour24, parseInt(minutes));
  };

  const getUrgencyPriority = (urgency?: string) => {
    switch (urgency) {
      case 'critical': return 4;
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 0;
    }
  };

  const sortReports = (reportsToSort: Report[], sortBy: SortOption, order: SortOrder) => {
    if (sortBy === 'none') return reportsToSort;
    
    return [...reportsToSort].sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'date-time') {
        const dateA = parseDateTime(a.date, a.time);
        const dateB = parseDateTime(b.date, b.time);
        comparison = dateA.getTime() - dateB.getTime();
      } else if (sortBy === 'urgency') {
        const urgencyA = getUrgencyPriority(a.urgency);
        const urgencyB = getUrgencyPriority(b.urgency);
        comparison = urgencyA - urgencyB;
      }
      
      return order === 'asc' ? comparison : -comparison;
    });
  };

  const handleSortChange = (value: string) => {
    const newSortBy = value as SortOption;
    setSortBy(newSortBy);
    setReports(sortReports(mockReports, newSortBy, sortOrder));
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    setReports(sortReports(reports, sortBy, newOrder));
  };

  const pendingCount = reports.filter(r => r.status === 'pending').length;
  const completedCount = reports.filter(r => r.status === 'completed').length;
  const inProcessCount = reports.filter(r => r.status === 'in-process').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Green Header */}
      <header className="bg-gradient-header text-primary-foreground shadow-government">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-government">SAHAYAK PORTAL</h1>
              <p className="text-sm opacity-90">Government of Jharkhand - Admin Dashboard</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Dispatched Workers Button */}
              <Dialog open={isWorkersDialogOpen} onOpenChange={setIsWorkersDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-primary-light hover:bg-primary-light/80 text-primary-foreground"
                    size="sm"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Dispatched Workers
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-primary">
                      Dispatched Workers Overview
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    {/* Summary Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <Card className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {dispatchedWorkers.filter(w => w.status === 'active').length}
                          </div>
                          <div className="text-sm text-gray-600">Active Workers</div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {dispatchedWorkers.filter(w => w.status === 'completed').length}
                          </div>
                          <div className="text-sm text-gray-600">Completed Today</div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">
                            {dispatchedWorkers.length}
                          </div>
                          <div className="text-sm text-gray-600">Total Dispatched</div>
                        </div>
                      </Card>
                    </div>

                    {/* Workers List */}
                    <div className="space-y-4">
                      {dispatchedWorkers.map((worker) => (
                        <Card key={worker.id} className="p-4">
                          <div className="flex justify-between items-start">
                            {/* Worker Info */}
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="font-semibold text-lg">{worker.worker.name}</div>
                                <Badge 
                                  variant={worker.status === 'active' ? 'default' : worker.status === 'completed' ? 'secondary' : 'destructive'}
                                  className={`${
                                    worker.status === 'active' ? 'bg-blue-100 text-blue-800' :
                                    worker.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Category:</span> {worker.worker.category}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Area:</span> {worker.worker.area}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Contact:</span> {worker.worker.contact}
                                  </div>
                                </div>
                                
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Request ID:</span> {worker.report.requestId}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Timer className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Dispatched:</span> {worker.dispatchedAt}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Est. Completion:</span> {worker.estimatedCompletion}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Task Details */}
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <div className="mb-2">
                              <span className="font-medium text-sm">Task Description:</span>
                              <p className="text-sm text-gray-700 mt-1">{worker.report.description}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-medium text-sm">Progress:</span>
                                <span className="text-sm text-gray-700 ml-2">{worker.progress}</span>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={`${
                                  worker.report.urgency === 'critical' ? 'border-red-200 text-red-800' :
                                  worker.report.urgency === 'high' ? 'border-orange-200 text-orange-800' :
                                  worker.report.urgency === 'medium' ? 'border-yellow-200 text-yellow-800' :
                                  'border-green-200 text-green-800'
                                }`}
                              >
                                {worker.report.urgency ? worker.report.urgency.charAt(0).toUpperCase() + worker.report.urgency.slice(1) : 'Normal'} Priority
                              </Badge>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              {/* Analytics/Stats Button */}
              <Dialog open={isStatsDialogOpen} onOpenChange={setIsStatsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-primary-light hover:bg-primary-light/80 text-primary-foreground"
                    size="sm"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-primary">
                      Reports Analytics Dashboard
                    </DialogTitle>
                  </DialogHeader>
                  
                  <StatsComponent reports={reports} />
                </DialogContent>
              </Dialog>
              
              {/* Live Map Dashboard Button */}
              <Button
                onClick={() => navigate('/map')}
                className="bg-primary-light hover:bg-primary-light/80 text-primary-foreground"
                size="sm"
              >
                <Map className="h-4 w-4 mr-2" />
                Live Map
              </Button>
              
              {/* Status Overview */}
              <div className="flex gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold">{pendingCount}</div>
                  <div className="opacity-75">Pending</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{inProcessCount}</div>
                  <div className="opacity-75">In Process</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{completedCount}</div>
                  <div className="opacity-75">Completed</div>
                </div>
              </div>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-light">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={handleProfileClick}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Pending ({pendingCount})</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Clock className="mr-2 h-4 w-4" />
                    <span>In Process ({inProcessCount})</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span>Completed ({completedCount})</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-primary">Citizen Reports</CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Sort by:</span>
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select sort option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="date-time">Date & Time</SelectItem>
                      <SelectItem value="urgency">Urgency</SelectItem>
                    </SelectContent>
                  </Select>
                  {sortBy !== 'none' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleSortOrder}
                      className="ml-2"
                    >
                      <ArrowUpDown className="h-4 w-4 mr-1" />
                      {sortOrder === 'desc' ? 'Desc' : 'Asc'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S.No</TableHead>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Problem Category</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow 
                      key={report.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleReportClick(report.id)}
                    >
                      <TableCell>{report.serialNumber}</TableCell>
                      <TableCell className="font-medium">{report.requestId}</TableCell>
                      <TableCell>{report.category}</TableCell>
                      <TableCell>{report.area}</TableCell>
                      <TableCell>{report.time}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={getUrgencyColor(report.urgency)}
                        >
                          {report.urgency ? report.urgency.charAt(0).toUpperCase() + report.urgency.slice(1) : 'Not Set'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={report.status} />
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReportClick(report.id);
                          }}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;