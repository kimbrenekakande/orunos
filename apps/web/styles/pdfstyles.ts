import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 52,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#111827",
    backgroundColor: "#ffffff",
  },

  // Cover page (currently commented out in doc.tsx, but kept for completeness)
  cover: {
    paddingTop: 72,
    paddingBottom: 72,
    paddingHorizontal: 56,
    backgroundColor: "#ffffff",
  },
  coverTitle: {
    fontSize: 26,
    fontWeight: "bold",
    lineHeight: 1.2,
    marginBottom: 18,
  },
  authorInfo: {
    fontSize: 11,
    color: "#374151",
    lineHeight: 1.5,
    marginBottom: 4,
  },

  // Base text
  paragraph: {
    fontSize: 11,
    lineHeight: 1.65,
    marginBottom: 10,
  },

  // Inline formatting
  strong: {
    fontWeight: "bold",
  },
  em: {
    fontStyle: "italic",
  },
  del: {
    textDecorationLine: "line-through",
    color: "#6b7280",
  },
  inlineCode: {
    fontFamily: "Courier",
    fontSize: 10,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    color: "#111827",
  },
  link: {
    color: "#2563eb",
    textDecorationLine: "underline",
  },

  // Headings (mapped via getHeadingStyle in doc.tsx: h1..h6)
  h1: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 1.25,
    marginTop: 8,
    marginBottom: 12,
    color: "#111827",
  },
  h2: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 1.3,
    marginTop: 10,
    marginBottom: 10,
    color: "#111827",
  },
  h3: {
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 1.35,
    marginTop: 10,
    marginBottom: 8,
    color: "#111827",
  },
  h4: {
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 1.35,
    marginTop: 10,
    marginBottom: 8,
    color: "#111827",
  },
  h5: {
    fontSize: 11,
    fontWeight: "bold",
    lineHeight: 1.35,
    marginTop: 10,
    marginBottom: 8,
    color: "#374151",
  },
  h6: {
    fontSize: 10,
    fontWeight: "bold",
    lineHeight: 1.35,
    marginTop: 10,
    marginBottom: 8,
    color: "#4b5563",
  },

  // Layout blocks
  blockquote: {
    marginVertical: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#9ca3af",
    backgroundColor: "#f9fafb",
  },

  codeBlock: {
    marginVertical: 12,
    padding: 10,
    backgroundColor: "#f3f4f6",
    borderRadius: 6,
  },
  codeText: {
    fontFamily: "Courier",
    fontSize: 10,
    lineHeight: 1.55,
    color: "#111827",
  },

  hr: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 14,
  },

  space: {
    height: 8,
  },

  // Lists
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  listBullet: {
    width: 16,
    fontSize: 11,
    lineHeight: 1.65,
    color: "#111827",
  },
  listContent: {
    flex: 1,
    fontSize: 11,
    lineHeight: 1.65,
    color: "#111827",
  },

  // Tables
  table: {
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flexGrow: 1,
    fontSize: 10,
    lineHeight: 1.4,
    paddingVertical: 6,
    paddingHorizontal: 6,
    color: "#111827",
    borderRightWidth: 1,
    borderRightColor: "#e5e7eb",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  // Images
  image: {
    width: "100%",
    marginVertical: 12,
  },
});
