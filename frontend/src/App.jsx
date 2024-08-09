import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/UserContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductSection from "./components/product/ProductSection";
import Chatbot from "./components/Chatbot/ChatBot";
import { CartProvider } from "./context/CartContext";
import CheckoutPage from "./components/product/CheckOutPage";
import PaymentPage from "./components/payment/PaymentPage";
import PaymentSuccessPage from "./components/payment/PaymentSuccessPage";
import OrderTracking from "./components/order/OrderTracking";
import OrderHistory from "./components/order/OrderHistory";
import DashboardLayout from "./components/UserDashboard/DashboardLayout";
import Profile from "./components/UserDashboard/Profile";
import Orders from "./components/UserDashboard/Orders";
import Settings from "./components/UserDashboard/Settings";
import History from "./components/UserDashboard/History";
import AdminDashboard from "./components/Admin/AdminDashboard";
import MarketerForm from "./pages/MarketerForm";
import MarketerDashboard from "./components/marketer/MarketerDashboard";
import RegisterWholesaler from "./components/WholeSaler/RegisterWholeSaler";
// import Login from "./components/login/Login"

function App() {
  return (
    <UserContextProvider>
      <CartProvider>
        <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/product/:id" element={<ProductSection />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/track-order" element={<OrderTracking />} />
          <Route path="/order-history/:userId" element={<OrderHistory />} />
          {/* userDashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="history" element={<History />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/register-marketer" element={<MarketerForm/>}/>
          <Route path="/marketer-dashboard/:id" element={<MarketerDashboard/>} />
          <Route path="/register-wholesaler/:id" element={<RegisterWholesaler/>} />
        </Routes>
      </CartProvider>
    </UserContextProvider>
  );
}

export default App;
