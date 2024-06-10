import { View, Text, TouchableOpacity, Image, FlatList, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { icons } from '../constants';
import { useNavigation } from 'expo-router';
import CalendarPicker from 'react-native-calendar-picker';
import { KeyboardAvoidingView } from 'react-native';

const BookingModal = ({ hideModal }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const navigation = useNavigation();
  const [timeList, setTimeList] = useState()
  const [selectedTime, setSelectedTime] = useState(null);

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    getTime()
  }, [])

  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
        timeList.push({
            time: i+':00 AM'
        })
        timeList.push({
            time: i+':30 AM'
        })
    }
    for (let i = 1; i <= 7; i++) {
        timeList.push({
            time: i+':00 PM'
        })
        timeList.push({
            time: i+':30 PM'
        })
    }
    setTimeList(timeList)
  }

  return (
    <ScrollView>
        <KeyboardAvoidingView  className="bg-primary h-full">
            <View className="flex justify-between items-start p-4 flex-row">
                <View className="flex-row items-center mt-1">
                <TouchableOpacity
                    onPress={() => hideModal()}
                    className="flex-row items-center mt-1"
                >
                    <Image
                    source={icons.leftArrow}
                    className="w-6 h-6 mr-2"
                    resizeMode="contain"
                    />
                    <Text className="font-pmedium text-2xl text-white">
                    Bookings 
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text className="font-pmedium text-xl text-white p-4">Select date:</Text>
            </View>
            <View className="bg-black-200 rounded-2xl m-3 p-4">
                <CalendarPicker
                onDateChange={onDateChange}
                width={380}
                minDate={new Date()}
                todayBackgroundColor='#FF9C01'
                todayTextStyle={{ color: '#FFFFFF' }}
                selectedDayColor='#FFFFFF'
                selectedDayTextStyle={{ color: '#000000' }}
                textStyle={{ color: '#FFFFFF' }}
                previousTitleStyle={{ color: '#FF9C01' }}
                nextTitleStyle={{ color: '#FF9C01' }}
                //   dayShape="square"
                />
                {selectedDate && (
                <Text className="text-center text-white mt-4">
                    Selected Date: {selectedDate.toString()}
                </Text>
                )}
            </View>
            <View>
                <View>
                    <Text className="font-pmedium text-xl text-white p-4">Select Time:</Text>
                </View>
                <FlatList
                    data={timeList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                        onPress={() => setSelectedTime(item.time)}
                        className={`ml-3 p-4 border-2 border-secondary rounded-2xl ${
                            selectedTime === item.time ? 'bg-secondary' : 'bg-black-200'
                        }`}
                        >
                        <Text className="text-white border-secondary">
                            {item.time}
                        </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            
            <View>
                <Text className="font-pmedium text-xl mt-2 text-white p-4">Any More Suggestions?</Text>
            </View>
            <View className="p-4">
                <TextInput
                    className="bg-black-200 border-2 text-white border-secondary-200 rounded-2xl"
                    placeholder='Notes'
                    placeholderTextColor="#888"
                    numberOfLines={6}
                    multiline={true}
                    style={{ textAlignVertical: 'top', padding: 10 }}
                />
            </View>
            <View className="p-4">
                <TouchableOpacity className="w-full bg-secondary rounded-2xl border-1 border-white p-4 items-center">
                    <Text className=" text-white font-pmedium">Confirm & Book</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default BookingModal;
