import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
 import "../style/ServiceList.css"; // Import the updated CSS
import API_BASE_URL from "../config";

function ServiceList({ selectedServices, setSelectedServices }) {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/service-categories/`) // Adjust URL as needed
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

  const handleServiceSelect = (service) => {
    // If service is already selected, remove it; otherwise, add it
    if (selectedServices.some((selected) => selected.id === service.id)) {
      setSelectedServices(selectedServices.filter((selected) => selected.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="text-center">{error}</Alert>;

  return (
    <>
       
      <Container className="mb-5 pb-5">
        <h2 className="my-4 text-center">{category.name} Services</h2>
        <p className="text-center">{category.description}</p>

        <Row className="service-list">
          {category.services.length > 0 ? (
            category.services.map((service) => (
              <Col xs={12} sm={6} md={4} key={service.id} className="category-col">
                <Card
                  className={`service-card ${selectedServices.some((selected) => selected.id === service.id) ? "selected" : ""}`}
                  onClick={() => handleServiceSelect(service)} // Pass the entire service object
                >
                  <div className="image-container">
                    <img
                      src="https://tse1.mm.bing.net/th?id=OIP.XENqLPmzNiqIw31OiisFNwHaHa&pid=Api&P=0&h=220"
                      alt={service.name}
                      className="service-image"
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="service-title service-titlee">{service.name}</Card.Title>
                    <Card.Text className="service-description scrolling-text">{service.description}</Card.Text>
                    <h5 className="service-price">₹{service.price}</h5>
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
      </Container>
    </>
  );
}

export default ServiceList;
