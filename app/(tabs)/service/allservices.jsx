import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchAllServices } from '../../../lib/actions';
import ServiceItem from '../../../components/ServiceItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../lib/authProvider';
import { images } from '../../../constants';
import SearchInput from '../../../components/SearchInput';

const Allservices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetchAllServices();
            // console.log("Services", response)
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
        <SafeAreaView className="bg-primary h-full">
        <FlatList
            data={services} 
            renderItem={({item,index}) =>(
                <View className="flex-1 flex-col items-center mr-[10] ">
                    <ServiceItem service={item}/>
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
    )
}

export default Allservices