import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]); // State to hold fetched products
  const [error, setError] = useState(''); // State to handle errors

  useEffect(() => {
    const initializeRecords = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/products/');
        console.log("Response status:", response.status); // Log response status for debugging

        if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          setError('Failed to fetch products'); // Set error state
          return;
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data

        setProducts(data); // Set products to state
      } catch (error) {
        console.error("Error initializing records:", error);
        setError('Error initializing products'); // Set error state
      }
    };

    initializeRecords();
  }, []); // Empty dependency array ensures this runs only on mount

  // Function to toggle the online/offline status of a product
  const toggleOnlineStatus = async (productId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus; // Toggle current status
      const response = await fetch(`http://localhost:5050/api/products/${productId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ online: updatedStatus }), // Sending the updated status
      });

      if (!response.ok) {
        throw new Error('Failed to update product status');
      }

      // Update the product state with the new status
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, online: updatedStatus } : product
        )
      );
    } catch (error) {
      setError('Error updating product status');
      console.error('Error:', error);
    }
  };

  const recordList = () => {
    return products.map((product, index) => (
      <tr key={index} className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          <img src={product.imgUrl} alt={product.name} className="w-16 h-16 object-cover" />
        </td>
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          {product.name}
        </td>
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          ${product.price}
        </td>
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          {product.description}
        </td>
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          {product.quantity}
        </td>
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          {product.status}
        </td>
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          {/* Toggle Online/Offline Button */}
          <button
            onClick={() => toggleOnlineStatus(product.id, product.online)}
            className={`px-4 py-2 rounded text-white ${product.online ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {product.online ? 'Online' : 'Offline'}
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold p-4">Product List</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Image
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Price
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Description
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Quantity
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{recordList()}</tbody>
          </table>
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default ProductList;
