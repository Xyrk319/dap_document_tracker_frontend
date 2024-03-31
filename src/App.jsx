import React, { useState } from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Routes,
  Navigate 
} from 'react-router-dom';
import LoginPage from './pages/UnauthenticatedPages/LoginPage';
import DashboardPage from './pages/AuthenticatedPages/DashboardPage';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('accessToken') !== null; // Check if user is authenticated
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const RedirectIfAuthenticated = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');

  // If an access token exists, redirect to the dashboard
  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<RedirectIfAuthenticated><LoginPage /></RedirectIfAuthenticated>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} /> {/* Redirects any unknown routes to login */}
      </Routes>
    </Router>
  );
};

export default App;
