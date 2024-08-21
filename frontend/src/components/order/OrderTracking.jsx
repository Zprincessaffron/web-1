import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaBoxOpen, FaTruck, FaCheckCircle, FaTimesCircle, FaHandHolding } from 'react-icons/fa';

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
    <div className="container mx-auto my-3 p-5 max-w-4xl">
      <h1 className="text-5xl font-bold mb-8 text-gray-900 text-center">Order Tracking</h1>

      {error && <p className="text-red-500 text-center text-lg">{error}</p>}

      {order && (
        <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-300">
          <div className="flex flex-col lg:flex-row lg:space-x-8 mb-8">
            {/* Shipping Details */}
            <div className="lg:w-1/2 mb-8 lg:mb-0 bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-semibold mb-4 text-gray-900 flex items-center">
                <FaMapMarkerAlt className="mr-2" /> Shipping Details
              </h2>
              <div className="space-y-4">
                <p><strong className="font-medium text-gray-700">Name:</strong> <span className="text-gray-900">{order.shippingDetails?.name || "N/A"}</span></p>
                <p><strong className="font-medium text-gray-700">Address:</strong> <span className="text-gray-900">{order.shippingDetails?.address || "N/A"}</span></p>
                <p><strong className="font-medium text-gray-700">City:</strong> <span className="text-gray-900">{order.shippingDetails?.city || "N/A"}</span></p>
                <p><strong className="font-medium text-gray-700">State:</strong> <span className="text-gray-900">{order.shippingDetails?.state || "N/A"}</span></p>
                <p><strong className="font-medium text-gray-700">ZIP Code:</strong> <span className="text-gray-900">{order.shippingDetails?.zip || "N/A"}</span></p>
                <p><strong className="font-medium text-gray-700">Country:</strong> <span className="text-gray-900">{order.shippingDetails?.country || "N/A"}</span></p>
                <p><strong className="font-medium text-gray-700">Mobile Number:</strong> <span className="text-gray-900">{order.shippingDetails?.mobile || "N/A"}</span></p>
              </div>
            </div>

            {/* Order Details and Progress Bar */}
            <div className="lg:w-1/2 bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-semibold mb-4 text-gray-900 flex items-center">
                <FaBoxOpen className="mr-2" /> Order Details
              </h2>
              <div className="space-y-4 mb-8">
                <p><strong className="font-medium text-gray-700">Order ID:</strong> <span className="text-gray-900">{order._id}</span></p>
                <p><strong className="font-medium text-gray-700">Status:</strong> <span className="text-gray-900">{order.status}</span></p>
                <p><strong className="font-medium text-gray-700">Total:</strong> <span className="text-gray-900">₹{order.total}</span></p>
              </div>

              {/* Progress Bar */}
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Order Status</h3>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <FaHandHolding className={`text-2xl ${order.status === 'Processed' ? 'text-blue-500' : 'text-gray-400'}`} />
                  <span className={`ml-2 ${order.status === 'Processed' ? 'font-semibold text-blue-500' : 'text-gray-400'}`}>Processed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaBoxOpen className={`text-2xl ${order.status === 'Accepted' ? 'text-blue-500' : 'text-gray-400'}`} />
                  <span className={`ml-2 ${order.status === 'Accepted' ? 'font-semibold text-blue-500' : 'text-gray-400'}`}>Accepted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaTruck className={`text-2xl ${order.status === 'Shipped' ? 'text-blue-500' : 'text-gray-400'}`} />
                  <span className={`ml-2 ${order.status === 'Shipped' ? 'font-semibold text-blue-500' : 'text-gray-400'}`}>Shipped</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCheckCircle className={`text-2xl ${order.status === 'Delivered' ? 'text-blue-500' : 'text-gray-400'}`} />
                  <span className={`ml-2 ${order.status === 'Delivered' ? 'font-semibold text-blue-500' : 'text-gray-400'}`}>Delivered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaTimesCircle className={`text-2xl ${order.status === 'Cancelled' ? 'text-red-500' : 'text-gray-400'}`} />
                  <span className={`ml-2 ${order.status === 'Cancelled' ? 'font-semibold text-red-500' : 'text-gray-400'}`}>Cancelled</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 h-1 my-4 rounded-full">
                <div className={`h-full rounded-full ${order.status === 'Processed' ? 'w-1/5 bg-blue-500' : order.status === 'Accepted' ? 'w-2/5 bg-blue-500' : order.status === 'Shipped' ? 'w-3/5 bg-blue-500' : order.status === 'Delivered' ? 'w-4/5 bg-blue-500' : 'w-full bg-red-500'}`}></div>
              </div>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-3xl font-semibold mb-4 text-gray-900">Ordered Items</h3>
            {order.cartItems && Array.isArray(order.cartItems) ? (
              <ul className="space-y-4">
                {order.cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <div>
                      <p className="text-lg font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-700">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-lg font-medium text-gray-900">₹{item.price * item.quantity}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg text-gray-700">No items found in this order.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
