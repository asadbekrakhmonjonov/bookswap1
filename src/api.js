import axios from 'axios';

// API Configuration
const API_URL = import.meta.env.VITE_API_URL;

// Configure axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth token management
const auth = {
  storage: localStorage, // Consistent storage mechanism
  key: 'authToken',

  setToken(token) {
    auth.storage.setItem(auth.key, token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  getToken() {
    return auth.storage.getItem(auth.key);
  },

  clearToken() {
    auth.storage.removeItem(auth.key);
    delete api.defaults.headers.common['Authorization'];
  }
};

// Request interceptor for adding auth token
api.interceptors.request.use(config => {
  const token = auth.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Standardized response structure
const normalizeResponse = (response) => ({
  success: true,
  data: response.data?.data || response.data,
  status: response.status,
  headers: response.headers
});

// Standardized error structure
const normalizeError = (error) => {
  if (error.response) {
    return {
      success: false,
      error: error.response.data?.error || 'Request failed',
      code: error.response.data?.code || 'UNKNOWN_ERROR',
      status: error.response.status,
      data: error.response.data
    };
  }

  if (error.request) {
    return {
      success: false,
      error: 'No response from server',
      code: 'NETWORK_ERROR',
      status: 0
    };
  }

  return {
    success: false,
    error: error.message || 'Request failed',
    code: 'REQUEST_FAILED',
    status: 0
  };
};

// Response interceptor
api.interceptors.response.use(
  normalizeResponse,
  error => Promise.reject(normalizeError(error))
);

// Auth API methods
const authAPI = {
  // Register a new user
  async register(userData) {
    const response = await api.post('/api/users', userData);
    if (response.data?.token) {
      auth.setToken(response.data.token);
    }
    return response;
  },

  // Login a user
  async login(credentials) {
    const response = await api.post('/api/users/login', credentials);
    if (response.data?.token) {
      auth.setToken(response.data.token);
    }
    return response;
  },
    // Get a user by ID
  async getUserById(userId) {
    try {
      const response = await api.get(`/api/users/${userId}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  // Get current user's profile
  async getProfile() {
    return await api.get('/api/users/me');
  },

  // Update the current user's profile
  async updateProfile(updates) {
    return await api.put('/api/users/me', updates);
  },

  // Delete the current user's account
  async deleteAccount() {
    const response = await api.delete('/api/users/me');
    auth.clearToken();
    return response;
  },

  // Log out the user
  logout() {
    auth.clearToken();
    window.location.href = '/';  // Redirect to home page after logout
  }
};

// Book API methods
const bookAPI = {
  // Create a new book entry
  async createBook(bookData) {
    try {
      const response = await api.post('/api/books/create', bookData);
      return response;
    } catch (error) {
      return error;
    }
  },

  // Get all books
  async getBooks() {
    try {
      const response = await api.get('/api/books');
      return response;
    } catch (error) {
      return error;
    }
  },

  // Get books of the current user
  async getMyBooks() {
    try {
      const response = await api.get('/api/books/my-books');
      return response;
    } catch (error) {
      return error;
    }
  },

  // Update a user's book entry
  async updateBook(bookId, updatedData) {
    try {
      const response = await api.put(`/api/books/my-books/${bookId}`, updatedData);
      return response;
    } catch (error) {
      return error;
    }
  },

  // Delete a user's book entry
  async deleteBook(bookId) {
    try {
      const response = await api.delete(`/api/books/my-books/${bookId}`);
      return response;
    } catch (error) {
      return error;
    }
  },

  // Like a book
  async likeBook(bookId) {
    try {
      const response = await api.put(`/api/books/like/${bookId}`);
      return response;
    } catch (error) {
      return error;
    }
  },
};

// Export all API methods and auth utilities
export const API = {
  auth: authAPI,
  books: bookAPI,
  setAuthToken: auth.setToken,
  getAuthToken: auth.getToken,
  clearAuthToken: auth.clearToken,
};

export default API;
