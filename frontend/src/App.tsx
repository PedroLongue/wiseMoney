import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Regsiter from "./pages/Register";
import Home from "./pages/Home";
import './global.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regsiter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
