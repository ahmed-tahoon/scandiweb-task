import React from "react";
import { Navigate } from "react-router-dom";
import Products from "../Pages/Products";
import AddProduct from "../Pages/Products/AddProduct";

const publicRoutes = [
  { path: "/", component: <Products /> },
  { path: "/add-product", component: <AddProduct /> },
];

export { publicRoutes };
