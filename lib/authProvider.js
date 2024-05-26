import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadUser } from './actions'; // Assuming this is where your API calls are defined

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);  // Store the token in state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);  // Set the token in the context state
          const userDetails = await loadUser(storedToken);  // Pass token directly to loadUser
          setUser(userDetails);
        }
        setLoading(false);
      } catch (error) {
        console.error('Authentication initialization failed', error);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
