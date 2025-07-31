import { useAuth } from "@/context/AuthContext";
import { fetchMessage } from "@/utils/api";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const IconButton = ({
  onPress,
  icon,
  disabled,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.iconButton}
    >
      <Ionicons
        name={icon}
        size={24}
        color={disabled ? "#999" : COLORS.background}
      />
    </TouchableOpacity>
  );
};

const MessageDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const [editedText, setEditedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: message,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["message", id],
    queryFn: () => fetchMessage(Number(id)),
  });

  useEffect(() => {
    if (message?.data?.content) {
      console.log("Fetched message:", message.data.content);
      setEditedText(message.data?.content ?? "");
    }
  }, [message?.data?.content]);

  return (
    <View style={styles.container}>
      <Text>Message Detail</Text>
      <Text>{id}</Text>
    </View>
  );
};

export default MessageDetail;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  iconButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
});
