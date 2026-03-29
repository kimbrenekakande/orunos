import { Pressable,Text, View, ScrollView, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { Card } from "heroui-native";
import Ionicons from "@expo/vector-icons/Ionicons"

import { useRouter, Link } from "expo-router";
import {fetch} from "expo/fetch"
import { useState, useEffect } from "react";
import NextUrl from "@/lib/next-url";

import { papers } from "@/constants/docs";
import { temps } from "@/constants/templates";
import { Template } from "@/components/template-list";


export default function App() {
  // const router = useRouter()
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
        <ScrollView className="flex-1 flex flex-col py-8 mx-4" showsVerticalScrollIndicator={false}>
          <View className="pb-4">
            <Text className="text-white text-3xl">Welcome Back, Kakande</Text>
            <Text className="text-white text-sm">Dive into the world of academics with orunos </Text>
          </View>
          <View className="pt-8">
            <View className="flex-1 flex-row justify-inbetween justify-between">
              <Text className="text-white">Templates</Text>
              <Text className="text-orange-500">VIEW ALL</Text>
            </View>
            <FlatList
              data={temps}
              renderItem={ ({item}) => <Template title={item.title} price={item.price}/> }
              keyExtractor={item => item.title}
              horizontal
              showsHorizontalScrollIndicator={false}
              className="my-8"
            />
          </View>
          <View className="gap-4 pt-8">
            <View className="flex-1 flex-row justify-inbetween justify-between">
              <Text className="text-white">Documents</Text>
              <Text className="text-orange-500">VIEW ALL</Text>
            </View>
            {docs.map((doc) => (
              <Pressable key={doc.id}>
                <Link href="/editor/4">
                  <Card className=" border-gray-800 rounded h-20 w-full">
                    <Card.Body className="flex flex-row h-full">
                      <View className="h-10 w-20">
                        <Ionicons name="document-text" size={46} color="white" />
                      </View>
                      <View className="flex h-full w-full -ml-5 text-white">
                        <Card.Title numberOfLines={1} >{doc?.title}</Card.Title>
                        <View className="flex flex-row w-full justify-between">
                          <Text >GENERATING</Text>
                          <Text >12.06.2026</Text>
                        </View>
                      </View>
                      <View>
                        <Ionicons name="ellipsis-vertical" color="white"/>
                      </View>
                    </Card.Body>
                  </Card>
                </Link>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
