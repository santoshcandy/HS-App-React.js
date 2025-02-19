import React from 'react';
import { Link } from 'react-router-dom';
import '../style/bottomnavbar.css'; // Assuming you already have the custom CSS

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <Link to="/" className="nav-item">
        <i className="bi bi-house-door"></i> Home
      </Link>
      <Link to="/selected-services" className="nav-item">
        <i className="bi bi-calendar-check"></i> Selected
      </Link>
      <Link to="/booking-list" className="nav-item">
        <i className="bi bi-list-ul"></i> Booking List
      </Link>
      <Link to="/profile" className="nav-item">
        <i className="bi bi-person"></i> Profile
      </Link>
    </div>
  );
};

export default BottomNav;
