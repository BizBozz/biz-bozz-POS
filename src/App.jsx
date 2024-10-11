import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import TestingPage from "./pages/TestingPage";
import { MdOutlineMenu } from "react-icons/md";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
      <div className="flex">
        <div className="p-2 border-b-2 w-full">
          <button
            onClick={toggleSidebar}
            className="px-5 py-2 transition duration-300 bg-white font-semibold text-black rounded-md flex gap-4 items-center hover:text-white hover:border hover:bg-black"
          >
            <MdOutlineMenu className="text-3xl" />
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
          <Route path="/testing" element={<TestingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
