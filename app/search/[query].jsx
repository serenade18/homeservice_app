import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalSearch } from '../../lib/actions'; // Adjust the import path as necessary

const Search = () => {
  const { query } = useLocalSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (query) => {
    try {
      const searchResults = await globalSearch(query);
      const combinedResults = [
        ...searchResults.categories.map(item => ({ ...item, type: 'category' })),
        ...searchResults.services.map(item => ({ ...item, type: 'service' }))
      ];

      setResults(combinedResults);
      setNoResults(combinedResults.length === 0);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View className="p-4 border-b border-gray-200">
      <View className="bg-gray-100 p-4 rounded-full mr-4">
        <Image 
          source={{ uri: item.category_icon || item.service_icon }} 
          style={{ width: 40, height: 40 }} 
        />
      </View>
      <Text className="text-white">{item.category_name || item.service_name}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full flex justify-center items-center">
        <Text className="text-white">Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="bg-primary h-full flex justify-center items-center">
        <Text className="text-white">Error: {error}</Text>
      </SafeAreaView>
    );
  }

  if (noResults) {
    return (
      <SafeAreaView className="bg-primary h-full flex justify-center items-center">
        <Text className="text-white">No results found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString() + '-' + index}
      />
    </SafeAreaView>
  );
};

export default Search;
