import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SettingsPage() {
  const [name, setName] = useState("Kakande");
  const [style, setStyle] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert("Success", "Profile updated successfully");
    }, 1000);
  };

  const handleChangePassword = () => {
    if (newPassword.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setCurrentPassword("");
      setNewPassword("");
      Alert.alert("Success", "Password changed successfully");
    }, 1000);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {} },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="px-4 py-6">
          <Text className="text-white text-2xl font-bold">Settings</Text>
          <Text className="text-neutral-500 text-sm mt-1">Manage your account</Text>
        </View>

        <View className="px-4 gap-8">
          {/* Profile Section */}
          <View>
            <View className="flex flex-col items-center py-6">
              <View className="w-24 h-24 rounded-full bg-neutral-800 border-2 border-dashed border-neutral-700 flex items-center justify-center mb-4">
                <Ionicons name="person" size={40} color="#525252" />
              </View>
              <TouchableOpacity>
                <Text className="text-orange-500 text-sm font-medium">Change Photo</Text>
              </TouchableOpacity>
            </View>

            <View className="py-4 border-t border-neutral-800">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-neutral-500 text-sm">Full Name</Text>
                <TextInput
                  className="text-white text-sm text-right"
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                  placeholderTextColor="#404040"
                />
              </View>
            </View>

            <View className="py-4 border-t border-neutral-800">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-neutral-500 text-sm">Email</Text>
                <Text className="text-neutral-400 text-sm">kakande@email.com</Text>
              </View>
            </View>

            <TouchableOpacity
              className="bg-orange-600 rounded-lg py-3 mt-6"
              onPress={handleSaveProfile}
              disabled={isSaving}
            >
              <Text className="text-white text-sm font-medium text-center">
                {isSaving ? "Saving..." : "Save Profile"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="h-px bg-neutral-800" />

          {/* Stylometry Section */}
          <View>
            <View className="flex flex-row items-center gap-2 mb-4">
              <Ionicons name="document-text" size={18} color="#737373" />
              <Text className="text-neutral-400 text-sm">Stylometry</Text>
            </View>

            <View>
              <Text className="text-neutral-500 text-xs mb-1.5">Style Preferences</Text>
              <TextInput
                className="text-white text-sm border border-neutral-800 rounded-lg p-3 h-24"
                value={style}
                onChangeText={setStyle}
                placeholder="Describe your tone, writing style..."
                placeholderTextColor="#404040"
                multiline
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity className="border border-dashed border-neutral-800 rounded-lg py-4 mt-3 flex items-center justify-center">
              <Ionicons name="cloud-upload-outline" size={20} color="#525252" />
              <Text className="text-neutral-500 text-xs mt-1">Upload Documents</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-neutral-800 rounded-lg py-3 mt-3"
              onPress={() => Alert.alert("Analyzing...", "Style analysis coming soon")}
            >
              <Text className="text-white text-sm font-medium text-center">Analyze</Text>
            </TouchableOpacity>
          </View>

          <View className="h-px bg-neutral-800" />

          {/* Security Section */}
          <View>
            <View className="flex flex-row items-center gap-2 mb-4">
              <Ionicons name="lock-closed" size={18} color="#737373" />
              <Text className="text-neutral-400 text-sm">Security</Text>
            </View>

            <View className="gap-4">
              <View>
                <Text className="text-neutral-500 text-xs mb-1.5">Current Password</Text>
                <TextInput
                  className="text-white text-sm border-b border-neutral-800 pb-2"
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="Enter current password"
                  placeholderTextColor="#404040"
                  secureTextEntry
                />
              </View>
              <View>
                <Text className="text-neutral-500 text-xs mb-1.5">New Password</Text>
                <TextInput
                  className="text-white text-sm border-b border-neutral-800 pb-2"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Enter new password"
                  placeholderTextColor="#404040"
                  secureTextEntry
                />
                <Text className="text-neutral-600 text-xs mt-1.5">At least 8 characters</Text>
              </View>
            </View>

            <View className="flex flex-row items-center justify-between mt-4 py-3 border-t border-neutral-800">
              <View className="flex flex-row items-center gap-2">
                <View className="w-2 h-2 rounded-full bg-green-500" />
                <Text className="text-neutral-400 text-xs">Chrome on iOS · Current</Text>
              </View>
            </View>

            <TouchableOpacity
              className="bg-neutral-800 rounded-lg py-3 mt-4"
              onPress={handleChangePassword}
              disabled={isSaving}
            >
              <Text className="text-white text-sm font-medium text-center">
                {isSaving ? "Updating..." : "Update Password"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="h-px bg-neutral-800" />

          {/* Danger Zone */}
          <View>
            <Text className="text-neutral-500 text-sm mb-3">Danger Zone</Text>

            <View className="flex flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-neutral-300 text-sm">Delete Account</Text>
                <Text className="text-neutral-500 text-xs mt-0.5">Permanently delete your account</Text>
              </View>
              <TouchableOpacity
                className="border border-red-900/50 rounded-lg px-3 py-1.5"
                onPress={handleDeleteAccount}
              >
                <Text className="text-red-500 text-xs">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}