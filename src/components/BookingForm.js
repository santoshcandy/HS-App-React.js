import React, { useRef } from "react";
import emailjs from "emailjs-com";
import "../style/BookingForm.css";

const BookingForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Set the current time directly into a hidden field
    const timeInput = form.current.querySelector('input[name="time"]');
    if (timeInput) {
      timeInput.value = new Date().toLocaleString();
    }

    emailjs
      .sendForm(
        "service_cznjs7k",          // service ID
        "template_q2itmqn",         // template ID
        form.current,               // ✅ send the HTML form
        "MYsu1vt7lujJ8g9bU"         // public key
      )
      .then(() => {
        alert("✅ Booking sent successfully!");
        e.target.reset();
      })
      .catch(() => {
        alert("❌ Error sending booking. Please try again.");
      });
  };

  return (
    <div className="container booking-form p-4 mt-4 shadow rounded-4">
      <h2 className="text-center mb-4">Official Triplespot Service Booking</h2>
      <p className="form-subtext">Only trained & trusted technicians</p>
      <form ref={form} onSubmit={sendEmail}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" name="user_name" className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Area / Landmark</label>
          <input type="text" name="user_area" className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input type="tel" name="user_phone" className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Choose Service</label>
          <select name="service_type" className="form-select" required>
            <option value="">Select Service</option>
            <option value="Plumbing">Plumbing</option>
            <option value="RO Service">RO Service</option>
            <option value="Electrician">Electrician</option>
            <option value="CCTV Installation">CCTV Installation</option>
            <option value="AC Service">AC Service</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Describe the Problem (Optional)</label>
          <textarea
            name="message"
            className="form-control"
            rows="3"
            placeholder="Eg. Pipe leakage in bathroom"
          />
        </div>

        {/* Hidden fields */}
        <input type="hidden" name="email" value="msanthosh11062003@gmail.com" />
        <input type="hidden" name="time" />

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
