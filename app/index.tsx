import { COLORS } from "@/utils/colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as z from "zod";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const schema = z.object({
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .max(6, "Password must be at least 6 characters long"),
  });

  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    // Handle form submission logic here
    setLoading(true);
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
      console.log("Form submitted successfully");
      // You can navigate to another screen or show a success message here
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.image}
        />
        <Text style={styles.header}>Galaxies</Text>
        <Text style={styles.subHeader}>The app to be.</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                autoCapitalize="none"
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Email"
                placeholderTextColor={COLORS.placeholder}
                keyboardType="email-address"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Password"
                placeholderTextColor={COLORS.placeholder}
                secureTextEntry
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>
          )}
        />
        <TouchableOpacity
          disabled={!!errors.email || !!errors.password || loading}
          style={[
            styles.button,
            !errors.email && !errors.password ? {} : styles.buttonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={[styles.buttonText]}>Sign In</Text>
        </TouchableOpacity>
        <Link href="/register" asChild>
          <TouchableOpacity style={styles.outlineButton}>
            <Text style={styles.outlineButtonText}>Register</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/privacy" asChild>
          <TouchableOpacity style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={styles.outlineButtonText}>Privacy Policy</Text>
          </TouchableOpacity>
        </Link>
      </KeyboardAvoidingView>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  outlineButton: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  outlineButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  image: {
    width: "100%",
    height: 150,
    contentFit: "contain",
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 40,
    textAlign: "center",
  },
  inputContainer: {
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    padding: 10,
    backgroundColor: COLORS.input,
    height: 50,
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 10,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
