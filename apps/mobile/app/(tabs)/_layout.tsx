import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import {BottomTabBarButtonProps} from "@react-navigation/bottom-tabs"
import clsx from "clsx"


const TabLayout = () => {
  const insets = useSafeAreaInsets();
  
  const TabIcon = ({ focused, iconName }: { focused: boolean, iconName: any }) => {
  return (
    <View>
      <View className={clsx("", focused || "bg-transparent")}>
        <Ionicons name={focused ? `${iconName}` :  `${iconName}-outline` } size={26} color={ focused ? "orange" : "white"} />
      </View>
    </View>
  )
}
    
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        display : "flex",
        alignContent : 'center',
        position: "absolute",
        height: 60,
        paddingTop: 8,
        borderTopRightRadius: 16,
        borderTopLeftRadius : 16,
        backgroundColor: "black",
        borderTopColor: "gray",
      },
    }}>
      <Tabs.Screen
        name='billing'
        options={{
          title: "Billing",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused} iconName='card' />
          )
        }} />
      <Tabs.Screen
        name='index'
        options={{
          title: "Create",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused} iconName='add-circle' />
          )
        }} />
      <Tabs.Screen
        name='settings'
        options={{
          title: "settings",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused} iconName='settings' />
          )
        }} />
    </Tabs>
  )
};

export default TabLayout