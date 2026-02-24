import { StyleSheet } from "@react-pdf/renderer";

// =============================================================================
// MAIN ACADEMIC STYLES (Primary Export)
// =============================================================================

export const styles = StyleSheet.create({
  // -------------------------------------------------------------------------
  // Page Layout
  // -------------------------------------------------------------------------
  page: {
    padding: 72,
    paddingTop: 84,
    paddingBottom: 72,
    fontSize: 12,
    fontFamily: 'Times-Roman',
    lineHeight: 1.5,
    backgroundColor: '#ffffff',
    color: '#000000',
  },

  // -------------------------------------------------------------------------
  // Headings (Hierarchical Structure)
  // -------------------------------------------------------------------------
  h1: {
    fontSize: 18, // Reduced from 22 for better proportion
    marginBottom: 18,
    marginTop: 36, // Increased top margin for section separation
    fontFamily: 'Times-Bold',
    color: '#1a1a1a',
    textAlign: 'left', // Left-aligned (standard for academic papers)
    lineHeight: 1.3,
  },

  h2: {
    fontSize: 15,
    marginBottom: 14,
    marginTop: 28,
    fontFamily: 'Times-Bold',
    color: '#2a2a2a',
    lineHeight: 1.3,
  },

  h3: {
    fontSize: 13,
    marginBottom: 10,
    marginTop: 20,
    fontFamily: 'Times-Bold',
    color: '#3a3a3a',
    lineHeight: 1.3,
  },

  h4: {
    fontSize: 12,
    marginBottom: 8,
    marginTop: 14,
    fontFamily: 'Times-Bold',
    color: '#4a4a4a',
    lineHeight: 1.3,
  },

  // -------------------------------------------------------------------------
  // Text Elements
  // -------------------------------------------------------------------------
  paragraph: {
    textAlign: 'justify',
    lineHeight: 1.5,
    textIndent: 0,
    marginBottom: 6,
  },

  text: {
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
    color: '#000000',
  },

  strong: {
    fontFamily: 'Times-Bold',
  },

  em: {
    fontFamily: 'Times-Italic',
  },

  link: {
    color: '#0066cc', // Professional blue for links
    textDecoration: 'underline',
  },

  // -------------------------------------------------------------------------
  // Lists
  // -------------------------------------------------------------------------
  list: {
    marginBottom: 12,
    marginLeft: 24, // Increased indent for clear hierarchy
  },

  listItem: {
    marginBottom: 6, // Increased spacing between items
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  listBullet: {
    width: 18, // Wider bullet space for better alignment
    fontSize: 12,
    fontFamily: 'Times-Roman',
  },

  listContent: {
    flex: 1,
    lineHeight: 1.6,
  },

  orderedList: {
    marginBottom: 12,
    marginLeft: 24,
  },

  orderedListItem: {
    marginBottom: 6,
    flexDirection: 'row',
  },

  listNumber: {
    width: 24, // Space for numbered lists
    fontSize: 12,
    fontFamily: 'Times-Roman',
    textAlign: 'right',
    marginRight: 6,
  },

  // -------------------------------------------------------------------------
  // Tables
  // -------------------------------------------------------------------------
  table: {
    marginTop: 24,
    marginBottom: 24,
    width: '100%',
  },

  tableRow: {
    flexDirection: 'row',
    minHeight: 28,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
  },

  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    fontFamily: 'Times-Bold',
    minHeight: 28,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#6b7280',
  },

  tableCell: {
    flex: 1,
    padding: 6,
    fontSize: 11,
    flexWrap: 'wrap',
    fontFamily: 'Times-Roman',
  },

  tableCellHeader: {
    flex: 1,
    padding: 8,
    fontSize: 11,
    fontFamily: 'Times-Bold',
    textAlign: 'left',
    lineHeight: 1.4,
  },

  // -------------------------------------------------------------------------
  // Code Blocks
  // -------------------------------------------------------------------------
  codeBlock: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    marginBottom: 16,
    fontFamily: 'Courier',
    fontSize: 9,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    lineHeight: 1.4,
  },

  inlineCode: {
    backgroundColor: '#f5f5f5',
    fontFamily: 'Courier',
    fontSize: 10,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 3,
  },

  // -------------------------------------------------------------------------
  // Blockquotes
  // -------------------------------------------------------------------------
  blockquote: {
    borderLeftWidth: 4,
    borderLeftColor: '#9ca3af',
    paddingLeft: 16,
    marginBottom: 16,
    marginTop: 16,
    fontFamily: 'Times-Italic',
    color: '#4b5563',
    lineHeight: 1.6,
    fontSize: 11,
  },

  // -------------------------------------------------------------------------
  // Horizontal Rule
  // -------------------------------------------------------------------------
  hr: {
    marginTop: 24,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
  },

  // -------------------------------------------------------------------------
  // Cover Page
  // -------------------------------------------------------------------------
  cover: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 72,
    paddingTop: 100,
    backgroundColor: '#ffffff',
  },

  coverTitle: {
    fontSize: 22, // Slightly reduced for elegance
    marginBottom: 24,
    fontFamily: "Times-Bold",
    textAlign: "center",
    lineHeight: 1.3,
    color: '#1a1a1a',
  },

  coverSubtitle: {
    fontSize: 14,
    marginBottom: 48,
    fontFamily: "Times-Roman",
    textAlign: "center",
    color: '#4b5563',
    lineHeight: 1.5,
  },

  image: {
    width: 150,
    height: 150,
    marginBottom: 40,
    objectFit: 'contain',
  },

  institutionName: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "Times-Bold",
    textAlign: "center",
    color: '#1a1a1a',
  },

  institutionDepartment: {
    fontSize: 12,
    marginBottom: 48,
    fontFamily: "Times-Roman",
    textAlign: "center",
    color: '#4b5563',
  },

  authorInfo: {
    fontSize: 12,
    marginTop: 12,
    fontFamily: "Times-Roman",
    textAlign: "center",
    lineHeight: 1.6,
    color: '#1a1a1a',
  },

  coverDate: {
    fontSize: 12,
    marginTop: 48,
    fontFamily: "Times-Roman",
    textAlign: "center",
    color: '#4b5563',
  },

  // -------------------------------------------------------------------------
  // Header & Footer
  // -------------------------------------------------------------------------
  header: {
    position: "absolute",
    top: 30,
    left: 72,
    right: 72,
    textAlign: "center",
    fontSize: 9,
    color: "#6b7280",
    fontFamily: "Times-Roman",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 8,
  },

  headerTitle: {
    fontSize: 9,
    fontFamily: "Times-Bold",
    color: "#374151",
  },

  footer: {
    position: "absolute",
    bottom: 30,
    left: 72,
    right: 72,
    textAlign: "center",
    fontSize: 9,
    color: "#6b7280",
    fontFamily: "Times-Roman",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 8,
  },

  pageNo: {
    fontSize: 9,
    fontFamily: "Times-Roman",
    color: "#6b7280",
  },

  // -------------------------------------------------------------------------
  // Abstract & Keywords
  // -------------------------------------------------------------------------
  abstract: {
    marginTop: 24,
    marginBottom: 24,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: '#f9fafb',
    borderLeftWidth: 3,
    borderLeftColor: '#9ca3af',
    fontSize: 11,
    lineHeight: 1.6,
    fontFamily: "Times-Roman",
    textAlign: "justify",
  },

  abstractTitle: {
    fontSize: 12,
    fontFamily: "Times-Bold",
    marginBottom: 8,
    textAlign: "center",
    color: '#1a1a1a',
  },

  keywords: {
    fontSize: 11,
    fontFamily: "Times-Italic",
    marginBottom: 24,
    marginTop: 12,
    lineHeight: 1.6,
  },

  keywordsLabel: {
    fontFamily: "Times-Bold",
    fontStyle: "normal",
  },

  // -------------------------------------------------------------------------
  // Table of Contents
  // -------------------------------------------------------------------------
  toc: {
    marginTop: 36,
    marginLeft: 0,
  },

  tocTitle: {
    fontSize: 16,
    fontFamily: "Times-Bold",
    marginBottom: 20,
    textAlign: "center",
    color: '#1a1a1a',
  },

  tocItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    fontSize: 11,
    fontFamily: "Times-Roman",
    borderBottomWidth: 0,
    borderBottomStyle: "dotted",
    borderBottomColor: "#d1d5db",
  },

  tocEntry: {
    fontSize: 11,
    fontFamily: "Times-Roman",
    paddingRight: 4,
  },

  tocLeader: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomStyle: "dotted",
    borderBottomColor: "#9ca3af",
    marginHorizontal: 4,
  },

  tocPageNumber: {
    fontFamily: "Times-Roman",
    fontSize: 11,
    paddingLeft: 4,
  },

  // -------------------------------------------------------------------------
  // Figures & Captions
  // -------------------------------------------------------------------------
  figure: {
    alignItems: "center",
    marginVertical: 24,
  },

  figureImage: {
    maxWidth: "100%",
    height: "auto",
    marginBottom: 8,
  },

  figureCaption: {
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Times-Italic",
    color: '#4b5563',
    marginTop: 6,
    lineHeight: 1.4,
    maxWidth: "90%",
  },

  figureLabel: {
    fontFamily: "Times-Bold",
    fontStyle: "normal",
  },

  // -------------------------------------------------------------------------
  // Bibliography / References
  // -------------------------------------------------------------------------
  bibliography: {
    marginTop: 36,
    marginBottom: 24,
  },

  bibliographyTitle: {
    fontSize: 16,
    fontFamily: "Times-Bold",
    marginBottom: 16,
    color: '#1a1a1a',
  },

  bibItem: {
    marginBottom: 12,
    paddingLeft: 24,
    textIndent: -24, // Hanging indent for bibliography
    fontSize: 11,
    lineHeight: 1.5,
    fontFamily: "Times-Roman",
  },

  // -------------------------------------------------------------------------
  // Sections
  // -------------------------------------------------------------------------
  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 16,
    fontFamily: "Times-Bold",
    marginBottom: 16,
    color: '#1a1a1a',
  },

  // -------------------------------------------------------------------------
  // Equations (for mathematical content)
  // -------------------------------------------------------------------------
  equation: {
    marginVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  equationNumber: {
    fontSize: 11,
    fontFamily: "Times-Roman",
    position: "absolute",
    right: 72,
  },

  // -------------------------------------------------------------------------
  // Footnotes
  // -------------------------------------------------------------------------
  footnote: {
    fontSize: 9,
    fontFamily: "Times-Roman",
    lineHeight: 1.4,
    borderTopWidth: 1,
    borderTopColor: "#d1d5db",
    paddingTop: 4,
    marginTop: 8,
  },

  footnoteMarker: {
    fontSize: 8,
    fontFamily: "Times-Roman",
  },

  // -------------------------------------------------------------------------
  // Utility Classes
  // -------------------------------------------------------------------------

  textCenter: {
    textAlign: "center",
  },

  textRight: {
    textAlign: "right",
  },

  textSmall: {
    fontSize: 10,
    lineHeight: 1.5,
  },

  textLarge: {
    fontSize: 14,
    lineHeight: 1.5,
  },

  bold: {
    fontFamily: "Times-Bold",
  },

  italic: {
    fontFamily: "Times-Italic",
  },

  uppercase: {
    textTransform: "uppercase",
  },

  mt1: { marginTop: 6 },
  mt2: { marginTop: 12 },
  mt3: { marginTop: 18 },
  mt4: { marginTop: 24 },

  mb1: { marginBottom: 6 },
  mb2: { marginBottom: 12 },
  mb3: { marginBottom: 18 },
  mb4: { marginBottom: 24 },

  mx1: { marginHorizontal: 6 },
  mx2: { marginHorizontal: 12 },
  mx3: { marginHorizontal: 18 },
  mx4: { marginHorizontal: 24 },
});
