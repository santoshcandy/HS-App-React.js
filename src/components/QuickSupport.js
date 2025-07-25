import React from "react";
import { FaWhatsapp, FaPhoneAlt, FaComments } from "react-icons/fa";
import "../style/QuickSupport.css";

const QuickSupport = () => {
  return (
    <section className="quick-support-section">
      <div className="container text-center">
        <h2 className="quick-support-title">Need Help? Quick Booking & Support</h2>
        <p className="quick-support-subtext">
          Connect with our Chennai-based support team 24/7. Book a service instantly via WhatsApp or call us directly.
        </p>

        <div className="support-buttons">
          <a
            href="https://wa.me/919176765545?text=Hi%20triplespot.in%2C%20I%20need%20help%20with%20a%20service."
            target="_blank"
            rel="noopener noreferrer"
            className="support-btn whatsapp"
          >
            <FaWhatsapp /> WhatsApp Booking
          </a>

          <a href="tel:+919176765545" className="support-btn call">
            <FaPhoneAlt /> Call Now
          </a>

          {/* <a className="support-btn chat">
            <FaComments /> Live Chat
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default QuickSupport;
