import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchAllCategories } from '../../../lib/actions';
import AllServiceItem from '../../../components/AllServiceItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../lib/authProvider';
import { icons, images } from '../../../constants';
import SearchInput from '../../../components/SearchInput';
import { router, useNavigation } from 'expo-router';

const AllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetchAllCategories();
            // console.log("Services", response)
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
                            All Categories 
                        </Text>
                    </View>

                </View>
                {/* <FlatList
                    data={categories}
                    renderItem={({ item, index }) => (
                        <AllServiceItem service={item} />
                    )}
                /> */}
           </View>
        </SafeAreaView>
    )
}

export default AllCategories