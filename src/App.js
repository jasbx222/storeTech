import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import "./App.css";
import Home from "./pages/Home";
import ForgotPassword from "./pages/auth/ForgotPasswordModel";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";

import Cart from "./pages/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Spinner from "./components/common/Spinner";
import PrivacyTerms from "./pages/Privacy/Privacy";
import ContactUs from "./pages/Contact/contact-us";

import FavoritesPage from "./pages/Favorites/Favorites";
import ShowProducts from "./pages/Product/ShowProducts";
import ProductDetails from "./pages/Product/ProductDetails";
import ErrorPage from "./pages/Error/Error";

function App() {
  return (
    <Router>
      <Spinner />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<Categories />} />
          <Route path="/error" element={<ErrorPage />} />

          <Route path="/products" element={<ShowProducts />} />
          <Route path="/product/:product_id" element={<ProductDetails />} />

          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route
            path="/favorites"
            element={<ProtectedRoute component={FavoritesPage} />}
          />

          <Route path="/cart" element={<ProtectedRoute component={Cart} />} />
          <Route path="/terms" element={<PrivacyTerms />} />

          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
