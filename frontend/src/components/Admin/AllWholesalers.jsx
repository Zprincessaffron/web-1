import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'; // Import moment.js for date formatting

const AllWholesalers = () => {
  const [wholesalers, setWholesalers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);  // Updated to 5 items per page

  useEffect(() => {
    const fetchWholesalers = async () => {
      try {
        const response = await axios.get('/all/wholesalers');
        setWholesalers(response.data);
      } catch (error) {
        console.error("Error fetching wholesalers", error);
      }
    };

    fetchWholesalers();
  }, []);

  // Pagination Logic
  const indexOfLastWholesaler = currentPage * itemsPerPage;
  const indexOfFirstWholesaler = indexOfLastWholesaler - itemsPerPage;
  const currentWholesalers = wholesalers.slice(indexOfFirstWholesaler, indexOfLastWholesaler);
  const totalPages = Math.ceil(wholesalers.length / itemsPerPage);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg overflow-x-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Wholesalers</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Additional Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marketer ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentWholesalers.map(wholesaler => (
            <tr key={wholesaler._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{wholesaler.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{wholesaler.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{wholesaler.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{wholesaler.additionalMobile}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{wholesaler.businessName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{wholesaler.role}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{wholesaler.marketerId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {moment(wholesaler.createdAt).format('YYYY-MM-DD')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        <nav className="inline-flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-200 text-gray-700 border rounded-l-lg hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 bg-gray-200 text-gray-700 border rounded-r-lg hover:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AllWholesalers;
