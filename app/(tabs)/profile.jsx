import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, Alert } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { icons, images } from '../../constants';
import { useAuth } from '../../lib/authProvider';
import { useNavigation, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const { user, setUser } = useAuth(); // Access user from the authentication context
  const navigation = useNavigation();
  const profileMenu = [
    {
      id: 1,
      name: 'Home',
      icon: icons.home,
      route: 'home',
    },
    {
      id: 2,
      name: 'My Bookings',
      icon: icons.bookmark,
      route: 'bookmark',
    },
    {
      id: 3,
      name: 'Log Out',
      icon: icons.logout,
      action: () => handleLogout(),
    },
  ]

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Logging out will require you to sign back in. Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
            AsyncStorage.removeItem('token').then(() => {
              setUser(null);
              router.replace('/');;
            });
          } 
        }
      ],
      { cancelable: false }
    );
  };

  const handleNavigation = (item) => {
    if (item.route) {
      navigation.navigate(item.route);
    } else if (item.action) {
      item.action();
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={icons.leftArrow} style={styles.backIcon} resizeMode="contain" />
          <Text style={styles.headerText}>Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image source={images.profile} style={styles.profileImage} resizeMode="contain" />
        <Text style={styles.profileName}>{user?.name || 'Guest'}</Text>
        <Text style={styles.profileTown}>
            {user?.email} 
        </Text>
      </View>
      <View>
      <FlatList
        data={profileMenu}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation(item)}>
            <Image source={item.icon} style={styles.menuIcon} />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FF9C01'
  },
  backButton: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '900',
    color: 'white',
  },
  profileContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 60,
    marginBottom: 80,
    backgroundColor: '#FF9C01'
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  profileName: {
    fontSize: 24,
    color: 'white',
    marginTop: 8,
    fontWeight: '900'
  },
  profileTown: {
    fontSize: 20,
    color: 'white',
  },
  menuIcon: {
    width: 32,
    height: 32,
    marginRight: 16,
    color: '#FF9C01',
  },
  menuText: {
    fontSize: 20,
    color: 'white',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingHorizontal: 100,
  },
});