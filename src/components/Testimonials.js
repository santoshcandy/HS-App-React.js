// src/components/Testimonials.js
import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaUserCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css"; // import Bootstrap CSS
import "../style/review.css"; // your custom styles


const testimonials = [
  {
    name: "Ramesh K.",
    review: "Excellent service! The plumber arrived on time and fixed the leak quickly.",
  },
  {
    name: "Divya S.",
    review: "Booked AC service through them. Very professional and affordable!",
  },
  {
    name: "Arun P.",
    review: "Electrician fixed wiring within an hour. Same-day service as promised.",
  },
  {
    name: "Fatima M.",
    review: "Customer support was responsive even at night. Highly recommend!",
  },
  {
    name: "Suresh G.",
    review: "The best experience I've had with an electrical service company.",
  },
  {
    name: "Nisha R.",
    review: "Quick and reliable! Would definitely recommend to my family and friends.",
  },
  {
    name: "Rahul T.",
    review: "Professional and efficient. AC repair was done promptly, no hassles.",
  },
  {
    name: "Priya B.",
    review: "Service was quick and affordable. I'm happy with the quality of work.",
  },
];


const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Pick 3 testimonials starting from currentIndex and looping back if needed
  const visibleTestimonials = [
    ...testimonials.slice(currentIndex, currentIndex + 3),
    ...testimonials.slice(0, Math.max(0, currentIndex + 3 - testimonials.length)),
  ];

  return (
    <div className="testimonial-container mt-3">
      <h2 className="testimonial-title">What Our Customers Say</h2>
      <div className="testimonial-slider">
        <div className="row justify-content-center">
          {visibleTestimonials.map((testimonial, index) => (
            <div key={index} className="col-12 col-md-4 mb-4 d-flex justify-content-center">
              <div className="testimonial-card">
                <FaQuoteLeft className="quote-icon" />
                <p className="review">"{testimonial.review}"</p>
                <div className="reviewer">
                  <FaUserCircle size={30} color="#007bff" />
                  <span>{testimonial.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
