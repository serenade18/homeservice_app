import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router'
import { signup } from '../../lib/actions'

export default function Signup() {
  const [isSubmitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.name === "" || form.email === "" || form.phone === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      const result = await signup(form.name, form.phone, form.email, form.password);
      console.log("result:", result);

      Alert.alert("Success", "Account created successfully. Check your email for verification code");
      router.replace("/verifyotp");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className="w-full flex justify-center min-h-[95vh] px-4 my-6">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[115px] h-[34px]"
            />

            <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
              Sign up to Paramax
            </Text>

            <FormField
             title="Full Name"
             otherStyles="mt-7"
             value={form.name}
             handleChangeText={(e) => setForm({ ...form, name: e })}
            />

            <FormField
             title="phone"
             otherStyles="mt-7"
             value={form.phone}
             handleChangeText={(e) => setForm({ ...form, phone: e })}
            />

            <FormField
             title="Email"
             otherStyles="mt-7"
             value={form.email}
             handleChangeText={(e) => setForm({ ...form, email: e })}
             keyboardType="email-address"
            />
            
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />

            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />

            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Already have an account?
              </Text>
              <Link
                href="/login"
                className="text-lg font-psemibold text-secondary"
              >
                Sign in
              </Link>
            </View>
          </View>
        </ScrollView>
        
      <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    </>
  )
}