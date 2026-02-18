import { StyleSheet, Text } from 'react-native';


export default function ModalScreen() {
  return (
    <Text className="bg-amber-700 text-7xl">THIS WOULD OF SINNERS</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "orange",
    padding : 34
  },
  container: {
    color : "red",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
