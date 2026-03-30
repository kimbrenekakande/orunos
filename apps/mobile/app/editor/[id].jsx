import { StyleSheet, Text, View } from "react-native";
import {useLocalSearchParams} from "expo-router"

export default function Home() {
  const { id } = useLocalSearchParams();
  
  return (
    <View className="h-full w-full flex justify-center items-center"> 
      <Text className="text-orange-500">Document {id} Details </Text>
    </View>
  )
}