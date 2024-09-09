import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { userContext } from '../../context/UserContext';
import '../../styles/UserDashboard.css'
 
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
    <div className="order-container">
      <div className="order-card">
        <div className="order-card-header">
          <h3 className="order-card-subtitle">Order Details</h3>
        </div>
        <div className="order-table-container">
          <table className="order-table">
            <thead className="order-table-header">
              <tr>
                <th className="order-table-header-cell">Order ID</th>
                <th className="order-table-header-cell">Product</th>
                <th className="order-table-header-cell">Date</th>
                <th className="order-table-header-cell">Status</th>
                <th className="order-table-header-cell">Track Order</th>
              </tr>
            </thead>
            <tbody className="order-table-body">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="order-table-cell">{order._id}</td>
                    <td className="order-table-cell">
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
                    <td className="order-table-cell">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="order-table-cell">{order.status}</td>
                    <td className="order-table-cell order-track">
                      <Link to={`/dashboard/track-order/${order._id}`}>
                        <FaMapMarkerAlt size={20} className="order-icon" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="order-table-cell no-orders">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="order-pagination">
          <div className="order-pagination-mobile">
            <a
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              className={`order-pagination-link ${currentPage === 1 ? 'disabled' : ''}`}
            >
              Previous
            </a>
            <a
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              className={`order-pagination-link ${currentPage === totalPages ? 'disabled' : ''}`}
            >
              Next
            </a>
          </div>
          <div className="order-pagination-desktop">
            <div>
              <p className="order-pagination-info">
                Showing <span className="order-pagination-amount">{(currentPage - 1) * ordersPerPage + 1}</span> to <span className="order-pagination-amount">{Math.min(currentPage * ordersPerPage, totalOrders)}</span> of <span className="order-pagination-amount">{totalOrders}</span> orders
              </p>
            </div>
            <div>
              <nav className="order-pagination-nav" aria-label="Pagination">
                <a
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`order-pagination-nav-link ${currentPage === 1 ? 'disabled' : ''}`}
                >
                  Previous
                </a>
                {[...Array(totalPages)].map((_, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={() => handlePageChange(index + 1)}
                    className={`order-pagination-nav-link ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    {index + 1}
                  </a>
                ))}
                <a
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`order-pagination-nav-link ${currentPage === totalPages ? 'disabled' : ''}`}
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
