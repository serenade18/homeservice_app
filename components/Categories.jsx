import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchAllCategories } from '../lib/actions';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetchAllCategories();
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
        <FlatList
            data={categories}
            numColumns={4}
            renderItem={({ item, index }) => index<=3&& (
                <TouchableOpacity 
                    onPress={()=>console.log("Cancel Pressed")}
                    className="flex-1 flex-col items-center p-2"
                >
                    <View className="bg-black-100 p-[21] rounded-2xl mr-[8]">
                        <Image 
                            source={{ uri: item.category_icon }}
                            style={{ width: 40, height: 40 }}
                        />
                    </View>
                    <Text className="text-white text-xs mt-5 font-pmedium">{item.category_name}</Text>
                </TouchableOpacity>
            )}
        />
    );
};

export default Categories;
