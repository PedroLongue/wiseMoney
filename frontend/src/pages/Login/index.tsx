import React, { useContext, useState } from "react";
import {
  Container,
  InputWrapper,
  ButtonWrapper,
  ErrorMessage,
} from "./styles";
import Box from "@mui/material/Box";
import Button from "../../components/Button";
import InputField from "../../components/TextField";
import { Link, Navigate } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";
import { Typography } from "@mui/material";

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
            width: "100%",
            maxWidth: "480px",
            padding: "30px",
            borderRadius: "20px",
          }}
        >
          <Typography variant="h4" color="#fff" fontWeight={400}>
            Bem-vindo ao WiseMoney!
          </Typography>
          <Typography variant="h6" color="#fff" fontWeight={400}>
            Faça seu login para acessar...
          </Typography>
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
              <Typography variant="body2" color="#fff" fontWeight={400}>
                Não tem conta?{" "}
                <Link to="/register" style={{ textDecoration: "underline" }}>
                  Cadastre-se
                </Link>
              </Typography>
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
