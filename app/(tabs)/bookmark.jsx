import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../../constants';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { fetchAllBookings } from '../../lib/actions';
import { FlatList } from 'react-native';
import ServiceListItem from '../../components/ServiceListItem';
import { ScrollView } from 'react-native';

export default function Bookmark() {
  const navigation = useNavigation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(); // Initial fetch
  }, []);

  const fetchData = async () => {
      try {
          const response = await fetchAllBookings();
          console.log("Bookings", response)
          setBookings(response);
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
      <View className="flex justify-between items-start flex-row">
        <TouchableOpacity
          className="flex-row items-center mt-1 p-4"
          onPress={() => navigation.goBack()}
        >
            <Image
                source={icons.leftArrow}
                className="w-12 h-5 mr-3"
                resizeMode="contain"
            />
            <Text className="font-pmedium text-2xl text-gray-100">
                My Bookings 
            </Text>
        </TouchableOpacity>
      </View>
      <>
      <View className="flex my-4 px-4 mt-3">
        <FlatList
          data={bookings}
          onRefresh={()=>fetchData()}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <ServiceListItem 
              service={item?.service}
              booking={item}
            />
          )}
        />
      </View>
      </>
    </SafeAreaView>
  )
}