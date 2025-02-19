import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import axios from "axios";
import API_BASE_URL from "../config";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bookings from API
  const fetchBookings = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("You must be logged in to view bookings.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/bookings/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const sortedBookings = response.data.sort((a, b) => new Date(b.booking_date) - new Date(a.booking_date));
      setBookings(sortedBookings);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching bookings:", err.response ? err.response.data : err.message);
      setError("Failed to fetch bookings. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(); // Fetch data initially

    // Poll every 60 seconds (reduce polling frequency)
    const interval = setInterval(fetchBookings, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }

  if (error) {
    return <Alert variant="danger" className="text-center">{error}</Alert>;
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">All Bookings</h2>

      <Row>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Col md={6} lg={4} key={booking.id}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Booking ID: {booking.id}</Card.Title>
                  <Card.Text>
                    <strong>Customer:</strong> {booking.customer} <br />
                    <strong>Status:</strong> {booking.status} <br />
                    <strong>Location:</strong> {booking.service_location} <br />
                    <strong>Booking Date:</strong> {new Date(booking.booking_date).toLocaleString()} <br />
                  </Card.Text>

                  <Button variant="primary" onClick={() => alert("View details for booking " + booking.id)}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Alert variant="warning" className="text-center w-100">
            No bookings found.
          </Alert>
        )}
      </Row>
    </Container>
  );
};

export default AllBookings;
