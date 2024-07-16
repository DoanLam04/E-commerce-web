import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/products/Products";
import NewProduct from "./pages/products/NewProduct";
import Categories from "./pages/categories/Categories";
import ProductEdit from "./pages/products/ProductEdit";

const MainDashboard = () => (
  <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="new-product" element={<NewProduct />} />
      <Route path="categories" element={<Categories />} />
      <Route path="product/edit/:id" element={<ProductEdit />} />
    </Routes>
  </main>
);

export default MainDashboard;
