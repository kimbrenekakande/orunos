import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const TabLayout = () => (
  <Tabs screenOptions={{ headerShown : false }}>
    <Tabs.Screen
      name='index'
      options={{
        title: "home",
        tabBarIcon: ({color, focused}) => (
          <Ionicons
            name='home'
            color="white"
            size={26}
          />
        )
      }} />
  </Tabs>
);

export default TabLayout