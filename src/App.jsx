import React, { useEffect, useState } from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Routes, 
  Navigate 
} from 'react-router-dom';
import LoginPage from './pages/UnauthenticatedPages/LoginPage';
import DashboardPage from './pages/AuthenticatedPages/DashboardPage';
import { verifyToken } from './utils/AxiosHelper';

const useVerifyToken = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isValidToken = await verifyToken(); // This now directly returns a boolean
      setIsAuthenticated(isValidToken);
    };

    checkAuth();
  }, []);

  return isAuthenticated;
};


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useVerifyToken();

  // While checking, consider showing a loading spinner or similar
  if (isAuthenticated === null) {
    return <div>Loading2...</div>;
  }
  console.log("ProtectedRoute: " + isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const RedirectIfAuthenticated = ({ children }) => {
  const isAuthenticated = useVerifyToken();

  // While checking, consider showing a loading spinner or similar
  if (isAuthenticated === null) {
    return <div>Loading1...</div>;
  }

  console.log("RedirectIfAuthenticated: " + isAuthenticated);

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
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
