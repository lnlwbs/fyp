import React, { useState } from "react";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Menu (Only for small screens) */}
      <div className="lg:hidden">
        <button
          className={`fixed top-5 left-5 z-[100] bg-blue-900 p-3 rounded-full text-white shadow-md 
                      transition-transform duration-500 ease-in-out
                      ${isOpen ? "translate-x-[calc(100vw-6rem)]" : "translate-x-0"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>

        {/* Fullscreen Sidebar when open */}
        <div
          className={`fixed top-0 left-0 h-full w-full bg-blue-900 text-white p-5 shadow-lg 
                      transition-transform duration-500 ease-in-out 
                      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          style={{ zIndex: 99 }}
        >
          {/* Heading */}
          <h1 className="text-2xl font-semibold text-center text-white mb-6">Dashboard</h1>

          {/* Links */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-2 hover:bg-blue-800 rounded-lg cursor-pointer">
              <ShoppingCartIcon className="h-5 w-5 text-white" />
              <span>Orders</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-blue-800 rounded-lg cursor-pointer">
              <ShoppingCartIcon className="h-5 w-5 text-white" />
              <span>Products</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-blue-800 rounded-lg cursor-pointer">
              <ShoppingCartIcon className="h-5 w-5 text-white" />
              <span>Customers</span>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500"
            style={{ zIndex: 98 }}
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </div>

      {/* Sidebar (Only visible on large screens) */}
      <div className="hidden lg:block fixed top-0 left-0 h-full w-1/5 bg-blue-900 text-white p-5 shadow-lg">
        {/* Dashboard Heading */}
        <h1 className="text-2xl font-semibold text-center text-white mb-6">Dashboard</h1>

        {/* Links */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-2 hover:bg-blue-800 rounded-lg cursor-pointer">
            <ShoppingCartIcon className="h-5 w-5 text-white" />
            <span>Orders</span>
          </div>
          <div className="flex items-center space-x-3 p-2 hover:bg-blue-800 rounded-lg cursor-pointer">
            <ShoppingCartIcon className="h-5 w-5 text-white" />
            <span>Products</span>
          </div>
          <div className="flex items-center space-x-3 p-2 hover:bg-blue-800 rounded-lg cursor-pointer">
            <ShoppingCartIcon className="h-5 w-5 text-white" />
            <span>Customers</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
