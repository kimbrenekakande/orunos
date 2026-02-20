import { StyleSheet, Text, View } from "react-native";
export default function Home(){
  return (
    <View className="h-full w-full flex justify-center items-center"> 
       <Text style={styles.text}>Your Documents are here</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "orange",
    padding : 34
  },
});