import React from 'react';
import { View, Image } from 'react-native';
import { Drawer } from "expo-router/drawer"

export default function TabLayout() {

  return (
    <Drawer >
      
      <Drawer.Screen name='index'
        options={{
          headerShown: true,
          drawerPosition : "right",
          drawerLabel: "Home",
          titleShown: false,
          title: "",
          headerStyle: {
            backgroundColor : "transparent"
          },
          headerTitleStyle: {
            fontSize : 22
          },
          headerLeft: () => (
            <View className='h-10 w-10 bg-amber-950 rounded-full ml-4 w'>
              <Image src='/assets/images/icon.png'/>
            </View>
          )
        }}
      />
      
    </Drawer>
  );
}
