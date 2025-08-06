import { createMessage } from "@/utils/api";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const NewMsg = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (message: string) => {
      return createMessage({ content: message });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      Toast.show({
        type: "success",
        text1: "Message sent successfully!",
      });
      router.back();
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Failed to send message",
        text2:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
      console.error("Error creating message:", error);
    },
  });

  const handleSubmit = () => {
    sendMessage(message.trim());
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          multiline
          style={styles.input}
          autoFocus
          maxLength={500}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isPending || !message.trim()}
          style={[
            styles.sendButton,
            !message.trim() && styles.sendButtonDisabled,
          ]}
        >
          {isPending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Ionicons name="send" size={24} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewMsg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    padding: 16,
    gap: 10,
    flexDirection: "row",
  },
  input: {
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  sendButton: {
    padding: 12,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    backgroundColor: COLORS.primary,
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },
});
