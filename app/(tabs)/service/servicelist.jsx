import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { fetchCategoryDeatials } from '../../../lib/actions';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../../components/SearchInput';
import { images } from '../../../constants';
import { useAuth } from '../../../lib/authProvider';
import { BASE_URL } from '../../../lib/constants';

const Servicelist = () => {
    const params = useLocalSearchParams();
    const { id } = params;  // Destructure `id` from `params`
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth(); // Access user from the authentication context

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
            <FlatList
                data={services}
                renderItem={({ item }) => (
                    <View className="flex-1 flex-col items-center p-2">
                        <View className="bg-black-100 p-[21] rounded-2xl mr-[8]">
                            <Image 
                                source={{ uri: `${BASE_URL}${item.servie_image}` }} 
                                style={{ width: 185, height: 120, borderRadius: 10 }}
                            />
                        </View>
                        <Text className="text-white text-xs mt-5 font-pmedium">{item.service_name}</Text>
                    </View>
                )}
                ListHeaderComponent={() => (
                    <View className="flex my-6 px-4 space-y-6">
                      <View className="flex justify-between items-start flex-row mb-6">
                        <View>
                          <Text className="font-pmedium text-sm text-gray-100">
                            Welcome Back
                          </Text>
                          <Text className="text-2xl font-psemibold text-white">
                            {user?.name || 'Guest'} 
                          </Text>
                        </View>
          
                        <View className="mt-1">
                          <Image
                            source={images.logoSmall}
                            className="w-13 h-13"
                            resizeMode="contain"
                          />
                        </View>
                      </View>
          
                      <SearchInput />
                    </View>
                  )}
            />

        </SafeAreaView>
    );
};

export default Servicelist;
