import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderHistory = () => {
  const { userId } = useParams();
  console.log('User ID:', userId);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
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
    <div className="container mx-auto my-10 p-5 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Order History</h1>

      {error && <p className="text-red-500">{error}</p>}
      
      {orders.length === 0 ? (
        <p className="text-gray-700">No orders found.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          {orders.map((order) => (
            <div key={order._id} className="mb-4 border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-bold text-lg">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Status: <span className={`font-semibold ${order.status === 'Processed' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</span></p>
                </div>
                <p className="font-semibold text-xl">₹{order.total}</p>
              </div>
              <div className="ml-4">
                <h2 className="font-bold text-md mb-2">Items:</h2>
                <ul className="list-disc ml-6">
                  {order.cartItems.map((item) => (
                    <li key={item.productId} className="mb-1">
                      <span className="font-medium">{item.name}</span> - {item.quantity} x ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ml-4 mt-4">
                <h2 className="font-bold text-md mb-2">Shipping Details:</h2>
                <p className="text-sm text-gray-700">{order.shippingDetails.address}</p>
                <p className="text-sm text-gray-700">{order.shippingDetails.city}, {order.shippingDetails.state}</p>
                <p className="text-sm text-gray-700">{order.shippingDetails.zipCode}</p>
                <p className="text-sm text-gray-700">{order.shippingDetails.country}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
