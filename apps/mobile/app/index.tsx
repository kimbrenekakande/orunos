import { StyleSheet, Text } from "react-native";
export default function Home(){
  return (
    <Text style={styles.text}>HOME</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "orange",
    padding : 34
  },
});
