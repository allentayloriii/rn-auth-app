import { AuthProvider } from "@/context/AuthContext";
import { COLORS } from "@/utils/colors";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <AuthProvider>
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
        <Stack.Screen
          name="privacy"
          options={{
            title: "Privacy Policy",
            headerBackTitle: "Back",
          }}
        />
      </Stack>
    </AuthProvider>
  );
};

export default Layout;
