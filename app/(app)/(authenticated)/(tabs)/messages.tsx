import FAB from "@/components/fab/fab";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const messages = () => {
  return (
    <View style={styles.container}>
      <Text>Messages</Text>
      <FAB />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default messages;
