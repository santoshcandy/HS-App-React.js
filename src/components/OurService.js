import '../style/oruservice.css';
import React, { useState, useEffect } from 'react';
import { FaTools, FaTint, FaBolt } from 'react-icons/fa';
import { MdAcUnit } from 'react-icons/md';

const services = [
  {
    icon: <FaTools size={50} color="#007BFF" />,
    name: "Plumbing",
    description: "Tap leaks, pipe repair, and installations.",
  },
  {
    icon: <FaTint size={50} color="#009688" />,
    name: "RO & Water Purifier",
    description: "RO system installation and servicing.",
  },
  {
    icon: <FaBolt size={50} color="#FFC107" />,
    name: "Electrical",
    description: "Wiring, tester support, and fuse fix.",
  },
  {
    icon: <MdAcUnit size={50} color="#00BCD4" />,
    name: "AC Services",
    description: "AC installation, repair, and maintenance.",
  },
];

const OurService = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlip(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
        setFlip(false);
      }, 400); // half the duration of flip transition
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentService = services[currentIndex];

  return (
    <div className="container my-5 service-container">
      <h2 className="section-title text-center mb-4">Best Services in Chennai</h2>
      <div className="flip-wrapper">
        <div className={`flip-card ${flip ? 'flipped' : ''}`}>
          <div className="flip-card-content card-front">
            {currentService.icon}
            <h3 className="text-center mt-3">{currentService.name}</h3>
            <p className="text-center">{currentService.description}</p>
          </div>
          <div className="flip-card-content card-back">
            {currentService.icon}
            <h3 className="text-center mt-3">{currentService.name}</h3>
            <p className="text-center">{currentService.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurService;
