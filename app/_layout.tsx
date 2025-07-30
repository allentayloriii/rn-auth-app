import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default RootLayout;
