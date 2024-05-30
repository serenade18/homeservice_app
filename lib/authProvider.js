// import React, { createContext, useContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { loadUser } from './actions'; // Assuming this is where your API calls are defined

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         const storedToken = await AsyncStorage.getItem('token');
//         console.log("token", storedToken);
//         if (storedToken) {
//           setToken(storedToken);
//           const userDetails = await loadUser(storedToken);
//           setUser(userDetails);
//         }
//       } catch (error) {
//         console.error('Authentication initialization failed', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializeAuth();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, token, setToken }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadUser } from './actions';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          const userDetails = await loadUser(storedToken);
          setUser(userDetails);
        }
      } catch (error) {
        console.error('Authentication initialization failed', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
