import { ErrorState } from "@/components/common/ErrorState";
import { useAuth } from "@/context/AuthContext";
import { deleteMessage, fetchMessage, updateMessage } from "@/utils/api";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

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
        color={disabled ? "#999" : COLORS.primary}
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
    refetch,
  } = useQuery({
    queryKey: ["message", id],
    queryFn: () => fetchMessage(Number(id)),
  });

  const isOwnMsg = message?.data?.userId === userId;

  useEffect(() => {
    if (message?.data?.content) {
      console.log("Fetched message:", message.data.content);
      setEditedText(message.data?.content ?? "");
    }
  }, [message?.data?.content]);

  const handleUpdate = () => {
    if (editedText.trim() !== message?.data?.content) {
      updateMutation.mutate();
    } else {
      setIsEditing(false);
      setEditedText(message?.data?.content || "");
    }
  };

  const updateMutation = useMutation({
    mutationFn: () => updateMessage(Number(id), { content: editedText }),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["message", id] });
      setIsEditing(false);
      if (!data) {
        Toast.show({
          type: "error",
          text1: "Failed to update message",
          text2: "An unexpected error occurred",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Message updated successfully!",
        });
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteMessage(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["message"] });
      Toast.show({
        type: "success",
        text1: "Message deleted successfully!",
      });
      router.back();
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Failed to delete message",
        text2: "An unexpected error occurred",
      });
    },
  });

  if (isLoading)
    return (
      <ActivityIndicator
        style={styles.center}
        size="large"
        color={COLORS.primary}
      />
    );
  if (isError)
    return <ErrorState onRetry={refetch} message="Failed to load message" />;
  if (!message?.data)
    return <ErrorState onRetry={refetch} message="Message not found" />;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `Message #${id}`,
        }}
      />
      {isOwnMsg ? (
        <View>
          <Text style={styles.ownMessageContainer}>
            {isEditing ? (
              <View>
                <TextInput
                  style={[styles.input]}
                  value={editedText}
                  onChangeText={setEditedText}
                  multiline
                />
                <View style={[styles.controls]}>
                  <IconButton
                    icon="checkmark"
                    onPress={() => {
                      handleUpdate();
                    }}
                    disabled={updateMutation.isPending}
                  />
                  <IconButton
                    icon="close"
                    onPress={() => {
                      setIsEditing(false);
                      setEditedText(message?.data?.content || "");
                    }}
                  />
                </View>
              </View>
            ) : (
              <View>
                <Text style={[styles.messageText]}>
                  {message?.data?.content}
                </Text>
                <View style={[styles.controls]}>
                  <IconButton
                    icon="pencil"
                    onPress={() => {
                      setIsEditing(true);
                    }}
                  />
                  <IconButton
                    icon="trash"
                    onPress={() => {
                      deleteMutation.mutate();
                    }}
                    disabled={deleteMutation.isPending}
                  />
                </View>
              </View>
            )}
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.otherMessageContainer}>
            {message?.data?.content}
          </Text>
        </View>
      )}
    </View>
  );
};

export default MessageDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
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
    height: 40,
    width: 40,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ownMessageContainer: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  otherMessageContainer: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#ffe0b2",
    borderRadius: 8,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    padding: 8,
  },
  controls: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
    marginTop: 8,
  },
  input: {
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 24,
  },
});
