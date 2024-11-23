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
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const loadingStoreData = () => {
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageToken) {
        setUser({ storageToken });
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
        setUser(response.data);

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        localStorage.setItem("@Auth:token", response.data.token);
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

  return (
    <AuthContext.Provider
      value={{
        user,
        singIn,
        singOut,
        signed: !!user,
        loginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
