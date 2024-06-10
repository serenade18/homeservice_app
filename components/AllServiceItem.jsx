import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const AllServiceItem = ({service}) => {
  const router = useRouter();
    return (
      <TouchableOpacity 
          onPress={() => router.push({ pathname: 'service/servicedetails', params: { id: service.id } })}
          className="bg-black-200 flex flex-row gap-2 rounded-2xl p-[10] mb-[15]"
      >
          <Image 
              source={{ uri: service?.servie_image }}
              style={{ width: 120, height: 120, borderRadius: 10 }}
          />
          <View>
            <Text className="text-white mt-[5] font-psmall">Paramax Cleaners</Text>
            <Text className="text-white mt-[5] font-pbold">{service?.service_name}</Text>
            <Text className="text-white mt-[3] self-start text-xs text-secondary p-[4] bg-primary items-start rounded-lg px-[8]" >{service?.category.category_name}</Text>
          </View>
      </TouchableOpacity>
    )
  }

export default AllServiceItem;
