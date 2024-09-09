import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaBoxOpen, FaTruck, FaCheckCircle, FaTimesCircle, FaHandHolding } from 'react-icons/fa';
import '../../styles/OrderTracking.css'; // Import the external CSS file

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/track/${id}`);
        setOrder(response.data);
        setError(null);
      } catch (err) {
        setError('Order not found or error retrieving order.');
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  return (
    <div className="ot-container">
      <h1 className="ot-title">Order Tracking</h1>

      {error && <p className="ot-error">{error}</p>}

      {order && (
        <div className="ot-order-wrapper">
          <div className="ot-order-details-wrapper">
            {/* Shipping Details */}
            <div className="ot-shipping-details">
              <h2 className="ot-section-title">
                <FaMapMarkerAlt className="ot-icon" /> Shipping Details
              </h2>
              <div className="ot-shipping-info">
                <p><strong className="ot-label">Name:</strong> <span className="ot-value">{order.shippingDetails?.name || "N/A"}</span></p>
                <p><strong className="ot-label">Address:</strong> <span className="ot-value">{order.shippingDetails?.address || "N/A"}</span></p>
                <p><strong className="ot-label">City:</strong> <span className="ot-value">{order.shippingDetails?.city || "N/A"}</span></p>
                <p><strong className="ot-label">State:</strong> <span className="ot-value">{order.shippingDetails?.state || "N/A"}</span></p>
                <p><strong className="ot-label">ZIP Code:</strong> <span className="ot-value">{order.shippingDetails?.zip || "N/A"}</span></p>
                <p><strong className="ot-label">Country:</strong> <span className="ot-value">{order.shippingDetails?.country || "N/A"}</span></p>
                <p><strong className="ot-label">Mobile Number:</strong> <span className="ot-value">{order.shippingDetails?.mobile || "N/A"}</span></p>
              </div>
            </div>

            {/* Order Details and Progress Bar */}
            <div className="ot-order-details">
              <h2 className="ot-section-title">
                <FaBoxOpen className="ot-icon" /> Order Details
              </h2>
              <div className="ot-order-info">
                <p><strong className="ot-label">Order ID:</strong> <span className="ot-value">{order._id}</span></p>
                <p><strong className="ot-label">Status:</strong> <span className="ot-value">{order.status}</span></p>
                <p><strong className="ot-label">Total:</strong> <span className="ot-value">₹{order.total}</span></p>
              </div>

              {/* Progress Bar */}
              <h3 className="ot-status-title">Order Status</h3>
              <div className="ot-status-steps">
                <div className="ot-status-step">
                  <FaHandHolding className={`ot-status-icon ${order.status === 'Processed' ? 'ot-active' : 'ot-inactive'}`} />
                  <span className={`ot-status-label ${order.status === 'Processed' ? 'ot-active' : 'ot-inactive'}`}>Processed</span>
                </div>
                <div className="ot-status-step">
                  <FaBoxOpen className={`ot-status-icon ${order.status === 'Accepted' ? 'ot-active' : 'ot-inactive'}`} />
                  <span className={`ot-status-label ${order.status === 'Accepted' ? 'ot-active' : 'ot-inactive'}`}>Accepted</span>
                </div>
                <div className="ot-status-step">
                  <FaTruck className={`ot-status-icon ${order.status === 'Shipped' ? 'ot-active' : 'ot-inactive'}`} />
                  <span className={`ot-status-label ${order.status === 'Shipped' ? 'ot-active' : 'ot-inactive'}`}>Shipped</span>
                </div>
                <div className="ot-status-step">
                  <FaCheckCircle className={`ot-status-icon ${order.status === 'Delivered' ? 'ot-active' : 'ot-inactive'}`} />
                  <span className={`ot-status-label ${order.status === 'Delivered' ? 'ot-active' : 'ot-inactive'}`}>Delivered</span>
                </div>
                <div className="ot-status-step">
                  <FaTimesCircle className={`ot-status-icon ${order.status === 'Cancelled' ? 'ot-cancelled' : 'ot-inactive'}`} />
                  <span className={`ot-status-label ${order.status === 'Cancelled' ? 'ot-cancelled' : 'ot-inactive'}`}>Cancelled</span>
                </div>
              </div>
              <div className="ot-progress-bar">
                <div className={`ot-progress ${order.status === 'Processed' ? 'ot-width-20' : order.status === 'Accepted' ? 'ot-width-40' : order.status === 'Shipped' ? 'ot-width-60' : order.status === 'Delivered' ? 'ot-width-80' : 'ot-width-100 ot-cancelled'}`}></div>
              </div>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="ot-ordered-items">
            <h3 className="ot-section-title">Ordered Items</h3>
            {order.cartItems && Array.isArray(order.cartItems) ? (
              <ul className="ot-items-list">
                {order.cartItems.map((item) => (
                  <li key={item.id} className="ot-item">
                    <div>
                      <p className="ot-item-name">{item.name}</p>
                      <p className="ot-item-quantity">Quantity: {item.quantity}</p>
                    </div>
                    <div className="ot-item-price">₹{item.price * item.quantity}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ot-no-items">No items found in this order.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
