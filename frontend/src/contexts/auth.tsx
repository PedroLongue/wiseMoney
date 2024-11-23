import React, { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";
import { Navigate } from "react-router-dom";
import axios from "axios";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  singIn(email: string, password: string): Promise<void>;
  singOut(): void;
  loginError: string;
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
  const [loginError, setLoginError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

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
      if (axios.isAxiosError(error) && error.response) {
        setLoginError(error.response.data.msg);
      } else {
        console.error("Erro ao fazer login:", error);
      }
    }
  };

  const singOut = () => {
    localStorage.clear();
    setUser(null);
    return <Navigate to="/login" />;
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
      if (axios.isAxiosError(error) && error.response) {
        setLoginError(error.response.data.msg);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        singIn,
        singOut,
        signed: !!user,
        loginError,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
