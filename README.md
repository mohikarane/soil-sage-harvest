
# Land Fertility Prediction System

## Overview

This web application helps predict and visualize land fertility based on soil parameters. It uses machine learning to classify land fertility into Low, Medium, or High categories based on key inputs like nitrogen, phosphorus, potassium, NDVI, and rainfall.

## Features

- Interactive fertility prediction based on user inputs
- Historical data visualization for states and districts
- Detailed recommendations based on fertility classification
- Interactive charts and visualization tools

## Project Structure

### Frontend

- React with TypeScript
- Tailwind CSS for styling
- shadcn/ui for UI components
- Recharts for data visualization

### Backend Integration

The application is designed to work with both a mock backend (for development) and a real backend (for production). The backend structure includes:

- `src/api/` - API client code for making requests
- `src/services/` - Service layer for data processing and model interaction
- `src/utils/` - Utilities for model integration and data handling

## How to Integrate Your Machine Learning Model

### Option 1: Direct Model Integration (Basic)

1. Place your `.pkl` model file in the `public/models/` directory
2. Update `src/utils/modelIntegration.ts` to load and use your model
3. Test locally before deployment

### Option 2: API-Based Integration (Recommended)

1. Host your model on a server that can process requests
2. Configure the API endpoints in `src/api/index.ts`
3. Update environment variables with your API URL

## Integrating Your CSV Data

### Method 1: Direct CSV Integration

1. Place your CSV files in the `public/data/` directory
2. Update the data service in `src/services/data-service.ts` to load your CSV files
3. Test locally before deployment

### Method 2: API-Based Data Integration

1. Host your data on a server or database
2. Configure the API endpoints in `src/api/index.ts`
3. Update the data fetching logic in the visualization components

## Development

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment

The application can be deployed to any static site hosting service. For the backend API, you'll need a server that can handle your model inference requests.

## License

MIT

