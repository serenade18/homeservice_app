import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { AuthProvider } from '../../lib/authProvider'

export default function AuthLayout() {
  return (
   <>
    <Stack>
      <Stack.Screen 
        name='signup'
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name='login'
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name='verifyotp'
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name='resetpassword'
        ptions={{ headerShown: false }}
      />
    </Stack>
   </>
  )
}