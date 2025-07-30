import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Button, Text, View } from "react-native";

const Profile = () => {
  const { onLogout } = useAuth();
  return (
    <View>
      <Text>Profile</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
};

export default Profile;
