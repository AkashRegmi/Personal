import { Route, Routes } from "react-router-dom";
import MainLayout from "../component/layout/MainLayout";
import DashboardPage from "../pages/DashboardPage";
import ProductsPage from "../pages/ProductsPage";
import OrdersPage from "../pages/OrdersPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public route - does NOT use MainLayout */}
      <Route path="/login" element={<LoginPage />} />
      {/* Routes  that follow  WITH MainLayout */}
      <Route element={<ProtectedRoute />}>
        {/* Routes  that follow  WITH MainLayout */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
