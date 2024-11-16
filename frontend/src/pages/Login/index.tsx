import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  LoginTitle,
  LoginSubtitle,
  InputWrapper,
  LoginText,
  ButtonWrapper,
} from "./styles";
import Box from "@mui/material/Box";
import Button from "../../components/Button";
import InputField from "../../components/TextField";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../contexts/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, Login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      await Login(email, password);
    } catch (error) {
      console.error("Erro de autenticação:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box
        component="section"
        sx={{
          background: "#D9D9D9",
          width: "100%",
          maxWidth: "480px",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <LoginTitle>Bem-vindo ao WiseMoney!</LoginTitle>
        <LoginSubtitle style={{ marginTop: "14px" }}>
          Aqui, você encontra ferramentas e insights para transformar suas
          finanças em algo simples e estratégico.
        </LoginSubtitle>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <InputField
              id="email"
              label="Digite seu email..."
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              id="password"
              label="Digite sua senha..."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputWrapper>
          <ButtonWrapper>
            <LoginText>
              Não tem conta? <Link to="/register">Cadastre-se</Link>
            </LoginText>
            <Button text="Acessar" />
          </ButtonWrapper>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
