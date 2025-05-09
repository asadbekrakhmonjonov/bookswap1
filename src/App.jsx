import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserSettings from './pages/UserSettings';
import Dashboard from './pages/Dashboard';
import AddBooksPage from './pages/AddBooksPage';
import UserBooks from './pages/MyBooks';
import EditBook from './components/Books/EditBook';
import { AuthProvider, useAuth } from './context/AuthContext';

// Route protection component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;  // You can use a better loading UI here.

  // If not authenticated, redirect to login
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <UserSettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-book"
            element={
              <PrivateRoute>
                <AddBooksPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-books"
            element={
              <PrivateRoute>
                <UserBooks />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-book/:bookId"
            element={
              <PrivateRoute>
                <EditBook />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
