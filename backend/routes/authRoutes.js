import express from 'express';
import cors from 'cors';
import ROLES, { loginUser, registerUser, test, getProfile, saveData, getUserData, analyzeData, OrderData, getOrderData, getUserOrders, verifyRoles, getAllUsers } from '../controllers/authController.js';
import { getAllMarketers, getMarketer, registerMarketer } from '../controllers/marketerController.js';
import { getAllWholesalers, getWholeSaler, registerWholesaler } from '../controllers/wholesalerController.js';

const router = express.Router();

//middleware

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
)

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.post('/savedata', saveData);
router.get('/getuserdata', getUserData);
router.post('/analyzeData', analyzeData);
router.post('/orders', OrderData);
router.get('/track/:orderId', getOrderData);
router.get('/history/:id', getUserOrders);
router.post('/marketer', registerMarketer);
router.get('/marketer/:id', getMarketer);
router.get('/marketer/:id/wholesaler', getWholeSaler);
router.post('/wholesaler', registerWholesaler);
router.get('/all/users',getAllUsers);
router.get('/all/marketers',getAllMarketers);
router.get('/all/wholesalers',getAllWholesalers);
export default router;