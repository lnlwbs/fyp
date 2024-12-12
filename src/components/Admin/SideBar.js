import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChartBarIcon,
  CalendarIcon,
  ServerStackIcon,
  ShoppingCartIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

const SideBar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen flex flex-col justify-between p-5">
      {/* Dashboard Heading */}
      <div>
      <Link
          to="/AdminPage"
          className="flex items-center space-x-2  p-2 rounded no-underline text-white hover:bg-gray-700 p-2 rounded"
        ><h1 className="text-2xl font-semibold text-center mb-6">Admin Dashboard</h1>
        </Link>
        <nav className="space-y-4">
          {/* Statistics Link */}
          <Link
            to="/Inventory"
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
          >
            <ChartBarIcon className="h-5 w-5" />
            <span>Inventory</span>
          </Link>

          {/* Calendar Link */}
          <Link
            to="/Users"
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
          >
            <CalendarIcon className="h-5 w-5" />
            <span>Users</span>
          </Link>


          {/* Orders Link */}
          <Link
            to="/OrderPage"
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            <span>Orders</span>
          </Link>
        </nav>
      </div>

      {/* Logout Link */}
      <div className="mt-10">
        <Link
          to="/"
          className="flex items-center space-x-2 hover:bg-red-600 p-2 rounded"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
