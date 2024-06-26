import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { StatusBar } from "expo-status-bar";

import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen 
          name='home'
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }}
        />
        
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Booking",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Booking"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="service/servicelist"
          options={{
            title: 'Service List',
            headerShown: false,
            tabBarButton: () => null, // This hides the tab bar button for this screen
          }}
        />

        <Tabs.Screen
          name="service/servicedetails"
          options={{
            title: 'Service Details',
            headerShown: false,
            tabBarButton: () => null, // This hides the tab bar button for this screen
          }}
        />

        <Tabs.Screen
          name="service/allservices"
          options={{
            title: 'Services',
            headerShown: false,
            tabBarButton: () => null, // This hides the tab bar button for this screen
          }}
        />

        <Tabs.Screen
          name="category/allcategories"
          options={{
            title: 'Categories',
            headerShown: false,
            tabBarButton: () => null, // This hides the tab bar button for this screen
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout