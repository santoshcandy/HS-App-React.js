import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/ServiceCategories.css";

const API_URL = "http://127.0.0.1:8000/api/service-categories/";
const DEFAULT_IMAGE = "https://tse1.mm.bing.net/th?id=OIP.XENqLPmzNiqIw31OiisFNwHaHa&pid=Api&P=0&h=220";

function ServiceCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load categories");
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="text-center">{error}</Alert>;

  return (
    <Container>
      <h2 className="my-4 text-center">Service Categories</h2>
      <Row className="g-4">
        {categories.map((category) => (
          <Col xs={4} sm={4} md={4} key={category.id} className="category-col">
            <div className="service-card" onClick={() => navigate(`/category/${category.id}`)}>
              <div className="image-container">
                <img src={DEFAULT_IMAGE} alt={category.name} className="service-image" />
              </div>
              <div className="card-body">
              <Card.Text className="service-description">
  <span className="scrolling-text">{category.description}</span>
</Card.Text>

                 <h5 className="service-title">{category.name}</h5>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ServiceCategories;
