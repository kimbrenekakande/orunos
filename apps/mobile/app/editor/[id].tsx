import { EnrichedTextInput } from "react-native-enriched";
import type { EnrichedTextInputInstance, OnChangeStateEvent } from "react-native-enriched";
import { useState, useRef } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import {useLocalSearchParams} from "expo-router"

export default function Home() {
  const { id } = useLocalSearchParams();
  
  const ref = useRef<EnrichedTextInputInstance>(null)
  const [ styleState, setStylesState ] = useState<OnChangeStateEvent>() || null ;
  
  return (
    <View className="flex flex-1 justify-center items-center"> 
      <EnrichedTextInput
        ref={ref}
        onChangeState={(e) => setStylesState(e.nativeEvent)}
        className="w-full text-2xl max-h-full bg-amber-900"
      />
      <Button
        title={styleState?.bold.isActive ? "Unbold" : "Bold"}
        color={styleState?.bold.isActive ? "green" : "gray"}
        onPress={()=> ref.current?.toggleBold()}
      />
    </View>
  )
}