import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react';
import { fetchAllServices } from '../lib/actions';

const Services = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetchAllServices();
            console.log("Services", response)
            setCategories(response);
        } catch (error) {
            setError(error);
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error loading categories</Text>;
    }

    return (
        <View>
            <Text className="text-white">Services</Text>
        </View>
    )
}

export default Services