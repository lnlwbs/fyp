import React, { useState } from 'react';
import AddNewProduct from '../AddNewProduct';

function Product() {
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

  // Function to add a new product
  const addNewProduct = (name, type, img) => {
    const newProduct = {
      id: products.length + 1,
      name,
      type,
      img,
    };
    setProducts([...products, newProduct]);
  };

  return (
    <div className="bg-white py-24 sm:py-32 flex w-4/5 mx-auto gap-10">
      {/* Left section - Products list */}
      <div className="w-3/5 flex flex-col gap-y-8">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-x-6 border-b pb-4">
            <img alt={product.name} src={product.img} className="h-16 w-16 rounded-full" />
            <div>
              <h3 className="text-base font-semibold tracking-tight text-gray-900">{product.name}</h3>
              <p className="text-sm font-semibold text-indigo-600">{product.type}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right section - Add New Product */}
      <AddNewProduct addNewProduct={addNewProduct} />
    </div>
  );
}

export default Product;
