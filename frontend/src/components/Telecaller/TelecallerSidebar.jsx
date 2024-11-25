import React, { useState } from 'react';
import axios from 'axios';

const TelecallerSidebar = () => {
  const [orders, setOrders] = useState([]);
  const [shipmentIds, setShipmentIds] = useState({}); // To store shipmentId for each order

  // Fetch all orders when "Shipment Closing" is clicked
  const handleShipmentClosing = async () => {
    try {
      const response = await axios.get('/orders/all-orders'); // Fetch all orders
      setOrders(response.data); // Store the fetched order data in state
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Handle input change for shipmentId
  const handleShipmentIdChange = (orderId, value) => {
    setShipmentIds((prevState) => ({
      ...prevState,
      [orderId]: value, // Store the shipmentId for the respective order
    }));
  };

  // Function to update shipmentId and submit the order update
  const handleUpdateShipment = async (orderId) => {
    try {
      const shipmentId = shipmentIds[orderId]; // Get the entered shipmentId
      if (!shipmentId) {
        alert('Please enter a shipment ID');
        return;
      }

      const updatedShipment = { shipmentId }; // Data to update

      // Make a PUT request to update the order's shipmentId
      await axios.put(`/orders/${orderId}/update-shipment`, updatedShipment);
      alert('Shipment ID updated successfully');
      handleShipmentClosing();
    } catch (error) {
      console.error('Error updating shipment:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 uppercase tracking-widest">Total Orders</h2>
      <button
        onClick={handleShipmentClosing}
        className="text-md border px-4 py-2 tracking-wider font-normal text-white bg-blue-500 cursor-pointer hover:bg-blue-600 transition duration-200"
      >
        Fetch All Orders
      </button>

      {orders.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Details</h3>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white shadow-md rounded-md p-4 border border-gray-200">
                <p className="text-gray-800 font-medium font-sans tracking-wider mb-2">Order ID: {order._id}</p>
                <p className="text-gray-800 font-normal tracking-wider mb-2">Order ID: {order.cartItems.map((item)=> item.name).join(" , ")}</p>
                <p className="text-gray-800 tracking-wider font-normal mb-3">
                  Shipment ID: {order.shippingDetails?.shipmentId || <span className="text-red-500">N/A</span>}
                </p>

                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter new Shipment ID"
                    value={shipmentIds[order._id] || ''} // Bind the input value to state
                    onChange={(e) => handleShipmentIdChange(order._id, e.target.value)} // Update state on input change
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>

                <button
                  onClick={() => handleUpdateShipment(order._id)} // Use the entered shipment ID
                  className="mt-4 bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 transition duration-200"
                >
                  Update Shipment ID
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TelecallerSidebar;
