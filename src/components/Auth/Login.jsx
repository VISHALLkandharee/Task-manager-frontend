import React, { useState } from "react";
import { useContext } from "react";
import {NavLink} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);

    if (success || localStorage.getItem("accessToken")) {
      navigate("/dashboard", { replace: true });
    } else {
      setEmail("");
      setPassword("");
      throw new Error("Login failed");
    }
  };

  return (
    <div className="min-h-screen md:my-15 md:mx-auto md:bg-blue-400/90 md:p-6 md:rounded-xl md:shadow-lg md:max-w-lg md:w-full text-white flex flex-col items-center justify-center p-4 sm:p-6 bg-linear-to-br from-blue-400/90 to-blue-500/90">
      <div className="w-full max-w-lg md:max-w-lg">
        <h1 className="font-bold capitalize text-xl tracking-wide text-center mb-4">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            className="w-full p-3 rounded-lg bg-blue-300/70 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-100 font-semibold transition"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-3 rounded-lg bg-blue-300/70 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-100 font-semibold transition"
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full p-3 rounded-2xl bg-green-400 cursor-pointer hover:bg-green-500 transition"
          >
            Login
          </button>
        </form>

        <div id="not-registered" className="flex gap-4 font-light mt-4 justify-center">
          Not registered? <NavLink to={"/register"} className="text-yellow-300 hover:text-yellow-400 text-sm underline">Create an account</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
