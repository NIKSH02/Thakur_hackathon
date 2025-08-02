import React from 'react'
import Loader from "./pages/Loader"
import {  BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LandingPage from './pages/LandingPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import SplashCursor from './components/SplashCursor.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import LoadingProvider from './context/LoadingContext.jsx'
import GlobalLoader from './components/GlobalLoader.jsx'
import PageWithLoader from './components/PageWithLoader.jsx'
import TextAnimationSection from './components/AnimatedTextSection.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import Project from './pages/Project.jsx'
import Loader from './pages/Loader.jsx'


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
       <LoadingProvider>
    <ErrorBoundary>
    <AuthProvider>
        <Router>
          <SplashCursor />
          <GlobalLoader />
          <Routes>
          <Route 
            path="/Load" 
            element={
              <Loader />
          } /> 
          <Route 
            path="/"
            element={
              <PageWithLoader 
                loadingDuration={2500}
              >
                <LandingPage />
              </PageWithLoader>
            }
          />
          <Route 
            path="/about"
            element={
              <PageWithLoader 
                loadingDuration={2000}
              >
                <AboutPage />
              </PageWithLoader>
            }
          />
          <Route 
            path="/login"
            element={
              <PageWithLoader 
                loadingDuration={2000}
              >
                <LoginPage />
              </PageWithLoader>
            }
          />
          <Route 
            path="/signup"
            element={
              <PageWithLoader 
                loadingDuration={2000}
              >
                <SignUpPage />
              </PageWithLoader>
            }
          />
          <Route 
            path="/product/:id"
            element={
              <PageWithLoader 
                loadingDuration={2000}
              >
                <ProductDetailPage />
              </PageWithLoader>
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
              <PageWithLoader 
                loadingDuration={2000}
              >
                <TextAnimationSection />
              </PageWithLoader>
            }
          />
          <Route 
            path='/text'
            element={
              <PageWithLoader 
                loadingDuration={2000}
              >
                <Project />
              </PageWithLoader>
            }
          />
        </Routes>
      </Router>
      </AuthProvider>
    </ErrorBoundary>
    </LoadingProvider>
    </AuthProvider>
  )
}

export default App;
