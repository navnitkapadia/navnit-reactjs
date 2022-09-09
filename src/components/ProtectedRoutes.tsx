import { Outlet } from "react-router-dom";

import checkToken from "../helpers/checkToken";
import Login from "../pages/Login";

const ProtectedRoutes = () => {
  const isAuth: boolean = checkToken();
  return isAuth ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
