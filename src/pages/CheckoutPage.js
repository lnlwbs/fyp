import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { jsPDF } from "jspdf";

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { receiptData } = location.state || {}; // Get the receipt data
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState("");

  // Fetch the order ID and timestamp from the API
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/orders");
        if (response.ok) {
          const data = await response.json();
          console.log("Response from API:", data);
          
          // Assuming the API returns an array of orders or a single order
          if (data.orders && data.orders.length > 0) {
            const latestOrder = data.orders[0]; // Get the latest order
            setOrderId(latestOrder.orderId);  // Set orderId
            setOrderDate(new Date(latestOrder.createdAt).toLocaleString()); // Set order timestamp
          }
        } else {
          console.error("Failed to fetch order details");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    if (receiptData) {
      fetchOrderDetails();
    }
  }, [receiptData]);

  // Function to generate and download the receipt as a PDF
  const downloadReceipt = () => {
    const orders = receiptData.orders || [];
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");
    doc.text("Receipt", 14, 16);
    doc.text(`Order ID: ${orderId}`, 14, 24);
    doc.text(`Order Date: ${orderDate}`, 14, 32); // Display the order timestamp

    let yPosition = 40;

    orders.forEach((order, index) => {
      doc.text(`Product Name: ${order.productName}`, 14, yPosition);
      doc.text(`Price: $${order.productPrice}`, 14, yPosition + 8);
      doc.text(`Quantity: ${order.productQuantity}`, 14, yPosition + 16);
      yPosition += 24;
    });

    const totalPrice = orders.reduce(
      (total, order) => total + order.productPrice * order.productQuantity,
      0
    );
    doc.text(`Total Price: $${totalPrice.toFixed(2)}`, 14, yPosition);

    doc.save("receipt.pdf");
  };

  // Navigate to home page
  const goHome = () => {
    navigate("/"); // Navigate to the home page (adjust the path if needed)
  };

  if (!receiptData) {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="w-4/5 mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900">Receipt not found</h1>
          <p className="text-gray-700">Please check your order or try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="w-4/5 mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900">Your Receipt</h1>
        <div className="mt-8 space-y-6">
          <div className="border p-8 rounded-lg shadow-lg bg-gray-50">
            <p className="text-xl font-medium text-gray-800">Order Information:</p>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Order ID:</span>
                <span className="text-gray-900">{orderId || "Loading..."}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Customer Name:</span>
                <span className="text-gray-900">{receiptData.userName}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Phone Number:</span>
                <span className="text-gray-900">{receiptData.userPhoneNumber}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Date & Time:</span>
                <span className="text-gray-900">{orderDate || "Loading..."}</span> {/* Display timestamp */}
              </li>
            </ul>

            <p className="text-xl font-medium text-gray-800 mt-6">Order Details:</p>
            <ul className="space-y-4">
              {receiptData.orders.map((order, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div className="w-3/4">
                    <p className="font-semibold text-gray-700">{order.productName}</p>
                    <p className="text-sm text-gray-600">Price: ${order.productPrice}</p>
                    <p className="text-sm text-gray-600">Quantity: {order.productQuantity}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    ${order.productPrice * order.productQuantity}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <p className="text-lg font-semibold">
                Total: $
                {receiptData.orders
                  .reduce(
                    (total, order) =>
                      total + order.productPrice * order.productQuantity,
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>

            <button
              onClick={downloadReceipt}
              className="mt-6 inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-800"
            >
              Download Receipt
            </button>
          </div>
          
          {/* Go back to home button */}
          <div className="mt-8">
            <button
              onClick={goHome}
              className="inline-block bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700"
            >
              Go back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
