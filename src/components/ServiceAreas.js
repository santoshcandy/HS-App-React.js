// src/components/ServiceAreas.js
import '../style/serviceareas.css';
 // src/components/ServiceAreas.js
import React, { useState, useEffect } from 'react';
 import { FaMapMarkerAlt } from 'react-icons/fa';

const allAreas = [
  "Perambur", "TVK Nagar", "Agaram", "Vinus", "Anna Nagar",
  "Ammayee Thottam", "Ayanavaram", "Noor Hotel", "Jamaliya",
  "Otteri", "Papermills Road", "Santhi Colony", "Padi",
  "Koyambedu", "Korattur", "Velachery", "OMR",
  "Thirumangalam", "Water Tank Road", "Loco", "Loco Carriage"
];

const ServiceAreas = () => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex(prev => (prev + 4) % allAreas.length);
    }, 3000); // Rotate every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const visibleAreas = allAreas.slice(startIndex, startIndex + 4).concat(
    allAreas.slice(0, Math.max(0, startIndex + 4 - allAreas.length))
  );

  return (
    <div className="service-areas-container">
      <h2 className="area-title">We Serve All Over Chennai</h2>
      <div className="area-grid">
        {visibleAreas.map((area, index) => (
          <div className="area-box" key={index}>
            <FaMapMarkerAlt color="#e53935" />
            <span>{area}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceAreas;
