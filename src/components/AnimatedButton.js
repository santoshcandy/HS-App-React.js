// src/components/AnimatedButton.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/animatedbutton.css';

const AnimatedButton = ({ text = "Book Now", to = "/", scrollToId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const scrollToForm = () => {
    if (location.pathname === to && scrollToId) {
      const el = document.getElementById(scrollToId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(to);
      setTimeout(() => {
        const el = document.getElementById(scrollToId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  const handleClick = () => {
    scrollToForm();
    setExpanded(true);
    setTimeout(() => setExpanded(false), 7000); // auto close after 7s
  };

  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/919176765545?text=Hi%20triplespot.in%2C%20I%20need%20help%20with%20a%20service.",
      "_blank"
    );
  };

  const handleServicesClick = () => {
    navigate("/services");
  };

  const handleCallNowClick = () => {
    window.open("tel:+919176765545");
  };

  return (
    <div className={`animated-button-wrapper ${expanded ? 'expanded' : ''}`}>
      {/* Show only Book Now when not expanded */}
      {!expanded && (
        <button className="animated-button" onClick={handleClick}>
          {text}
        </button>
      )}

      {/* Expanded Options */}
      {expanded && (
        <div className="expanded-options">
          <button className="option-button call-now" onClick={handleCallNowClick}>
            📞 Call Now
          </button>
          <button className="option-button whatsapp text-white" onClick={handleWhatsAppClick}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
            WhatsApp
          </button>
          <button className="option-button services" onClick={handleServicesClick}>
            🛠️ Services
          </button>
        </div>
      )}
    </div>
  );
};

export default AnimatedButton;
