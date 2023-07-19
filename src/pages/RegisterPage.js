import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can Log in");
    } catch (e) {
      alert("Registration failed. Try again later");
    }
  };

  return (
    <div className="mt-5 grow flex justify-around items-center">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-5">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="username"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="primary">Register</button>
        </form>
        <div className="text-center my-2 text-gray-500">
          Already have an account?{" "}
          <Link className="text-black underline" to={"/login"}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
