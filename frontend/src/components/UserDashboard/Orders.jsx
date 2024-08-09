import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { CiLocationArrow1 } from "react-icons/ci";

const Orders = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Orders</h2>
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Your Orders</h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 text-left text-sm font-medium text-gray-700">Order ID</th>
              <th className="py-2 text-left text-sm font-medium text-gray-700">Product</th>
              <th className="py-2 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="py-2 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="py-2 text-left text-sm font-medium text-gray-700">Track Order</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">123456</td>
              <td className="py-2">Premium Spain Saffron</td>
              <td className="py-2">2024-07-15</td>
              <td className="py-2">Shipped</td>
              <td className="py-2">
                <Link to="/track-order">
                  <FaMapMarkerAlt size={20} className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                </Link>
              </td>
            </tr>
            <tr>
              <td className="py-2">654321</td>
              <td className="py-2">Kashmiri Saffron</td>
              <td className="py-2">2024-08-30</td>
              <td className="py-2">Processed</td>
              <td className="py-2">
                <Link to="/track-order">
                  <FaMapMarkerAlt size={20} className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
