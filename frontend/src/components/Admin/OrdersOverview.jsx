import React, { useState, useEffect } from "react";

const OrdersOverview = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("wss://your-backend-url/orders");
    ws.onmessage = (event) => {
      const newOrder = JSON.parse(event.data);
      setOrders((prevOrders) => [newOrder, ...prevOrders]);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="py-2 border-b">
            {order.customerName} - {order.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersOverview;
