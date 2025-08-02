import React from 'react'
import Loader from "./pages/Loader"
import {  BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LandingPage from './pages/LandingPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
// import SplashCursor from './components/SplashCursor.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import TextAnimationSection from './components/AnimatedTextSection.jsx'



// Protected Route Component (currently not used)
const ProtectedRoute = ({ children }) => {
  // const { isAuthenticated, isLoading } = useAuth(); // To be implemented later
  return children; // For now, just render children
};

// Simple Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

   render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">
              Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}



function App() {

  return (
    <AuthProvider>
      <ErrorBoundary>
        <Router>
          {/* <SplashCursor /> */}
          <Routes>
          <Route 
            path="/Load" 
            element={
              <Loader />
          } /> 
          <Route 
            path="/"
            element={
              <LandingPage />
            }
          />
          <Route 
            path="/about"
            element={
              <AboutPage />
            }
          />
          <Route 
            path="/login"
            element={
              <LoginPage />
            }
          />
          <Route 
            path="/signup"
            element={
              <SignUpPage />
            }
          />
          <Route 
            path="/add"
            element={
              <Loader />
            }
          />
          <Route
            path='/jome'
            element= {
              <Loader />
            }
          />
          <Route 
            path='/animate'
            element={
              <TextAnimationSection />
            }
          />
        </Routes>
      </Router>
    </ErrorBoundary>
    </AuthProvider>
  )
}

export default App;
