import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabLayout = () => {
  const insets = useSafeAreaInsets();

  const TabIcon = ({ focused, iconName }: { focused: boolean; iconName: any }) => {
    return (
      <View className="items-center">
        <Ionicons
          name={focused ? iconName : `${iconName}-outline`}
          size={24}
          color={focused ? "#f97316" : "#525252"}
        />
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          height: 60 + insets.bottom,
          paddingTop: 8,
          paddingBottom: insets.bottom,
          backgroundColor: "#0a0a0a",
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="billing"
        options={{
          title: "Billing",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="card" />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Create",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="add-circle" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="settings" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;