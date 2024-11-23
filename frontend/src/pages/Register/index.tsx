import React, { useContext, useState } from "react";
import {
  Container,
  LoginTitle,
  InputWrapper,
  LoginText,
  ButtonWrapper,
  ErrorMessage,
} from "../Login/styles";
import Button from "../../components/Button";
import Box from "@mui/material/Box";
import InputField from "../../components/TextField";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, authError } = useContext(AuthContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await register(name, email, password, confirmPassword);
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
        <LoginTitle>Faça seu cadastro!</LoginTitle>
        <form onSubmit={handleSubmit} style={{ position: "relative" }}>
          <InputWrapper>
            <InputField
              id="name"
              label="Digite seu nome..."
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <InputField
              id="Confirmpassword"
              label="Confirme sua senha..."
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </InputWrapper>
          {authError && <ErrorMessage>{authError}</ErrorMessage>}
          <ButtonWrapper>
            <LoginText>
              Já tem conta? <Link to="/login">Faça login</Link>
            </LoginText>
            <Button text="Cadastrar" />
          </ButtonWrapper>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
