import { Route, Routes } from "react-router-dom";
import MainLayout from "../component/layout/MainLayout";
import ProductsPage from "../pages/ProductsPage";
import OrdersPage from "../pages/OrdersPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import { StoreLayout } from "../component/layout/StoreLayout";
import HomePage from "../pages/HomePage";
import ProductsPageCustomer from "../component/store/ProductsPageCustomer";
import ProductDetailsPage from "../component/store/ProductDetailsPage";
import { CartPage } from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import CustomerOrderPage from "../pages/CustomerOrderPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import RegisterPage from "../pages/RegisterPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public route - does NOT use MainLayout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<StoreLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPageCustomer />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/customer/orders" element={<CustomerOrderPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
      </Route>
      {/* Routes  that follow  WITH MainLayout */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        {/* Routes  that follow  WITH MainLayout */}

        <Route element={<MainLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
