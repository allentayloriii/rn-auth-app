import { COLORS } from "@/utils/colors";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: "#fff",
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="newmsg"
        options={{
          title: "New Message",
          presentation: "formSheet",
          sheetAllowedDetents: [0.3, 0.9],
          sheetGrabberVisible: true,
          sheetExpandsWhenScrolledToEdge: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
