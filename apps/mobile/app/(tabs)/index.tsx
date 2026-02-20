
import { useRouter } from "expo-router";
import {fetch} from "expo/fetch"
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";


export default function Home() {
  const router = useRouter()
  const [data, setData] = useState({})
  
  const auth = true
  if (!auth) router.replace("/(auth)/login")
  
  useEffect(() => {
    async function getter() {
      try {
        const response = await fetch("http://localhost:3000/api/institute/fetch?id=1")
        const output = await response.json()
        setData(output)
      } catch (error) {
        console.error("Failed to fetch:", error)
      }
    }
    getter()
  }, [])
  
  
  return (
    <View className="h-full w-full flex justify-center items-center"> 
      <Text style={styles.text}>Home</Text>
      <Text className="text-white">{data?.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "orange",
    padding : 34
  },
});
