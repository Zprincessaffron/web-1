import Order from "../models/order.js";
import TeleCaller from "../models/telecaller.js";
import User from "../models/user.js";
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

export const getAllTelecallerOrders = async (req,res) => {
  try {
    const allOrders = await TeleCaller.find();
    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }  
}


export const getDefaultDashboardData = async (req, res) => {
  try {
    const { year } = req.query; // Get the selected year from query parameters
    const startOfYear = new Date(`${year}-01-01`);
    const endOfYear = new Date(`${year}-12-31`);

    // Fetch orders only within the selected year
    const orders = await Order.find({
      createdAt: {
        $gte: startOfYear,
        $lte: endOfYear,
      },
    });

    const salesData = {};
    const revenueData = {};
    const productSales = {};

    orders.forEach((order) => {
      const month = new Date(order.createdAt).toLocaleString('default', {
        month: 'short',
      });

      // Sales Data (Sum of items sold)
      if (!salesData[month]) salesData[month] = 0;
      order.cartItems.forEach((item) => {
        salesData[month] += item.quantity;
      });

      // Revenue Data (Sum of total amounts)
      if (!revenueData[month]) revenueData[month] = 0;
      revenueData[month] += order.total;

      // Top Selling Products
      order.cartItems.forEach((item) => {
        if (!productSales[item.variantId]) {
          productSales[item.variantId] = { name: item.name, quantity: 0, weight: item.weight };
        }
        productSales[item.variantId].quantity += item.quantity;
      });
    });

    // Convert productSales object to an array
    const productSalesArray = Object.values(productSales);

    res.json({
      salesData,
      revenueData,
      productSales: productSalesArray,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getTotalUser= async (req, res) => {
  const { startDate, endDate } = req.query;

  // Create base filters for users and wholesalers
  let userFilter = { role: 'user' };
  let wholesalerFilter = { role: 'wholesaler' };

  // Check if both startDate and endDate are provided, then apply date range filters
  if (startDate && endDate) {
    const dateRange = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };

    // Add date range to both filters
    userFilter.createdAt = dateRange;
    wholesalerFilter.createdAt = dateRange;
  }

  try {
    // Count users based on the filter (with or without date range)
    const totalUsers = await User.countDocuments(userFilter);

    // Count wholesalers based on the filter (with or without date range)
    const totalWholesalers = await Wholesaler.countDocuments(wholesalerFilter);

    // Calculate the total of both users and wholesalers
    const total = totalUsers + totalWholesalers;

    // Send the response with the counts
    res.json({ totalUsers, totalWholesalers, total });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const getTotalRevenue = async (req, res) => {
  const { startDate, endDate } = req.query; // Get the date range from query params

  // Create the base aggregation pipeline
  const pipeline = [];

  // If startDate and endDate are provided, add the match stage to filter by date range
  if (startDate && endDate) {
    pipeline.push({
      $match: {
        createdAt: {
          $gte: new Date(startDate), // Start date (greater than or equal to)
          $lte: new Date(endDate),   // End date (less than or equal to)
        },
      },
    });
  }

  // Add the group stage to sum the 'total' field
  pipeline.push({
    $group: {
      _id: null,
      totalRevenue: { $sum: "$total" }, // Summing the 'total' field
    },
  });

  try {
    // Run the aggregation pipeline
    const totalRevenueResult = await Order.aggregate(pipeline);

    // Extract the totalRevenue from the aggregation result
    const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;
    res.json({ totalRevenue });
  } catch (error) {
    console.error('Error fetching total revenue:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export const getTopSellingProducts = async (req, res) => {
  const { startDate, endDate } = req.query; // Get date range from query params

  try {
    // Create the base aggregation pipeline
    let pipeline = [
      { $unwind: "$cartItems" }, // Unwind cart items array
      {
        $group: {
          _id: { name: "$cartItems.name", weight: "$cartItems.weight" }, // Group by product name and weight
          totalQuantity: { $sum: "$cartItems.quantity" }, // Sum quantity for each group
        }
      },
      { $sort: { totalQuantity: -1 } }, // Sort by total quantity in descending order
    ];

    // If startDate and endDate are provided, add a match stage for filtering by order date
    if (startDate && endDate) {
      pipeline.unshift({
        $match: {
          createdAt: { // Assuming your orders have an `orderDate` field
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          }
        }
      });
    }

    // Execute the aggregation pipeline
    const productsByWeight = await Order.aggregate(pipeline);

    // Send back the aggregated data as response
    res.json(productsByWeight);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const getRevenueByProducts = async (req, res) => {
  const { startDate, endDate } = req.query; 

  try {
    const matchStage = {};
    if (startDate && endDate) {
      matchStage.createdAt = { 
        $gte: new Date(startDate), 
        $lte: new Date(endDate) 
      }; // Filter by date range if provided
    }

    const revenueByCategory = await Order.aggregate([
      { $match: matchStage }, // Apply match only if dates are provided
      { $unwind: "$cartItems" }, // Unwind cart items array
      {
        $group: {
          _id: { name: "$cartItems.name", weight: "$cartItems.weight" }, // Group by product name and weight
          totalRevenue: { $sum: { $multiply: ["$cartItems.price", "$cartItems.quantity"] } }, // Calculate total revenue for each product-weight combination
        }
      },
      { $sort: { totalRevenue: -1 } }, // Sort by total revenue in descending order
    ]);

    const categories = revenueByCategory.map(item => `${item._id.name} (${item._id.weight}g)`); // Combine product name and weight in the label
    const values = revenueByCategory.map(item => item.totalRevenue);

    res.json({ categories, values });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching revenue by category', error });
  }
};


// Helper function to format date (month/year) as "Sep/2024"
const formatDate = (month, year) => {
  const date = new Date(year, month - 1); // Months in JS are 0-indexed
  return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
};


export const getUserGrowth = async (req, res) => {
  const { startDate, endDate } = req.query; // Get optional filter parameters

  try {
    // Create a match stage for filtering by date range if provided
    const matchStage = { role: "user" }; // Default match for normal users

    if (startDate && endDate) {
      matchStage.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Fetch users
    const userGrowthData = await User.aggregate([
      { $match: matchStage }, // Apply match stage for users
      {
        $group: {
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Fetch wholesalers from a separate Wholesaler database
    const wholesalerMatchStage = {};
    if (startDate && endDate) {
      wholesalerMatchStage.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const wholesalerGrowthData = await Wholesaler.aggregate([
      { $match: wholesalerMatchStage }, // Apply match stage for wholesalers
      {
        $group: {
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Merging the user and wholesaler data into a single structure
    const mergedData = {};

    // Process user data
    userGrowthData.forEach(item => {
      const label = formatDate(item._id.month, item._id.year);
      if (!mergedData[label]) {
        mergedData[label] = { user: 0, wholesaler: 0 };
      }
      mergedData[label].user = item.count;
    });

    // Process wholesaler data
    wholesalerGrowthData.forEach(item => {
      const label = formatDate(item._id.month, item._id.year);
      if (!mergedData[label]) {
        mergedData[label] = { user: 0, wholesaler: 0 };
      }
      mergedData[label].wholesaler = item.count;
    });

    // Preparing response
    const labels = Object.keys(mergedData);
    const userCounts = labels.map(label => mergedData[label].user);
    const wholesalerCounts = labels.map(label => mergedData[label].wholesaler);

    res.json({ labels, userCounts, wholesalerCounts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user and wholesaler growth data', error });
  }
};


export const getSalesAndRevenue = async (req, res) => {
  try {
    const { startDate, endDate } = req.query; // Filter parameters from the frontend

    const matchStage = {};
    if (startDate || endDate) {
      matchStage.createdAt = {};
      if (startDate) matchStage.createdAt.$gte = new Date(startDate);
      if (endDate) matchStage.createdAt.$lte = new Date(endDate);
    }

    const salesData = await Order.aggregate([
      { $match: matchStage }, // Apply filters if provided
      {
        $group: {
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
          totalRevenue: { $sum: "$total" },
          totalSales: { $sum: 1 },
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    const formattedData = salesData.map(item => ({
      label: formatDate(item._id.month, item._id.year),
      totalRevenue: item.totalRevenue,
      totalSales: item.totalSales,
    }));

    const labels = formattedData.map(item => item.label);
    const salesValues = formattedData.map(item => item.totalSales);
    const revenueValues = formattedData.map(item => item.totalRevenue);

    res.json({ labels, salesValues, revenueValues });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales data', error });
  }
};






export const analyticsFilter = async (req,res) =>{
  const { startDate, endDate } = req.body;
  console.log({ startDate, endDate });

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Total Revenue
    const totalRevenueData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' },
        },
      },
    ]);

    const totalRevenue = totalRevenueData[0]?.totalRevenue || 0;

    // Total Users
    const totalUsers = await User.countDocuments({
      createdAt: { $gte: start, $lte: end },
    });

    // Top Selling Products
    const topSellingProducts = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
      { $unwind: '$cartItems' },
      {
        $group: {
          _id: '$cartItems.name',
          quantity: { $sum: '$cartItems.quantity' },
        },
      },
      {
        $sort: { quantity: -1 },
      },
      { $limit: 5 },
    ]);

    // Sales and Revenue Over Time
    const salesRevenueOverTime = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$createdAt" }
          },
          totalSales: { $sum: '$total' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // User Growth
    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$createdAt" }
          },
          newUsers: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Revenue by Product Category (if applicable)
    const revenueByProductCategory = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
      { $unwind: '$cartItems' },
      {
        $group: {
          _id: '$cartItems.category', 
          // Assuming there is a category field',
          revenue: { $sum: '$cartItems.price' },
        },
      },
    ]);

    res.json({
      totalRevenue,
      totalUsers,
      topSellingProducts,
      salesRevenueOverTime,
      userGrowth,
      revenueByProductCategory,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}