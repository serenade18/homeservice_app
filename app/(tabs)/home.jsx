import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import { useAuth } from '../../lib/authProvider'; // Ensure this path is correct
import Trending from '../../components/Trending';
import Categories from '../../components/Categories';
import Services from '../../components/Services';

export default function Home() {
  const { user } = useAuth(); // Access user from the authentication context

  const imageData = [
    { id: 1, src: require('../../assets/images/slider/Slider1.png') },
    { id: 2, src: require('../../assets/images/slider/Slider2.png') },
  ];

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={imageData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white"></Text>
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

            <View className="w-full flex-1 pt-5 pb-2">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Offers for you
              </Text>

              <Trending posts={imageData ?? []} />
            </View>

            <View className="w-full flex-1 pt-0 pb-8">
              <View className="flex flex-row justify-between items-center mb-3">
                <Text className="text-lg font-pregular text-gray-100">
                  Categories
                </Text>
                <Text className="text-lg font-psmall text-gray-100">
                  View all
                </Text>
              </View>

              <Categories/>
            </View>
            <View className="w-full flex-1 pt-0 pb-8">
              <View className="flex flex-row justify-between items-center mb-3">
                <Text className="text-lg font-pregular text-gray-100">
                  Available Services 
                </Text>
                <Text className="text-lg font-psmall text-gray-100">
                  View all
                </Text>
              </View>

              <Services/>
            </View>
          </View>
        )}
        ListEmptyComponent={() =>(
          <Text className="text-3xl text-white">Empty</Text>
        )}
      />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
