import { StyleSheet } from "@react-pdf/renderer";

// Enhanced academic document styles
export const styles = StyleSheet.create({
  cover: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
    paddingTop: 100,
  },

  coverTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Times-Bold",
    textAlign: "center",
  },

  coverSubtitle: {
    fontSize: 16,
    marginBottom: 40,
    fontFamily: "Times-Roman",
    textAlign: "center",
  },

  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  institutionName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Times-Bold",
  },

  authorInfo: {
    fontSize: 14,
    marginTop: 10,
    fontFamily: "Times-Roman",
  },

  page: {
    fontSize: 12,
    lineHeight: 1.6,
    padding: 50,
    paddingTop: 80,
    paddingBottom: 70,
    fontFamily: "Times-Roman",
    backgroundColor: "white",
  },

  header: {
    position: "absolute",
    top: 30,
    left: 50,
    right: 50,
    textAlign: "center",
    fontSize: 10,
    color: "gray",
    fontFamily: "Times-Roman",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    paddingBottom: 5,
  },

  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: "center",
    fontSize: 10,
    color: "gray",
    fontFamily: "Times-Roman",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    paddingTop: 5,
  },

  section: {
    marginBottom: 20,
  },

  heading1: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
    fontFamily: "Times-Bold",
    color: "#2c3e50",
    borderBottomWidth: 1,
    borderBottomColor: "#34495e",
    paddingBottom: 4,
  },

  heading2: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "Times-Bold",
    color: "#34495e",
  },

  heading3: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    fontFamily: "Times-Bold",
    color: "#34495e",
  },

  paragraph: {
    fontSize: 12,
    lineHeight: 1.6,
    textAlign: "justify",
    marginBottom: 10,
    fontFamily: "Times-Roman",
  },

  text: {
    fontSize: 12,
    lineHeight: 1.6,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },

  bold: {
    fontFamily: "Times-Bold",
  },

  italic: {
    fontFamily: "Times-Italic",
  },

  listItem: {
    flexDirection: "row",
    marginBottom: 6,
  },

  listItemBullet: {
    fontSize: 12,
    fontFamily: "Times-Roman",
    marginRight: 6,
  },

  listItemText: {
    fontSize: 12,
    lineHeight: 1.6,
    fontFamily: "Times-Roman",
  },

  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 15,
  },

  tableRow: {
    flexDirection: "row",
  },

  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },

  tableCell: {
    fontSize: 10,
    padding: 8,
    fontFamily: "Times-Roman",
  },

  tableHeader: {
    fontSize: 10,
    fontWeight: "bold",
    padding: 8,
    backgroundColor: "#f5f5f5",
    fontFamily: "Times-Bold",
  },

  figure: {
    alignItems: "center",
    marginVertical: 15,
  },

  figureCaption: {
    fontSize: 10,
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 5,
    fontFamily: "Times-Italic",
  },

  pageNo: {
    position: "absolute",
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },

  toc: {
    marginTop: 30,
    marginLeft: 20,
  },

  tocItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    fontSize: 12,
    fontFamily: "Times-Roman",
  },

  tocPageNumber: {
    fontFamily: "Times-Roman",
  },

  bibliography: {
    marginTop: 20,
    marginLeft: 20,
  },

  bibItem: {
    flexDirection: "row",
    marginBottom: 10,
    fontSize: 11,
    lineHeight: 1.4,
    fontFamily: "Times-Roman",
  },

  abstract: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 11,
    lineHeight: 1.5,
    fontFamily: "Times-Roman",
    textAlign: "justify",
  },

  keywords: {
    fontSize: 11,
    fontStyle: "italic",
    marginBottom: 20,
    fontFamily: "Times-Italic",
  },
});
