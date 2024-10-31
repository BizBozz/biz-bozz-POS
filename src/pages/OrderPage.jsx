import { useEffect, useState } from "react";
import { format } from "date-fns";
import getAllOrders from "../api/Order/getAllOrders";
import OrderTable from "../components/Orders/OrderTable";
import OrderDetail from "./OrderDetail";
import Calendar from "../components/Calender";
import deleteOrders from "../api/Order/deleteOrder";
import EditOrder from "./EditOrder";

const OrdersPage = () => {
  const date = new Date();
  const formattedDate = format(date, "yyyy-MM-dd");
  const [dataFromChild, setDataFromChild] = useState("");
  const [dataFromCalendar, setDataFromCalendar] = useState({
    startDate: formattedDate,
    endDate: formattedDate,
  });
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);

  // Callback function to receive data from child
  const handleDataFromChild = (childData) => {
    setDataFromChild(childData);
    openOrderDetails();
  };

  const handleDataFromCalendar = (childData) => {
    setDataFromCalendar(childData);
  };

  const openOrderDetails = () => {
    setOpen(true);
  };

  const closeOrderDetails = () => {
    setOpen(false);
  };

  const handleDeleteOrder = async (id) => {
    console.log("delete", id);
    const res = await deleteOrders(id);
    console.log(res.code);
    if (res.code === 200) {
      getOrders();
    }
  };

  const handleEditOrder = () => {
    getOrders();
  };
  // console.log(orders.length);

  const getOrders = async () => {
    const res = await getAllOrders(dataFromCalendar);

    if (res.code === 200 && res.status !== "error") {
      setOrders(res.data);
    } else {
      setOrders([]);
    }
  };

  useEffect(() => {
    getOrders();
  }, [dataFromCalendar]);

  return (
    <div className="mx-auto p-4 relative">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <div className="absolute my-2 mx-4">
        <Calendar sendDate={handleDataFromCalendar} />
      </div>
      <div className="bg-white mt-[70px] shadow-md rounded-lg p-4 h-[500px] overflow-y-auto">
        {orders && orders.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">No orders found.</p>
          </div>
        ) : (
          <OrderTable
            orders={orders}
            sendData={handleDataFromChild}
            deleteOrder={handleDeleteOrder}
          />
        )}
      </div>
      {open && (
        <div className="fixed inset-0 flex items-center justify-end z-50">
          <EditOrder
            closeOrderDetails={closeOrderDetails}
            id={dataFromChild}
            editedOrder={handleEditOrder}
          />
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
