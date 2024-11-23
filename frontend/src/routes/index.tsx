import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthContext } from "../contexts/auth";
import { useContext } from "react";

export const AppRouter = () => {
  const { signed } = useContext(AuthContext);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={signed ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};
