import { Route, Routes } from "react-router-dom";

import AddProduct from "../pages/AddProduct";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFoundPage from "../pages/NotFoundPage";
import ProductDetail from "../pages/ProductDetail";
import ProductList from "../pages/ProductList";
import ProtectedRoutes from "./ProtectedRoutes";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Home />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default Router;
