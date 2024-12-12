import React, { createContext, useState } from 'react';

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Shirt 1",
      type: "Embroidery",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 2,
      name: "Shirt 2",
      type: "Silk Screen",
      img: "https://images.unsplash.com/photo-1520975692673-d0fd9bc63b47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 3,
      name: "Shirt 3",
      type: "Full Sublimation",
      img: "https://images.unsplash.com/photo-1534030349003-1ed57d0e7c8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    }
  ]);

  // Function to update a product
  const updateProduct = (id, newName, newType) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, name: newName, type: newType } : product
      )
    );
  };

  return (
    <ProductsContext.Provider value={{ products, updateProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
