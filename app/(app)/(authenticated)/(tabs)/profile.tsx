import { useAuth } from "@/context/AuthContext";
import { getUserInfo, uploadImage } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const { onLogout, token } = useAuth();
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
  });

  const handleSelectImage = async () => {
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: "images",
    //   allowsEditing: true,
    //   aspect: [1, 1],
    //   quality: 0.5,
    // });
    // if (!result.canceled && result.assets && result.assets.length > 0) {
    //   uploadImageMutation.mutate({
    //     uri: result.assets[0].uri,
    //     token: token || "",
    //   });
    // }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSelectImage}>
        {user?.data?.avatar ? (
          <Image source={{ uri: user.data.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarPlaceholderText}>
              {user?.data?.name?.charAt(0).toUpperCase() || "?"}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user?.data?.name || "No name"}</Text>
        <Text style={styles.email}>{user?.data?.email || "No email"}</Text>
      </View>
      <View style={{ marginTop: 20, width: "100%" }}>
        <Button title="Logout" onPress={onLogout} />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  infoContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarPlaceholderText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    width: "100%",
  },
});
