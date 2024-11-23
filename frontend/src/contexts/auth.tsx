import React, { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  register(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<void>;
  singIn(email: string, password: string): Promise<void>;
  singOut(): void;
  authError: string;
  currentUser: CurrentUser | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface CurrentUser {
  _id: string;
  name: string;
  email: string;
  __v: number;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [authError, setAuthError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadingStoreData = () => {
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
        setUser({ storageToken });
        getCurrentUser();
      }
    };
    loadingStoreData();
  }, []);

  const handleError = (error: unknown): void => {
    if (axios.isAxiosError(error) && error.response) {
      setAuthError(error.response.data.msg);
      console.error(error.response.data.msg);
    } else {
      console.error("Erro desconhecido:", error);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });

      if (response.data.error) {
        console.log(response.data.error);
      } else {
        navigate("/login");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const singIn = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        setUser(response.data.token);

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        localStorage.setItem("@Auth:token", response.data.token);
        getCurrentUser();
      }
    } catch (error) {
      handleError(error);
    }
  };

  const singOut = () => {
    localStorage.clear();
    setUser(null);
    setCurrentUser(null);
    navigate("login");
  };

  const getCurrentUser = async () => {
    try {
      const response = await api.get("auth/currentUser");

      if (response.data.error) {
        console.log(response.data.msg);
      } else {
        setCurrentUser(response.data);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        singIn,
        singOut,
        signed: !!user,
        authError,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
