import React from "react";
import { FaUserCircle ,FaSearch } from "react-icons/fa";
import "../style/HeadingSection.css";
import { Link, useNavigate } from "react-router-dom";

// SVG logo inline
const TSLogoSVG = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
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

const HeadingSection = () => {
  const navigate = useNavigate();

  // Navigate to profile page
  const goToProfile = () => {
    navigate("/profile");
  };
  return (
    <header className="header-container container-fluid">
   <div className="row align-items-center justify-content-between">
  <Link to="/" className="col-8 brand-text" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
    <span className="brand-highlight">TRIPLE SPOT</span>
    <br />
    <span className="brand-sub">Home Services – Chennai</span>
  </Link>
  <Link to="/" className="col-4 d-flex justify-content-end logo" style={{ cursor: 'pointer' }}>
    <TSLogoSVG />
  </Link>
</div>
      {/* Line 2: Search bar left, profile icon right */}
       <div className="row align-items-center justify-content-between mt-2">
  {/* Search bar with icon */}
  <div className="col-10">
    <div className="search-wrapper active">
      <FaSearch className="search-icon" size={16} />
      <input
        type="text"
        placeholder="Search services in Chennai..."
        className="search-input"
        aria-label="Search services"
      />
    </div>
  </div>

  {/* Profile icon */}
  <div
        className="col-2 d-flex justify-content-end profile-icon"
        onClick={goToProfile}
        style={{ cursor: "pointer" }}
        aria-label="User Profile"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") goToProfile();
        }}
      >
        <FaUserCircle size={24} />
      </div>
</div>

    </header>
  );
};

export default HeadingSection;
