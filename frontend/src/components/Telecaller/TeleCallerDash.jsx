import React, { useState } from "react";
import TeleCallerDashboard from "./TeleCallerDashboard";
import TelecallerSidebar from "./TelecallerSidebar";
import { Link, Outlet } from "react-router-dom";

const TeleCallerDash = () => {
  const [showDashboard, setShowDashboard] = useState(true); // State to toggle between components

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Section */}
      <div className="w-70 bg-white shadow-lg flex flex-col space-y-6">
        <h2 className="text-xl uppercase font-bold text-gray-800 p-4 border-b tracking-widest">
          Telecaller Dashboard
        </h2>

        <Link
          to={"/telecaller-dashboard"}
          className={`py-2 px-4 text-center font-medium tracking-widest border ${
            showDashboard
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-100 bg-gray-200"
          }`}
          onClick={() => setShowDashboard(true)}
        >
          Dashboard
        </Link>

        <Link
          to={"/telecaller-dashboard/shipment"}
          className={`py-2 px-4 text-center font-medium tracking-widest border ${
            !showDashboard
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-100 bg-gray-200"
          }`}
          onClick={() => setShowDashboard(false)}
        >
          Shipment
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-6 overflow-y-auto">
        {showDashboard ? <TeleCallerDashboard /> : <TelecallerSidebar />}
      </div>
    </div>
  );
};

export default TeleCallerDash;
