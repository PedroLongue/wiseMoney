import React, { useState } from "react";
import {
  Container,
  LoginTitle,
  InputWrapper,
  LoginText,
  ButtonWrapper,
} from "../Login/styles";
import Button from "../../components/Button";
import Box from "@mui/material/Box";
import InputField from "../../components/TextField";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Adicione sua lógica de autenticação ou de envio de dados aqui
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("ConfirmPassword:", confirmPassword);
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
        <form onSubmit={handleSubmit}>
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
