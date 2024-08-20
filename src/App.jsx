import React from "react";
import Home from "./pages/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import axios from "axios";
import { useSelector } from "react-redux";

axios.defaults.withCredentials = true;

const App = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <Routes>
      <Route path="/" element={!user ? <Navigate to="/login" /> : <Home />} />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
    </Routes>
  );
};

export default App;
