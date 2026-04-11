import { Pressable, Text, View, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import Ionicons from "@expo/vector-icons/Ionicons"

import { Link } from "expo-router";
import { fetch } from "expo/fetch"
import { useState, useEffect } from "react";
import NextUrl from "@/lib/next-url";

import { papers } from "@/constants/docs";
import { temps } from "@/constants/templates";
import { Template } from "@/components/template-list";

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

function StatBadge({ icon, value, variant = "default" }: { icon: React.ReactNode; value: string; variant?: "default" | "success" | "warning" }) {
  const variantStyles = {
    default: "bg-neutral-800 border-neutral-700",
    success: "bg-emerald-500/10 border-emerald-500/20",
    warning: "bg-amber-500/10 border-amber-500/20",
  };

  const textColors = {
    default: "text-neutral-300",
    success: "text-emerald-400",
    warning: "text-amber-400",
  };

  return (
    <View className={`flex-1 rounded-lg border px-3 py-2 ${variantStyles[variant]}`}>
      <View className="flex flex-row items-center gap-1.5">
        {icon}
        <Text className={`text-xs font-medium ${textColors[variant]}`}>{value}</Text>
      </View>
    </View>
  );
}

function DocCard({ doc }: { doc: typeof papers[0] }) {
  const isReady = doc.status === "READY";
  const createdDate = doc.createdAt ? new Date(doc.createdAt).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }) : "N/A";

  return (
    <Link href={`/editor/${doc.id}`} asChild>
      <TouchableOpacity className="flex flex-row items-center gap-3 py-4 border-b border-neutral-800">
        <View className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center">
          <Ionicons name="document-text" size={24} color="#a3a3a3" />
        </View>
        <View className="flex-1">
          <Text className="text-white text-sm font-medium" numberOfLines={1}>{doc.title}</Text>
          <View className="flex flex-row items-center gap-2 mt-1">
            <Ionicons name="radio-button-on" size={10} color={isReady ? "#4ade80" : "#f97316"} />
            <Text className="text-neutral-400 text-xs capitalize">{doc.docTypeId}</Text>
            <Text className="text-neutral-600 text-xs">·</Text>
            <Text className="text-neutral-500 text-xs">{createdDate}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#525252" />
      </TouchableOpacity>
    </Link>
  );
}

export default function App() {
  const [docs, setDocs] = useState(papers);

  useEffect(() => {
    async function getter() {
      try {
        const response = await fetch(`${NextUrl}/api/papers/all`, {
          credentials: "include",
        });
        const output = await response.json();
        setDocs(output);
      } catch (error) {
        console.error("Failed to fetch papers:", error);
      }
    }
    getter();
  }, []);

  const userName = "Kakande";
  const firstName = userName.split(" ")[0] || "there";
  const totalDocs = docs.length;
  const readyDocs = docs.filter(d => d.status === "READY").length;
  const userBalance = 10000;

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-4">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          <View className="flex flex-row justify-between items-center py-4">
            <View>
              <Text className="text-white text-lg">Good {getTimeOfDay()}, {firstName}</Text>
              <Text className="text-neutral-500 text-xs mt-0.5">
                {totalDocs > 0 ? `${totalDocs} documents · ${totalDocs - readyDocs} generating` : "Create your first document"}
              </Text>
            </View>
            <Ionicons name="notifications-circle" color="#a3a3a3" size={32} />
          </View>

          <View className="flex flex-row gap-2 mt-4">
            <StatBadge
              icon={<Ionicons name="cash" size={14} color="#a3a3a3" />}
              value={userBalance.toString()}
            />
            <StatBadge
              icon={<Ionicons name="document-text" size={14} color="#a3a3a3" />}
              value={totalDocs.toString()}
            />
            <StatBadge
              icon={<Ionicons name="checkmark-circle" size={14} color="#4ade80" />}
              value={readyDocs.toString()}
              variant="success"
            />
          </View>

          <View className="mt-8">
            <Text className="text-neutral-400 text-sm mb-4">Templates</Text>
            <View className="relative mx-[-16px] px-4">
              <View className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
              <View className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />
              <FlatList
                data={temps}
                renderItem={({ item }) => <Template title={item.title} price={item.price} />}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}
              />
            </View>
          </View>

          <View className="mt-8">
            <View className="flex flex-row justify-between items-center mb-2">
              <Text className="text-white text-base">Recent Documents</Text>
              <Text className="text-orange-500 text-xs">VIEW ALL</Text>
            </View>
            {docs.map((doc) => (
              <DocCard key={doc.id} doc={doc} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
