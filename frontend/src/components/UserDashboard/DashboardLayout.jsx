import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { userContext } from "../../context/UserContext";
import { FaUserCircle, FaShoppingBag, FaHistory, FaCog } from "react-icons/fa";

const DashboardLayout = () => {
  const { user } = useContext(userContext);

  if (!user) {
    // Handle the case where user is not available
    return (
      <div className="h-screen flex bg-gray-100 items-center justify-center">
        <p className="text-gray-700">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50">
      <nav className="w-70 bg-gradient-to-b from-blue-800 to-blue-600 h-full fixed top-0 left-0 text-white p-6 space-y-6 shadow-lg">
        <header className="flex items-center space-x-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-4 px-6 shadow-lg rounded-lg">
          <FaUserCircle className="text-3xl" />
          <h1 className="text-2xl font-bold">User Dashboard</h1>
        </header>
        <ul className="mt-8 space-y-4">
          <li>
            <Link
              to="/dashboard/profile"
              className="flex items-center space-x-3 py-3 px-4 rounded-lg text-lg font-medium bg-blue-700 hover:bg-blue-600 transition-colors duration-300"
            >
              <FaUserCircle />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/orders"
              className="flex items-center space-x-3 py-3 px-4 rounded-lg text-lg font-medium bg-blue-700 hover:bg-blue-600 transition-colors duration-300"
            >
              <FaShoppingBag />
              <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link
              to={`/dashboard/history/${user.id}`} // Make sure userId is defined when generating this link
              className="flex items-center space-x-3 py-3 px-4 rounded-lg text-lg font-medium bg-blue-700 hover:bg-blue-600 transition-colors duration-300"
            >
              <FaHistory />
              <span>History</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/settings"
              className="flex items-center space-x-3 py-3 px-4 rounded-lg text-lg font-medium bg-blue-700 hover:bg-blue-600 transition-colors duration-300"
            >
              <FaCog />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 ml-80 p-10 ">
        <div className="bg-white rounded-lg shadow-xl p-10 ring-1 ring-gray-200">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
