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

const fullTitle = "Best Services in Chennai";

const OurService = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const [shownWords, setShownWords] = useState([]);
  const [showFlip, setShowFlip] = useState(false);

  useEffect(() => {
    const words = fullTitle.split(' ');
    let i = 0;

    const interval = setInterval(() => {
      setShownWords((prev) => [...prev, words[i]]);
      i++;
      if (i >= words.length) {
        clearInterval(interval);
        setTimeout(() => setShowFlip(true), 600);
      }
    }, 700);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showFlip) return;

    const interval = setInterval(() => {
      setFlip(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
        setFlip(false);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, [showFlip]);

  const currentService = services[currentIndex];

  return (
    <div className="container my-5 service-container">
      <h2 className="section-title text-center mb-4 animated-title">
        {shownWords.map((word, idx) => (
          <span
            key={idx}
            className={`word-bounce ${idx % 2 === 0 ? 'big-word' : 'small-word'}`}
          >
            {word}
            {idx !== shownWords.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </h2>

      {showFlip && (
        <div className="flip-wrapper fade-in">
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
      )}
    </div>
  );
};

export default OurService;
