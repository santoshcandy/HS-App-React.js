import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import "../style/ServiceList.css";
import API_BASE_URL from "../config";

function ServiceList({ selectedServices, setSelectedServices }) {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/service-categories/`)
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
    if (selectedServices.some((selected) => selected.id === service.id)) {
      setSelectedServices(selectedServices.filter((selected) => selected.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="text-center">{error}</Alert>;

  return (
    <Container className="mb-5 pb-5">
      <h2 className="my-4 text-center">{category.name} Services</h2>
      <p className="text-center">{category.description}</p>

      <div className="servicelist-grid">
        {category.services.length > 0 ? (
          category.services.map((service) => (
            <Card
              key={service.id}
              className={`servicelist-card ${
                selectedServices.some((selected) => selected.id === service.id) ? "selected" : ""
              }`}
              onClick={() => handleServiceSelect(service)}
            >
              <div className="servicelist-image-container">
                <img
                  src="https://tse1.mm.bing.net/th?id=OIP.XENqLPmzNiqIw31OiisFNwHaHa&pid=Api&P=0&h=220"
                  alt={service.name}
                  className="servicelist-image"
                />
              </div>
              <Card.Body>
                <Card.Title className="servicelist-title">{service.name}</Card.Title>
                <Card.Text className="servicelist-description servicelist-scrolling-text">
                  {service.description}
                </Card.Text>
                <h5 className="servicelist-price">₹{service.price}</h5>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Alert variant="warning" className="text-center w-100">
            No services available for this category.
          </Alert>
        )}
      </div>
    </Container>
  );
}

export default ServiceList;
