import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import ProductPage from "../pages/products/ProductPage";
import ProductDetail from "../pages/products/ProductDetail";
import Wishlist from "../pages/wishlist/Wishlist";
import ShoppingCart from "../pages/cart/ShoppingCart";
import Checkout from "../pages/home/Checkout";
import LoadingLogin from "../components/loading/LoadingLogin";
import LoadingGoogle from "../components/loading/LoadingGoogle";

const Main = () => (
  <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoadingLogin />} />

      <Route path="/product" element={<ProductPage />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/shopping-cart" element={<ShoppingCart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/detailProduct/:productId" element={<ProductDetail />} />
    </Routes>
  </main>
);

export default Main;
