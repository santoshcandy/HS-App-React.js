import React from "react";
import "../style/HeadingSection.css"; // Import external CSS

const HeadingSection = () => {
  return (
    <div className="heading-container">
      <h1 className="heading-title">
        <span className="heading-highlight">TRIPLE SPOT</span>
        <span className="heading-home"> HOME SERVICE</span>
      </h1>
      <p className="heading-subtitle">Reliable & Professional Home Services at Your Doorstep</p>
    </div>
  );
};

export default HeadingSection;
