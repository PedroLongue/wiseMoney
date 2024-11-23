import React, { useContext, useState } from "react";
import {
  Container,
  LoginTitle,
  LoginSubtitle,
  InputWrapper,
  LoginText,
  ButtonWrapper,
  ErrorMessage,
} from "./styles";
import Box from "@mui/material/Box";
import Button from "../../components/Button";
import InputField from "../../components/TextField";
import { Link, Navigate } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { singIn, signed, authError } = useContext(AuthContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await singIn(email, password);
  };
  console.log(signed);
  if (!signed) {
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
          <form onSubmit={handleSubmit} style={{ position: "relative" }}>
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
            {authError && <ErrorMessage>{authError}</ErrorMessage>}
            <ButtonWrapper>
              <LoginText>
                Não tem conta? <Link to="/register">Cadastre-se</Link>
              </LoginText>
              <Button text={"Acessar"} />
            </ButtonWrapper>
          </form>
        </Box>
      </Container>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default Login;
