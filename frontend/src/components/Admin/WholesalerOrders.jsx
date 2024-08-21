import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WholesalerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchWholesalerOrders = async () => {
      try {
        const response = await axios.get('/admin/wholesaler-orders'); // Adjust the endpoint as needed
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWholesalerOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.patch('/orders/update-status', { orderId, status: newStatus });
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating status:', err.message);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="text-2xl text-gray-500">Loading...</div>
    </div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Wholesaler Orders</h1>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wholesaler</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map(order => (
              <tr key={order._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.user.name} ({order.user.email})</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  <button
                    className="font-semibold hover:underline"
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
        <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Order Details for {selectedOrder._id}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Shipping Details</h3>
              <p className="text-sm text-gray-600"><strong>Name:</strong> {selectedOrder.shippingDetails.name}</p>
              <p className="text-sm text-gray-600"><strong>Address:</strong> {selectedOrder.shippingDetails.address}</p>
              <p className="text-sm text-gray-600"><strong>City:</strong> {selectedOrder.shippingDetails.city}</p>
              <p className="text-sm text-gray-600"><strong>State:</strong> {selectedOrder.shippingDetails.state}</p>
              <p className="text-sm text-gray-600"><strong>ZIP:</strong> {selectedOrder.shippingDetails.zip}</p>
              <p className="text-sm text-gray-600"><strong>Country:</strong> {selectedOrder.shippingDetails.country}</p>
              <p className="text-sm text-gray-600"><strong>Mobile:</strong> {selectedOrder.shippingDetails.mobile}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Cart Items</h3>
              <ul className="text-sm text-gray-600">
                {selectedOrder.cartItems.map((item, index) => (
                  <li key={index} className="mb-2">
                    <strong>Item {index + 1}:</strong> {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600"><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
            <p className="text-sm text-gray-600"><strong>Payment ID:</strong> {selectedOrder.payment.paymentId}</p>
            <p className="text-sm text-gray-600"><strong>Payment Method:</strong> {selectedOrder.payment.paymentMethod}</p>
            <p className="text-sm text-gray-600"><strong>Payment Status:</strong> {selectedOrder.payment.paymentStatus}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Update Order Status</h3>
            <select
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            className="mt-4 text-indigo-600 font-semibold hover:text-indigo-800"
            onClick={() => setSelectedOrder(null)}
          >
            Close Details
          </button>
        </div>
      )}
    </div>
  );
};

export default WholesalerOrders;
