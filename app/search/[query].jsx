import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalSearch } from '../../lib/actions'; 
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';

const Search = () => {
  const { query } = useLocalSearchParams();
  const [results, setResults] = useState([]);

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
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={results}
        keyExtractor={(item, index) => item.id.toString() + '-' + index}
        renderItem={({ item }) =>(
          <View>
            <Text>{item.service_name}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Search Results for
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {query} 
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

            <SearchInput initialQuery={query} results={results}/>

            
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No results found"
            subtitle="No results found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
