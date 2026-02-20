import { StyleSheet, Text } from "react-native";
export default function Home(){
  return (
    <view className="h-full w-full flex justify-center items-center"> 
       <Text style={styles.text}>login</Text>
    </view>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "orange",
    padding : 34
  },
});
