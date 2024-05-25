import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, Platform, View } from 'react-native';
import { Link } from 'expo-router'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Paramax</Text>
      <StatusBar style='auto'/>
      <Link href={'/profile'} style={{ color: 'blue' }}>Go to profile</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
