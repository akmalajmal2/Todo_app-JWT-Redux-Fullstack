// import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRefreshToken, logout } from "./feature/authSlice";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <Layout /> : <Navigate to="/login" />,
      children: [{ path: "/", element: <Home /> }],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <NotFound /> },
  ]);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(fetchRefreshToken()).unwrap();
      } catch (err) {
        dispatch(logout());
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
