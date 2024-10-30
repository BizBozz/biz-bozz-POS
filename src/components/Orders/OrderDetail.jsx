import { useEffect, useState } from "react";
import getAOrders from "./../../api/Order/getAOrder";
import TimestampFormatter from "./../../components/Orders/TimestampFormatter";

function OrderDetail({ id, closeOrderDetails, menuItem, editClick }) {
  console.log("add menuItem", menuItem);
  const [order, setOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState([]);
  // State for new item

  const getOrder = async () => {
    const res = await getAOrders(id);
    if (res.code === 200 && res.status !== "error") {
      setOrder(res.data);
      setEditedOrder(res.data.orders);
    }
  };

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
      ...order,
      orders: filterOrder,
      totalPrice: calculateTotalPrice(editedOrder),
      finalPrice: calculateFinalPrice(editedOrder),
    };
    console.log(updatedOrderData);
    setOrder(updatedOrderData);
    setIsEditing(false);
    editClick();
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
          { ...newItem, _id: Date.now() }, // Assign a temporary ID
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
                      {calculateItemPrice(item).toFixed(2)} MMK
                    </td>
                    {isEditing && (
                      <td className="p-2 text-right">
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* {isEditing && (
              <div className="my-4">
                <h3 className="font-semibold">Add New Item</h3>
                <div className="flex justify-between mt-2">
                  <input
                    type="text"
                    placeholder="Dish Name"
                    value={newItem.dishName}
                    onChange={(e) =>
                      setNewItem({ ...newItem, dishName: e.target.value })
                    }
                    className="border border-gray-300 rounded p-1 w-2/5"
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={newItem.quantity}
                    min={1}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        quantity: Number(e.target.value),
                      })
                    }
                    className="border border-gray-300 rounded p-1 w-1/5"
                  />
                  <input
                    type="number"
                    placeholder="Unit Price"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({ ...newItem, price: Number(e.target.value) })
                    }
                    className="border border-gray-300 rounded p-1 w-1/5"
                  />
                  <button
                    onClick={handleAddItem}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
            )} */}

            <div className="flex justify-between w-full mt-2 px-2">
              <p className="font-semibold">Sub Total</p>
              <p className="font-semibold">
                {calculateTotalPrice(editedOrder).toFixed(2)} MMK
              </p>
            </div>
            <div className="flex justify-between w-full my-2 p-2 border-b">
              <p className="font-semibold">Gov Tax</p>
              <p className="font-semibold">{(order.tax * 100).toFixed(2)}%</p>
              <p className="font-semibold">
                {(calculateTotalPrice(editedOrder) * order.tax).toFixed(2)} MMK
              </p>
            </div>
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
