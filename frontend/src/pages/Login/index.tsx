import React, { useState } from "react";
import {
  Container,
  LoginTitle,
  LoginSubtitle,
  InputWrapper,
  LoginText,
  ButtonWrapper,
} from "./styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Adicione sua lógica de autenticação ou de envio de dados aqui
    console.log("Email:", email);
    console.log("Password:", password);
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
        <LoginTitle>Bem-vindo ao MoneyWise!</LoginTitle>
        <LoginSubtitle style={{ marginTop: "14px" }}>
          Aqui, você encontra ferramentas e insights para transformar suas
          finanças em algo simples e estratégico.
        </LoginSubtitle>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <TextField
              id="email"
              label="Digite seu email..."
              variant="standard"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#2A382F",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "#2A382F",
                },
              }}
            />
            <TextField
              id="password"
              label="Digite sua senha..."
              variant="standard"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#2A382F",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "#2A382F",
                },
              }}
            />
          </InputWrapper>
          <ButtonWrapper>
            <LoginText>
              Não tem conta? <Link to="/register">Cadastre-se</Link>
            </LoginText>
            <Button
              type="submit"
              variant="contained"
              sx={{ background: "#2A382F", width: "144px" }}
            >
              Acessar
            </Button>
          </ButtonWrapper>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
