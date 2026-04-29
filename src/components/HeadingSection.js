import React, { useState, useMemo } from "react";
import { FaUserCircle, FaSearch, FaTools } from "react-icons/fa";
import "../style/HeadingSection.css";
import { Link, useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { searchableRoutes } from "../routesConfig";

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
    setQuery("");
  };

  const goToProfile = () => navigate("/profile");

  return (
    <header className="ohj-header">
      <div className="ohj-top">
        <Link to="/" className="ohj-brand">
          <div className="ohj-logo">
            <FaTools />
          </div>

          <div>
            <h1>OnHandJob</h1>
            <p>Home Services</p>
          </div>
        </Link>

        <button
          className="ohj-profile-btn"
          onClick={goToProfile}
          aria-label="Go to profile"
        >
          <FaUserCircle />
        </button>
      </div>

      <div className="ohj-search-area">
        <div className="ohj-search-box">
          <FaSearch className="ohj-search-icon" />
          <input
            type="text"
            placeholder="Search plumbing, RO, electrical..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search services"
          />
        </div>

        {query && (
          <ul className="ohj-suggestions">
            {results.length > 0 ? (
              results.map(({ item }, idx) => (
                <li key={idx} onClick={() => handleSelect(item.path)}>
                  {item.name}
                </li>
              ))
            ) : (
              <li className="ohj-no-result">No matches found</li>
            )}
          </ul>
        )}
      </div>
    </header>
  );
};

export default HeadingSection;