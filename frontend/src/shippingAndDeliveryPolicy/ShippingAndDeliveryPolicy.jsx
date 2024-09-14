import React, { useState, useEffect } from 'react';
import ScrollToTop from '../components/ScrollToTop';
import MenuSlider from '../components/sidebar/MenuSlider';
import SideBar from '../components/sidebar/SideBar';
import Navbar from '../navbar/NavBar';
import Footer from '../footer/Footer'; // Added Footer import
import './ShippingAndDeliveryPolicy.css';
import shippingAndDeliveryPolicyData from './shippingAndDeliveryPolicy.json';
import { useUserContext } from '../context/MainContext'; // Import the context

const ShippingAndDeliveryPolicy = () => {
  const {
    shippingMethods,
    shippingCosts,
    orderProcessingTime,
    internationalShipping,
    deliveryIssues,
    shippingRestrictions,
    orderTracking,
    changeOfShippingAddress,
    lostOrStolenPackages,
  } = shippingAndDeliveryPolicyData.shippingAndDeliveryPolicy;

  const { setShowNav } = useUserContext();
  const [expandedSection, setExpandedSection] = useState(null); // Dropdown state

  // Set showNav to true when the component mounts
  useEffect(() => {
    setShowNav(true);
  }, [setShowNav]);

  // Toggle section dropdown
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      <ScrollToTop />
      <MenuSlider />
      <SideBar />
      <Navbar />
      <div className="shipping-container">
        <h1>Shipping and Delivery Policy</h1>

        <div className="shipping-section-container">
          {/* Shipping Methods Section */}
        <section className="shipping-section">
          <h2 onClick={() => toggleSection('shippingMethods')} className="section-header">
            {shippingMethods.title}
            <span className="dropdown-icon">{expandedSection === 'shippingMethods' ? '+' : '×'}</span>
          </h2>
          {expandedSection === 'shippingMethods' && (
            <ul>
              {Object.keys(shippingMethods.subsections).map((sub, index) => (
                <li key={index}>{shippingMethods.subsections[sub]}</li>
              ))}
            </ul>
          )}
        </section>

        {/* Shipping Costs Section */}
        <section className="shipping-section">
          <h2 onClick={() => toggleSection('shippingCosts')} className="section-header">
            {shippingCosts.title}
            <span className="dropdown-icon">{expandedSection === 'shippingCosts' ? '+' : '×'}</span>
          </h2>
          {expandedSection === 'shippingCosts' && (
            <ul>
              {Object.keys(shippingCosts.subsections).map((sub, index) => (
                <li key={index}>{shippingCosts.subsections[sub]}</li>
              ))}
            </ul>
          )}
        </section>

        {/* Order Processing Time Section */}
        <section className="shipping-section">
          <h2 onClick={() => toggleSection('orderProcessingTime')} className="section-header">
            {orderProcessingTime.title}
            <span className="dropdown-icon">{expandedSection === 'orderProcessingTime' ? '+' : '×'}</span>
          </h2>
          {expandedSection === 'orderProcessingTime' && (
            <ul>
              {Object.keys(orderProcessingTime.subsections).map((sub, index) => (
                <li key={index}>{orderProcessingTime.subsections[sub]}</li>
              ))}
            </ul>
          )}
        </section>

        {/* International Shipping Section */}
        <section className="shipping-section">
          <h2 onClick={() => toggleSection('internationalShipping')} className="section-header">
            {internationalShipping.title}
            <span className="dropdown-icon">{expandedSection === 'internationalShipping' ? '+' : '×'}</span>
          </h2>
          {expandedSection === 'internationalShipping' && (
            <ul>
              {Object.keys(internationalShipping.subsections).map((sub, index) => (
                <li key={index}>{internationalShipping.subsections[sub]}</li>
              ))}
            </ul>
          )}
        </section>

        {/* Delivery Issues Section */}
        <section className="shipping-section">
          <h2 onClick={() => toggleSection('deliveryIssues')} className="section-header">
            {deliveryIssues.title}
            <span className="dropdown-icon">{expandedSection === 'deliveryIssues' ? '+' : '×'}</span>
          </h2>
          {expandedSection === 'deliveryIssues' && <p>{deliveryIssues.message}</p>}
        </section>

        {/* Shipping Restrictions Section */}
        <section className="shipping-section">
          <h2 onClick={() => toggleSection('shippingRestrictions')} className="section-header">
            {shippingRestrictions.title}
            <span className="dropdown-icon">{expandedSection === 'shippingRestrictions' ? '+' : '×'}</span>
          </h2>
          {expandedSection === 'shippingRestrictions' && (
            <ul>
              {Object.keys(shippingRestrictions.subsections).map((sub, index) => (
                <li key={index}>{shippingRestrictions.subsections[sub]}</li>
              ))}
            </ul>
          )}
        </section>

        {/* Order Tracking Section */}
        <section className="shipping-section">
          <h2 onClick={() => toggleSection('orderTracking')} className="section-header">
            {orderTracking.title}
            <span className="dropdown-icon">{expandedSection === 'orderTracking' ? '+' : '×'}</span>
          </h2>
          {expandedSection === 'orderTracking' && <p>{orderTracking.message}</p>}
        </section>

        {/* Change of Shipping Address Section */}
        <section className="shipping-section">
          <h2 onClick={() => toggleSection('changeOfShippingAddress')} className="section-header">
            {changeOfShippingAddress.title}
            <span className="dropdown-icon">{expandedSection === 'changeOfShippingAddress' ? '+' : '×'}</span>
          </h2>
          {expandedSection === 'changeOfShippingAddress' && <p>{changeOfShippingAddress.message}</p>}
        </section>

        {/* Lost or Stolen Packages Section */}
        <section className="shipping-section">
          <h2 onClick={() => toggleSection('lostOrStolenPackages')} className="section-header">
            {lostOrStolenPackages.title}
            <span className="dropdown-icon">{expandedSection === 'lostOrStolenPackages' ? '+' : '×'}</span>
          </h2>
          {expandedSection === 'lostOrStolenPackages' && <p>{lostOrStolenPackages.message}</p>}
        </section>
        </div>
        
      </div>
      <Footer /> {/* Added Footer component */}
    </>
  );
};

export default ShippingAndDeliveryPolicy;
