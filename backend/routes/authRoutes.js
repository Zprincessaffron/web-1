import express from 'express';
import cors from 'cors';
import { loginUser, registerUser, test, getProfile, getUserData, getAdmin, authenticate, authorize,verifyOTP,resendOTP, forgotPassword, passwordVerifyOTP } from '../controllers/authController.js';
import { getAllUsers, sendAdminOTP, updateProfile, userLogout,userUnique, verifyAdminOTP } from '../controllers/userController.js';
import { addReview ,checkUserPurchase,createReview,fetchReviews,getAllReviews,getKashmirSaffronReviews,getSpainSaffronReviews } from '../controllers/reviewController.js'
import { analyzeData } from '../controllers/recommenderController.js';
import { getAllMarketers, getMarketer, registerMarketer, sendOtp } from '../controllers/marketerController.js';
import { getAllWholesalers, getWholeSaler, registerWholesaler, verifyOTPWholesaler } from '../controllers/wholesalerController.js';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
import { OrderData ,userOrders, getOrderData, getUserOrders, updateOrderStatus, getAllOrders, updateShipmentId } from '../controllers/orderController.js';
import { analyticsFilter, getAllTelecallerOrders, getAllUserOrders, getAllWholesalerOrders, getDefaultDashboardData, getRevenueByProducts, getSalesAndRevenue, getTopSellingProducts, getTotalRevenue, getTotalUser, getUserGrowth } from '../controllers/adminController.js';
import { getProducts, updateProduct } from '../controllers/productController.js';
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
router.post('/forgot-password', forgotPassword);
router.post('/verify-password-otp', passwordVerifyOTP);
router.post('/logout', userLogout);
router.get('/profile/:id',getProfile);
router.put('/profile' ,updateProfile)

router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);

router.get('/getuserdata', getUserData);


// recommender
router.post('/analyzeData', analyzeData);

// orders
router.post('/orders', authenticate, authorize(['user', 'wholesaler']),OrderData);
router.get("/user-orders", authenticate, authorize(['user', 'wholesaler']),userOrders);
router.get('/track/:orderId', authenticate, authorize(['user', 'wholesaler']),getOrderData);
router.get('/history/:id', authenticate, authorize(['user', 'wholesaler']),getUserOrders);
router.patch('/orders/update-status', authenticate, authorize(['admin']),updateOrderStatus);
router.get("/orders/all-orders", getAllOrders);
router.put("/orders/:orderId/update-shipment", updateShipmentId);

// marketers
router.post('/marketer', authenticate, authorize(['admin']),registerMarketer);
router.get('/marketer/:id', authenticate, authorize(['marketer']),getMarketer);
router.get('/marketer/:id/wholesaler', authenticate, authorize(['marketer']),getWholeSaler);
router.post('/send-otp', authenticate, authorize(['admin']),sendOtp);

// wholesaler
router.post('/wholesaler', authenticate, authorize(['marketer']),registerWholesaler);
router.post('/wholesaler/verify-otp', authenticate, authorize(['marketer']),verifyOTPWholesaler);


// admin
router.get('/all/users', authenticate, authorize(['admin']),getAllUsers);
router.get('/all/marketers', authenticate, authorize(['admin']),getAllMarketers);
router.get('/all/wholesalers', authenticate, authorize(['admin']),getAllWholesalers);
router.get('/admin/profile', authenticate, authorize(['admin']),getAdmin);
router.get('/admin/user-orders', authenticate, authorize(['admin']),getAllUserOrders);
router.get('/admin/wholesaler-orders', authenticate, authorize(['admin']),getAllWholesalerOrders);
router.get('/admin/telecaller-orders', authenticate, authorize(['admin']),getAllTelecallerOrders);
router.get('/admin/default-analytics', authenticate, authorize(['admin']), getDefaultDashboardData );
router.get('/admin/users/total-users', authenticate, authorize(['admin']), getTotalUser );
router.get('/admin/revenue/total-revenue', authenticate, authorize(['admin']), getTotalRevenue );
router.get('/admin/products/top-selling-products-by-weight', authenticate, authorize(['admin']), getTopSellingProducts );
router.get('/admin/revenue/total-revenue-by-products', authenticate, authorize(['admin']), getRevenueByProducts );
router.get('/admin/users/user-growth', authenticate, authorize(['admin']), getUserGrowth );
router.get('/admin/users/sales-and-revenue', authenticate, authorize(['admin']), getSalesAndRevenue );
router.post('/admin/users/analytics', authenticate, authorize(['admin']), analyticsFilter );
router.post('/admin/send-otp', authenticate, authorize(['admin']), sendAdminOTP );
router.post('/admin/verify-otp', authenticate, authorize(['admin']), verifyAdminOTP );


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
router.put('/products/:id', updateProduct);

// telecaller orders
router.post('/telecaller-orders', telecallerOrders);

///contactus-email



router.post('/sendmail', sendMail);

export default router;
