import React, { useState, useEffect } from 'react';
import ScrollToTop from '../components/ScrollToTop';
import MenuSlider from '../components/sidebar/MenuSlider';
import SideBar from '../components/sidebar/SideBar';
import Navbar from '../navbar/NavBar';
import Footer from '../footer/Footer';
import '../styles/PrivacyPolicy.css';
import { useUserContext } from '../context/MainContext';

const privacyPolicyData = {
  privacyPolicy: {
    "introduction":
      'This Privacy Policy outlines how Z Princess Saffron collects, uses, and protects personal information from users of our e-commerce website zprincesssaffron.com. We are committed to safeguarding your privacy and ensuring the security of your personal information.',
    "information We Collect": {
      "personal Information":
        'We may collect personal information, including but not limited to your name, email address, phone number, billing and shipping address, and payment details when you make a purchase or create an account.',
      "usage Data":
        'We may collect information about your interactions with the Website, such as IP addresses, browser type, device type, pages visited, and the date and time of your visit.',
      "cookies":
        'We use cookies and similar tracking technologies to collect data for improving the Website and personalizing your experience. You can manage your cookie preferences by adjusting your browser settings.',
    },
    "how We Use Your Information": [
      'To process and fulfill your orders.',
      'To communicate with you about your orders and inquiries.',
      'To improve and optimize the Website’s performance.',
      'To send marketing and promotional materials with your consent.',
      'To comply with legal obligations.',
    ],
    "sharing Your Information": [
      'Service providers for order fulfillment and payment processing.',
      'Third-party service providers for website analytics and optimization.',
      'Legal authorities if required by law or to protect our rights, safety, or property.',
    ],
    "data Security":
      'We take reasonable measures to protect your personal information. However, no data transmission or storage system is completely secure. You acknowledge the inherent security risks of providing information online.',
    "your Choices": [
      'Access and update your personal information in your account settings.',
      'Opt out of marketing communications by following the unsubscribe instructions.',
      'Request the deletion of your personal information, unless we have a legitimate reason to retain it.',
    ],
    "children Privacy":
      'Our Website is not intended for children under 13 years of age. We do not knowingly collect or maintain personal information from children under 13.',
    "links To Other Websites":
      'Our Website may contain links to external websites. We are not responsible for the privacy practices and content of these websites.',
    "changes To Policy":
      'We may update this policy to reflect changes in our practices or for legal reasons.',
  },
};

const PrivacyPolicy = () => {
  const { privacyPolicy } = privacyPolicyData;
  const { setShowNav } = useUserContext();
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    setShowNav(true);
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      <ScrollToTop />
      <MenuSlider />
      <SideBar />
      <Navbar />
      <div className="privacy-container">
        <h1>Privacy Policy</h1>

        <div className='privacy-section-container'>
        {Object.keys(privacyPolicy).map((key, index) => (
          <div key={index} className="privacy-section">
            <h2 onClick={() => toggleSection(key)} className="section-header">
              {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              <span className="dropdown-icon">{expandedSection === key ? '+' : '×'}</span>
            </h2>
            {expandedSection === key && (
              <div className="section-content">
                {typeof privacyPolicy[key] === 'string' ? (
                  <p>{privacyPolicy[key]}</p>
                ) : Array.isArray(privacyPolicy[key]) ? (
                  <ul className="list-disc">
                    {privacyPolicy[key].map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <ul className="list-disc">
                    {Object.keys(privacyPolicy[key]).map((subKey, i) => (
                      <li key={i}>
                        <strong>{subKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong> {privacyPolicy[key][subKey]}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
        </div>
        
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
