import { Message } from "@/utils/api";
import { formatDistanceToNow } from "date-fns";
import { Link } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  const colorScheme = useColorScheme();
  return (
    <Link
      href={`/(app)/(authenticated)/(tabs)/messages/${message.id}`}
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#333" : "#fff" },
      ]}
      asChild
    >
      <TouchableOpacity activeOpacity={0.7}>
        <View style={styles.content}>
          <Text style={styles.contentText}>{message.content}</Text>
          <Text
            style={[
              styles.date,
              { color: colorScheme === "dark" ? "#fff" : "#666" },
            ]}
          >
            {formatDistanceToNow(new Date(message.createdAt), {
              addSuffix: true,
            })}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MessageItem;

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
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    color: "#666",
    fontSize: 12,
  },
  contentText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    marginRight: 8,
    flexWrap: "wrap",
    maxWidth: "80%",
    textAlign: "left",
  },
});
