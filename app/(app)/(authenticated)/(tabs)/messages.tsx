import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import FAB from "@/components/fab/fab";
import MessageItem from "@/components/fab/messages/MessageItem";
import { fetchMessages } from "@/utils/api";
import { COLORS } from "@/utils/colors";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";

const Messages = () => {
  const {
    data: messages,
    isLoading,
    isError,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });

  if (isError) {
    return <ErrorState message="Error loading messages" onRetry={refetch} />;
  }

  return (
    <View style={styles.container}>
      {isLoading || isPending ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={messages?.data || []}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <MessageItem message={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <>{!isLoading && <EmptyState message="No messages found" />}</>
          }
          refreshControl={
            <RefreshControl refreshing={isPending} onRefresh={refetch} />
          }
        />
      )}
      <FAB />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
    flexGrow: 1,
  },
});

export default Messages;
