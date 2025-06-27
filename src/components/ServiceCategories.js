import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/ServiceCategories.css";
import API_BASE_URL from "../config";

// Import icons
import {
  FaTools,
  FaBolt,
  FaSnowflake,
  FaHome,
  FaWater,
  FaPaintRoller,
  FaCar,
} from "react-icons/fa";

// Icon map
const iconMap = {
  Plumbing: <FaWater className="service-icon" />,
  Electrical: <FaBolt className="service-icon" />,
  AC: <FaSnowflake className="service-icon" />,
  HomeRepair: <FaTools className="service-icon" />,
  Painting: <FaPaintRoller className="service-icon" />,
  CarWash: <FaCar className="service-icon" />,
  Default: <FaHome className="service-icon" />,
};

const API_URL = `${API_BASE_URL}/service-categories/`;

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

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error)
    return <Alert variant="danger" className="text-center">{error}</Alert>;

  return (
    <Container>
      <h2 className="my-4 text-center">Service Categories</h2>
      <Row className="g-4">
        {categories.map((category) => (
          <Col xs={4} sm={4} md={4} key={category.id} className="category-col">
            <div
              className="service-card"
              onClick={() => navigate(`/category/${category.id}`)}
            >
              <div className="image-container">
                {/* Replace image with icon while keeping same structure */}
                {iconMap[category.name] || iconMap.Default}
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
