import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const isAuth = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  if (!isAuth) {
    navigate("/login");
    return null;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
