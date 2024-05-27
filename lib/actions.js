import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { TOKEN_KEY, BASE_URL } from './constants';

// Authentication actions

export const adminSignup = async (name, phone, email, password, re_password) => {
    try {
        const response = await Axios.post(`${BASE_URL}/auth/superuser/`, { name, phone, email, password, re_password });
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

export const signup = async (name, phone, user_type, email, password, re_password) => {
    try {
        const response = await Axios.post(`${BASE_URL}/auth/users/`, { name, phone, user_type, email, password, re_password });
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

export const login = async (email, password) => {
    try {
        const response = await Axios.post(`${BASE_URL}/auth/jwt/create/`, { email, password });
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
        const response = await Axios.get(`${BASE_URL}/auth/users/me/`, {
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
