import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const Privacy = () => {
  return (
    <WebView
      source={{ uri: "https://galaxies.dev/privacy" }}
      style={styles.container}
    />
  );
};

export default Privacy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
