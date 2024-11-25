// src/components/MarketerDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaUserTag, FaCalendarAlt } from 'react-icons/fa';

const MarketerDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [marketer, setMarketer] = useState(null);
  const [wholesalers, setWholesalers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeSection, setActiveSection] = useState('profile');

  useEffect(() => {
    const fetchMarketer = async () => {
      try {
        const response = await axios.get(`/marketer/${id}`);
        setMarketer(response.data);
      } catch (err) {
        console.error('Error fetching marketer:', err);
      }
    };

    fetchMarketer();
  }, [id]);

  useEffect(() => {
    const fetchWholesalers = async () => {
      try {
        const response = await axios.get(`/marketer/${id}/wholesaler`, {
          params: { page: currentPage }
        });
        setWholesalers(response.data.wholesalers);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error('Error fetching wholesalers:', err);
      }
    };
    fetchWholesalers();
  }, [id, currentPage]);

  const handleRegisterClick = () => {
    navigate(`/register-wholesaler/${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#8cb09c] text-white">
      <aside className="w-full lg:w-1/4  bg-sky-350 p-6 shadow-xl">
        <h1 className="uppercase text-lg tracking-[4px] font-bold mb-8 text-center bg-white text-[#8cb09c] py-4 px-1 rounded-md">Marketer Dashboard</h1>
        <nav>
          <button
            onClick={() => setActiveSection('profile')}
            className={`w-full text-center font-bold tracking-[3px] py-3 px-4 mb-4 transition-colors duration-300 ease-in-out rounded-full ${
              activeSection === 'profile' ? 'text-[#8cb09c] bg-white' : 'bg-[#8cb09c] text-white border-2'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveSection('wholesalers')}
            className={`w-full text-center font-bold tracking-[3px] py-3 px-4 transition-colors duration-300 ease-in-out rounded-full ${
              activeSection === 'wholesalers' ? 'text-[#8cb09c] bg-white' : 'bg-[#8cb09c] text-white border-2'
            }`}
          >
            Wholesale Customers
          </button>
        </nav>
        <div className="mt-8">
          <button
            className="w-full py-3 px-4 text-[#8cb09c] bg-white text-center tracking-[3px] font-bold rounded-full shadow-lg hover:bg-[#8cb09c] hover:text-white hover:border-2 transition duration-300 ease-in-out"
            onClick={handleRegisterClick}
          >
            Register Wholesaler
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        {activeSection === 'profile' && (
          <section className="bg-white text-gray-800 p-8 rounded-lg shadow-xl border border-gray-300">
            <h2 className="text-3xl font-bold uppercase tracking-wider mb-6">Profile</h2>
            {marketer ? (
              <div className="space-y-4 tracking-widest">
                <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-4">
                  <FaUser className="text-gray-600" />
                  <p className="text-lg"><strong>Name:</strong> {marketer.name}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-4">
                  <FaEnvelope className="text-gray-600" />
                  <p className="text-lg"><strong>Email:</strong> {marketer.email}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-4">
                  <FaPhone className="text-gray-600" />
                  <p className="text-lg"><strong>Phone:</strong> <span className='font-mono'>{marketer.phone}</span></p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-4">
                  <FaUserTag className="text-gray-600" />
                  <p className="text-lg"><strong>Role:</strong> {marketer.role}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-4">
                  <FaCalendarAlt className="text-gray-600" />
                  <p className="text-lg"><strong>Created At:</strong> <span className='font-mono'>{new Date(marketer.createdAt).toLocaleString()}</span></p>
                </div>
              </div>
            ) : (
              <p>Loading profile...</p>
            )}
          </section>
        )}

        {activeSection === 'wholesalers' && (
          <section className="bg-white text-gray-800 p-8 rounded-lg shadow-xl border border-gray-300">
            <h2 className="lg:text-2xl uppercase tracking-widest text-xl font-bold mb-6">Wholesale Customers</h2>
            <div className="overflow-x-auto tracking-wider">
              <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 border-b border-gray-300">
                    <th className="py-3 px-4 text-left text-gray-700">Name</th>
                    <th className="py-3 px-4 text-left text-gray-700">Email</th>
                    <th className="py-3 px-4 text-left text-gray-700">Phone</th>
                    <th className="py-3 px-4 text-left text-gray-700">Business Name</th>
                    <th className="py-3 px-4 text-left text-gray-700">Registered At</th>
                  </tr>
                </thead>
                <tbody>
                  {wholesalers.length > 0 ? (
                    wholesalers.map((wholesaler) => (
                      <tr key={wholesaler._id} className="border-b border-gray-300 hover:bg-gray-100 transition-colors duration-300">
                        <td className="py-2 px-4">{wholesaler.name}</td>
                        <td className="py-2 px-4">{wholesaler.email}</td>
                        <td className="py-2 px-4">{wholesaler.phone}</td>
                        <td className="py-2 px-4">{wholesaler.businessName}</td>
                        <td className="py-2 px-4">{new Date(wholesaler.createdAt).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-4 text-center text-gray-500">No wholesalers enrolled.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex tracking-wider justify-between items-center mt-6">
              <button
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition-colors duration-300"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition-colors duration-300"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default MarketerDashboard;
