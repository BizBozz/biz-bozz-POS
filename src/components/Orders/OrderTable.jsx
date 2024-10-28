import TimestampFormatter from "./TimestampFormatter";

function OrderTable({ sendData, orders }) {
  // const [orderId, setOrderId] = useState("");

  const handleSendData = (orderId) => {
    // Send data to the parent using the callback function
    sendData(orderId);
  };
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 py-10 ">
        <thead className="bg-black">
          <tr>
            <th className="px-6 py-3 text-left text-md font-semibold text-white tracking-wider">
              No
            </th>
            {/* <th className="px-6 py-3 text-left text-md font-semibold text-gray-500 uppercase tracking-wider">
                  Table
                </th> */}

            <th className="px-6 py-3 text-left text-md font-semibold text-white tracking-wider">
              Order Type
            </th>
            <th className="px-6 py-3 text-left text-md font-semibold text-white tracking-wider">
              Order Time
            </th>
            <th className="px-6 py-3 text-left text-md font-semibold text-white tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-md font-semibold text-white tracking-wider">
              Total Price
            </th>
            <th className="px-6 py-3 text-left text-md font-semibold text-white tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              {/* <td className="px-6 py-4 whitespace-nowrap">{order.table}</td> */}

              <td className="px-6 py-4 whitespace-nowrap">{order.orderType}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <TimestampFormatter timestamp={order.createdAt} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {order.orders.length}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {order.totalPrice} MMK
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  // to={`/order/${order._id}`}
                  className="bg-black text-white px-4 py-2 me-5 rounded-md transition duration-200 border border-black hover:bg-white hover:text-black focus:outline-none focus:scale-105"
                  onClick={() => handleSendData(order._id)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
