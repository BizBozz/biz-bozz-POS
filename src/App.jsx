import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import { Route, Routes } from "react-router-dom";
// import TestingPage from "./pages/TestingPage";
import OrderPage from "./pages/OrderPage";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./hook/auth/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import PageNotFound from "./components/PageNotFound";
import { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import Scoreboard from "./pages/TestingPage";
import "./App.css";
import { Receipt } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const token = sessionStorage.getItem("biz-bozz");
  const { isAuthenticated, login } = useAuth();
  const [isVisible, setisVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    if (token) {
      login();
    }
  });

  return (
    <AnimatePresence>
      <div className="bg-gray-100">
        <div className="flex flex-col">
          {/* Button to open/close the sidebar */}
          <div className="px-5 pt-5 flex justify-between">
            <button
              onClick={toggleSidebar}
              className="p-2 border bg-white border-gary-300 text-primary rounded-lg focus:outline-none"
            >
              <IoMdMenu size={25} />
            </button>
            <button
              onClick={() => setisVisible(!isVisible)}
              className="md:hidden p-2 border border-primary bg-primary text-white rounded-lg"
            >
              <Receipt size={25} />
            </button>
          </div>

          {/* Sidebar Component */}
          <Sidebar
            isVisible={isSidebarVisible}
            closeSidebar={() => setIsSidebarVisible(false)}
          />
          <div className="flex-1 bg-white border border-gray-300 m-5 rounded-xl shadow-md overflow-hidden">
            <Routes>
              <Route path="/login/:id" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  // <PrivateRoute>
                  <HomePage isVisible={isVisible} />
                  // </PrivateRoute>
                }
              />
              <Route
                path="/menu"
                element={
                  // <PrivateRoute>
                  <MenuPage />
                  // </PrivateRoute>
                }
              />
              {/* <Route
            path="/testing"
            element={
              <PrivateRoute>
                <TestingPage />
              </PrivateRoute>
            }
          /> */}
              <Route
                path="/orders"
                element={
                  // <PrivateRoute>
                  <OrderPage />
                  // </PrivateRoute>
                }
              />
              {/* <Route
            path="/order/:id"
            element={
              <PrivateRoute>
                <OrderDetail />
              </PrivateRoute>
            }
          /> */}
              <Route
                path="/testing"
                element={
                  <PrivateRoute>
                    <Scoreboard />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
