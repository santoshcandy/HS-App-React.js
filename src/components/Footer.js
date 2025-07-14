// src/components/Footer.js
import React from 'react';
import '../style/footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer mt-3">
      <div className="footer-content">
        <div className="footer-section company-info">
          <h3>Our Service</h3>
          <p>Your trusted partner for reliable home services at affordable rates. We specialize in plumbing, electrical, AC repair, and more.</p>
        </div>

        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section contact-info">
          <h3>Contact Info</h3>
          <ul>
            <li><FaPhoneAlt /> +91 8015153921</li>
            <li><FaEnvelope /> triplespot.in@gmail.com</li>
          </ul>
        </div>

        <div className="footer-section social-media">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://facebook.com"><FaFacebookF /></a></li>
            <li><a href="https://twitter.com"><FaTwitter /></a></li>
            <li><a href="https://instagram.com"><FaInstagram /></a></li>
            <li><a href="https://linkedin.com"><FaLinkedin /></a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Our Service. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
