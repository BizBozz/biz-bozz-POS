import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import { Route, Routes } from "react-router-dom";
import OrderPage from "./pages/OrderPage";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./hook/auth/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import PageNotFound from "./components/PageNotFound";
import { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import Scoreboard from "./pages/TestingPage";
import { Receipt } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import { FaUser } from "react-icons/fa";

import "./App.css";
import EnterID from "./pages/EnterID";
import User from "./components/User";

export default function App() {
  const location = window.location.pathname;
  const user = JSON.parse(sessionStorage.getItem("bz-user"));
  const [islogin, setIslogin] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    if (location.includes("/login")) {
      setIslogin(false);
    } else {
      setIslogin(true);
    }
  }, [location]);

  return (
    <AnimatePresence>
      <div className="bg-gray-100">
        <div className="flex flex-col">
          {/* Button to open/close the sidebar */}
          {islogin && (
            <div className="px-5 mt-2 flex justify-between">
              <button
                onClick={toggleSidebar}
                className="px-5 border bg-white border-gary-300 text-primary rounded-lg focus:outline-none"
              >
                <IoMdMenu size={30} />
              </button>

              <div className="">
                <User user={user} />
              </div>
              <button
                onClick={() => setisVisible(!isVisible)}
                className="md:hidden p-2 border border-primary bg-primary text-white rounded-lg"
              >
                <Receipt size={25} />
              </button>
            </div>
          )}

          {/* Sidebar Component */}

          <div
            className={`${
              islogin
                ? "flex-1 bg-white border border-gray-300 mx-5 mt-2 rounded-xl shadow-md overflow-hidden"
                : ""
            }`}
          >
            {isSidebarVisible && (
              <div className="fixed z-10 w-64 bg-opacity-50">
                <div className="bg-white rounded-lg shadow-xl border border-gray-200 max-w-md w-full p-5">
                  <Sidebar closeSidebar={toggleSidebar} />
                </div>
              </div>
            )}

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
                path="/login"
                element={
                  // <PrivateRoute>
                  <EnterID />
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
              <Route
                path="/dashboard"
                element={
                  // <PrivateRoute>
                  <Dashboard />
                  // </PrivateRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  // <PrivateRoute>
                  <OrderPage />
                  // </PrivateRoute>
                }
              />
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
