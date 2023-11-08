import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import Colours from '@/constants/Colors';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const Layout = () => {
  return ( 
  <Tabs screenOptions={{
    tabBarActiveTintColor: Colours.primary,
    tabBarInactiveTintColor: Colours.secondary,
    // c font : tabBarLabelStyle: { fontFamily: "font_name", fontSize: 12, },
  }}>
   {/* climb page config  */}
    <Tabs.Screen name="climb" options={{
      tabBarLabel: 'Climb',
      tabBarIcon: ({ color, size }) => <MaterialIcons name="sports-handball" size={24} color={color} />,
    }} />
    {/* walls page config  */}
    <Tabs.Screen name="walls" options={{
      tabBarLabel: 'Walls',
      tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="wall" size={24} color={color} />,
    }} />
    {/* social page config  */}
    <Tabs.Screen name="social" options={{
      tabBarLabel: 'Social',
      tabBarIcon: ({ color, size }) => <Ionicons name="people" size={24} color={color} />,
    }} />
    {/* profile page config  */}
    <Tabs.Screen name="profile" options={{
      tabBarLabel: 'Profile',
      tabBarIcon: ({ color, size }) => <Ionicons name="person" size={24} color={color} />,
    }} />
  </Tabs>);
};

export default Layout;