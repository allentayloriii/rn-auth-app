import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {},
});
