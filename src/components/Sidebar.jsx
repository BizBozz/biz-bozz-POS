import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Menu, Receipt, LogOut, ChevronLeft } from "lucide-react";

const Sidebar = ({ closeSidebar }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/menu", icon: Menu, label: "Menu" },
    { to: "/orders", icon: Receipt, label: "Orders" },
  ];

  return (
    <div
      className={`flex h-screen bg-black text-white transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex flex-col flex-1">
        <div
          className={`flex items-center p-4 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!isCollapsed && <h1 className="text-2xl font-bold">Biz Bozz</h1>}
          <button
            onClick={toggleCollapse}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            <ChevronLeft
              className={`h-6 w-6 transition-transform ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-2 rounded-lg px-3 py-2 transition duration-500 transition-colors ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
              onClick={closeSidebar}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="p-4">
          <button
            className="w-full flex items-center justify-start space-x-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg px-3 py-2 transition-colors"
            onClick={closeSidebar}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center space-x-3">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="User avatar"
              className="h-10 w-10 rounded-full"
            />
            {!isCollapsed && (
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-400">john@example.com</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
