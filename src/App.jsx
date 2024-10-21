import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import { Route, Routes } from "react-router-dom";
import TestingPage from "./pages/TestingPage";
import OrderPage from "./pages/OrderPage";
import OrderDetail from "./pages/OrderDetail";
import "./App.css";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/testing" element={<TestingPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/order/:id" element={<OrderDetail />} />
        </Routes>
      </div>
    </div>
  );
}
