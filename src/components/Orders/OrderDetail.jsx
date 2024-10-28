import { useEffect, useState } from "react";
import getAOrders from "../../api/Order/getAOrder";
import TimestampFormatter from "./TimestampFormatter";

function OrderDetail({ id, closeOrderDetails }) {
  const [order, setOrder] = useState([]);
  const getOrder = async () => {
    const res = await getAOrders(id);
    console.log(res);
    if (res.code === 200 && res.status !== "error") {
      console.log(res.data);
      setOrder(res.data);
    }
  };

  console.log(order.orders);

  useEffect(() => {
    getOrder();
  }, []);
  return (
    <div className="h-screen overflow-y-auto">
      {order.length !== 0 && (
        <div className="bg-white shadow-lg w-[500px] h-full duration-300 transition-all transition-transform transform translate-x-0">
          <div className="p-4 mx-5 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold my-5">Order Details</h2>
              <button className="text-xl" onClick={() => closeOrderDetails()}>
                &times;
              </button>
            </div>
            <p className="my-3 font-semibold">Table Number: {order.table}</p>
            <div className="flex justify-between">
              <p className="font-semibold">Order Type: {order.orderType}</p>
              <p className="font-semibold">
                Order Time: {<TimestampFormatter timestamp={order.createdAt} />}
              </p>
            </div>

            <table className="w-full mt-5 border-b">
              <thead className="bg-black">
                <tr>
                  <th className="p-2 text-left text-md font-semibold text-white tracking-wider">
                    Items
                  </th>
                  <th className="p-2 text-left text-md font-semibold text-white tracking-wider">
                    Quantity
                  </th>
                  <th className="p-2 text-left text-right text-md font-semibold text-white tracking-wider">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.orders &&
                  order.orders.map((order, index) => (
                    <tr key={index}>
                      <td className="p-2 py-2">{order.dishName}</td>
                      <td className="p-2 ps-4">{order.quantity}</td>
                      <td className="p-2 text-right">{order.price} MMK</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="flex justify-between w-full mt-2 px-2">
              <p className="font-semibold">Sub Total</p>
              <p className="font-semibold">{order.totalPrice} MMK</p>
            </div>
            <div className="flex justify-between w-full my-2 p-2 border-b">
              <p className="font-semibold">Gov Tax</p>
              <p className="font-semibold">
                {(order.tax / order.totalPrice) * 100}%
              </p>
              <p className="font-semibold">{order.tax}</p>
            </div>
            <div className="flex justify-between w-full mt-2 p-2">
              <p className="font-semibold">Sub Total</p>
              <p className="font-semibold">{order.totalPrice} MMK</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetail;
