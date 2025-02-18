import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import "../style/booking.css";
import API_BASE_URL from "../config"; // Your backend API base URL

const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedServices } = location.state || { selectedServices: [] };

    const [formData, setFormData] = useState({
        date: "",
        time: "",
        service_location: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");  // Success message state
    const [availableTimes, setAvailableTimes] = useState([]);

    useEffect(() => {
        const today = new Date();
        const formattedToday = today.toISOString().split("T")[0];
        setFormData((prev) => ({ ...prev, date: formattedToday }));
        updateAvailableTimes(today);
    }, []);

    const updateAvailableTimes = (selectedDate) => {
        const now = new Date();
        const selectedDateObj = new Date(selectedDate);
        const slots = [8, 10, 12, 14, 16, 18]; // 8 AM, 10 AM, 12 PM, 2 PM, 4 PM, 6 PM

        if (selectedDateObj.toDateString() === now.toDateString()) {
            setAvailableTimes(slots.filter((hour) => hour > now.getHours()));
        } else {
            setAvailableTimes(slots);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "date") {
            updateAvailableTimes(new Date(value));
        }
    };

    const token = localStorage.getItem("access_token");
    const user = JSON.parse(localStorage.getItem("user"));
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        setSuccess("");  // Reset success message on form submit

        // Retrieve tokens
        const token = localStorage.getItem("access_token");

        if (!token) {
            setError("Authentication error. Please log in again.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}/bookings/create/`,
                {
                    services: selectedServices.map(service => service.id),  // Array of service IDs
                    service_location: formData.service_location,
                    date: formData.date,
                    time: formData.time,
                    technician: 3  // Assuming technician ID is passed here
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`, // Ensure correct format
                        "Content-Type": "application/json",
                    },
                }
            );

            // Set success message after successful booking
            setSuccess("Booking successfully created!");

            // Redirect to the track booking page
            // navigate("/track-booking", { state: { bookingId: response.data.id } });
        } catch (err) {
            console.error("Booking Error:", err.response?.data || err.message);
            setError(err.response?.data?.detail || "Booking failed. Please try again.");
        }

        setLoading(false);
    };

    const getAvailableDates = () => {
        const today = new Date();
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(today.getDate() + i);
            return date.toISOString().split("T")[0];
        });
    };
    console.log("Stored Access Token:", localStorage.getItem("access_token"));

    return (
        <Container className="booking-container">
            <h2 className="title">Confirm Booking</h2>
            
            {/* Display Error Alert */}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Display Success Alert */}
            {success && <Alert variant="success">{success}</Alert>}

            <h4 className="subtitle">Selected Services:</h4>
            {selectedServices.map((service, index) => (
                <p key={index} className="service-item">
                    {service.name} - ₹{service.price}
                </p>
            ))}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Service Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="service_location"
                        value={formData.service_location}
                        onChange={handleChange}
                        required
                        placeholder="Enter your address"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Select Date</Form.Label>
                    <Form.Select name="date" value={formData.date} onChange={handleChange} required>
                        {getAvailableDates().map((date) => (
                            <option key={date} value={date}>
                                {date}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Select Time</Form.Label>
                    <Form.Select name="time" value={formData.time} onChange={handleChange} required>
                        {availableTimes.length > 0 ? (
                            availableTimes.map((time) => (
                                <option key={time} value={`${time}:00`}>
                                    {time}:00
                                </option>
                            ))
                        ) : (
                            <option>No available slots</option>
                        )}
                    </Form.Select>
                </Form.Group>

                <Button type="submit" className="booking-button" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : "Book Now"}
                </Button>
            </Form>
        </Container>
    );
};

export default Booking;
