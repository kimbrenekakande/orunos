import { StyleSheet } from "@react-pdf/renderer";

//styles
export const styles = StyleSheet.create({
  cover: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  
  page: {
    fontSize: 14,
    textAlign: "justify",
    gap : 59,
    padding: 50,
    flexDirection: 'column',
    backgroundColor: "white",
  },
  
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  
  text: {
    margin: 11,
    textAlign: "justify",
    fontFamily: "Times-Roman"
  },
  pageNo: {
    position : "absolute",
    fontSize : 10,
    bottom : 30,
    left : 0,
    right : 0,
    textAlign : "center",
    color : "grey"
    
  }
  
});
