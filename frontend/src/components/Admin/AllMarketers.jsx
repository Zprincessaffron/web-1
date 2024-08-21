import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'; // Import moment.js for date formatting

const AllMarketers = () => {
  const [marketers, setMarketers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchMarketers = async () => {
      try {
        const response = await axios.get('/all/marketers');
        setMarketers(response.data);
      } catch (error) {
        console.error("Error fetching marketers", error);
      }
    };

    fetchMarketers();
  }, []);

  // Pagination Logic
  const indexOfLastMarketer = currentPage * itemsPerPage;
  const indexOfFirstMarketer = indexOfLastMarketer - itemsPerPage;
  const currentMarketers = marketers.slice(indexOfFirstMarketer, indexOfLastMarketer);
  const totalPages = Math.ceil(marketers.length / itemsPerPage);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg overflow-x-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Marketers</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-md font-bold text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-md font-bold text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-md font-bold text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-md font-bold text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-md font-bold text-gray-500 uppercase tracking-wider">Created At</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentMarketers.map(marketer => (
            <tr key={marketer._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{marketer.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{marketer.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{marketer.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{marketer.role}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {moment(marketer.createdAt).format('YYYY-MM-DD')}
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

export default AllMarketers;
