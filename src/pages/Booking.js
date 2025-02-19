import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import Login from "../components/Login"; // Import Login component
import "../style/booking.css";
import API_BASE_URL from "../config";

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
    const [success, setSuccess] = useState("");
    const [availableTimes, setAvailableTimes] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        const today = new Date();
        const formattedToday = today.toISOString().split("T")[0];
        setFormData((prev) => ({ ...prev, date: formattedToday }));
        updateAvailableTimes(today);
    }, []);

    const updateAvailableTimes = (selectedDate) => {
        const now = new Date();
        const selectedDateObj = new Date(selectedDate);
        const slots = [8, 10, 12, 14, 16, 18];

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        setSuccess("");
        
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
                    services: selectedServices.map(service => service.id),
                    service_location: formData.service_location,
                    date: formData.date,
                    time: formData.time,
                    technician: 3
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setSuccess("Booking successfully created!");
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

    if (!isLoggedIn) {
        return <Login />;
    }

    return (
        <Container className="booking-container">
            <h2 className="title">Confirm Booking</h2>
            {error && <Alert variant="danger">{error}</Alert>}
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
                            <option key={date} value={date}>{date}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Select Time</Form.Label>
                    <Form.Select name="time" value={formData.time} onChange={handleChange} required>
                        {availableTimes.length > 0 ? (
                            availableTimes.map((time) => (
                                <option key={time} value={`${time}:00`}>{time}:00</option>
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