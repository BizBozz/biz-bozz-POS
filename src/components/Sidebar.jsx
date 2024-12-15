// import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Menu, Receipt, LogOut, ChevronLeft } from "lucide-react";
import { useAuth } from "../hook/auth/AuthContext";

const Sidebar = ({ isVisible, closeSidebar }) => {
  const { logout } = useAuth();
  const id = localStorage.getItem("biz-bozz-id");

  const navItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/menu", icon: Menu, label: "Menu" },
    { to: "/orders", icon: Receipt, label: "Orders" },
  ];

  return (
    <div
      className={`fixed h-screen bg-primary text-white transition-transform duration-300 transform ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className={`flex items-center p-4 justify-between`}>
          <h1 className="text-2xl font-bold">Biz Bozz</h1>
          <button
            onClick={closeSidebar}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            <ChevronLeft
              className={`h-6 text-white w-6 transition-transform `}
            />
          </button>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center font-bold text-lg space-x-2 rounded-lg px-3 py-2 transition duration-500 ${
                  isActive
                    ? "bg-prilight text-primary"
                    : "text-white hover:bg-prilight hover:text-primary"
                }`
              }
              onClick={closeSidebar}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4">
          {/* <NavLink
            to={id ? `/login/${id}` : "/login"}
            className="w-full flex items-center justify-start space-x-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg px-3 py-2 transition-colors"
            onClick={() => {
              logout();
            }}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span>Logout</span>}
          </NavLink> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
