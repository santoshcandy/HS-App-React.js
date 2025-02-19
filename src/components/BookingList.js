import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import axios from "axios";
import "../style/bookinglist.css"; // Assuming the CSS file is named BookingList.css
import API_BASE_URL from "../config";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // Check if token is available in localStorage
    if (!token) {
      setError("You must be logged in to view your bookings.");
      setLoading(false);
      return;
    }

    // Make API call to fetch bookings
    axios
      .get(` ${API_BASE_URL}/bookings/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept": "application/json",  // Ensure the API returns JSON
        },
      })
      .then((response) => {
        console.log("Bookings fetched:", response.data); // Log the response data to check what is returned
        // Sort bookings by booking_date in descending order (latest first)
        const sortedBookings = response.data.sort((a, b) => new Date(b.booking_date) - new Date(a.booking_date));
        setBookings(sortedBookings);  // Set the sorted bookings data
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err.response ? err.response.data : err.message); // Log detailed error
        if (err.response && err.response.status === 401) {
          setError("Unauthorized. Please log in.");
        } else {
          setError("Failed to fetch bookings. Please try again later.");
        }
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this effect runs only once after component mount

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }

  if (error) {
    return <Alert variant="danger" className="text-center">{error}</Alert>;
  }

  return (
    <Container className="mt-4 mb-5 pb-5">
      <h2 className="text-center mb-4">Booking List</h2>

      <Row>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Col md={6} lg={4} key={booking.id}>
              <div className="booking-card">
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Booking ID: {booking.id}</Card.Title>
                    <Card.Text>
                      <strong>Customer:</strong> {booking.customer} <br />
                      <strong>Status:</strong> 
                      <span className={`status-${booking.status.toLowerCase()}`}>
                        <span className="status-icon"></span>{booking.status}
                      </span>
                      <br />
                      <strong>Location:</strong> {booking.service_location} <br />
                      <strong>Booking Date:</strong> {new Date(booking.booking_date).toLocaleString()} <br />
                    </Card.Text>

                    {booking.services.length > 0 && (
                      <div className="services">
                        <strong>Services:</strong>
                        <ul>
                          {booking.services.map((service, index) => (
                            <li key={index}>Service ID: {service}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button variant="primary" onClick={() => alert("View details for booking " + booking.id)}>
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </div>
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

export default BookingList;
