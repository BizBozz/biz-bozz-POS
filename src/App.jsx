import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
      <div className="flex">
        <div className="p-2 bg-accent w-full">
          <button
            onClick={toggleSidebar}
            className="px-5 py-2 transition duration-300 bg-primary font-semibold text-black rounded-md flex gap-4 items-center hover:text-primary hover:border hover:border-blue-500 hover:bg-black"
          >
            <span>Create Account</span>
          </button>
        </div>

        <div
          className={`fixed left-0 z-10 top-0 w-200 h-full shadow-lg transform transition-transform ${
            isOpen ? "-translate-x-full" : "translate-x-0" // This means sliding in from left when open
          }`}
        >
          <div
            style={{
              // borderRadius: "20px 0 0 20px",
              overflow: "hidden",
              borderTop: "none",
              borderBottom: "none",
              borderRight: "none",
              // background:"black"
            }}
          >
            <Sidebar closeSidebar={toggleSidebar} />
          </div>
        </div>
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
