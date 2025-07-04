import React from "react";
import "../style/warranty.css";
import { FaShieldAlt, FaThumbsUp } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const WarrantySection = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="warranty-section" id="warranty">
      <div className="container">
        <h2 className="warranty-title">Our Service Warranty</h2>
        <p className="warranty-subtitle">
          Trusted by Chennai households — Reliable Home Services with Guaranteed Workmanship.
        </p>

        <div className="warranty-features">
          <div
            ref={ref1}
            className={`warranty-card animate-left ${inView1 ? "in-view" : ""}`}
          >
            <FaShieldAlt className="warranty-icon" />
            <h3>Up to 30 Days Warranty</h3>
            <p>
              All services are covered under a <strong>no-questions-asked warranty</strong> for 30 days. If something goes wrong, we’ll fix it free of cost.
            </p>
          </div>

          <div
            ref={ref2}
            className={`warranty-card animate-right ${inView2 ? "in-view" : ""}`}
          >
            <FaThumbsUp className="warranty-icon" />
            <h3>100% Satisfaction Guarantee</h3>
            <p>
              Our goal is your happiness. We ensure <strong>quality workmanship</strong> and support until the job is completed to your satisfaction.
            </p>
          </div>
        </div>

        <p className="warranty-note">
          Your safety and peace of mind are our top priorities. That’s why Chennai trusts <strong>Triple Spot</strong> for hassle-free home services.
        </p>
      </div>
    </section>
  );
};

export default WarrantySection;
