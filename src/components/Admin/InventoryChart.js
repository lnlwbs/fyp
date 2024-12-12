import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2'; // Import the Bar chart from react-chartjs-2
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register chart components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ProductList = () => {
  const [products, setProducts] = useState([]); // State to hold fetched products
  const [error, setError] = useState(''); // State to handle errors

  // Fetch all products on component mount
  useEffect(() => {
    const initializeRecords = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/products/');
        if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          setError('Failed to fetch products');
          return;
        }

        const data = await response.json();
        setProducts(data); // Set fetched products to state
      } catch (error) {
        console.error('Error initializing records:', error);
        setError('Error initializing products');
      }
    };

    initializeRecords();
  }, []); // Runs only once when the component is mounted

  // Prepare data for the bar chart
  const chartData = {
    labels: products.map((product) => product.name), // Product names as labels
    datasets: [
      {
        label: 'Quantity',
        data: products.map((product) => product.quantity), // Product quantities as data
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color of the bars
        borderWidth: 1, // Border width of the bars
      },
    ],
  };

  // Bar chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Product Quantities',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Quantity: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return (
    <div>
      <h3 className="text-lg font-semibold p-4">Inventory Chart</h3>

      {/* Display Bar Chart */}
      <div className="border rounded-lg overflow-hidden p-4">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default ProductList;
