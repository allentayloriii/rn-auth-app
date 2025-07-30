import { useAuth } from "@/context/AuthContext";
import { COLORS } from "@/utils/colors";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

const Layout = () => {
  const { token, initialized } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Check if the user is authenticated
    if (!initialized) {
      // Handle the case where auth context is not initialized yet
      return;
    }

    const isAuthGroup = segments[1] === "(authenticated)";

    if (token && !isAuthGroup) {
      // Redirect to login or handle unauthenticated state
      router.replace("/(app)/(authenticated)/(tabs)/messages");
    } else if (!token && isAuthGroup) {
      // Redirect to the main app if the user is authenticated
      router.replace("/");
    }
  }, [token, initialized, segments, router]);

  return (
    <Stack
      screenOptions={{
        headerTintColor: "#fff",
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="register"
        options={{ title: "Create Account", headerBackTitle: "Login" }}
      />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      <Stack.Screen
        name="privacy"
        options={{
          title: "Privacy Policy",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
};

export default Layout;
