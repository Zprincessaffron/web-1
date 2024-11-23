import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  MdWbSunny,
  MdNightlight,
  MdDashboard,
  MdPeople,
  MdLocalOffer,
  MdAssessment,
  MdShoppingCart,
  MdPerson,
  MdNotifications,
} from "react-icons/md";
import { IoPersonCircleOutline, IoSettings } from "react-icons/io5";

import "./styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDropdown = (dropdownType) => {
    if (dropdownType === "user") {
      setIsUserDropdownOpen(!isUserDropdownOpen);
    } else if (dropdownType === "order") {
      setIsOrderDropdownOpen(!isOrderDropdownOpen);
    } else if (dropdownType === "profile") {
      setIsProfileDropdownOpen(!isProfileDropdownOpen);
    }
  };

  return (
    <div
      className={`ad-container ${isDarkMode ? "ad-main-content-dark" : "ad-main-content-light"}`}
    >
      {/* Sidebar */}
      <div
        className={`ad-sidebar ${
          isDarkMode ? "ad-sidebar-dark" : "ad-sidebar-light"
        }`}
      >
        <div className="ad-header">
          <h1 className="ad-title">Admin Dashboard</h1>
        </div>
        <nav className="ad-nav">
          <Link
            onClick={() => setSelectedCategory("dashboard")}
            to="/admin/dashboard"
            className={`ad-nav-item ${
              selectedCategory === "dashboard" ? "ad-nav-item-active" : isDarkMode ? "ad-nav-item-dark" : "ad-nav-item-light"
            }`}
          >
            <MdDashboard size={24} className="ad-icon" />
            Dashboard
          </Link>
          {/* Orders */}
          <div>
            <div
              onClick={() => toggleDropdown("order")}
              className={`ad-nav-item ${
                selectedCategory === "orders" ? "ad-nav-item-active" : isDarkMode ? "ad-nav-item-dark" : "ad-nav-item-light"
              }`}
            >
              <MdShoppingCart size={24} className="ad-icon" />
              Orders
            </div>
            {isOrderDropdownOpen && (
              <div className="ad-dropdown">
                <Link
                  to="/admin/user-orders"
                  onClick={() => setSelectedCategory("userOrders")}
                  className={`ad-dropdown-item ${
                    selectedCategory === "userOrders" ? "ad-dropdown-item-active" : isDarkMode ? "ad-dropdown-item-dark" : "ad-dropdown-item-light"
                  }`}
                >
                  User Orders
                </Link>
                <Link
                  to="/admin/wholesaler-orders"
                  onClick={() => setSelectedCategory("wholesalerOrders")}
                  className={`ad-dropdown-item ${
                    selectedCategory === "wholesalerOrders" ? "ad-dropdown-item-active" : isDarkMode ? "ad-dropdown-item-dark" : "ad-dropdown-item-light"
                  }`}
                >
                  Wholesaler Orders
                </Link>
                <Link
                  to="/admin/telecaller-orders"
                  onClick={() => setSelectedCategory("telecallerOrders")}
                  className={`ad-dropdown-item ${
                    selectedCategory === "telecallerOrders" ? "ad-dropdown-item-active" : isDarkMode ? "ad-dropdown-item-dark" : "ad-dropdown-item-light"
                  }`}
                >
                  Telecaller Orders
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`ad-main-content ${isDarkMode ? "ad-main-content-dark" : "ad-main-content-light"}`}>
        <div className="ad-header">
          <h1>Dashboard</h1>
          <div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`ad-toggle ${isDarkMode ? "ad-toggle-dark" : "ad-toggle-light"}`}
            >
              {isDarkMode ? <MdWbSunny /> : <MdNightlight />}
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
