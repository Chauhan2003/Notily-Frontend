import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import NotilyContext from "./components/context/Context";
import Home from "./pages/home/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

axios.defaults.withCredentials = true;

const App = () => {
  const { user } = useContext(NotilyContext);

  return (
    <Routes>
      <Route path="/" element={!user ? <Navigate to="/signin" /> : <Home />} />
      <Route
        path="/signup"
        element={user ? <Navigate to="/" /> : <Register />}
      />
      <Route path="/signin" element={user ? <Navigate to="/" /> : <Login />} />
    </Routes>
  );
};

export default App;
