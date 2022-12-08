import React, { useRef, useState } from "react";
import { validateLogin } from "../../controller/controller";
import { useNavigate } from "react-router-dom";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const ERROR_MESSAGE = "Invalid login credentials! Please try again.";

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { user, status } = validateLogin(
      usernameRef.current.value,
      passwordRef.current.value
    );
    if (status) {
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
      <form>
        <label htmlFor="usernameInput">Username</label>
        <input
          required
          type="text"
          id="usernameInput"
          ref={usernameRef}
          className="input width400px"
        />
        <label htmlFor="passwordInput">Password</label>
        <input
          required
          type={showPassword ? "text" : "password"}
          id="passwordInput"
          ref={passwordRef}
          className="input width400px"
        />
        <span onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeSlashFill /> : <EyeFill />}
        </span>
        {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
        <label>Forgot your password? </label>
        <a href="/forgot" class="link">
          Reset password
        </a>
        <button
          onClick={(e) => handleLoginSubmit(e)}
          className="button width400px"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
