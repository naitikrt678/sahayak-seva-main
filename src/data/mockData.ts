import { Report, Worker, User } from '../types';

export const mockReports: Report[] = [
  {
    id: '1',
    serialNumber: 1,
    requestId: 'JH2024001',
    category: 'Road Maintenance',
    area: 'Ranchi Central',
    time: '10:30 AM',
    date: '15/03/2025',
    status: 'pending',
    description: 'Main road me bada pothole hai, traffic jam ho raha hai',
    geolocation: {
      lat: 23.3441,
      lng: 85.3096,
      address: 'Main Road, Ranchi Central, Jharkhand'
    },
    additionalNotes: 'Near State Bank ke paas',
    landmarks: 'State Bank of India building',
    urgency: 'high',
    image: 'https://via.placeholder.com/300x200?text=Road+Pothole'
  },
  {
    id: '2',
    serialNumber: 2,
    requestId: 'JH2024002',
    category: 'Street Cleaning',
    area: 'Dhanbad Market',
    time: '02:15 PM',
    date: '15/03/2025',
    status: 'completed' as const,
    description: 'Market area me bahut gandagi hai, cleaning ki zaroorat hai',
    geolocation: {
      lat: 23.7957,
      lng: 86.4304,
      address: 'Market Road, Dhanbad, Jharkhand'
    },
    additionalNotes: 'Sabzi mandi ke samne',
    urgency: 'medium',
    image: 'https://via.placeholder.com/300x200?text=Market+Cleaning'
  },
  {
    id: '3',
    serialNumber: 3,
    requestId: 'JH2024003',
    category: 'Water Supply',
    area: 'Jamshedpur Steel City',
    time: '08:45 AM',
    date: '16/03/2025',
    status: 'in-process',
    description: 'Paani ki supply band hai 3 din se',
    geolocation: {
      lat: 22.8046,
      lng: 86.2029,
      address: 'Steel City, Jamshedpur, Jharkhand'
    },
    landmarks: 'Tata Steel plant ke paas',
    urgency: 'critical',
    image: 'https://via.placeholder.com/300x200?text=Water+Supply+Issue'
  },
  {
    id: '4',
    serialNumber: 4,
    requestId: 'JH2024004',
    category: 'Electricity',
    area: 'Bokaro Township',
    time: '06:20 PM',
    date: '16/03/2025',
    status: 'pending',
    description: 'Street light nahi jal rahi, raat me andhere me problem',
    geolocation: {
      lat: 23.6693,
      lng: 86.1511,
      address: 'Township Area, Bokaro, Jharkhand'
    },
    additionalNotes: 'Sector 4 me sabhi lights off hai',
    urgency: 'high',
    image: 'https://via.placeholder.com/300x200?text=Street+Light+Issue'
  },
  {
    id: '5',
    serialNumber: 5,
    requestId: 'JH2024005',
    category: 'Waste Management',
    area: 'Hazaribagh City',
    time: '11:00 AM',
    date: '17/03/2025',
    status: 'completed' as const,
    description: 'Garbage collection nahi hua last week se',
    geolocation: {
      lat: 23.9929,
      lng: 85.3647,
      address: 'City Center, Hazaribagh, Jharkhand'
    },
    landmarks: 'DC Office ke samne',
    urgency: 'medium',
    image: 'https://via.placeholder.com/300x200?text=Garbage+Collection'
  },
  // Additional reports for map visualization
  {
    id: '6',
    serialNumber: 6,
    requestId: 'JH2024006',
    category: 'Road Maintenance',
    area: 'Deoghar Temple Area',
    time: '09:15 AM',
    date: '17/03/2025',
    status: 'pending',
    description: 'Temple ke paas road me gaddhe, devotees ko problem',
    geolocation: {
      lat: 24.4851,
      lng: 86.6975,
      address: 'Temple Road, Deoghar, Jharkhand'
    },
    landmarks: 'Baba Baidyanath Temple',
    urgency: 'high',
    image: 'https://via.placeholder.com/300x200?text=Temple+Road+Issue'
  },
  {
    id: '7',
    serialNumber: 7,
    requestId: 'JH2024007',
    category: 'Water Supply',
    area: 'Giridih Market',
    time: '07:30 AM',
    date: '18/03/2025',
    status: 'in-process',
    description: 'Hand pump kharab hai, paani nahi aa raha',
    geolocation: {
      lat: 24.1870,
      lng: 86.3006,
      address: 'Market Square, Giridih, Jharkhand'
    },
    urgency: 'critical',
    image: 'https://via.placeholder.com/300x200?text=Hand+Pump+Issue'
  },
  {
    id: '8',
    serialNumber: 8,
    requestId: 'JH2024008',
    category: 'Electricity',
    area: 'Palamu District',
    time: '05:45 PM',
    date: '18/03/2025',
    status: 'pending',
    description: 'Transformer blast, poora mohalla me light nahi',
    geolocation: {
      lat: 23.8415,
      lng: 84.0784,
      address: 'Main Market, Daltonganj, Palamu, Jharkhand'
    },
    urgency: 'critical',
    image: 'https://via.placeholder.com/300x200?text=Transformer+Issue'
  },
  {
    id: '9',
    serialNumber: 9,
    requestId: 'JH2024009',
    category: 'Street Cleaning',
    area: 'Chaibasa Township',
    time: '12:20 PM',
    date: '19/03/2025',
    status: 'pending',
    description: 'Road pe plastic waste aur kachra bhara pada hai',
    geolocation: {
      lat: 22.5541,
      lng: 85.8070,
      address: 'Township Road, Chaibasa, Jharkhand'
    },
    urgency: 'medium',
    image: 'https://via.placeholder.com/300x200?text=Plastic+Waste'
  },
  {
    id: '10',
    serialNumber: 10,
    requestId: 'JH2024010',
    category: 'Road Maintenance',
    area: 'Gumla Forest Area',
    time: '03:10 PM',
    date: '19/03/2025',
    status: 'in-process',
    description: 'Jungle road completely damaged, vehicles cannot pass',
    geolocation: {
      lat: 23.0433,
      lng: 84.5384,
      address: 'Forest Road, Gumla, Jharkhand'
    },
    urgency: 'high',
    image: 'https://via.placeholder.com/300x200?text=Forest+Road+Damage'
  },
  {
    id: '11',
    serialNumber: 11,
    requestId: 'JH2024011',
    category: 'Water Supply',
    area: 'Koderma Station',
    time: '06:00 AM',
    date: '20/03/2025',
    status: 'pending',
    description: 'Railway station ke paas water crisis, passengers ko problem',
    geolocation: {
      lat: 24.4686,
      lng: 85.5937,
      address: 'Railway Station Road, Koderma, Jharkhand'
    },
    landmarks: 'Koderma Railway Station',
    urgency: 'high',
    image: 'https://via.placeholder.com/300x200?text=Station+Water+Crisis'
  },
  {
    id: '12',
    serialNumber: 12,
    requestId: 'JH2024012',
    category: 'Waste Management',
    area: 'Ramgarh Cantonment',
    time: '04:30 PM',
    date: '20/03/2025',
    status: 'completed' as const,
    description: 'Cantonment area me garbage overflowing',
    geolocation: {
      lat: 23.6225,
      lng: 85.5197,
      address: 'Cantonment Area, Ramgarh, Jharkhand'
    },
    urgency: 'medium',
    image: 'https://via.placeholder.com/300x200?text=Cantonment+Garbage'
  },
  {
    id: '13',
    serialNumber: 13,
    requestId: 'JH2024013',
    category: 'Electricity',
    area: 'Lohardaga Town',
    time: '08:15 AM',
    date: '21/03/2025',
    status: 'pending',
    description: 'Power cut se schools aur hospitals affected',
    geolocation: {
      lat: 23.4341,
      lng: 84.6811,
      address: 'Town Center, Lohardaga, Jharkhand'
    },
    urgency: 'critical',
    image: 'https://via.placeholder.com/300x200?text=Power+Cut+Issue'
  },
  {
    id: '14',
    serialNumber: 14,
    requestId: 'JH2024014',
    category: 'Road Maintenance',
    area: 'Simdega Highway',
    time: '01:45 PM',
    date: '21/03/2025',
    status: 'in-process',
    description: 'National highway pe major potholes, accidents ho rahe',
    geolocation: {
      lat: 22.6169,
      lng: 84.5125,
      address: 'NH-75, Simdega, Jharkhand'
    },
    urgency: 'critical',
    image: 'https://via.placeholder.com/300x200?text=Highway+Potholes'
  },
  {
    id: '15',
    serialNumber: 15,
    requestId: 'JH2024015',
    category: 'Street Cleaning',
    area: 'Pakur Border Area',
    time: '10:00 AM',
    date: '22/03/2025',
    status: 'pending',
    description: 'Border area me cleanliness issue, health risk',
    geolocation: {
      lat: 24.6340,
      lng: 87.8479,
      address: 'Border Road, Pakur, Jharkhand'
    },
    urgency: 'high',
    image: 'https://via.placeholder.com/300x200?text=Border+Cleaning'
  },
  // Low urgency reports
  {
    id: '16',
    serialNumber: 16,
    requestId: 'JH2024016',
    category: 'Park Maintenance',
    area: 'Ranchi Morabadi',
    time: '09:30 AM',
    date: '22/03/2025',
    status: 'pending',
    description: 'Park me kuch benches repair ki zaroorat hai',
    geolocation: {
      lat: 23.3569,
      lng: 85.3349,
      address: 'Morabadi Ground, Ranchi, Jharkhand'
    },
    landmarks: 'Morabadi Ground',
    urgency: 'low',
    image: 'https://via.placeholder.com/300x200?text=Park+Bench+Repair'
  },
  {
    id: '17',
    serialNumber: 17,
    requestId: 'JH2024017',
    category: 'Street Signage',
    area: 'Dhanbad City Center',
    time: '11:15 AM',
    date: '23/03/2025',
    status: 'completed' as const,
    description: 'Road sign board thoda faded hai, replace karna hai',
    geolocation: {
      lat: 23.7879,
      lng: 86.4284,
      address: 'City Center, Dhanbad, Jharkhand'
    },
    urgency: 'low',
    image: 'https://via.placeholder.com/300x200?text=Road+Sign+Replacement'
  },
  {
    id: '18',
    serialNumber: 18,
    requestId: 'JH2024018',
    category: 'Garden Maintenance',
    area: 'Jamshedpur Jubilee Park',
    time: '02:00 PM',
    date: '23/03/2025',
    status: 'pending',
    description: 'Garden me kuch plants ki trimming aur watering system check',
    geolocation: {
      lat: 22.7925,
      lng: 86.1842,
      address: 'Jubilee Park, Jamshedpur, Jharkhand'
    },
    landmarks: 'Jubilee Park main entrance',
    urgency: 'low',
    image: 'https://via.placeholder.com/300x200?text=Garden+Maintenance'
  },
  {
    id: '19',
    serialNumber: 19,
    requestId: 'JH2024019',
    category: 'Community Hall',
    area: 'Bokaro Sector 1',
    time: '04:45 PM',
    date: '24/03/2025',
    status: 'in-process',
    description: 'Community hall me fan aur light fittings ki general maintenance',
    geolocation: {
      lat: 23.6739,
      lng: 86.1511,
      address: 'Sector 1, Bokaro Steel City, Jharkhand'
    },
    urgency: 'low',
    image: 'https://via.placeholder.com/300x200?text=Community+Hall+Maintenance'
  },
  {
    id: '20',
    serialNumber: 20,
    requestId: 'JH2024020',
    category: 'Bus Stop Maintenance',
    area: 'Hazaribagh Main Road',
    time: '07:20 AM',
    date: '24/03/2025',
    status: 'pending',
    description: 'Bus stop ki shed me minor repair aur cleaning ki zaroorat',
    geolocation: {
      lat: 23.9875,
      lng: 85.3678,
      address: 'Main Road Bus Stop, Hazaribagh, Jharkhand'
    },
    urgency: 'low',
    image: 'https://via.placeholder.com/300x200?text=Bus+Stop+Repair'
  },
  {
    id: '21',
    serialNumber: 21,
    requestId: 'JH2024021',
    category: 'Road Marking',
    area: 'Deoghar Temple Road',
    time: '08:00 AM',
    date: '25/03/2025',
    status: 'completed' as const,
    description: 'Zebra crossing ki lines refresh karni hai',
    geolocation: {
      lat: 24.4821,
      lng: 86.6958,
      address: 'Temple Approach Road, Deoghar, Jharkhand'
    },
    urgency: 'low',
    image: 'https://via.placeholder.com/300x200?text=Zebra+Crossing+Marking'
  },
  {
    id: '22',
    serialNumber: 22,
    requestId: 'JH2024022',
    category: 'Public Toilet',
    area: 'Giridih Market Complex',
    time: '10:30 AM',
    date: '25/03/2025',
    status: 'pending',
    description: 'Public toilet me minor plumbing issue aur cleaning supplies refill',
    geolocation: {
      lat: 24.1845,
      lng: 86.2987,
      address: 'Market Complex, Giridih, Jharkhand'
    },
    urgency: 'low',
    image: 'https://via.placeholder.com/300x200?text=Public+Toilet+Maintenance'
  }
];

