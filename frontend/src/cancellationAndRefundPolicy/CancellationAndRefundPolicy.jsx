import React, { useState, useEffect } from 'react';
import ScrollToTop from '../components/ScrollToTop';
import MenuSlider from '../components/sidebar/MenuSlider';
import SideBar from '../components/sidebar/SideBar';
import Navbar from '../navbar/NavBar';
import Footer from '../footer/Footer'; // Assuming a Footer is present like in PrivacyPolicy
import '../styles/CancellationAndRefundPolicy.css';
import cancellationAndRefundPolicyData from './cancellationAndRefundPolicy.json';
import { useUserContext } from '../context/MainContext'; // Import the context

const CancellationAndRefundPolicy = () => {
  const {
    orderCancellation,
    returnsAndRefunds,
    nonReturnableItems,
    refundTimeframes,
    shippingCosts,
    contactInformation,
    changesToPolicy,
  } = cancellationAndRefundPolicyData.cancellationAndRefundPolicy;

  const { setShowNav } = useUserContext();
  const [expandedSection, setExpandedSection] = useState(null); // For handling dropdown expansion

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
      <div className="cancellation-container">
        <h1>Cancellation and Refund Policy</h1>

        <div className='cancellation-section-container'>
          {/* Order Cancellation Section */}
        <section className="cancellation-section">
          <h2 onClick={() => toggleSection('orderCancellation')} className="section-header">
            {orderCancellation.title}
            <span className="dropdown-icon">{expandedSection === 'orderCancellation' ? '+' : '×'}</span>
          </h2>
          {expandedSection === 'orderCancellation' && (
            <ul>
              {Object.keys(orderCancellation.subsections).map((sub, index) => (
                <li key={index}>{orderCancellation.subsections[sub]}</li>
              ))}
            </ul>
          )}
        </section>

        {/* Returns and Refunds Section */}
        <section className="cancellation-section">
          <h2 onClick={() => toggleSection('returnsAndRefunds')} className="section-header">
            {returnsAndRefunds.title}
            <span className="dropdown-icon">{expandedSection === 'returnsAndRefunds' ? '+' : '×'}</span>
          </h2>
          {expandedSection === 'returnsAndRefunds' && (
            <ul>
              {Object.keys(returnsAndRefunds.subsections).map((sub, index) => (
                <li key={index}>{returnsAndRefunds.subsections[sub]}</li>
              ))}
            </ul>
          )}
        </section>

        {/* Non-returnable Items Section */}
        <section className="cancellation-section">
          <h2 onClick={() => toggleSection('nonReturnableItems')} className="section-header">
            {nonReturnableItems.title}
            <span className="dropdown-icon">{expandedSection === 'nonReturnableItems' ? '+' : '×'}</span>
          </h2>
          {expandedSection === 'nonReturnableItems' && (
            <ul>
              {nonReturnableItems.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </section>

        {/* Refund Timeframes Section */}
        <section className="cancellation-section">
          <h2 onClick={() => toggleSection('refundTimeframes')} className="section-header">
            {refundTimeframes.title}
            <span className="dropdown-icon">{expandedSection === 'refundTimeframes' ? '+' : '×'}</span>
          </h2>
          {expandedSection === 'refundTimeframes' && (
            <ul>
              {Object.keys(refundTimeframes.subsections).map((sub, index) => (
                <li key={index}>{refundTimeframes.subsections[sub]}</li>
              ))}
            </ul>
          )}
        </section>

        {/* Shipping Costs Section */}
        <section className="cancellation-section">
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

        {/* Contact Information Section */}
        <section className="cancellation-section">
          <h2 onClick={() => toggleSection('contactInformation')} className="section-header">
            {contactInformation.title}
            <span className="dropdown-icon">{expandedSection === 'contactInformation' ? '+' : '×'}</span>
          </h2>
          {expandedSection === 'contactInformation' && (
            <p>{contactInformation.message}</p>
          )}
        </section>

        {/* Changes to Policy Section */}
        <section className="cancellation-section">
          <h2 onClick={() => toggleSection('changesToPolicy')} className="section-header">
            {changesToPolicy.title}
            <span className="dropdown-icon">{expandedSection === 'changesToPolicy' ? '+' : '×'}</span>
          </h2>
          {expandedSection === 'changesToPolicy' && (
            <p>{changesToPolicy.message}</p>
          )}
        </section>
        </div>
        
      </div>
      <Footer />
    </>
  );
};

export default CancellationAndRefundPolicy;
