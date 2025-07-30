import { COLORS } from "@/utils/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#666",
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="messages"
        options={{
          tabBarLabel: "Messages",
          title: "Messages",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="message" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {},
});
