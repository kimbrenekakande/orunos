import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BillingPage() {
  const [amount, setAmount] = useState("");
  const balance = 2450.0;
  const quickAmounts = [10, 25, 50, 100, 250];

  const handleAddFunds = () => {
    if (!amount) {
      Alert.alert("Error", "Please enter an amount");
      return;
    }
    Alert.alert("Success", `Added $${amount} to your wallet`);
    setAmount("");
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="px-4 py-6">
          <Text className="text-white text-2xl font-bold">Billing</Text>
          <Text className="text-neutral-500 text-sm mt-1">Manage your wallet</Text>
        </View>

        <View className="px-4 gap-8">
          {/* Balance Card */}
          <View className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-5">
            <View className="flex flex-row justify-between items-start mb-4">
              <Text className="text-orange-100 text-sm opacity-80">Available Balance</Text>
              <View className="w-8 h-8 rounded-full bg-orange-500/30 flex items-center justify-center">
                <Ionicons name="wallet" size={16} color="#fcd34d" />
              </View>
            </View>
            <Text className="text-white text-4xl font-bold">${balance.toLocaleString()}.00</Text>
            <View className="flex flex-row items-center gap-1 mt-2">
              <Ionicons name="trending-up" size={14} color="#fcd34d" />
              <Text className="text-orange-100 text-xs opacity-80">+$350.00 this month</Text>
            </View>
          </View>

          {/* Stats Row */}
          <View className="flex flex-row gap-3">
            <View className="flex-1 border border-neutral-800 rounded-lg p-3">
              <View className="flex flex-row items-center gap-1.5 mb-1">
                <Ionicons name="cash" size={12} color="#737373" />
                <Text className="text-neutral-500 text-xs">Total Spent</Text>
              </View>
              <Text className="text-white text-lg font-semibold">$1,230</Text>
            </View>
            <View className="flex-1 border border-neutral-800 rounded-lg p-3">
              <View className="flex flex-row items-center gap-1.5 mb-1">
                <Ionicons name="add-circle" size={12} color="#737373" />
                <Text className="text-neutral-500 text-xs">Total Added</Text>
              </View>
              <Text className="text-white text-lg font-semibold">$3,680</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="flex flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-neutral-800 rounded-lg py-3">
              <Text className="text-white text-sm font-medium text-center">Add Funds</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 border border-neutral-800 rounded-lg py-3">
              <Text className="text-neutral-300 text-sm font-medium text-center">Withdraw</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 border border-neutral-800 rounded-lg py-3">
              <Text className="text-neutral-300 text-sm font-medium text-center">Transfer</Text>
            </TouchableOpacity>
          </View>

          <View className="h-px bg-neutral-800" />

          {/* Add Funds Section */}
          <View>
            <Text className="text-neutral-400 text-sm mb-4">Add Funds</Text>
            
            <View className="flex flex-row items-center gap-2 mb-4 pb-2 border-b border-neutral-800">
              <Text className="text-white text-2xl">$</Text>
              <TextInput
                className="text-white text-2xl flex-1"
                value={amount}
                onChangeText={setAmount}
                placeholder="0"
                placeholderTextColor="#404040"
                keyboardType="numeric"
              />
            </View>

            <View className="flex flex-row gap-2 mb-4 flex-wrap">
              {quickAmounts.map((val) => (
                <TouchableOpacity
                  key={val}
                  className="px-4 py-2 rounded-lg border border-neutral-800"
                  onPress={() => setAmount(val.toString())}
                >
                  <Text className="text-neutral-300 text-sm">${val}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              className="bg-orange-600 rounded-lg py-3"
              onPress={handleAddFunds}
            >
              <Text className="text-white text-sm font-medium text-center">Add Funds Now</Text>
            </TouchableOpacity>
          </View>

          <View className="h-px bg-neutral-800" />

          {/* Payment Methods */}
          <View>
            <View className="flex flex-row justify-between items-center mb-4">
              <Text className="text-neutral-400 text-sm">Payment Methods</Text>
              <TouchableOpacity>
                <Text className="text-orange-500 text-sm">Add</Text>
              </TouchableOpacity>
            </View>

            <View className="flex flex-col gap-2">
              <View className="flex flex-row items-center justify-between py-3">
                <View className="flex flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Ionicons name="card" size={20} color="#3b82f6" />
                  </View>
                  <View>
                    <Text className="text-white text-sm">Visa •••• 4242</Text>
                    <Text className="text-neutral-500 text-xs">Expires 12/2027</Text>
                  </View>
                </View>
                <View className="bg-neutral-800 px-2 py-0.5 rounded">
                  <Text className="text-neutral-300 text-xs">Default</Text>
                </View>
              </View>

              <View className="flex flex-row items-center justify-between py-3 border-t border-neutral-800">
                <View className="flex flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Ionicons name="card" size={20} color="#a855f7" />
                  </View>
                  <View>
                    <Text className="text-white text-sm">Mastercard •••• 1234</Text>
                    <Text className="text-neutral-500 text-xs">Expires 08/2026</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Text className="text-neutral-500 text-xs">Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="h-px bg-neutral-800" />

          {/* Billing Settings */}
          <View>
            <Text className="text-neutral-400 text-sm mb-4">Settings</Text>

            <View className="flex flex-row justify-between items-center py-3 border-t border-neutral-800">
              <Text className="text-neutral-300 text-sm">Currency</Text>
              <View className="flex flex-row items-center gap-1">
                <Text className="text-neutral-400 text-sm">USD ($)</Text>
                <Ionicons name="chevron-forward" size={14} color="#525252" />
              </View>
            </View>

            <View className="flex flex-row justify-between items-center py-3 border-t border-neutral-800">
              <View>
                <Text className="text-neutral-300 text-sm">Auto-reload</Text>
                <Text className="text-neutral-500 text-xs">Disabled</Text>
              </View>
              <View className="flex flex-row items-center gap-1">
                <View className="w-10 h-5 rounded-full bg-neutral-800" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
