import React, { useState } from "react";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const history = useNavigate();
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert("the key");
    try {
      await login(formData);
      history("/tasks");
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
