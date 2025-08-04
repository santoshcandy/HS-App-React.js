import React from 'react';
import { Link } from 'react-router-dom';
import '../style/bottomnavbar.css'; // Custom CSS

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      {/* Updated Services link */}
      <Link to="/services" className="nav-item">
        <i className="bi bi-gear-fill"></i> Services
      </Link>
      
      <Link to="/selected-services" className="nav-item">
        <i className="bi bi-calendar-check"></i> Selected
      </Link>

      <Link to="/booking-list" className="nav-item">
        <i className="bi bi-list-ul"></i> Booking List
      </Link>

      <Link to="/warranty" className="nav-item">
        <i className="bi bi-shield-check"></i> Warranty
      </Link>
    </div>
  );
};

export default BottomNav;
