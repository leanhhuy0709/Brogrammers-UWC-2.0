

import React, { useState } from "react";
import { validateLogin } from "../../controller/controller";
import { useNavigate } from "react-router-dom";

import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const ERROR_MESSAGE = "Invalid login credentials! Please try again.";

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const {user, status} = validateLogin(username, password);
    if (status) {
      setUsername("");
      setPassword("");
      localStorage.setItem("userId", user.id);
      navigate("/");
      navigate(0);
      return;
    } else {
      setErrorMessage(ERROR_MESSAGE);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={(e) => handleLoginSubmit(e)}>
        <label htmlFor="usernameInput">Username</label>
        <input
          required
          type="text"
          id="usernameInput"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className = "input width400px"
        />
        <label htmlFor="passwordInput">Password</label>
        <input
          required
          type="password"
          id="passwordInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className = "input width400px"
        />
        {errorMessage ? <p className = "error-message">{errorMessage}</p> : null}
        <label>Forgot your password?</label>
        <a href="/forgot" class = "link">Reset password</a>
        <button type="submit" className = "button width400px">Login</button>
        <label>No account?</label>
        <a href="#" class = "link">Register</a>
      </form>
    </div>
  );
};

export default Login;


