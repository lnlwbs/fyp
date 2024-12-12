import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from backend (only products that are published "Online")
    async function fetchProducts() {
      const response = await fetch("http://localhost:5050/api/products/");
      if (!response.ok) {
        console.error("Error fetching products:", response.statusText);
        return;
      }

      const data = await response.json();
      // Filter out products where productPublish is not 'Online'
      const onlineProducts = data.filter(product => product.productPublish === "Online");
      setProducts(onlineProducts);
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(item => item._id === product._id);
      if (existingProductIndex !== -1) {
        // If the product is already in the cart, don't add it again
        return prevCart;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== productId));
  };

  async function onSubmit(e) {
    e.preventDefault();

    const userId = sessionStorage.getItem("userId"); // Get userId from session storage
    const userName = sessionStorage.getItem("userName"); // Retrieve userName
    const userPhoneNumber = sessionStorage.getItem("userPhoneNumber"); // Retrieve userPhoneNumber

    if (!userId) {
      alert("Please log in to proceed with checkout.");
      navigate("/LoginPage");
      return;
    }

    if (cart.length > 0) {
      try {
        // Create an array to store all order details
        const orders = [];

        // Iterate over cart items and prepare order data for each item
        for (const item of cart) {
          const orderData = {
            userId: userId,
            userName: userName,
            userPhoneNumber: userPhoneNumber,
            productId: item._id,
            productImage: item.imgUrl,
            productName: item.name,
            productPrice: item.price,
            productQuantity: item.quantity,
          };

          console.log("Sending the following data to the backend:", orderData);

          const response = await fetch("http://localhost:5050/api/orders/checkout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Error response from server:", errorText);
            throw new Error(`Error during checkout: ${response.statusText}`);
          }

          // Add the order to the orders array for receipt
          orders.push(orderData);
        }

        // Successfully placed the order, now navigate with receipt data
        setCart([]); // Clear cart after checkout
        alert("Checkout successful!");
        navigate("/CheckoutPage", {
          state: {
            receiptData: {
              userName,
              userPhoneNumber,
              orders,
            },
          },
        });

      } catch (error) {
        console.error("Error during checkout:", error);
        alert("An error occurred during checkout. Please try again.");
      }
    } else {
      alert("Your cart is empty! Please add items to the cart before proceeding.");
    }
  }

  return (
    <div className="dark:bg-gray-900 pt-[5vh] flex justify-center items- pb-[5vh]">
      {/* Product List */}
      <div className="w-4/5 p-4 h-full overflow-y-auto ">
      <h2 className="text-2xl font-semibold p-4 text-gray-900 dark:text-white">Available Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const isInCart = cart.some(item => item._id === product._id);
            const isSoldOut = product.quantity === 0;

            return (
              <div key={product._id} className={`border p-4 rounded-lg dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200 ${isSoldOut ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
                <img src={product.imgUrl} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />

                {/* Available Quantity */}
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {isSoldOut ? (
                    <p className="font-bold text-red-500">Sold Out</p>
                  ) : (
                    <p className="font-semibold">{product.quantity} left available</p>
                  )}
                </div>

                <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{product.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{product.description}</p>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-100">${product.price}</p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={isSoldOut || isInCart}
                  className={`mt-2 w-full py-2 rounded-md ${isSoldOut ? 'bg-gray-400 cursor-not-allowed' : isInCart ? 'bg-green-500 cursor-not-allowed' : 'bg-blue-500 text-white'} hover:bg-blue-600 transition-all duration-200`}
                >
                  {isInCart ? "Added" : isSoldOut ? "Sold Out" : "Add to Cart"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Bubble */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 right-6 bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center cursor-pointer shadow-lg "
      >
        <ShoppingCartIcon className="h-8 w-8" />
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </div>
      {/* Cart Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="p-6 rounded-lg w-3/4 max-w-lg h-[80vh] overflow-y-auto  bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Cart</h3>
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900"
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>
      {cart.length > 0 ? (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center space-x-4 p-4 border rounded-lg dark:bg-gray-700">
              <img src={item.imgUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                <p className="font-bold text-gray-700 dark:text-gray-300">${item.price}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">Your cart is empty.</p>
      )}

      {/* Checkout Button */}
      <button
        onClick={onSubmit}
        className="mt-4 bg-green-500 text-white px-6 py-3 rounded-md w-full hover:bg-green-600 transition-all duration-200"
      >
        Checkout
      </button>
    </div>
  </div>
)}
    </div>
  );
}
