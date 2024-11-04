import { useEffect, useState } from "react";
import getAOrders from "./../../api/Order/getAOrder";
import TimestampFormatter from "./../../components/Orders/TimestampFormatter";
import editOrderData from "../../api/Order/editOrder";
import { IoMdTrash } from "react-icons/io";

function OrderDetail({
  id,
  closeOrderDetails,
  menuItem,
  editClick,
  editedOrderClick,
}) {
  // console.log("add menuItem", menuItem);
  const [order, setOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState([]);
  // State for new item
  const [taxRate, setTaxRate] = useState(order ? order.tax * 100 : 0); // Initialize with order tax if available
  console.log("taxRate", taxRate);
  const getOrder = async () => {
    const res = await getAOrders(id);
    if (res.code === 200 && res.status !== "error") {
      setOrder(res.data);
      setEditedOrder(res.data.orders);
      // setOriginalOrder(res.data.orders);
      setTaxRate(res.data.tax * 100); // Set initial tax rate in percentage
    }
  };

  // console.log("Editorder", editedOrder);

  useEffect(() => {
    getOrder();
  }, [id]);

  const handleQuantityChange = (index, value) => {
    const newOrders = [...editedOrder];
    newOrders[index].quantity = value;
    setEditedOrder(newOrders);
  };

  const calculateItemPrice = (item) => {
    return item.price * item.quantity;
  };

  const handleEditSubmit = async () => {
    const filterOrder = editedOrder.filter((item) => item.quantity > 0);
    const updatedOrderData = {
      table: order.table,
      tax: taxRate / 100, // Store tax as a decimal value
      orderType: order.orderType,
      paymentType: order.paymentType,
      orders: filterOrder,
      totalPrice: calculateTotalPrice(filterOrder),
      finalPrice: calculateFinalPrice(filterOrder), // This now reflects the new tax
      paidPrice: order.paidPrice,
      extraChange: order.extraChange,
    };
    console.log("updateOrder", updatedOrderData);
    const res = await editOrderData({ id, orderData: updatedOrderData });
    console.log("updateOrder", res);
    if (res.code === 200 && res.status !== "error") {
      getOrder();
      setIsEditing(false);
      editClick();
      editedOrderClick();
    }
  };

  const calculateTotalPrice = (orders) => {
    return orders.reduce((total, item) => total + calculateItemPrice(item), 0);
  };

  const calculateFinalPrice = (orders) => {
    const totalPrice = calculateTotalPrice(orders);
    const taxAmount = totalPrice * order.tax;
    return totalPrice + taxAmount;
  };

  const handleAddItem = (newItem) => {
    if (newItem.dishName && newItem.quantity > 0 && newItem.price > 0) {
      const itemIndex = editedOrder.findIndex(
        (item) => item.dishName === newItem.dishName
      );

      if (itemIndex > -1) {
        // Item already exists, increase quantity
        const updatedItems = [...editedOrder];
        updatedItems[itemIndex].quantity += newItem.quantity; // Increase the existing quantity
        setEditedOrder(updatedItems);
      } else {
        // Item does not exist, add new item
        const updatedItems = [
          ...editedOrder,
          { ...newItem }, // Assign a temporary ID
        ];
        setEditedOrder(updatedItems);
      }

      // Reset new item state after adding
      // setNewItem({ dishName: "", quantity: 1, price: 0 });
    } else {
      alert("Please enter valid item details.");
    }
  };

  useEffect(() => {
    if (menuItem) {
      // setNewItem(menuItem);
      handleAddItem(menuItem);
    }
  }, [menuItem]);

  const handleRemoveItem = (index) => {
    const updatedItems = editedOrder.filter((_, i) => i !== index);
    setEditedOrder(updatedItems);
  };

  return (
    <div className="h-screen overflow-y-auto">
      {order && (
        <div className="bg-white min-h-screen shadow-lg duration-300 transition-all transition-transform transform translate-x-0">
          <div className="p-4 border-b">
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
                Order Time: <TimestampFormatter timestamp={order.createdAt} />
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
                  {isEditing && (
                    <th className="p-2 text-left text-right text-md font-semibold text-white tracking-wider">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {editedOrder.map((item, index) => (
                  <tr key={item._id}>
                    <td className="p-2 py-2">{item.dishName}</td>
                    <td className="p-2 ps-4">
                      {isEditing ? (
                        <input
                          type="number"
                          value={item.quantity}
                          min={1}
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          }
                          className="border border-gray-300 rounded p-1 w-20"
                        />
                      ) : (
                        item.quantity
                      )}
                    </td>
                    <td className="p-2 text-right">
                      {calculateItemPrice(item)} MMK
                    </td>
                    {isEditing && (
                      <td className="p-2 text-right">
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-500"
                        >
                          <IoMdTrash size={20} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between w-full mt-2 px-2">
              <p className="font-semibold">Sub Total</p>
              <p className="font-semibold">
                {calculateTotalPrice(editedOrder)} MMK
              </p>
            </div>
            <div className="flex justify-between w-full my-2 p-2 border-b">
              <p className="font-semibold">Gov Tax</p>
              {isEditing ? (
                <input
                  type="number"
                  value={taxRate}
                  min={0}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="border border-gray-300 rounded p-1 w-20"
                />
              ) : (
                <p className="font-semibold">{order.tax * 100}%</p>
              )}
              <p className="font-semibold">
                {calculateTotalPrice(editedOrder) * (taxRate / 100)} MMK
              </p>
            </div>
            {/* <div>
              <label htmlFor="taxRate">Tax Rate (%): </label>
              <input
                type="number"
                id="taxRate"
                value={taxRate}
                min={0}
                onChange={(e) => setTaxRate(Number(e.target.value))} // Updating tax rate
                className="border border-gray-300 rounded p-1 w-20"
                disabled={!isEditing} // Disable input when not editing
              />
            </div> */}
            <div className="flex justify-between w-full mt-2 p-2">
              <p className="font-semibold">Final Total</p>
              <p className="font-semibold">
                {calculateFinalPrice(editedOrder).toFixed(2)} MMK
              </p>
            </div>

            {isEditing ? (
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleEditSubmit}
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    getOrder();
                    setIsEditing(false);
                    editClick();
                  }}
                  className="border border-gray-500 text-gray-500 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(true);
                  editClick();
                }}
                className="bg-black text-white px-4 py-2 rounded mt-4"
              >
                Edit Order
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetail;
