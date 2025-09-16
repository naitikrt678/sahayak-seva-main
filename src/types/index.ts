export interface Report {
  id: string;
  serialNumber: number;
  requestId: string;
  category: string;
  area: string;
  time: string;
  date: string;
  status: 'completed' | 'pending' | 'in-process';
  description: string;
  image?: string;
  audioNote?: string;
  geolocation: {
    lat: number;
    lng: number;
    address: string;
  };
  additionalNotes?: string;
  landmarks?: string;
  urgency?: 'low' | 'medium' | 'high' | 'critical';
}

export interface Worker {
  id: string;
  name: string;
  category: string;
  contact: string;
  area: string;
  available: boolean;
}

export interface User {
  username: string;
  name: string;
  designation: string;
  department: string;
  contact: string;
  email: string;
  location: string;
}

export interface DispatchedWorker {
  id: string;
  workerId: string;
  worker: {
    name: string;
    category: string;
    contact: string;
    area: string;
  };
  reportId: string;
  report: {
    requestId: string;
    category: string;
    area: string;
    urgency: string;
    description: string;
  };
  dispatchedAt: string;
  estimatedCompletion: string;
  status: 'active' | 'completed' | 'delayed';
  progress: string;
}