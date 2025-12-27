import { StyleSheet } from "@react-pdf/renderer";

//styles
export const styles = StyleSheet.create({
  cover : {
    display : "flex",
    flexDirection : "column",
    justifyContent : "center",
    alignItems : "center",
  },
  
  page: {
    flexDirection: 'column',
    backgroundColor: "white",
  },
  
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1, 
  }
  
});
