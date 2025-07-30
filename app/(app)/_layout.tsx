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
    console.log("Checking authentication status...");
    if (!initialized) {
      // Handle the case where auth context is not initialized yet
      console.log("Auth context is not initialized yet.");
      return;
    }

    const isAuthGroup = segments[1] === "(authenticated)";
    console.log(`Is authenticated group: ${isAuthGroup}`);

    if (token && !isAuthGroup) {
      // Redirect to login or handle unauthenticated state
      console.log("User is not authenticated, redirecting...");
      router.replace("/(app)/(authenticated)/(tabs)/messages");
    } else if (!token && isAuthGroup) {
      // Redirect to the main app if the user is authenticated
      console.log("User is authenticated, redirecting to main app...");
      router.replace("/");
    }
  }, [initialized, router, segments, token]);
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },
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
