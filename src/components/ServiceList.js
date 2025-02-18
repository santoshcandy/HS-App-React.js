import React, { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col, Spinner, Alert, Form } from "react-bootstrap";
import axios from "axios";
import HeadingSection from "./HeadingSection";
import { Link } from "react-router-dom";  // <-- Add this import

function ServiceList() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/service-categories/")
      .then((response) => {
        const data = response.data;
        const selectedCategory = data.find((cat) => cat.id.toString() === categoryId);

        if (selectedCategory) {
          setCategory(selectedCategory);
        } else {
          setError("Category not found.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data.");
        setLoading(false);
      });
  }, [categoryId]);

  // Load selected services from localStorage on mount
  useEffect(() => {
    const savedServices = localStorage.getItem(`selectedServices_${categoryId}`);
    if (savedServices) {
      setSelectedServices(JSON.parse(savedServices));
    }
  }, [categoryId]);

  const handleServiceSelect = (service) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      const updatedServices = exists ? prev.filter((s) => s.id !== service.id) : [...prev, service];

      // Store in localStorage
      localStorage.setItem(`selectedServices_${categoryId}`, JSON.stringify(updatedServices));

      return updatedServices;
    });
  };

  const proceedToBooking = () => {
    navigate("/selected-services", { state: { selectedServices } });
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="text-center">{error}</Alert>;

  return (
    <>
      <HeadingSection />
      <Container>
        <h2 className="my-4 text-center">{category.name} Services</h2>
        <p className="text-center">{category.description}</p>

        <Row>
          {category.services.length > 0 ? (
            category.services.map((service) => (
              <Col md={6} lg={4} key={service.id}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>{service.name}</Card.Title>
                    <Card.Text>{service.description}</Card.Text>
                    <h5>Price: ₹{service.price}</h5>
                    <Form.Check
                      type="checkbox"
                      label="Select Service"
                      checked={selectedServices.some((s) => s.id === service.id)}
                      onChange={() => handleServiceSelect(service)}
                    />
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Alert variant="warning" className="text-center w-100">
              No services available for this category.
            </Alert>
          )}
        </Row>

        <div className="text-center mt-4">
          <Button onClick={proceedToBooking} disabled={selectedServices.length === 0}>
            Proceed to Booking
          </Button>
        </div>

        <div className="text-center mt-3">
          <Link to="/" className="btn btn-primary">Back to Categories</Link>
        </div>
      </Container>
    </>
  );
}

export default ServiceList;
