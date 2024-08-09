import React, { useState } from "react";
import axios from "axios";

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/track/${orderId}`);
      setOrder(response.data);
      setError(null);
    } catch (err) {
      setError("Order not found or error retrieving order.");
    }
  };

  return (
    <div className="container mx-auto my-10 p-5 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Order Tracking</h1>
      
      <form onSubmit={handleTrackOrder} className="bg-white p-8 rounded-lg shadow-md border border-gray-200 mb-8">
        <div className="mb-6">
          <label htmlFor="orderId" className="block text-gray-700 text-base font-medium mb-2">Order ID</label>
          <input
            id="orderId"
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Track Order
        </button>
      </form>

      {error && <p className="text-red-500 text-center text-lg">{error}</p>}
      
      {order && (
        <div className="flex flex-col lg:flex-row lg:space-x-8 bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <div className="lg:w-1/2 mb-6 lg:mb-0">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Shipping Details</h2>
            <div className="space-y-4">
              <p><strong className="font-medium text-gray-700">Name:</strong> <span className="text-gray-900">{order.shippingDetails?.name || "N/A"}</span></p>
              <p><strong className="font-medium text-gray-700">Address:</strong> <span className="text-gray-900">{order.shippingDetails?.address || "N/A"}</span></p>
              <p><strong className="font-medium text-gray-700">Landmark:</strong> <span className="text-gray-900">{order.shippingDetails?.landmark || "N/A"}</span></p>
              <p><strong className="font-medium text-gray-700">City:</strong> <span className="text-gray-900">{order.shippingDetails?.city || "N/A"}</span></p>
              <p><strong className="font-medium text-gray-700">State:</strong> <span className="text-gray-900">{order.shippingDetails?.state || "N/A"}</span></p>
              <p><strong className="font-medium text-gray-700">ZIP Code:</strong> <span className="text-gray-900">{order.shippingDetails?.zip || "N/A"}</span></p>
              <p><strong className="font-medium text-gray-700">Country:</strong> <span className="text-gray-900">{order.shippingDetails?.country || "N/A"}</span></p>
              <p><strong className="font-medium text-gray-700">Mobile Number:</strong> <span className="text-gray-900">{order.shippingDetails?.mobile || "N/A"}</span></p>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Order Details</h2>
            <div className="space-y-4 mb-8">
              <p><strong className="font-medium text-gray-700">Order ID:</strong> <span className="text-gray-900">{order._id}</span></p>
              <p><strong className="font-medium text-gray-700">Status:</strong> <span className="text-gray-900">{order.status}</span></p>
              <p><strong className="font-medium text-gray-700">Total:</strong> <span className="text-gray-900">₹{order.total}</span></p>
            </div>

            <h3 className="text-xl font-semibold mb-4 text-gray-900">Ordered Items</h3>
            {order.cartItems && Array.isArray(order.cartItems) ? (
              <ul className="space-y-4">
                {order.cartItems.map((item) => (
                  <li key={item.id} className="border-b border-gray-200 pb-4">
                    <p><strong className="font-medium text-gray-700">Item Name:</strong> <span className="text-gray-900">{item.name}</span></p>
                    <p><strong className="font-medium text-gray-700">Price:</strong> <span className="text-gray-900">₹{item.price}</span></p>
                    <p><strong className="font-medium text-gray-700">Quantity:</strong> <span className="text-gray-900">{item.quantity}</span></p>
                    <p><strong className="font-medium text-gray-700">Total:</strong> <span className="text-gray-900">₹{item.price * item.quantity}</span></p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items found in this order.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
