import React, { useEffect, useState } from "react";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/ServiceCategories.css";
import API_BASE_URL from "../config";

import {
  FaTools,
  FaBolt,
  FaSnowflake,
  FaHome,
  FaWater,
  FaPaintRoller,
  FaCar,
} from "react-icons/fa";

const iconMap = {
  Plumbing: <FaWater className="category-icon" />,
  Electrical: <FaBolt className="category-icon" />,
  AC: <FaSnowflake className="category-icon" />,
  HomeRepair: <FaTools className="category-icon" />,
  Painting: <FaPaintRoller className="category-icon" />,
  CarWash: <FaCar className="category-icon" />,
  Default: <FaHome className="category-icon" />,
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
      <div className="category-list">
        {categories.map((category) => (
          <div
            className="category-card"
            key={category.id}
            onClick={() => navigate(`/category/${category.id}`)}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate(`/category/${category.id}`)}
          >
            <div className="category-image-container">
              {iconMap[category.name] || iconMap.Default}
            </div>
            <div className="category-card-body">
              <Card.Text className="category-description">
                <span className="category-scrolling-text">{category.description}</span>
              </Card.Text>
              <h5 className="category-title">{category.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default ServiceCategories;
