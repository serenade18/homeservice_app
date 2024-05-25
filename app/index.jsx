import { StatusBar } from 'expo-status-bar';
import { Image, Text, Platform, View } from 'react-native';
import { Link } from 'expo-router'

export default function App() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text className="text-4xl f">Paramax</Text>
      <StatusBar style='auto'/>
      <Link href={'/profile'} style={{ color: 'blue' }}>Go to profile</Link>
    </View>
  );
}

