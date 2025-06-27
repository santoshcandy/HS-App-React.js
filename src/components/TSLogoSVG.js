import React from "react";

const TSLogoSVG = ({ size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="100" cy="100" r="90" fill="#1A3A6F" />
    <text
      x="50%"
      y="55%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="70"
      fontWeight="bold"
      fill="#C9A24D"
      fontFamily="Arial, sans-serif"
    >
      TS
    </text>
  </svg>
);

export default TSLogoSVG;
