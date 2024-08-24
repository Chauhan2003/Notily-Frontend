import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { validateEmail } from "../utils/helper";
import NotilyContext from "../components/context/Context";
import { userRoute } from "../Routes";
import PasswordInput from "../components/input/PasswordInput";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { setError, setLoading, error, loading } = useContext(NotilyContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { fullName, email, password } = formData;

    if (!fullName) {
      setError("Please enter your full name");
      setLoading(false);
      return;
    }

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
      const res = await axios.post(`${userRoute}/signup`, formData);
      toast.success(res.data.message);
      setError("");
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleRegister}>
          <h4 className="text-2xl mb-7">Sign Up</h4>

          <input
            type="text"
            placeholder="Full name"
            className="input-box"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Email"
            className="input-box"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <PasswordInput
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />

          {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Signing up..." : "SIGN UP"}
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-[#2B85FF] underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
