import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]); // State to hold fetched products
  const [error, setError] = useState(''); // State to handle errors
  const [isEditing, setIsEditing] = useState(false); // Flag to show/hide the edit form
  const [editProduct, setEditProduct] = useState({}); // State to hold the current product being edited

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

  // Function to toggle the product publish status between 'Online' and 'Offline'
  const toggleProductPublish = async (productId, currentStatus) => {
    const updatedPublishStatus = currentStatus === 'Online' ? 'Offline' : 'Online'; // Toggle status

    try {
      const response = await fetch(`http://localhost:5050/api/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productPublish: updatedPublishStatus }), // Sending the updated status
      });

      if (!response.ok) {
        throw new Error('Failed to update product publish status');
      }

      const updatedProduct = await response.json();

      // Update the state with the new publish status
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? { ...product, productPublish: updatedPublishStatus } : product
        )
      );
    } catch (error) {
      setError('Error updating product publish status');
      console.error('Error:', error);
    }
  };

  const deleteProduct = async (productId) => {
    const confirmation = window.confirm('Are you sure you want to delete this product?');
    if (!confirmation) return;

    try {
      const response = await fetch(`http://localhost:5050/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Remove the product from the state
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
    } catch (error) {
      setError('Error deleting product');
      console.error('Error:', error);
    }
  };

  // Function to handle the edit button click
  const handleEditClick = (product) => {
    setEditProduct(product);
    setIsEditing(true); // Show the edit form
  };

  // Function to handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Function to handle form submission and update the product
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5050/api/products/${editProduct._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );

      setIsEditing(false); // Close the edit form
      setEditProduct({}); // Reset the edited product state
    } catch (error) {
      setError('Error updating product');
      console.error('Error:', error);
    }
  };

  // Render product list
  const recordList = () => {
    return products.map((product) => (
      <tr key={product._id} className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
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
          <div>
            {/* Directly display 'Online' or 'Offline' */}
            <button
              onClick={() => toggleProductPublish(product._id, product.productPublish)}
              className={`mt-2 px-4 py-2 rounded text-white ${product.productPublish === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {product.productPublish === 'Online' ? 'Online' : 'Offline'}
            </button>
          </div>
        </td>
        <td className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
          {/* Edit Button */}
          <button onClick={() => handleEditClick(product)} className="px-4 py-2 bg-blue-500 text-white rounded">
            Edit
          </button>

          {/* Delete Button */}
          <button
            onClick={() => deleteProduct(product._id)} // Pass product ID here for delete
            className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
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

      {/* Edit Form */}
      {isEditing && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label className="block">Image URL:</label>
              <input
                type="text"
                name="imgUrl"
                value={editProduct.imgUrl || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mt-2">Name:</label>
              <input
                type="text"
                name="name"
                value={editProduct.name || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mt-2">Price:</label>
              <input
                type="number"
                name="price"
                value={editProduct.price || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mt-2">Description:</label>
              <textarea
                name="description"
                value={editProduct.description || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mt-2">Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={editProduct.quantity || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="mt-4 flex justify-between">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default ProductList;
