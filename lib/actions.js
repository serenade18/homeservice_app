import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { TOKEN_KEY, BASE_URL } from './constants';

// Authentication actions

export const adminSignup = async (name, phone, email, password) => {
    try {
        const response = await Axios.post(`${BASE_URL}/api/admin/users/`, { name, phone, email, password });
        if (response.status === 201) { 
            return response.data;
        } else {
            throw new Error('Signup failed');
        }
    } catch (error) {
        console.error('Admin signup error:', error.response?.data || error.message);
        throw new Error('Failed to sign up');
    }
};

export const signup = async (name, phone, email, password) => {
    try {
        const response = await Axios.post(`${BASE_URL}/api/users/`, { name, phone, email, password });
        if (response.status === 201) { 
            return response.data;
        } else {
            throw new Error('Signup failed');
        }
    } catch (error) {
        console.error('User signup error:', error.response?.data || error.message);
        throw new Error('Failed to sign up');
    }
};

export const verify = async (otp) => {
    try {
        const response = await Axios.post(`${BASE_URL}/api/verify/`, { otp });
        if (response.status === 201) {
            
            return response.data;
        } else {
            throw new Error('Invalid OTP');
        }
    } catch (error) {
        throw new Error('Failed to Verify');
    }
};

export const login = async (email, password) => {
    try {
        const response = await Axios.post(`${BASE_URL}/api/gettoken/`, { email, password });
        if (response.status === 200) {
            // Save token to AsyncStorage
            await AsyncStorage.setItem(TOKEN_KEY, response.data.access);
            return response.data;
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        throw new Error('Failed to login');
    }
};

export const resetPassword = async (email) => {
    try {
        const response = await Axios.post(`${BASE_URL}/auth/users/reset_password/`, { email });
        console.log('response', response)
        if (response.status === 204) {
            return 'Reset password instructions sent.';
        } else {
            throw new Error('Failed to reset password');
        }
    } catch (error) {
        throw new Error('Failed to reset password');
    }
};

export const loadUser = async () => {
    try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        if (!token) {
            throw new Error('No token found');
        }
        const response = await Axios.get(`${BASE_URL}/api/userinfo/`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to load user data');
        }
    } catch (error) {
        throw new Error('Failed to authenticate user');
    }
};

// Categories Action

export const fetchAllCategories = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        // Make an HTTP GET request to fetch all Payments data
        const response = await Axios.get(`${BASE_URL}/api/category/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
            },
        });

        if (response.status === 200) {
            return response.data.data; 
        } else {
            throw new Error(`Failed to fetch category data: Status code ${response.status}`); 
        }
    } catch (error) {
        console.error("Error fetching category data:", error); 
        throw new Error("Failed to fetch category data due to network or server error."); 
    }
};
