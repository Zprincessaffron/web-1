import React, { useState, useEffect } from 'react';
import ScrollToTop from '../components/ScrollToTop';
import MenuSlider from '../components/sidebar/MenuSlider';
import SideBar from '../components/sidebar/SideBar';
import Navbar from '../navbar/NavBar';
import Footer from '../footer/Footer';
import './Faq.css';  // Import the FAQ.css file
import faqData from './Faq.json';
import { useUserContext } from '../context/MainContext';

const FAQ = () => {
  const { setShowNav } = useUserContext();
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    setShowNav(true);
  }, [setShowNav]);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const { faq } = faqData;

  return (
    <>
      <ScrollToTop />
      <MenuSlider />
      <SideBar />
      <Navbar />
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>

        <div className="faq-section-container">
          {Object.keys(faq).map((key) => (
            <section className="faq-section" key={key}>
              <h2 onClick={() => toggleSection(key)}>
                {faq[key].title}
                <span className="dropdown-icon">{expandedSection === key ? '+' : '×'}</span>
              </h2>
              {expandedSection === key && <p>{faq[key].content}</p>}
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
