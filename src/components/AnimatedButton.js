// src/components/AnimatedButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/animatedbutton.css';

const AnimatedButton = ({ text = "Click Me", to = "/" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button className="animated-button" onClick={handleClick}>
      {text}
    </button>
  );
};

export default AnimatedButton;
