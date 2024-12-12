import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register required chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
          setOrders(data.orders);
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

  // Function to calculate total sales per month
  const calculateMonthlySales = () => {
    const monthlySales = new Array(12).fill(0); // Create an array for 12 months

    orders.forEach(order => {
      const date = new Date(order.updatedAt);
      const month = date.getMonth(); // Get month (0-11)
      const price = parseFloat(order.productPrice); // Ensure product price is a number
      if (!isNaN(price)) {
        monthlySales[month] += price; // Add the product price to the respective month
      }
    });

    return monthlySales;
  };

  // Chart data for the Line chart
  const chartData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Total Sales ($)',
        data: calculateMonthlySales(),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  return (
    <div className="flex">
      <div className="flex-1 p-4">
        <h3 className="text-lg font-semibold mb-4">Sales by Month</h3>
        <div className="border rounded-lg overflow-hidden">
          <Line data={chartData} />
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default OrderPage;
