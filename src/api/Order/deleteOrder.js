import { toast } from "sonner";
import axios from "../axios";

// Generate code
const deleteOrders = async (id) => {
  const toastId = toast.loading("Logging in...");
  try {
    const res = await axios.delete(`api/v1/orders/${id}`);
    toast.success("Order deleted successfully!", {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
    return res.data;
  } catch (error) {
    toast.error(`There was an error deleting the order!`, {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
    return error;
  }
};

export default deleteOrders;
