import { createContext, useContext, useEffect, useState } from "react";
import useErrorHandler from "../hooks/useErrorHandler";
import {
  registerUser,
  loginUser,
  authenticateUser,
  logout,
} from "../services/user";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const handleError = useErrorHandler();

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Authenticate session
    async function authenticateSession() {
      try {
        const userData = await authenticateUser();
        setUser(userData);
      } catch (error) {
        handleError(error);
        setUser(null);
      }
    }

    authenticateSession();
  }, [handleError]);

  // Register
  async function handleRegistration(userDetails) {
    try {
      await registerUser(userDetails);
      // navigate to login
    } catch (error) {
      console.error(`Failed to register user: ${error}`);
      handleError(error);
    }
  }

  // Login
  async function handleLogin(email, password) {
    try {
      const { session, user } = await loginUser(email, password);
      localStorage.setItem("token", session.access_token);
      setUser(user);
    } catch (error) {
      handleError(error);
      handleLogout();
    }
  }

  // Logout
  async function handleLogout() {
    await logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, handleRegistration, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
