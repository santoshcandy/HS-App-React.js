// src/components/FeatureCard.js
import React from 'react';
import { useInView } from 'react-intersection-observer';
import '../style/whychooseus.css';

const FeatureCard = ({ icon, title, description }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`feature-card animate-up ${inView ? 'in-view' : ''}`}
    >
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
