import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./../assets/lgoo.png";
import { FaShop } from "react-icons/fa6";
import handleSignUp from "../api/auth/signup";
import EyeToggle from "../components/EyeToggle";

function EnterID() {
  const navigate = useNavigate();
  const [shopName, setShopName] = useState("");
  const [shopType, setShopType] = useState("Restaurant");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(true);
  const [error, setError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validatePhoneNumber = (number) => {
    // Basic regex pattern for a 10-digit phone number (e.g., 123-456-7890, (123) 456-7890, 1234567890
    const phonePattern = /^(?:\+95|095|09)?\d{7,10}$/;
    return phonePattern.test(number);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle password visibility
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = {
      shopName,
      shopType,
      phone_number,
      password,
      confirmPassword,
    };
    const res = await handleSignUp(data);
    console.log("res", res);
    if (res.statusCode === 201) {
      const user = {
        name: res.data.user.shopName,
        role: res.data.user.role,
      };
      localStorage.setItem("bz-user", JSON.stringify(user));
      localStorage.setItem("biz-bozz-token", res.data.token);
      navigate("/welcome");
    }
  };

  return (
    <div className="flex w-full h-screen  items-center justify-center overflow-y-auto relative">
      <div className="absolute top-0 left-0">
        <img src={logo} alt="logo" className="w-20 h-20" />
      </div>
      {show ? (
        <div className="w-full mx-5 md:w-[450px] bg-white shadow-md rounded-lg p-6 border border-gray-100">
          <div className="flex flex-col h-auto justify-center">
            <h2 className="sub-header font-bold mb-4">Sign Up For Free</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="id" className="block mb-1 font-bold">
                  Email or Phone Number
                </label>
                <input
                  type="text"
                  value={phone_number}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (validatePhoneNumber(e.target.value)) {
                      setError(false);
                    } else {
                      setError(true);
                    }
                  }}
                  placeholder="Enter your email or username"
                  required
                  className={`block w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    error ? "border-red-500" : "border border-gray-300"
                  }`}
                />
                {error && (
                  <p className="text-red-500 text-sm mt-1">
                    Invalid phone number format. Please enter a valid phone
                    number.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="id" className="block mb-1 font-bold">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"} // Toggle input type
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password or pin"
                    required
                    className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {/* Use the reusable EyeToggle component */}
                  <div className="absolute bottom-0 right-3 transform -translate-y-1/2 cursor-pointer">
                    <EyeToggle onToggle={togglePasswordVisibility} />
                  </div>
                </div>
              </div>

              <div className="mb-4 relative">
                <label htmlFor="id" className="block mb-1 font-bold">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"} // Toggle input type
                    id="password"
                    name="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter your password or pin"
                    required
                    className={`block w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      password !== confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {/* Use the reusable EyeToggle component */}
                  <div className="absolute bottom-0 right-3 transform -translate-y-1/2 cursor-pointer">
                    <EyeToggle onToggle={togglePasswordVisibility} />
                  </div>
                  {password !== confirmPassword && (
                    <p className="text-red-500 text-end text-sm">
                      Your password doesn't match
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-4 rounded hover:bg-blue-600 transition duration-200"
              >
                Sign Up to Create Shop
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full mx-5 md:w-[450px] bg-white shadow-md rounded-lg p-6 border border-gray-100">
          <h2 className="sub-header font-bold my-4">Create Your Shop</h2>
          <form onSubmit={handleClick}>
            <div className="mb-4">
              <label htmlFor="id" className="block mb-1 font-bold">
                Shop Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="Enter your Shop Name"
                  required
                  className="block w-full py-3 ps-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <FaShop className="absolute text-gray-400 top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="id" className="block mb-1 font-bold">
                Shop Type
              </label>
              <select
                id="large"
                className="block w-full bg-white ps-2 py-3 text-gray-500 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option selected>
                  <p>Select Shop Type</p>
                </option>
                <option value="Restaurant">Restaurant</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Get Started
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EnterID;
