import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
      </header>
      <div className="flex flex-1">
        <nav className="w-60 bg-gray-700 text-white p-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard/profile"
                className="block py-2 px-4 rounded hover:bg-gray-900 transition-colors duration-200"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/orders"
                className="block py-2 px-4 rounded hover:bg-gray-900 transition-colors duration-200"
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/history"
                className="block py-2 px-4 rounded hover:bg-gray-900 transition-colors duration-200"
              >
                History
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/settings"
                className="block py-2 px-4 rounded hover:bg-gray-900 transition-colors duration-200"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <main className="flex-1 bg-gray-100 p-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
