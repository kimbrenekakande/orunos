import { Tabs } from 'expo-router';
import React from 'react';
import {Ionicons} from "@expo/vector-icons"
import { Colors } from '@/lib/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarShowLabel : false
      }}>
      
        <Tabs.Screen
          name="documents"
          options={{
            title: 'documents',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons size={25}
              name= {focused ? "document" : "document-outline"}
              color={color} />
            )
          }}
        />
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={25}
            name={focused? "home" : "home-outline"} 
            color={color} />
          ) 
        }}
      />
      
  
      <Tabs.Screen
        name = "settings"
        options = {{
          title: "settings",
          tabBarIcon: ({ color, focused}) => (
            <Ionicons
              size={25}
              name={focused? "cog" : "cog-outline"}
              color={color} />
          )
        }}
      /> 
    </Tabs>
  );
}
