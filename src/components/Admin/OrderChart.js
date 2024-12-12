import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const OrderChart = () => {
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

  // Prepare data for the pie chart
  const getChartData = () => {
    const statusCounts = orders.reduce((acc, order) => {
      const status = order.orderComplete;
      acc[status] = (acc[status] || 0) + 1; // Count occurrences of each order status
      return acc;
    }, {});

    const labels = Object.keys(statusCounts); // Get all unique statuses
    const data = Object.values(statusCounts); // Get counts for each status

    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ['#FF5733', '#33FF57', '#FF33FF', '#3357FF'], // Colors for different statuses
          borderColor: ['#FF5733', '#33FF57', '#FF33FF', '#3357FF'],
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="flex">
      <div className="flex-1 p-4">
        <h3 className="text-lg font-semibold mb-4">Order Status Distribution</h3>
        <div className="border rounded-lg overflow-hidden">
          <div className="relative w-full overflow-auto">
            {orders.length > 0 ? (
              <Pie data={getChartData()} options={{ responsive: true }} />
            ) : (
              <p>No orders found to display in the chart.</p>
            )}
          </div>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default OrderChart;
