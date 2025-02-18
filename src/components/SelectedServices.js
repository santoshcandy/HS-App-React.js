import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button, Alert } from "react-bootstrap";

const SelectedServices = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedServices } = location.state || { selectedServices: [] };

  const [selectedServicesState, setSelectedServices] = useState(selectedServices || []);

  const proceedToBooking = () => {
    navigate("/booking", { state: { selectedServices: selectedServicesState } });
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Selected Services</h2>

      {selectedServicesState.length === 0 ? (
        <Alert variant="warning" className="text-center">
          No services selected. Please go back and select services.
        </Alert>
      ) : (
        <>
          {selectedServicesState.map((service, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>{service.name}</Card.Title>
                <Card.Text>Price: ₹{service.price}</Card.Text>
              </Card.Body>
            </Card>
          ))}

          <div className="text-center">
            <Button onClick={proceedToBooking}>Proceed to Booking</Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default SelectedServices;
