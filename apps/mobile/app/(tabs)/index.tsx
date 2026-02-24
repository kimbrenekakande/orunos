
import { useRouter } from "expo-router";
import {fetch} from "expo/fetch"
import { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card, Button } from "heroui-native";
import NextUrl from "@/lib/next-url";


export default function Home() {
  const router = useRouter()
  const [docs, setDocs] = useState([])

  const auth = true
  if (!auth) router.replace("/(auth)/login")

  useEffect(() => {
    async function getter() {
      try {
        const response = await fetch(`${NextUrl}/api/papers/all`, {
          credentials: "include",
        })
        const output = await response.json()
        setDocs(output)
      } catch (error) {
        console.error("Shit Failed :", error)
      }
    }
    getter()
  }, [])

  // useEffect(() => {
  //   async function getter() {
  //     try {
  //       // Use 10.0.2.2 for Android emulator (maps to host machine's localhost)
  //       // For iOS simulator use localhost
  //       // For physical devices use your machine's IP
  //       const response = await fetch("http://10.0.2.2:3000/api/papers/all")
  //       const output = await response.json()
  //       setDocs(output)
  //     } catch (error) {
  //       console.error("Shit Failed :", error)
  //     }
  //   }
  //   getter()
  // }, [])


  return (
    <View className="pt-16 h-full">
      {docs.map((doc) => (
        <Pressable key={doc.id}>
          <Card className="border-b border-gray-800 rounded mx-1 p-2">
            <Card.Body>
              <Card.Title className="text-white">{doc?.title}</Card.Title>
            </Card.Body>
            <Card.Footer className="flex flex-row text-xs w-full gap-2 pt-2">
              <Text className="text-2xl text-green-600 pb-2">&deg;</Text>
              <Text className="text-white">{doc?.docTypeId}</Text>
            </Card.Footer>
          </Card>
        </Pressable>
      ))}
    </View>
  )
}
