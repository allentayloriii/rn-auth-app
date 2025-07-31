import { createMessage } from "@/utils/api";
import { COLORS } from "@/utils/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Burnt from "burnt";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const NewMsg = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (message: string) => {
      return createMessage({ content: message });
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      Burnt.toast({ title: "Message sent successfully!", duration: 3 });
      router.back();
    },
    onError: (error) => {
      console.error("Error creating message:", error);
      Burnt.toast({
        title: "Error sending message",
        message: error.message,
        duration: 3,
      });
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
            <Text style={styles.sendButtonText}>Send</Text>
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
  sendButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.5,
    textAlignVertical: "center",
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