export const mockWorkers: Worker[] = [
  {
    id: 'w1',
    name: 'Rajesh Kumar Singh',
    category: 'Road Maintenance',
    contact: '+91 9876543210',
    area: 'Ranchi Central',
    available: true
  },
  {
    id: 'w2',
    name: 'Amit Kumar Mahto',
    category: 'Road Maintenance',
    contact: '+91 9876543211',
    area: 'Ranchi West',
    available: true
  },
  {
    id: 'w3',
    name: 'Sunita Devi',
    category: 'Street Cleaning',
    contact: '+91 9876543212',
    area: 'Dhanbad Market',
    available: false
  },
  {
    id: 'w4',
    name: 'Raman Kumar',
    category: 'Water Supply',
    contact: '+91 9876543213',
    area: 'Jamshedpur Steel City',
    available: true
  },
  {
    id: 'w5',
    name: 'Priya Singh',
    category: 'Electricity',
    contact: '+91 9876543214',
    area: 'Bokaro Township',
    available: true
  },
  {
    id: 'w6',
    name: 'Deepak Kumar Yadav',
    category: 'Waste Management',
    contact: '+91 9876543215',
    area: 'Hazaribagh City',
    available: true
  }
];

export const mockDispatchedWorkers = [
  {
    id: 'dw1',
    workerId: 'w1',
    worker: {
      name: 'Rajesh Kumar Singh',
      category: 'Road Maintenance',
      contact: '+91 9876543210',
      area: 'Ranchi Central'
    },
    reportId: '1',
    report: {
      requestId: 'JH2024001',
      category: 'Road Maintenance',
      area: 'Ranchi Central',
      urgency: 'high',
      description: 'Main road me bada pothole hai, traffic jam ho raha hai'
    },
    dispatchedAt: '16/03/2025 09:00 AM',
    estimatedCompletion: '17/03/2025 05:00 PM',
    status: 'active' as const,
    progress: 'En route to location'
  },
  {
    id: 'dw2',
    workerId: 'w4',
    worker: {
      name: 'Raman Kumar',
      category: 'Water Supply',
      contact: '+91 9876543213',
      area: 'Jamshedpur Steel City'
    },
    reportId: '3',
    report: {
      requestId: 'JH2024003',
      category: 'Water Supply',
      area: 'Jamshedpur Steel City',
      urgency: 'critical',
      description: 'Paani ki supply band hai 3 din se'
    },
    dispatchedAt: '16/03/2025 10:30 AM',
    estimatedCompletion: '16/03/2025 06:00 PM',
    status: 'active' as const,
    progress: 'Working on site - pipe repair in progress'
  },
  {
    id: 'dw3',
    workerId: 'w5',
    worker: {
      name: 'Priya Singh',
      category: 'Electricity',
      contact: '+91 9876543214',
      area: 'Bokaro Township'
    },
    reportId: '4',
    report: {
      requestId: 'JH2024004',
      category: 'Electricity',
      area: 'Bokaro Township',
      urgency: 'high',
      description: 'Street light nahi jal rahi, raat me andhere me problem'
    },
    dispatchedAt: '16/03/2025 02:15 PM',
    estimatedCompletion: '16/03/2025 08:00 PM',
    status: 'active' as const,
    progress: 'Installing new street light fixtures'
  },
  {
    id: 'dw4',
    workerId: 'w3',
    worker: {
      name: 'Sunita Devi',
      category: 'Street Cleaning',
      contact: '+91 9876543212',
      area: 'Dhanbad Market'
    },
    reportId: '2',
    report: {
      requestId: 'JH2024002',
      category: 'Street Cleaning',
      area: 'Dhanbad Market',
      urgency: 'medium',
      description: 'Market area me bahut gandagi hai, cleaning ki zaroorat hai'
    },
    dispatchedAt: '15/03/2025 11:00 AM',
    estimatedCompletion: '15/03/2025 04:00 PM',
    status: 'completed' as const,
    progress: 'Task completed successfully'
  },
  {
    id: 'dw5',
    workerId: 'w6',
    worker: {
      name: 'Deepak Kumar Yadav',
      category: 'Waste Management',
      contact: '+91 9876543215',
      area: 'Hazaribagh City'
    },
    reportId: '5',
    report: {
      requestId: 'JH2024005',
      category: 'Waste Management',
      area: 'Hazaribagh City',
      urgency: 'medium',
      description: 'Garbage collection nahi hua last week se'
    },
    dispatchedAt: '17/03/2025 08:00 AM',
    estimatedCompletion: '17/03/2025 02:00 PM',
    status: 'completed' as const,
    progress: 'Garbage collection completed'
  }
];

export const mockUser: User = {
  username: 'admin',
  name: 'Pradeep Kumar Sharma',
  designation: 'District Collector',
  department: 'Revenue Department',
  contact: '+91 9876543200',
  email: 'collector.ranchi@gov.in',
  location: 'Ranchi, Jharkhand'
};