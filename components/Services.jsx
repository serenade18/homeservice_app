import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import { fetchAllServices } from '../lib/actions';
import ServiceItem from './ServiceItem';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetchAllServices();
            console.log("Services", response)
            setServices(response);
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
        <FlatList
            data={services} 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item,index}) =>(
                <View className="flex-1 flex-col items-center mr-[10] ">
                    <ServiceItem service={item}/>
                </View>
            )}
        />
    )
}

export default Services