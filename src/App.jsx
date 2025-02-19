import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import { Route, Routes, NavLink } from "react-router-dom";
import OrderPage from "./pages/OrderPage";
import LoginPage from "./pages/LoginPage";
// import { useAuth } from "./hook/auth/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import PageNotFound from "./components/PageNotFound";
import { useEffect, useState } from "react";
import Scoreboard from "./pages/TestingPage";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard";
// import { FaUser } from "react-icons/fa";
import { Menu } from "lucide-react";

import "./App.css";
import EnterID from "./pages/EnterID";
import User from "./components/User";
import { useSelector } from "react-redux";
import SetupShop from "./pages/SetupShop";
import Welcome from "./pages/Welcome";
import TablePage from "./components/Home/TablePage";

export default function App() {
  const tables = [1, 2, 3, 4, 5];
  // const dispatch = useDispatch();
  const selectedTable = useSelector((state) => state.receipts.selectedTable);
  const receipts = useSelector((state) => state.receipts.receipts);
  const location = window.location.pathname;
  const user = JSON.parse(localStorage.getItem("bz-user"));
  const [islogin, setIslogin] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    if (
      location.includes("/login") ||
      location.includes("/signup") ||
      location.includes("/setup") ||
      location.includes("/welcome")
    ) {
      setIslogin(false);
    } else {
      setIslogin(true);
    }
  }, [location]);

  useEffect(() => {
    if (receipts[selectedTable]?.items.length > 0) {
      setAnimate(true);
      const timeout = setTimeout(() => {
        setAnimate(false); // Reset animation class after it finishes
      }, 300); // Match this duration with the CSS animation duration

      return () => clearTimeout(timeout);
    }
  }, [receipts[selectedTable]?.items.length]);

  return (
    <AnimatePresence>
      <div className="bg-white">
        <div className="flex flex-col min-h-screen">
          {/* Horizontal Navbar */}
          {islogin && (
            <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
              <div className="px-2 md:px-3 h-20 flex items-center justify-between">
                <button
                  onClick={toggleSidebar}
                  className="text-primary hover:text-primary/80 p-2"
                >
                  <Menu size={25} />
                </button>

                <div className="flex items-center gap-4">
                  <div className="">
                    <User user={user} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Horizontal Sliding Menu */}
          {islogin && isSidebarVisible && (
            <div className="fixed inset-0 z-40" onClick={toggleSidebar}>
              <div
                className="fixed top-20 left-0 right-0 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-4 py-4">
                  <div className="space-y-1">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 ${
                          isActive || location.includes("/order")
                            ? "text-primary font-medium"
                            : "text-gray-700"
                        }`
                      }
                    >
                      <span>Home</span>
                    </NavLink>
                    <NavLink
                      to="/menu"
                      className={({ isActive }) =>
                        `flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 ${
                          isActive
                            ? "text-primary font-medium"
                            : "text-gray-700"
                        }`
                      }
                    >
                      <span>Menu Management</span>
                    </NavLink>
                    <NavLink
                      to="/orders"
                      className={({ isActive }) =>
                        `flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 ${
                          isActive
                            ? "text-primary font-medium"
                            : "text-gray-700"
                        }`
                      }
                    >
                      <span>Order Management</span>
                    </NavLink>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 ${
                          isActive
                            ? "text-primary font-medium"
                            : "text-gray-700"
                        }`
                      }
                    >
                      <span>Sale Report</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className={`flex-1 ${islogin ? "pt-20" : ""}`}>
            <div className="flex">
              {/* Main Content Area */}
              <div className="flex-1">
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <TablePage tables={tables} />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/order/:table"
                    element={
                      <PrivateRoute>
                        <HomePage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/signup"
                    element={
                      // <PrivateRoute>
                      <EnterID />
                      // </PrivateRoute>
                    }
                  />
                  <Route
                    path="/welcome"
                    element={
                      <PrivateRoute>
                        <Welcome />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/setup"
                    element={
                      <PrivateRoute>
                        <SetupShop />
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
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard />
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

                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
