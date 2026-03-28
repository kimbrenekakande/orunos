
import { useRouter, Link } from "expo-router";
import {fetch} from "expo/fetch"
import { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { Card, Button } from "heroui-native";
import NextUrl from "@/lib/next-url";
import { papers } from "@/data/docs";
import { SafeAreaView } from "react-native-safe-area-context"



export default function App() {
  const router = useRouter()
  const [docs, setDocs] = useState(papers)

  // const auth = true
  // if (!auth) router.replace("/(auth)/login")

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
    <SafeAreaView>
      <View className="h-screen">
        <ScrollView className="flex-1 flex flex-col" showsVerticalScrollIndicator={false}>
          <ScrollView className="" horizontal  showsHorizontalScrollIndicator={false}>
            {docs.map((doc) => (
              <Pressable key={doc.id}>
                <Link href="/editor/4">
                  <Card className="rounded mx-1 p-2 h-100 w-90 bg-orange-600">
                    {/*<Card.Body>
                      <Card.Title className="text-white">{doc?.title}</Card.Title>
                    </Card.Body>
                    <Card.Footer className="flex flex-row text-xs w-full gap-2 pt-2">
                      <Text className="text-2xl text-green-600 pb-2">&deg;</Text>
                      <Text className="text-white">{doc?.docTypeId}</Text>
                    </Card.Footer>*/}
                  </Card>
                </Link>
              </Pressable>
            ))}
          </ScrollView>
          {docs.map((doc) => (
            <Pressable key={doc.id}>
              <Link href="/editor/4">
                <Card className="border-b border-gray-800 rounded mx-1 p-2">
                  <Card.Body>
                    <Card.Title className="text-white">{doc?.title}</Card.Title>
                  </Card.Body>
                  <Card.Footer className="flex flex-row text-xs w-full gap-2 pt-2">
                    <Text className="text-2xl text-green-600 pb-2">&deg;</Text>
                    <Text className="text-white">{doc?.docTypeId}</Text>
                  </Card.Footer>
                </Card>
              </Link>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
