import React, { useState } from "react";
import { validateLogin } from "../../controller/controller";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const ERROR_MESSAGE = "Invalid login credentials! Please try again.";

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const user = validateLogin(username, password);
    if (user) {
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
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={(e) => handleLoginSubmit(e)}>
        <label htmlFor="usernameInput">Username</label>
        <input
          required
          type="text"
          id="usernameInput"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="passwordInput">Username</label>
        <input
          required
          type="password"
          id="passwordInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i className="fas fa-eye-slash"></i>
        {errorMessage ? <p>{errorMessage}</p> : null}
        <a href="/forgot">Forgot your password?</a>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
