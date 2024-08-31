import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../../styles/UserDashboard.css';

const OrderHistory = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setError("User ID is missing.");
        return;
      }

      try {
        const response = await axios.get(`/history/${userId}`);
        setOrders(response.data);
        setError(null);
      } catch (err) {
        setError("Error retrieving order history.");
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="oh-container">
      <h1 className="oh-title">Order History</h1>

      {error && <p className="oh-error">{error}</p>}
      
      {orders.length === 0 ? (
        <p className="oh-no-orders">No completed orders found.</p>
      ) : (
        <div className="oh-orders-list">
          {orders.map((order) => (
            <div key={order._id} className="oh-order-item">
              <div className="oh-order-header">
                <div>
                  <p className="oh-order-id">Order ID: {order._id}</p>
                  <p className="oh-order-date">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className="oh-order-status">Status: <span className={`oh-order-status-text ${order.status === 'Delivered' ? 'oh-delivered' : 'oh-pending'}`}>{order.status}</span></p>
                </div>
                <p className="oh-order-total">₹{order.total}</p>
              </div>
              <div className="oh-order-items">
                <h2 className="oh-items-title">Items:</h2>
                <ul className="oh-items-list">
                  {order.cartItems.map((item) => (
                    <li key={item.id} className="oh-item">
                      <span className="oh-item-name">{item.name}</span> - {item.quantity} x ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>
              {/* <div className="oh-shipping-details">
                <h2 className="oh-shipping-title">Shipping Details:</h2>
                <p className="oh-shipping-address">{order.shippingDetails.address}</p>
                <p className="oh-shipping-city">{order.shippingDetails.city}, {order.shippingDetails.state}</p>
                <p className="oh-shipping-zip">{order.shippingDetails.zipCode}</p>
                <p className="oh-shipping-country">{order.shippingDetails.country}</p>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
