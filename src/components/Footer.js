// src/components/Footer.js
import React from "react";
import "../style/footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer mt-3">
      <div className="footer-content">

        {/* Company Info */}
        <div className="footer-section company-info">
          <h3>Home Services</h3>
          <p>
            Your trusted partner for reliable home services at affordable rates.
            We provide plumbing, electrical, AC repair, and maintenance support.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact-info">
          <h3>Contact Info</h3>
          <ul>
            <li><FaPhoneAlt /> +91 9000000000</li>
            <li><FaPhoneAlt /> +91 8000000000</li>
            <li><FaEnvelope /> support@example.com</li>
            <li>
              Chennai, Tamil Nadu, India
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section social-media">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="#"><FaFacebookF /></a></li>
            <li><a href="#"><FaTwitter /></a></li>
            <li><a href="#"><FaInstagram /></a></li>
            <li><a href="#"><FaLinkedin /></a></li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Home Services. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;