import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import NotilyContext from "../components/context/Context";
import { userRoute } from "../Routes";
import { validateEmail } from "../utils/helper";
import PasswordInput from "../components/input/PasswordInput";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setLoading, setError, error, setUser, loading } =
    useContext(NotilyContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = formData;

    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter the password");
      setLoading(false);
      return;
    }

    setError("");

    try {
      const res = await axios.post(`${userRoute}/signin`, formData);
      setUser(res.data.user);
      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Sign In</h4>

          <input
            type="text"
            placeholder="Email"
            className="input-box"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <PasswordInput
            name={"password"}
            value={formData.password}
            onChange={handleChange}
          />

          {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-sm text-center mt-4">
            Not registered yet?{" "}
            <Link to="/signup" className="font-medium text-[#2B85FF] underline">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
