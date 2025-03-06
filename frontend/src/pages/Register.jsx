import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../feature/authSlice";
import styles from "./Register.module.css";
import { Link, replace, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === "registered") {
      setTimeout(() => navigate("/login", { replace: true }), 3000);
    }
  }, [status, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match!");
      return;
    }
    setFormError("");
    setSuccessMessage("");
    try {
      const result = await dispatch(
        register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();
      if (result) {
        setSuccessMessage("Registration Successful! Redirecting to login...");
        // setTimeout(() => navigate("/login", { replace: true }), 2000);
      }
    } catch (error) {
      console.error("Registration failed:", err);
    }
  };
  return (
    <div className={styles["register-container"]}>
      <div className={styles["register-box"]}>
        <header>
          <h2>Register</h2>
        </header>

        <form onSubmit={handleSubmit}>
          <div className={styles["register-group"]}>
            <label>Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter Name"
              onChange={handleInputChange}
              value={formData.name}
              required
            />
          </div>
          <div className={styles["register-group"]}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter Email address"
              onChange={handleInputChange}
              value={formData.email}
              required
            />
          </div>
          <div className={styles["register-group"]}>
            <label>Password</label>
            <input
              name="password"
              placeholder="Password"
              type="password"
              onChange={handleInputChange}
              value={formData.password}
              required
            />
          </div>
          <div className={styles["register-group"]}>
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              onChange={handleInputChange}
              value={formData.confirmPassword}
              required
            />
          </div>
          {error && <p className={styles["error-message"]}>{error}</p>}
          {formError && <p className={styles["error-message"]}>{formError}</p>}
          {successMessage && (
            <p className={styles["success-message"]}>{successMessage}</p>
          )}
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Registering..." : "Register"}
          </button>
        </form>
        <p className={styles["login-link"]}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
