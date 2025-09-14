# Multi-Tenant SaaS Notes Frontend

A modern, responsive frontend for the multi-tenant SaaS notes application built with React, Vite, and Redux Toolkit.

## 🚀 Features

- ✅ **Modern React** with hooks and functional components
- ✅ **Redux Toolkit** for state management (no separate API files)
- ✅ **React Router** for navigation
- ✅ **Responsive design** with clean, minimal UI
- ✅ **Authentication** with JWT token handling
- ✅ **Role-based UI** (Admin/Member features)
- ✅ **Subscription management** with upgrade functionality
- ✅ **Real-time note limits** enforcement
- ✅ **CRUD operations** for notes
- ✅ **Loading states** and error handling
- ✅ **Auto-login** with token persistence

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth/          # Authentication components
│   │   ├── Layout/        # Layout components (Header, Sidebar)
│   │   ├── Notes/         # Notes-related components
│   │   └── UI/            # Reusable UI components
│   ├── pages/             # Page components
│   ├── store/             # Redux store and slices
│   ├── styles/            # Global CSS styles
│   ├── App.jsx            # Main App component
│   └── main.jsx           # Entry point
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

## 🛠️ Quick Setup

### 1. Create Project
```bash
mkdir frontend
cd frontend
npm create vite@latest . -- --template react
```

### 2. Install Dependencies
```bash
npm install @reduxjs/toolkit react-redux react-router-dom axios
```

### 3. Copy All Files
Copy all the provided code files into their respective locations according to the project structure.

### 4. Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🎨 Design Features

### Minimal & Clean Design
- Simple, professional interface
- Consistent color scheme (Blues and grays)
- Card-based layout for better organization
- Responsive grid system for notes

### User Experience
- **Easy Login**: Test account buttons for quick access
- **Intuitive Navigation**: Clear sidebar with active states  
- **Visual Feedback**: Loading states, success/error messages
- **Subscription Awareness**: Clear indication of plan limits

### Responsive Layout
- **Desktop**: Full sidebar with main content area
- **Mobile**: Collapsible navigation (can be enhanced)
- **Grid System**: Responsive notes grid


## 📱 Pages & Features

### Login Page
- Clean login form with validation
- Test account quick-fill buttons
- Error handling and loading states
- Auto-redirect after successful login

### Dashboard
- Overview of user's notes statistics
- Subscription status display
- Recent notes preview
- Role-based information display

### Notes Page
- Grid layout for all notes
- Create, edit, delete operations
- Subscription limit enforcement
- Real-time note count updates
- Modal-based note editing

## 🔒 Security & Authentication

### Token Management
- JWT tokens stored in localStorage
- Automatic token inclusion in API requests
- Token validation on app start
- Secure logout with token cleanup

### Protected Routes
- Route-level authentication checks
- Automatic redirect to login if not authenticated
- Loading states during auth verification

### Role-Based Features
- Admin users can upgrade subscriptions
- Different UI elements based on user role
- Subscription-aware note creation limits

## 🎯 Redux State Management

### Auth Slice
- User authentication state
- Login/logout actions
- Profile management
- Subscription upgrades
- Error and success message handling

### Notes Slice  
- Notes CRUD operations
- Loading and error states
- Real-time note count tracking
- Success message handling

### No Separate API Files
All API calls are included directly in the Redux slices using createAsyncThunk, keeping the codebase simple and centralized.

## 🚀 Deployment on Vercel

### 1. Build the Project
```bash
npm run build
```

### 2. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🔧 Configuration

### Vite Configuration
- Development proxy for API calls
- Build optimizations with code splitting
- Environment variable handling

### Axios Configuration
- Base URL configuration
- Automatic credential inclusion
- Request/response interceptors for token handling


## 📊 Performance

- **Code Splitting**: Automatic vendor/library chunking
- **Optimized Builds**: Vite's fast build process
- **Minimal Bundle**: Only necessary dependencies included

## 🧪 Testing the Frontend

### Manual Testing Checklist
- [ ] Login with all test accounts
- [ ] Create notes (test limits)
- [ ] Edit and delete notes
- [ ] Upgrade subscription (admin accounts)
- [ ] Logout functionality
- [ ] Responsive design on different screens
- [ ] Error handling (network errors, validation)


The frontend is now complete with all features from the assignment requirements, clean code structure, and ready for deployment! 
