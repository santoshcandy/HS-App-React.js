// src/components/AnimatedButton.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/animatedbutton.css';

const AnimatedButton = ({ text = "Book Now", to = "/" }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, 7000); // collapse after 7 seconds
  };

  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/919176765545?text=Hi%20triplespot.in%2C%20I%20need%20help%20with%20a%20service.",
      "_blank"
    );
  };

  const handleServicesClick = () => {
    navigate(to); // or navigate("/services") if that's your route
  };

  return (
    <div className={`animated-button-wrapper ${expanded ? 'expanded' : ''}`}>
      <button
        className={`animated-button ${expanded ? 'fire-theme' : ''}`}
        onClick={handleClick}
      >
        {expanded ? 'Choose Option' : text}
      </button>

      {expanded && (
        <div className="expanded-options">
          <button className="option-button whatsapp" onClick={handleWhatsAppClick}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
            <span>WhatsApp</span>
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
