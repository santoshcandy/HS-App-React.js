import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Alert } from "react-bootstrap";
import "../style/selectedservice.css"
import HeadingSection from './HeadingSection'
const SelectedServices = ({ selectedServices }) => {
  const navigate = useNavigate();

  const proceedToBooking = () => {
    // Directly pass the selectedServices to the booking page
    navigate("/booking", { state: { selectedServices } });
  };

  return (
    <>
    <HeadingSection/>
    <Container className="mt-4 mb-5 pb-5">
      <h2 className="text-center">Selected Services</h2>

      {selectedServices.length === 0 ? (
        <Alert variant="warning" className="text-center">
          No services selected. Please go back and select services.
        </Alert>
      ) : (
        <>
          {selectedServices.map((service, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>{service.name}</Card.Title>
                <Card.Text>Price: ₹{service.price}</Card.Text>
                <Card.Text>{service.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}

          <div className="text-center">
            <Button onClick={proceedToBooking}>Proceed to Booking</Button>
          </div>
        </>
      )}
    </Container>
    </>
  );
};

export default SelectedServices;
