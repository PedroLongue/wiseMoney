import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Regsiter from "./pages/Register";
import Home from "./pages/Home";
import "./global.css";
import Header from "./components/Header";

import { AuthProvider, signed } from "./contexts/auth";

function App() {
  return (
    <>
      <Header />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={signed ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Regsiter />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
