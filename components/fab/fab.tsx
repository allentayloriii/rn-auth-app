import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const FAB = () => {
  return (
    <Link href="/(app)/(authenticated)/new-msg" asChild>
      <TouchableOpacity style={styles.fab} onPress={() => {}}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </Link>
  );
};

export default FAB;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 56,
    width: 56,
    height: 56,
    boxShadow: "0 2px 3.84px rgba(0, 0, 0, 0.25)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
