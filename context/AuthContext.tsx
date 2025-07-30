import { loginUser, registerUser } from "@/utils/api";
import { setAuthToken } from "@/utils/axios";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const JWT_TOKEN = "jwt_token";

type AuthProps = {
  token: string | null;
  userId: number | null;
  onRegister: (email: string, password: string, name: string) => Promise<any>;
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => Promise<any>;
  initialized: boolean;
};

interface DecodedToken {
  id: number;
}

const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [initialized, setInitialized] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const processToken = useCallback((token: string) => {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setToken(token);
      if (__DEV__) {
        console.log("Decoded Token:", decodedToken);
      }
      setUserId(decodedToken.id);
    } catch (error) {
      console.error("Failed to decode token:", error);
      handleLogout();
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const result = await loginUser(email, password);
    if (result.error) {
      return { error: true, msg: result.error };
    }
    const token = result.data;
    processToken(token);
    await SecureStore.setItemAsync(JWT_TOKEN, token);
    return result;
  };

  const handleRegister = async (
    email: string,
    password: string,
    name?: string
  ) => {
    const result = await registerUser(email, password, name);
    if (result.error) {
      return { error: true, msg: result.error };
    }
    return result;
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync(JWT_TOKEN);
    setToken(undefined);
    setUserId(null);
  };

  const value = {
    initialized,
    token,
    userId,
    onLogin: handleLogin,
    onRegister: handleRegister,
    onLogout: handleLogout,
  };

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync(JWT_TOKEN);
      if (__DEV__) {
        console.log("Loaded token:", storedToken);
      }
      if (storedToken) {
        setAuthToken(storedToken);
        processToken(storedToken);
      }
      setInitialized(true);
    };
    loadToken();
  }, [processToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
