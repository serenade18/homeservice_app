import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { verify } from '../../lib/actions';
import { useAuth } from '../../lib/authProvider';

export default function Verifyotp() {
  const [isSubmitting, setSubmitting] = useState(false);
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    otp: '',
  });

  const submit = async () => {
    if (form.otp === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setSubmitting(true);

    try {
      const result = await verify(form.otp);
      console.log("User details:", result); 

      Alert.alert('Success', 'Account activated. Please Log in');
      router.replace('/login');
    } catch (error) {
      Alert.alert('Error', 'Invalid OTP');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className="w-full flex justify-center min-h-[65vh] px-4 my-6">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[115px] h-[34px]"
            />

            <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
              Enter 6 Digit Code
            </Text>

            <FormField
              title="Enter 6 Digit code"
              value={form.otp}
              handleChangeText={(e) => setForm({ ...form, otp: e })}
              otherStyles="mt-7"
            />

            <CustomButton
              title="Submit"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />

          </View>
        </ScrollView>
        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    </>
  );
}
