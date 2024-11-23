import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.msg);
        console.log(error.response.data.msg); // Acessa a mensagem retornada pelo servidor
      } else {
        console.error("Erro desconhecido:", error);
      }
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
          {error && <ErrorMessage>{error}</ErrorMessage>}
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
