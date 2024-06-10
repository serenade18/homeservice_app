import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { TOKEN_KEY, BASE_URL } from './constants';

// Global search function

export const globalSearch = async (query) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/search/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
            },
            params: { query } // Pass the query parameter
        });

        if (response.status === 200) {
            const { categories, services } = response.data.data;
            return {
                categories: categories || [],
                services: services || []
            };
        } else {
            throw new Error(`Search failed: Status code ${response.status}`);
        }
    } catch (error) {
        console.error("Error performing global search:", error);
        throw new Error("Failed to perform search due to network or server error.");
    }
};

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
    const token = await AsyncStorage.getItem(TOKEN_KEY); 

    if (!token) {
        console.error("No access token available."); 
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/category/`, {
            headers: {
                Authorization: `Bearer ${token}`, 
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

export const fetchCategoryDetails = (id) => async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    if (!token) {
        console.error("No access token available.");
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/category/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return response.data;  // Adjust this according to your actual API response structure
        } else {
            throw new Error(`Failed to fetch category details: Status code ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching category details:", error);
        throw new Error("Failed to fetch category details due to network or server error.");
    }
};

// Services Action

export const fetchAllServices = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); 

    if (!token) {
        console.error("No access token available."); 
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/services/`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

        if (response.status === 200) {
            return response.data.data; 
        } else {
            throw new Error(`Failed to fetch services data: Status code ${response.status}`); 
        }
    } catch (error) {
        console.error("Error fetching services data:", error); 
        throw new Error("Failed to fetch services data due to network or server error."); 
    }
};

export const fetchServiceDetails = (id) => async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    if (!token) {
        console.error("No access token available.");
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/services/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return response.data;  // Adjust this according to your actual API response structure
        } else {
            throw new Error(`Failed to fetch service details: Status code ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching service details:", error);
        throw new Error("Failed to fetch service details due to network or server error.");
    }
};

// Bookings Action

export const fetchAllBookings= async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); 

    if (!token) {
        console.error("No access token available."); 
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/bookings/`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

        if (response.status === 200) {
            return response.data.data; 
        } else {
            throw new Error(`Failed to fetch bookings data: Status code ${response.status}`); 
        }
    } catch (error) {
        console.error("Error fetching bookings data:", error); 
        throw new Error("Failed to fetch bookings data due to network or server error."); 
    }
};

export const bookNow = async (service, date, time, notes) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); 

    if (!token) {
        console.error("No access token available."); 
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.post(
            `${BASE_URL}/api/bookings/`,
            { service, date, time, notes },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            }
        );

        if (response.status === 201) { 
            return response.data;
        } else {
            throw new Error('Booking failed');
        }
    } catch (error) {
        console.error('Booking error:', error.response?.data || error.message);
        throw new Error('Failed to book the service');
    }
};
