import axios from "../axios";

// Generate code
const getAllOrders = async () => {
  try {
    const res = await axios.get("api/v1/orders");
    return res.data;
  } catch (error) {
    return error;
  }
};

export default getAllOrders;
