import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, router, useNavigation } from 'expo-router';
import { fetchCategoryDeatials } from '../../../lib/actions';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../../components/SearchInput';
import { icons } from '../../../constants';
import { useAuth } from '../../../lib/authProvider';
import { BASE_URL } from '../../../lib/constants';
import ServiceListItem from '../../../components/ServiceListItem';

const Servicelist = () => {
    const params = useLocalSearchParams();
    const { id } = params;  // Destructure `id` from `params`
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const fetchCategoryDetails = fetchCategoryDeatials(id);
            const response = await fetchCategoryDetails();
            console.log('API response:', response);
    
            if (response.data && response.data.services) {
                setServices(response.data.services);
                setCategoryName(response.data.category_name); // Set the category name
            } else {
                throw new Error('Invalid response format: Missing services array');
            }
        } catch (error) {
            setError(error);
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };    

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error loading services</Text>;
    }

    return (
        <SafeAreaView className="bg-primary h-full">
           <View className="flex my-6 px-4 space-y-6">
                <View className="flex justify-between items-start flex-row">
                    <View className="flex-row items-center mt-1">
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                        >
                            <Image
                                source={icons.leftArrow}
                                className="w-13 h-13 mr-5"
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <Text className="font-pmedium text-2xl text-gray-100">
                            {categoryName} 
                        </Text>
                    </View>

                </View>
                <FlatList
                    data={services}
                    renderItem={({ item, index }) => (
                        <ServiceListItem service={item} />
                    )}
                />
           </View>
        </SafeAreaView>
    );
};

export default Servicelist;
