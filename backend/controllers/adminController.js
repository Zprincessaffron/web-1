import Order from "../models/order.js";
import Wholesaler from "../models/wholesaler.js";

// getting all the orders for admin dashboard

export const getAllUserOrders = async (req,res)=>{
  try {
    const allOrders = await Order.find({
      "user.role": "user"
    });
    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getAllWholesalerOrders = async (req,res)=>{
  try {
    const allOrders = await Order.find({
      "user.role": "wholesaler"
    });
    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}