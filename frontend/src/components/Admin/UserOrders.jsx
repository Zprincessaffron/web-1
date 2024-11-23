import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/UserOrders.css'; // Ensure to create and link the CSS file.

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Added state for theme toggle

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get('/admin/user-orders'); // Adjust the endpoint as needed
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await axios.patch('/orders/update-status', { orderId, status: newStatus });
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating status:', err.message);
    }
  };

  if (loading) {
    return (
      <div className={`uo-flex-center ${isDarkMode ? 'uo-dark' : ''}`}>
        <div className="uo-loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="uo-error">Error: {error}</div>;
  }

  return (
    <div className={`uo-container ${isDarkMode ? 'uo-dark' : ''}`}>
      <h1 className="uo-title">User Orders</h1>
      <div className="uo-table-container">
        <table className="uo-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="uo-table-row">
                <td>{order._id}</td>
                <td>
                  {order.user.name} ({order.user.email})
                </td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <span
                    className={`uo-status ${
                      order.status === 'Delivered' ? 'uo-status-delivered' : 'uo-status-pending'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <button
                    className="uo-view-details"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="uo-details">
          <h2 className="uo-details-title">Order Details for {selectedOrder._id}</h2>

          <div className="uo-grid">
            <div>
              <h3>Shipping Details</h3>
              <p><strong>Name:</strong> {selectedOrder.shippingDetails.name}</p>
              <p><strong>Address:</strong> {selectedOrder.shippingDetails.address}</p>
              <p><strong>City:</strong> {selectedOrder.shippingDetails.city}</p>
              <p><strong>State:</strong> {selectedOrder.shippingDetails.state}</p>
              <p><strong>ZIP:</strong> {selectedOrder.shippingDetails.zip}</p>
              <p><strong>Country:</strong> {selectedOrder.shippingDetails.country}</p>
              <p><strong>Mobile:</strong> {selectedOrder.shippingDetails.mobile}</p>
            </div>

            <div>
              <h3>Cart Items</h3>
              <ul>
                {selectedOrder.cartItems.map((item, index) => (
                  <li key={index}>
                    <strong>Item {index + 1}:</strong> {item.name} - {item.quantity} x $
                    {item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
            </div>
          </div>

          <div>
            <h3>Payment Details</h3>
            <p><strong>Payment ID:</strong> {selectedOrder.payment.paymentId}</p>
            <p><strong>Payment Method:</strong> {selectedOrder.payment.paymentMethod}</p>
            <p><strong>Payment Status:</strong> {selectedOrder.payment.paymentStatus}</p>
          </div>

          <div>
            <h3>Update Order Status</h3>
            <select
              className="uo-select"
              value={selectedOrder.status}
              onChange={(e) => handleStatusUpdate(selectedOrder._id, e.target.value)}
            >
              <option value="Processed">Processed</option>
              <option value="Accepted">Accepted</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <button
            className="uo-close-details"
            onClick={() => setSelectedOrder(null)}
          >
            Close Details
          </button>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
