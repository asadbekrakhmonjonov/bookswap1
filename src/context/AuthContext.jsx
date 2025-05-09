import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { API } from "../api";

// Create the context
export const AuthContext = createContext(null);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);  // Keep loading state to show until auth is checked
  const navigate = useNavigate();

  const checkAuth = () => {
    console.log("Checking auth...");
    try {
      const token = localStorage.getItem("authToken");
      console.log("Existing token:", token);

      if (token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp < currentTime) {
          console.log("Token expired");
          localStorage.removeItem("authToken");
          setIsAuthenticated(false);
          navigate("/login");
        } else {
          console.log("Authentication successful");
          API.setAuthToken(token);  // Set the token in the API instance
          setIsAuthenticated(true);
        }
      } else {
        console.log("Authentication failed - no token");
        setIsAuthenticated(false);
        navigate("/login");
      }
    } catch (error) {
      console.log("Error checking token:", error);
      localStorage.removeItem("authToken");
      setIsAuthenticated(false);
      navigate("/login");
    } finally {
      console.log("Auth check complete");
      setLoading(false);  // Set loading to false once the auth check is complete
    }
  };
  const login = async (credentials) => {
    const response = await API.auth.login(credentials);
    const token = response?.data?.token;
  
    if (response.success && token) {
      localStorage.setItem("authToken", token);
      API.setAuthToken(token);
      await checkAuth(); // ✅ Re-run auth check after token is set
      navigate("/");     // ✅ Only navigate once auth state is synced
    }
  
    return response;
  };
  

  // Logout method
  const logout = () => {
    localStorage.removeItem("authToken");
    API.clearAuthToken(); // Clear token in API instance
    setIsAuthenticated(false); // Update authentication state
    navigate("/login");
  };

  useEffect(() => {
    checkAuth();
  }, []);  // Only run once on mount

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
