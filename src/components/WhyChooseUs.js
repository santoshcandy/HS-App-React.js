// src/components/WhyChooseUs.js
import React from 'react';
import '../style/whychooseus.css';
import { FaCheckCircle, FaMoneyBillWave, FaClock, FaHeadset } from 'react-icons/fa';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: <FaCheckCircle size={40} color="#4CAF50" />,
    title: "Verified Professionals",
    description: "All our technicians are background-verified and skilled.",
  },
  {
    icon: <FaMoneyBillWave size={40} color="#2196F3" />,
    title: "Affordable Pricing",
    description: "Transparent and budget-friendly service costs.",
  },
  {
    icon: <FaClock size={40} color="#FF9800" />,
    title: "Same-Day Service",
    description: "Quick, same-day service at your doorstep.",
  },
  {
    icon: <FaHeadset size={40} color="#9C27B0" />,
    title: "24/7 Support",
    description: "We're always available for your needs.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="whychooseus-container">
      <h2 className="section-title">Why Choose Us?</h2>
      <div className="feature-list">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
