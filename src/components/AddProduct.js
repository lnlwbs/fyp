function AddProduct({ product, addToCart, disabled }) {
  return (
    <button
      onClick={() => addToCart(product)}
      disabled={disabled}
      className={`mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-800 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {disabled ? "Unavailable" : "Add to Cart"}
    </button>
  );
}

export default AddProduct;
