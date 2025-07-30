import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {},
});
