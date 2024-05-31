// import { View, Text, FlatList, Image } from 'react-native'
// import React from 'react'

// const Trending = ({ posts }) => {
//   return (
//     <FlatList
//       data={posts}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={({ item }) => (
//         <View>
//           <Image 
//             source={item.src} 
//             style={{ width: 330, height: 190, marginBottom: 10, borderRadius:20, marginRight: 10 }} 
//           />
//         </View>
//       )}
//       horizontal
//     />
//   )
// }

// export default Trending

import { View, Image, FlatList, Dimensions } from 'react-native';
import React, { useRef, useEffect } from 'react';

const windowWidth = Dimensions.get('window').width;

const Trending = ({ posts }) => {
  const flatListRef = useRef(null);
  const duplicatedPosts = [...posts, ...posts, ...posts];

  useEffect(() => {
    let scrollValue = 0;
    const scrollInterval = setInterval(() => {
      if (flatListRef.current) {
        scrollValue += windowWidth;
        if (scrollValue >= windowWidth * (posts.length * 2)) {
          scrollValue = 0;
          flatListRef.current.scrollToOffset({ offset: scrollValue, animated: false });
        } else {
          flatListRef.current.scrollToOffset({ offset: scrollValue, animated: true });
        }
      }
    }, 3000); // Change this value to adjust scroll speed

    return () => clearInterval(scrollInterval);
  }, []);

  const getItemLayout = (data, index) => ({
    length: windowWidth,
    offset: windowWidth * index,
    index,
  });

  const onScrollToIndexFailed = (info) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current.scrollToIndex({ index: info.index, animated: true });
    });
  };

  return (
    <FlatList
      data={duplicatedPosts}
      ref={flatListRef}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View>
          <Image
            className="h-[180] w-[310] mr-[15]"
            source={item.src}
            style={{  marginBottom: 10, borderRadius: 12, }}
          />
        </View>
      )}
      horizontal
      pagingEnabled={false} // Disable paging for smoother transition
      showsHorizontalScrollIndicator={false}
      getItemLayout={getItemLayout}
      onScrollToIndexFailed={onScrollToIndexFailed}
    />
  );
};

export default Trending;

