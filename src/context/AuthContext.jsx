import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API_URL = 'http://localhost:8000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('dragit_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setUser(data.user);
      localStorage.setItem('dragit_user', JSON.stringify(data.user));
      return data.user;
    } catch (err) {
      throw new Error(err.message || 'Server error');
    }
  };

  const register = async (name, email, password, role, kelas) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          full_name: name, 
          email, 
          password,
          role: role || 'siswa',
          kelas: kelas || null
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setUser(data.user);
      localStorage.setItem('dragit_user', JSON.stringify(data.user));
      return data.user;
    } catch (err) {
      throw new Error(err.message || 'Server error');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dragit_user');
  };

  const updateUser = async (updates) => {
    const updated = { ...user, ...updates };

    // Update in local state first for immediate UI reflection
    setUser(updated);
    localStorage.setItem('dragit_user', JSON.stringify(updated));

    // Send to backend if we have a user ID
    if (user && user.id) {
      try {
        await fetch(`${API_URL}/auth/update-profile/${user.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(updates)
        });
      } catch (err) {
        console.error('Failed to update user profile on the server', err);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
