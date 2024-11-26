import express from 'express';
import cors from 'cors';
import { loginUser, registerUser, test, getUserData, getAdmin, authenticate, authorize,verifyOTP,resendOTP } from '../controllers/authController.js';
import { getAllUsers, sendAdminOTP, updateProfile, userLogout,userUnique, verifyAdminOTP } from '../controllers/userController.js';
import { addReview ,checkUserPurchase,createReview,fetchReviews,getAllReviews,getKashmirSaffronReviews,getSpainSaffronReviews } from '../controllers/reviewController.js'
import { analyzeData } from '../controllers/recommenderController.js';
import { getAllMarketers, getMarketer, registerMarketer, sendOtp } from '../controllers/marketerController.js';
import { getAllWholesalers, getWholeSaler, registerWholesaler, verifyOTPWholesaler } from '../controllers/wholesalerController.js';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
import { OrderData ,userOrders, getOrderData, getUserOrders, updateOrderStatus, getAllOrders, updateShipmentId } from '../controllers/orderController.js';
import { analyticsFilter, getAllTelecallerOrders, getAllUserOrders, getAllWholesalerOrders, getDefaultDashboardData, getRevenueByProducts, getSalesAndRevenue, getTopSellingProducts, getTotalRevenue, getTotalUser, getUserGrowth } from '../controllers/adminController.js';
import { getProducts, updateProduct,createProduct } from '../controllers/productController.js';
import { telecallerOrders } from '../controllers/telecallerController.js';
import { sendMail } from '../controllers/mailController.js';

const router = express.Router();

//middleware

// router.use(
//   cors({
//     credentials: true,
//     origin: 'http://localhost:5173'
//   })
// )


// auth
router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', userLogout);
router.put('/profile' ,updateProfile)

router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);

router.get('/getuserdata', getUserData);


// recommender
router.post('/analyzeData', analyzeData);

// orders
router.post('/orders' ,OrderData);
router.get("/user-orders", userOrders);
router.get('/track/:orderId',getOrderData);
router.get('/history/:id', authenticate, authorize(['user', 'wholesaler']),getUserOrders);
router.patch('/orders/update-status',updateOrderStatus);
router.get("/orders/all-orders", getAllOrders);
router.put("/orders/:orderId/update-shipment", updateShipmentId);

// marketers
router.post('/marketer',registerMarketer);
router.get('/marketer/:id', authenticate, authorize(['marketer']),getMarketer);
router.get('/marketer/:id/wholesaler', authenticate, authorize(['marketer']),getWholeSaler);
router.post('/send-otp',sendOtp);

// wholesaler
router.post('/wholesaler', authenticate, authorize(['marketer']),registerWholesaler);
router.post('/wholesaler/verify-otp', authenticate, authorize(['marketer']),verifyOTPWholesaler);


// admin
router.get('/all/users',getAllUsers);
router.get('/all/marketers',getAllMarketers);
router.get('/all/wholesalers',getAllWholesalers);
router.get('/admin/profile',getAdmin);
router.get('/admin/user-orders',getAllUserOrders);
router.get('/admin/wholesaler-orders',getAllWholesalerOrders);
router.get('/admin/telecaller-orders',getAllTelecallerOrders);
router.get('/admin/default-analytics', getDefaultDashboardData );
router.get('/admin/users/total-users', getTotalUser );
router.get('/admin/revenue/total-revenue', getTotalRevenue );
router.get('/admin/products/top-selling-products-by-weight', getTopSellingProducts );
router.get('/admin/revenue/total-revenue-by-products', getRevenueByProducts );
router.get('/admin/users/user-growth', getUserGrowth );
router.get('/admin/users/sales-and-revenue', getSalesAndRevenue );
router.post('/admin/users/analytics', analyticsFilter );
router.post('/admin/send-otp', sendAdminOTP );
router.post('/admin/verify-otp', verifyAdminOTP );


// payment 
router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);

//reviews
router.get('/check-purchase/:userId/:productId', checkUserPurchase);
router.post('/reviews', createReview);
router.get('/reviews/:productId', fetchReviews);
router.post('/add-review' ,addReview);
router.get('/allreviews' ,getAllReviews)
router.get('/kashmir-review' ,getKashmirSaffronReviews);
router.get('/spain-review' ,getSpainSaffronReviews);
router.get('/user/:uniqueId',userUnique)

// product
router.get('/products', getProducts);
router.post('/product', createProduct);
router.put('/products/:id', updateProduct);

// telecaller orders
router.post('/telecaller-orders', telecallerOrders);

///contactus-email



router.post('/sendmail', sendMail);

export default router;
