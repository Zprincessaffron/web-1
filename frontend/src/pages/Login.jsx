import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", { email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ email: "", password: "" });
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={loginUser}>
        <label htmlFor="">Email</label>
        <input
          type="email"
          name=""
          placeholder="Type your email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <br />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name=""
          placeholder="Type your password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
