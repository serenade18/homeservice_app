import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from "../../constants";
import SearchInput from '../../components/SearchInput';
// import Trending from '../../components/Trending';

export default function Home() {
  
  return (
    <SafeAreaView  className="bg-primary h-full">
      <FlatList
        data={[{ id : 1}, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Ahmed Sereta
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

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Offers for you
              </Text>

              {/* <Trending posts={latestPosts ?? []} /> */}
            </View>
          </View>
        )}

      />
    </SafeAreaView>
  )
}