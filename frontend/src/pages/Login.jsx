import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../feature/authSlice";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, status, token } = useSelector((state) => state.auth);
  const [creditional, setCreditional] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreditional((prevCreditional) => ({
      ...prevCreditional,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(creditional));
  };
  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-box"]}>
        <header>
          <h2>Login</h2>
        </header>
        {error && <p className={styles["error-message"]}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles["input-group"]}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={handleInputChange}
              value={creditional.email}
              required
            />
          </div>
          <div className={styles["input-group"]}>
            <label>Password</label>
            <input
              name="password"
              placeholder="Enter password"
              type="password"
              onChange={handleInputChange}
              value={creditional.password}
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className={styles["login-button"]}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className={styles["register-link"]}>
          Don't have an account ? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
