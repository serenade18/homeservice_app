import { View, Text, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchServiceDetails } from '../../../lib/actions';
import { icons } from '../../../constants';
import BookingModal from '../../../components/BookingModal';

const MAX_LINES = 3;

const Servicedetails = () => {
    const params = useLocalSearchParams();
    const { id } = params;  
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const fetchService = fetchServiceDetails(id);
            const response = await fetchService();
    
            if (response.data) {
                setService(response.data);
            } else {
                throw new Error('Invalid response format: Missing service data');
            }
        } catch (error) {
            setError(error);
            console.error('Error fetching service:', error);
        } finally {
            setLoading(false);
        }
    };    

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error loading service</Text>;
    }

    return (
        <SafeAreaView className="flex-1 bg-primary">
            <ScrollView>
                <TouchableOpacity
                    className="absolute mt-[24] left-4 z-10"
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.leftArrow}
                        className="w-8 h-8"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <Image 
                    source={{ uri: service?.servie_image }}
                    className="w-full h-64"
                />
                <View className="flex gap-[7] p-5">
                    <Text className="text-white text-2xl font-pbold">{service?.service_name}</Text>
                    <View className="flex flex-row items-center mb-8">
                        <Text className="text-secondary text-xl pr-2 font-pmedium">Paramax Cleaners</Text>
                        <Text className="bg-black-200 rounded p-[4] text-secondary-100">
                            {service?.category.category_name}
                        </Text>
                    </View>
                    <View style={{ borderBottomWidth: 0.4, borderColor: "#CDCDE0" }}></View>
                    <View className="mt-4">
                        <Text className="text-white font-pmedium text-2xl mt-8">About Service</Text>
                        <Text className="text-white mt-3 text-xl" numberOfLines={isExpanded ? undefined : MAX_LINES}>
                            {service?.service_description}
                        </Text>
                        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                            <Text className="text-secondary-100 text-xl mt-2">
                                {isExpanded ? 'Read Less...' : 'Read More...'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View className="flex flex-row align-center mb-3 gap-3 p-4">
                <TouchableOpacity className="w-48 bg-black-200 rounded-2xl border-2 border-secondary p-4 items-center">
                    <Text className="text-secondary font-pmedium text-sm">Message</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=> setShowModal(true)}
                    className="w-48 bg-secondary rounded-2xl border-1 border-white p-4 items-center"
                >
                    <Text className="text-white font-pmedium text-xl">Book</Text>
                </TouchableOpacity>
            </View>
            <Modal
            animationType='slide'
                visible={showModal}
            >
                <BookingModal hideModal={() => setShowModal(false)}/>
            </Modal>
        </SafeAreaView>
    )
}

export default Servicedetails;
