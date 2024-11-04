import { useState } from "react";
import EyeToggle from "../components/EyeToggle";
import handleSignIn from "../api/auth/signIn";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hook/auth/AuthContext";

const LoginPage = () => {
  const { id } = useParams();
  console.log(id);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle password visibility
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission console.log('Form Data:', formData);
    const res = await handleSignIn({ formData, id });
    // console.log(res.data.user);
    if (res.status === "success") {
      login();
      // console.log(res.data.user);
      navigate("/");
      sessionStorage.setItem("biz-bozz", res.token);
      localStorage.setItem("biz-bozz-id", id);
    }
  };

  return (
    <div className="flex w-full justify-center items-center h-screen">
      <div className="w-[500px] bg-white shadow-md rounded-lg p-6 border border-black">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="name"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full p-3 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"} // Toggle input type
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full p-3 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* Use the reusable EyeToggle component */}
            <div className="absolute top-[50%] justify-center right-3 flex items-center">
              <EyeToggle onToggle={togglePasswordVisibility} />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 mt-5 text-white font-bold py-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Login Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
