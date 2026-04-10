import { Pressable,Text, View, ScrollView, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import Ionicons from "@expo/vector-icons/Ionicons"

import { useRouter, Link } from "expo-router";
import {fetch} from "expo/fetch"
import { useState, useEffect } from "react";
import NextUrl from "@/lib/next-url";

import { papers } from "@/constants/docs";
import { temps } from "@/constants/templates";
import { Template } from "@/components/template-list";
import clsx from "clsx";

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
      <View className="h-screen m-4">
        <ScrollView className="flex-1 flex flex-col gap-8" showsVerticalScrollIndicator={false}>
          <View className="flex-1 flex-row justify-between items-center mb-8">
            <Text className="text-white text-base">Welcome Back, Kakande</Text>
            <Ionicons name="notifications-circle" color={"white"} size={36}/>
          </View>
          <View className=" h-40 bg-orange-600 rounded mb-4 p-4 ">
            <Text className="text-white text-2xl">Your Academic Copilot</Text>
            <Text className="text-white text-sm">Dive into the world of academics with orunos </Text>
          </View>
          <View className="pt-8">
            <View className="flex-1 flex-row justify-inbetween justify-between mb-8">
              <Text className="text-white">Templates</Text>
              <Text className="text-orange-500">VIEW ALL</Text>
            </View>
            <FlatList
              data={temps}
              renderItem={ ({item}) => <Template title={item.title} price={item.price}/> }
              keyExtractor={item => item.title}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View className="gap-4 pt-8 pb-16">
            <View className="flex-1 flex-row justify-inbetween justify-between">
              <Text className="text-white">Documents</Text>
              <Text className="text-orange-500">VIEW ALL</Text>
            </View>
            {docs.map((doc) => (
              <Pressable key={doc.id}>
                <Link href={`/editor/${doc.id}`}>
                  <View className="flex flex-row border-gray-800 rounded  gap-2 my-4 w-full ">
                    <View className="bg-transparent h-fit w-fit flex justify-center items-center">
                      <Ionicons name="document-text" size={56} color={"white"} />
                    </View>
                    <View className="flex gap-4 w-full rounded-xl pr-16">
                      <Text className="text-white text-base text-wrap" numberOfLines={1}>{doc?.title}</Text>
                      <View className="flex flex-row items-center pr-4 w-full">
                        <Ionicons name="radio-button-on-sharp" size={10} color={doc.status === "READY" ? "green" : "red"} className="pr-2"/>
                        <View className="w-full flex flex-row justify-between pr-4">
                          <Text className="text-xs text-white place-content-start">{doc.docTypeId}</Text>
                          <Text className="text-white">12.06.2026</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View className="w-full border border-b-gray-900 pt-4"> </View>
                </Link>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
