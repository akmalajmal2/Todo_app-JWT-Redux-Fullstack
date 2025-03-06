import { Outlet } from "react-router-dom";
import NavItems from "./NavItems";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <>
      <div className={styles["layout"]}>
        <NavItems />
        <Outlet />
      </div>
    </>
  );
};
export default Layout;
