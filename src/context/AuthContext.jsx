// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }

    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // In a real app, you would make an API call here
    // For demo purposes, we'll just simulate a login

    // Simple validation
    if (email && password) {
      const token = 'demo-token-' + Date.now();
      const userData = { email, name: email.split('@')[0] };

      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));

      setIsAuthenticated(true);
      setUser(userData);

      return Promise.resolve();
    } else {
      return Promise.reject(new Error('Invalid credentials'));
    }
  };

  const register = async (email, password) => {
    // In a real app, you would make an API call here
    // For demo purposes, we'll just simulate registration

    // Simple validation
    if (email && password) {
      const token = 'demo-token-' + Date.now();
      const userData = { email, name: email.split('@')[0] };

      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));

      setIsAuthenticated(true);
      setUser(userData);

      return Promise.resolve();
    } else {
      return Promise.reject(new Error('Registration failed'));
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};