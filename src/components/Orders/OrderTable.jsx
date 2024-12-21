import TimestampFormatter from "./TimestampFormatter";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

function OrderTable({ sendData, orders, deleteOrder }) {
  // const [orderId, setOrderId] = useState("");
  console.log(orders);
  const handleSendData = (orderId) => {
    // Send data to the parent using the callback function
    sendData(orderId);
  };

  return (
    <div className="shadow-lg h-[75vh] overflow-y-auto border border-gray-200">
      <table className="min-w-full divide-y bg-primary divide-gray-200 py-10 ">
        <thead className="bg-primary">
          <tr>
            <th className="px-6 py-3 text-left text-md font-semibold text-white tracking-wider">
              No
            </th>
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
                {order.totalQuantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {order.finalPrice} MMK
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-4 items-center">
                  <button
                    className="text-blue-500 font-bold hover:text-blue-700"
                    onClick={() => handleSendData(order._id)}
                  >
                    <MdOutlineRemoveRedEye size={25} />
                  </button>
                  <button
                    className="text-primary hover:text-gray-700"
                    onClick={() => deleteOrder(order._id)}
                  >
                    <FaRegTrashAlt size={23} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
