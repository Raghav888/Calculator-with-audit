# Calculator

A modern React-based calculator application with comprehensive audit logging capabilities. Every user action is tracked and stored in Firebase Firestore for complete transparency and compliance.

## Features

### Calculator Functionality

- **Basic Operations**: Addition (+), Subtraction (-), Multiplication (×), Division (÷)
- **Modern UI**: Beautiful gradient design with smooth animations
- **Responsive Design**: Works seamlessly on desktop
- **Real-time Display**: Clear input display with proper formatting
- **Backend**: Nodejs Express

### Audit Logging

- **Complete Action Tracking**: Every button press, number entry, and operation is logged
- **Real-time Updates**: Audit log updates instantly as you use the calculator
- **Structured Data**: Each event includes:
  - Unique ID
  - Timestamp
  - Action type (e.g., "numberEntered", "operatorEntered", "equalsPressed")
  - Associated value
- **Persistent Storage**: All data stored in Firebase Firestore
- **Chronological Order**: Events maintained in exact sequence of occurrence

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: CSS3 with modern gradients and animations
- **Backend**: Nodejs- Express and Firebase Firestore (NoSQL database)
- **Deployment**: Ready for Netlify

## Setup Instructions

### 1. Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Nodejs Express BE
- Firebase account

### 3. Configuration

1. Open `src/firebase.ts`
2. Replace the placeholder values with your Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start Development Server

```bash
npm run dev
```

The application will open at `http://localhost:3000`

### 6. Running Tests

```bash
npm test           # Run all tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

The project includes comprehensive unit tests for:

- Components
- Custom hooks
- Services
- Unit Test
- Types
- Configs

Coverage reports will be generated in the `coverage` directory.

## API Endpoints

### Audit Log Events

The application automatically logs these event types:

- `numberEntered`: When a digit (0-9) is pressed
- `decimalEntered`: When the decimal point is pressed
- `operatorEntered`: When an operator (+, -, ×, ÷) is pressed
- `equalsPressed`: When the equals button is pressed
- `clearPressed`: When the C button is pressed

### Event Structure

```json
{
  "id": "auto-generated",
  "timestamp": 1678886400,
  "action": "numberEntered",
  "value": "5"
}
```

### Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify


![](https://github.com/Raghav888/Calculator-with-audit/blob/main/public/Screen%20Recording%202025-08-17%20at%205.55.30%20PM.gif)
