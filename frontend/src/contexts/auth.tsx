import React, { createContext, ReactNode, useState } from "react";
import api from "../services/api";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  setUser: React.Dispatch<React.SetStateAction<object | null>>;
  Login(email: string, password: string): Promise<void>;
  Logout(): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);

  async function Login(email: string, password: string) {
    try {
      const response = await api.post("/auth/login", { email, password });

      const userData = { id: response.data._id, message: response.data.msg };
      
      setUser(userData);

      localStorage.setItem("token", response.data.token);
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      console.log("Usuário logado com sucesso:", userData);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Falha no login");
    }
  }

  function Logout() {
    setUser(null);

    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, setUser, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
