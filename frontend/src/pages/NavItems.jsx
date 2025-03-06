import { Link, useNavigate } from "react-router-dom";
import styles from "./NavItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useTheme } from "../store/ThemeProvider";
import { logout, logoutNew } from "../feature/authSlice";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const NavItems = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);
  const handleLogout = () => {
    dispatch(logoutNew());
  };
  return (
    <>
      <nav className={styles["nav-container"]}>
        <Link to="/">Products</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/about">About US</Link>

        <span onClick={toggleTheme} className={styles["theme"]}>
          {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
        </span>
        <span onClick={handleLogout} className={styles["logout"]}>
          <MdLogout />
        </span>

        {/* <button onClick={handleLogout}>Logout</button> */}
      </nav>
    </>
  );
};

export default NavItems;
