import React, { useState, useEffect } from "react";

const OrderPage = () => {
  const [orders, setOrders] = useState([]); // State to hold fetched orders
  const [error, setError] = useState(""); // State to handle errors

  // Fetch orders on component mount
  useEffect(() => {
    const initializeOrders = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/orders/");
        const data = await response.json();
        console.log("Fetched data:", data); // Log the raw fetched data

        // Check if the 'orders' array exists in the response
        if (Array.isArray(data.orders)) {
          setOrders(data.orders.map(order => ({
            ...order,
            orderComplete: order.orderComplete || 'Pending', // Ensure each order has a 'Pending' status by default
          }))); // Set the orders from the response
          console.log("Orders to display:", data.orders); // Log the orders being displayed
        } else {
          setOrders([]); // Default to empty array if 'orders' field is not found
          console.error("API returned incorrect data format:", data);
        }
      } catch (error) {
        console.error("Error initializing orders:", error);
        setOrders([]); // Default to empty array to prevent runtime errors
      }
    };

    initializeOrders();
  }, []); // Empty dependency array ensures this runs only on mount

  // Function to toggle the order status between 'Pending' and 'Fulfilled'
  const toggleOrderStatus = async (orderId, currentStatus) => {
    const updatedStatus = currentStatus === 'Pending' ? 'Fulfilled' : 'Pending'; // Toggle status

    try {
      // Make a PATCH request to update the order status
      const response = await fetch(`http://localhost:5050/api/orders/status/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderComplete: updatedStatus, // Send the new status in the request body
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        throw new Error("Failed to update order status");
      }

      // Update the orders state with the new status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, orderComplete: updatedStatus } : order
        )
      );
      alert(`Order status updated to ${updatedStatus}!`);
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("Error updating order status: " + error.message); // Show error message in the UI
    }
  };

  // Function to delete an order
  const deleteOrder = async (orderId) => {
    const confirmation = window.confirm("Are you sure you want to delete this order?");
    if (!confirmation) return;

    console.log("Deleting order with ID:", orderId); // Log the order ID being deleted

    try {
      const response = await fetch(`http://localhost:5050/api/orders/${orderId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData); // Log the error response from the server
        throw new Error("Failed to delete order");
      }

      // Update the orders state after deletion
      setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      setError("Error deleting order: " + error.message); // Show error message in the UI
    }
  };

  // Render the list of orders
  const orderList = () => {
    if (!Array.isArray(orders) || orders.length === 0) {
      return (
        <tr>
          <td colSpan="8" className="text-center py-4">
            No orders found.
          </td>
        </tr>
      );
    }

    return orders.map((order, index) => (
      <tr key={index} className="transition-colors hover:bg-muted/50">
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          {order.orderId}
        </td>
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          {order.userName}
        </td>
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          {order.userPhoneNumber}
        </td>
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          {order.productName}
        </td>
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          {order.productPrice}
        </td>
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          {order.productQuantity}
        </td>

        {/* Order Status with conditional styling */}
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          <button
            onClick={() => toggleOrderStatus(order.orderId, order.orderComplete)}
            className={`mt-2 px-4 py-2 rounded text-white ${order.orderComplete === 'Pending' ? 'bg-gray-500' : 'bg-green-500'}`}
          >
            {order.orderComplete === 'Pending' ? 'Pending' : 'Fulfilled'}
          </button>
        </td>

        {/* Cancel button */}
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          <button
            onClick={() => deleteOrder(order.orderId)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Cancel / Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="flex">
      <div className="flex-1 p-4">
        <h3 className="text-lg font-semibold mb-4">Order List</h3>
        <div className="border rounded-lg overflow-hidden">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b">
                <tr>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Order ID
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    User Name
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Phone Number
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Product Name
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Product Price
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Product Quantity
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Order Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>{orderList()}</tbody>
            </table>
          </div>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default OrderPage;
