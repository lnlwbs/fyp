import React, { useState, useEffect } from 'react';

const OrderMap = () => {
  const [orders, setOrders] = useState([]); // State to hold fetched orders
  const [error, setError] = useState(""); // State to handle errors
  const [allProducts, setAllProducts] = useState([]); // State to hold all products

  // Fetch orders on component mount
  useEffect(() => {
    const initializeOrders = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/orders/");
        const data = await response.json();
        console.log("Fetched data:", data); // Log the raw fetched data

        if (Array.isArray(data.orders)) {
          setOrders(data.orders); // Set the orders from the response
        } else {
          setOrders([]); // Default to empty array if 'orders' field is not found
          console.error("API returned incorrect data format:", data);
        }
      } catch (error) {
        console.error("Error initializing orders:", error);
        setOrders([]); // Default to empty array to prevent runtime errors
      }
    };

    // Fetch all products (assuming you have an endpoint to fetch the list of all products)
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/products/");
        const data = await response.json();
        if (Array.isArray(data.products)) {
          setAllProducts(data.products); // Set the list of all products
        } else {
          setAllProducts([]);
          console.error("API returned incorrect data format for products:", data);
        }
      } catch (error) {
        console.error("Error fetching all products:", error);
        setAllProducts([]);
      }
    };

    initializeOrders();
    fetchAllProducts();
  }, []); // Empty dependency array ensures this runs only on mount

  // Prepare data for the heatmap
  const getHeatmapData = () => {
    const productCounts = orders.reduce((acc, order) => {
      const product = order.productName;
      acc[product] = (acc[product] || 0) + 1; // Count occurrences of each product name
      return acc;
    }, {});

    // Fill in any products that have 0 orders
    allProducts.forEach((product) => {
      if (!productCounts[product.name]) {
        productCounts[product.name] = 0;
      }
    });

    const productNames = Object.keys(productCounts); // Get all unique product names
    const counts = Object.values(productCounts); // Get counts for each product

    return {
      productNames,
      counts
    };
  };

  const { productNames, counts } = getHeatmapData();

  // Function to get color intensity based on value
  const getColor = (value) => {
    const maxCount = Math.max(...counts);
    const intensity = (value / maxCount) * 255; // Normalize to a value between 0 and 255
    return `rgb(${255 - intensity}, ${intensity}, 0)`; // Green to red gradient
  };

  return (
    <div className="order-map">
      <h3 className="text-lg font-semibold mb-4">Product Order Heatmap</h3>
      <div className="heatmap-grid">
        {productNames.length > 0 ? (
          productNames.map((product, index) => (
            <div
              key={product}
              className="heatmap-cell"
              style={{
                backgroundColor: getColor(counts[index]), // Apply color based on count
                width: '100px',
                height: '100px',
                margin: '5px',
                display: 'inline-block',
                textAlign: 'center',
                lineHeight: '100px',
                color: '#fff',
                position: 'relative',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              title={`${product}: ${counts[index]} orders`} // Show the count on hover
            >
              <span className="product-name">{product}</span>
              <span
                className="order-count"
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  display: 'none', // Hide by default
                }}
              >
                {counts[index]} orders
              </span>
            </div>
          ))
        ) : (
          <p>No orders found to display in the heatmap.</p>
        )}
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default OrderMap;
