import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import { Route, Routes } from "react-router-dom";
import TestingPage from "./pages/TestingPage";
import OrderPage from "./pages/OrderPage";
import OrderDetail from "./pages/OrderDetail";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./hook/auth/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import PageNotFound from "./components/PageNotFound";
import { useEffect } from "react";

export default function App() {
  const token = sessionStorage.getItem("biz-bozz");
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (token) {
      login();
    }
  });

  return (
    <div className="flex">
      {isAuthenticated && <Sidebar />}
      <div className="flex-1">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/menu"
            element={
              <PrivateRoute>
                <MenuPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/testing"
            element={
              <PrivateRoute>
                <TestingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <OrderPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <PrivateRoute>
                <OrderDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/testing"
            element={
              <PrivateRoute>
                <OrderDetail />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}
