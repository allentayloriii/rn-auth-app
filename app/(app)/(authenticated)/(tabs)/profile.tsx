import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Profile = () => {
  const { onLogout } = useAuth();
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {},
});
