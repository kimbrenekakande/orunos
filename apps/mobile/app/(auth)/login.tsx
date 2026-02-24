import {  Button, View, TextInput, Text} from "react-native";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { data: session } = authClient.useSession();

  const doWhat = async () => {
    await authClient.signIn.email({
      email,
      password
    })

    console.log(session?.user.email)
  }

  return (
    <View className="h-full w-full flex justify-center items-center flex-col gap-4">
      <Text>login</Text>
      <TextInput
        className="border border-white text-white"
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        className="border border-white text-white"
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="login" onPress={doWhat}/>
    </View>
  )
}
