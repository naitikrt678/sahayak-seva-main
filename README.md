# SAHAYAK SEVA PORTAL

A comprehensive civic issue reporting and management system for the Government of Jharkhand.

## Project Overview

This portal provides a unified platform for citizens to report civic issues and for administrators to manage and track resolution progress across various departments.

## Features

- **Citizen Reporting**: Easy-to-use interface for reporting civic issues
- **Admin Dashboard**: Comprehensive management interface for government officials
- **Interactive Map**: Visual representation of reported issues with heat map analysis
- **Worker Assignment**: Efficient task allocation to field workers
- **Real-time Tracking**: Live status updates and progress monitoring
- **Multi-language Support**: Hindi and English language support

## Technology Stack

- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19
- **Styling**: Tailwind CSS with ShadCN UI components
- **Maps**: Vanilla Leaflet.js with OpenStreetMap tiles
- **Routing**: React Router DOM 6.30.1

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd sahayak-seva-portal-main

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/         # Reusable UI components
│   └── ui/            # ShadCN UI components
├── pages/             # Page components
├── data/              # Mock data and API calls
├── types/             # TypeScript type definitions
├── hooks/             # Custom React hooks
└── lib/               # Utility functions
```

## Usage

### For Citizens
1. Access the citizen portal
2. Report civic issues with location and details
3. Track status of submitted reports
4. Receive updates on resolution progress

### For Administrators
1. Login to admin dashboard
2. View all reported issues on interactive map
3. Assign workers to specific issues
4. Monitor resolution progress
5. Generate reports and analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is developed for the Government of Jharkhand.

## Support

For technical support or questions, please contact the development team.
