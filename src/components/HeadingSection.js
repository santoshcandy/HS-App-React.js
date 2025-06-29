import React, { useState, useMemo } from "react";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import "../style/HeadingSection.css";
import { Link, useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { searchableRoutes } from "../routesConfig";
 
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
  const [query, setQuery] = useState("");

  const fuse = useMemo(() => {
    return new Fuse(searchableRoutes, {
      keys: ["name", "keywords"],
      threshold: 0.4,
    });
  }, []);

  const results = query ? fuse.search(query) : [];

  const handleSelect = (path) => {
    navigate(path);
    setQuery(""); // Optional: clear after navigation
  };

  const goToProfile = () => navigate("/profile");

  return (
    <header className="header-container container-fluid">
      <div className="row align-items-center justify-content-between">
        <Link to="/" className="col-8 brand-text" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="brand-highlight">TRIPLE SPOT</span>
          <br />
          <span className="brand-sub">Home Services – Chennai</span>
        </Link>
        <Link to="/" className="col-4 d-flex justify-content-end logo">
          <TSLogoSVG />
        </Link>
      </div>

      <div className="row align-items-center justify-content-between mt-2">
        {/* Search Section */}
        <div className="col-10 position-relative">
          <div className="search-wrapper active">
            <FaSearch className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search services in Chennai..."
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search services"
            />
          </div>

          {query && (
            <ul className="search-suggestions">
              {results.length > 0 ? (
                results.map(({ item }, idx) => (
                  <li key={idx} onClick={() => handleSelect(item.path)}>{item.name}</li>
                ))
              ) : (
                <li>No matches found</li>
              )}
            </ul>
          )}
        </div>

        {/* Profile Icon */}
        <div
          className="col-2 d-flex justify-content-end profile-icon"
          onClick={goToProfile}
          style={{ cursor: "pointer" }}
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
