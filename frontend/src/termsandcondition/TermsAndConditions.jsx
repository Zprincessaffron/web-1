import React, { useState, useEffect } from 'react';
import ScrollToTop from '../components/ScrollToTop';
import MenuSlider from '../components/sidebar/MenuSlider';
import SideBar from '../components/sidebar/SideBar';
import Navbar from '../navbar/NavBar';
import Footer from '../footer/Footer';
import terms from './termsandconditions.json';
import '../styles/TermsAndCondition.css'
import { useUserContext } from '../context/MainContext';

const TermsAndConditions = () => {
  const { terms_and_conditions } = terms;
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
      <div className="terms-container">
        <h1>Terms and Conditions</h1>
        
        <div className='terms-section-container'>
        {Object.keys(terms_and_conditions).map((key, index) => (
          <div key={index} className="section">
            <h2 onClick={() => toggleSection(key)} className="section-header">
              {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              <span className="dropdown-icon">
                {expandedSection === key ? '+' : '×'}
              </span>
            </h2>
            {expandedSection === key && (
              <div className="section-content">
                {typeof terms_and_conditions[key] === 'string' ? (
                  <p>{terms_and_conditions[key]}</p>
                ) : Array.isArray(terms_and_conditions[key].terms) ? (
                  <ul className="list-disc">
                    {terms_and_conditions[key].terms.map((term, i) => (
                      <li key={i}>{term}</li>
                    ))}
                  </ul>
                ) : (
                  <ul className="list-disc">
                    {Object.keys(terms_and_conditions[key]).map((subKey, i) => (
                      <li key={i}>
                        <strong>{subKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong> {terms_and_conditions[key][subKey]}
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

export default TermsAndConditions;
