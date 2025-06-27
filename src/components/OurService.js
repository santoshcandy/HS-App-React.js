// OurService.js
import '../style/oruservice.css'; // Or create a separate CSS if needed
 // src/components/OurService.js
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 3000); // 3 seconds per service
    return () => clearInterval(interval);
  }, []);

  const currentService = services[currentIndex];

  return (
    <div className="container my-5 service-container">
      <h2 className="section-title text-center mb-4">Our Popular Services in Chennai</h2>

      <div className="service-card d-flex justify-content-center align-items-center">
        <div className="card p-4 shadow-lg border-0 rounded">
          <div className="icon mb-3 d-flex justify-content-center">
            {currentService.icon}
          </div>
          <h3 className="text-center mb-3">{currentService.name}</h3>
          <p className="text-center">{currentService.description}</p>
        </div>
      </div>
    </div>
  );
};

export default OurService;
