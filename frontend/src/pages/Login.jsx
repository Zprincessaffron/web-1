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
      const { data: response } = await axios.post("/login", { email, password });

      if (response.error) {
        toast.error(response.error);
      } else {
        // Clear input fields
        setData({ email: "", password: "" });

        // Store the token (you can store it in localStorage or cookies)
        localStorage.setItem("token", response.token);

        // Show success message
        toast.success("Login successful");
        // Navigate based on role and include marketer ID if the role is 'marketer'
        const { role, id } = response;
        console.log(response);
        if (role === "admin") {
          navigate("/admin/dashboard");
          window.location.reload();
        } else if (role === "marketer" && id) {
          navigate(`/marketer-dashboard/${id}`);
          window.location.reload();
        } else if (role === "wholesaler") {
          navigate("/");
          window.location.reload();
        } else {
          navigate("/");
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during login.");
    }
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Type your email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Type your password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
