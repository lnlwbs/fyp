import React from "react";
import PopularityChart from "./PopularityChart";
import InventoryChart from "./InventoryChart";
import OrderChart from "./OrderChart";
import RevenueChart from "./RevenueChart";

const DashBoard = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      {/* First row */}
      <div className="flex flex-1 border border-gray-300">
        <div className="flex-1 border border-gray-300 flex items-center justify-center">
        <OrderChart />
        </div>
        <div className="flex-1 border border-gray-300 flex items-center justify-center">
        <RevenueChart />
        </div>
        <div className="flex-1 border border-gray-300 flex items-center justify-center">
          <PopularityChart/>
        </div>
      </div>
      {/* Second row */}
      <div className="flex flex-1 border border-gray-300">
        <div className="flex-1 border border-gray-300 flex items-center justify-center">
          <InventoryChart />
        </div>
        <div className="flex-1 border border-gray-300 flex items-center justify-center">
          <RevenueChart />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
