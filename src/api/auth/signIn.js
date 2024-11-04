import axios from "../axios";
import { toast } from "sonner";
// import { jwtDecode } from "jwt-decode";

const handleSignIn = async (data) => {
  const toastId = toast.loading("Logging in...");
  try {
    const response = await axios.post(
      "api/v1/auth/login/a0fb5c0e-a013-4d79-9374-c70171def404",
      data
    );
    // console.log(response.data);
    toast.success("Logged in successfully!", {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });

    return response.data;
  } catch (error) {
    toast.error(`${error.response.data.message}`, {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
  }
};

export default handleSignIn;
