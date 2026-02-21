
import { useRouter } from "expo-router";
import {fetch} from "expo/fetch"
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Button } from "heroui-native";



export default function Home() {
  const router = useRouter()
  const [data, setData] = useState({})
  
  const auth = true
  if (!auth) router.replace("/(auth)/login")
  
  // useEffect(() => {
  //   async function getter() {
  //     try {
  //       const response = await fetch("http://localhost:3000/api/institute/fetch?id=1")
  //       const output = await response.json()
  //       setData(output)
  //     } catch (error) {
  //       console.error("Failed to fetch:", error)
  //     }
  //   }
  //   getter()
  // }, [])
  
  
  return (
    <View className="pt-16 h-full">
      <Card className="border border-gray-800 rounded h-1/4 mx-1">
        <Card.Body>
          <Card.Title>go</Card.Title>
          <Card.Description> klklk;</Card.Description>
          <Button className="bg-red-600 h-10 w-20 rounded">fukem</Button>
        </Card.Body>
      </Card> 
    </View>
  )
}

