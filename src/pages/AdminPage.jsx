import React from "react";
import SideBar from "../components/Sidebar"; // Correct path
import DashBoard from "../components/Dashboard"; // Correct path

const AdminPage = () => {
  return (
    <div className="bg-navy h-screen flex">
      {/* Sidebar - Hidden on small screens, visible on large screens */}
      <div className="lg:block lg:w-1/5 flex-shrink-0">
        <SideBar />
      </div>

      {/* Dashboard - Full width on small screens, 4/5 width on large screens */}
      <div className="w-full lg:w-4/5 flex-grow">
        <DashBoard />
      </div>
    </div>
  );
};

export default AdminPage;
