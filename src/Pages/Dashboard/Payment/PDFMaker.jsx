import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
export const MyDocument = ({ transcationId, date, totalPrice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Date: {date}</Text>
        <Text>transcationId: {transcationId}</Text>
        <Text>totalPrice: Tk{totalPrice}</Text>
      </View>
    </Page>
  </Document>
);
