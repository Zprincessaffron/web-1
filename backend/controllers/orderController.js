import Order from "../models/order.js";


// creating order

export const OrderData = async (req, res) => {
  try {
    const { shippingDetails, items, total, user } = req.body;

    if (!shippingDetails || !items || !total || !user) {
      return res.status(400).json({ message: "Missing data" });
    }

    // Create a new order document
    const newOrder = new Order({
      shippingDetails,
      cartItems: items,
      total,
      status: "Processed",
      user,
    });

    // Save to the database
    await newOrder.save();

    res.status(200).json(newOrder);
  } catch (error) {
    console.error("Error saving order details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// updating order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Validate input
    if (!orderId || !status) {
      return res.status(400).json({ message: "Missing orderId or status" });
    }

    // Find the order by ID and update its status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// user's all orders except delivered

export const userOrders = async (req, res) => {
  try {
    const { userId, page = 1, limit = 5 } = req.query;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const pageLimit = parseInt(limit, 10);

    // Ensure page and limit are valid numbers
    if (
      isNaN(pageNumber) ||
      isNaN(pageLimit) ||
      pageNumber <= 0 ||
      pageLimit <= 0
    ) {
      return res.status(400).json({ error: "Invalid page or limit" });
    }

    // Calculate the number of documents to skip
    const skip = (pageNumber - 1) * pageLimit;

    // Fetch orders with pagination, filtering out "Delivered" orders
    const orders = await Order.find({
      "user.id": userId,
      status: { $ne: "Delivered" }, // Exclude orders with status "Delivered"
    })
      .skip(skip)
      .limit(pageLimit);

    // Get the total number of orders for pagination metadata (excluding "Delivered" orders)
    const totalOrders = await Order.countDocuments({
      "user.id": userId,
      status: { $ne: "Delivered" }, // Exclude orders with status "Delivered"
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalOrders / pageLimit);

    // Send response with orders and pagination metadata
    res.json({
      orders,
      totalPages,
      currentPage: pageNumber,
      totalOrders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// user's particular order tracking

export const getOrderData = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// user's order history only delivered orders

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.id;
    const orders = await Order.find({ 
      "user.id": userId, 
      status: 'Delivered' // Filter by status 'Delivered'
    });
    res.json(orders); // Send the orders in the response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
};
