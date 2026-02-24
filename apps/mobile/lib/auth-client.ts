import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import NextUrl from "./next-url";
// import { Platform } from "react-native";

export const authClient = createAuthClient({
  baseURL: NextUrl, // Base URL of your Better Auth backend.
  plugins: [
    expoClient({
      scheme: "orunos-mobile",
      storagePrefix: "orunos-mobile",
      storage: SecureStore,
    })
  ]
});
