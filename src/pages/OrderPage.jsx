import { useEffect, useState } from "react";
import { format } from "date-fns";
import getAllOrders from "../api/Order/getAllOrders";
import OrderTable from "../components/Orders/OrderTable";
import { TbReport } from "react-icons/tb";
import Calendar from "../components/Calender";
import deleteOrders from "../api/Order/deleteOrder";
import EditOrder from "./EditOrder";
import getReport from "../api/report/getReport";

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

  const handleDownload = async () => {
    const res = await getReport(dataFromCalendar);
    console.log(res);
    // if (res.code === 200) {
    const blob = new Blob([res], { type: "application/pdf" }); // Convert the response to a Blob
    const url = window.URL.createObjectURL(blob);

    // Open the PDF in a new tab/window
    const newWindow = window.open(url);
    if (newWindow) {
      // Trigger print once the PDF is opened
      newWindow.onload = function () {
        // newWindow.print();
      };
    } else {
      console.error("Failed to open new window for printing");
    }

    // }
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
    <div className="relative">
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Orders</h1>

        <div className="flex justify-between mb-3">
          <Calendar sendDate={handleDataFromCalendar} />
          <div>
            <button
              className="bg-black text-white flex items-center gap-3 font-semibold px-4 py-2 rounded-lg"
              onClick={handleDownload}
            >
              <TbReport size={20} /> Report
            </button>
          </div>
        </div>
        <div className="bg-white w-full rounded-lg overflow-hidden">
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
    </div>
  );
};

export default OrdersPage;
