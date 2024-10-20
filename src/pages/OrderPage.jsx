import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getAllOrders from "../api/Order/getAllOrders";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const res = await getAllOrders();
    // res.data.sort((a, b) => {
    //   const dateA = new Date(a.createdAt);
    //   const dateB = new Date(b.createdAt);
    //   return dateB - dateA;
    // });
    if (res.code === 200) {
      setOrders(res.data);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <div className="bg-white shadow-md rounded-lg p-4 h-[500px] overflow-y-auto">
        {orders.length === 0 ? (
          <p>No orders available.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 py-10 ">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 uppercase tracking-wider">
                  No
                </th>
                {/* <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 uppercase tracking-wider">
                  Table
                </th> */}

                <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 uppercase tracking-wider">
                  Order Type
                </th>
                <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 uppercase tracking-wider">
                  Order Time
                </th>
                <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">{order.table}</td> */}

                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.orderType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(order.orderTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.orders.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.totalPrice} MMK
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/order/${order._id}`}
                      className="bg-black text-white px-4 py-2 me-5 rounded-md transition duration-200 border border-black hover:bg-white hover:text-black focus:outline-none focus:scale-105"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
