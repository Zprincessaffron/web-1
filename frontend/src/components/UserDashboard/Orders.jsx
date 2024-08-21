import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { userContext } from '../../context/UserContext';

const Orders = () => {
  const { user } = useContext(userContext);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const ordersPerPage = 5;

  useEffect(() => {
    if (user) {
      axios.get(`/user-orders?userId=${user.id}&page=${currentPage}&limit=${ordersPerPage}`)
        .then(response => {
          const { orders, totalPages, currentPage, totalOrders } = response.data;
          
          setOrders(orders);
          setTotalPages(totalPages);
          setCurrentPage(currentPage);
          setTotalOrders(totalOrders);
        })
        .catch(error => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [user, currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900">Your Orders</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
        </div>
        <div className="border-t border-gray-200 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Track Order</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.cartItems && order.cartItems.length > 0 ? (
                        order.cartItems.map((item, index) => (
                          <div key={index}>
                            {item.name} (Quantity: {item.quantity})
                          </div>
                        ))
                      ) : (
                        "No items"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center">
                      <Link to={`/dashboard/track-order/${order._id}`}>
                        <FaMapMarkerAlt size={20} className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              className={`font-medium text-indigo-600 hover:text-indigo-500 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              Previous
            </a>
            <a
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              className={`font-medium text-indigo-600 hover:text-indigo-500 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * ordersPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * ordersPerPage, totalOrders)}</span> of <span className="font-medium">{totalOrders}</span> orders
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'}`}
                >
                  Previous
                </a>
                {[...Array(totalPages)].map((_, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={() => handlePageChange(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 ${currentPage === index + 1 ? 'bg-indigo-500 text-white' : 'hover:bg-gray-50'}`}
                  >
                    {index + 1}
                  </a>
                ))}
                <a
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'}`}
                >
                  Next
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
