import React, { useEffect, useState } from "react";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/ServiceCategories.css";
import API_BASE_URL from "../config";
import Plumbing from "../i/catagory/plumber.jpg"
import electrical from "../i/catagory/ele.jfif"
import painting from "../i/catagory/painter.jfif"
import pestcontroll from "../i/catagory/pestcontrol.jfif"
import ac from "../i/catagory/ac.jfif"
import cleaning from "../i/catagory/cleaning.jfif"
import carpenting from "../i/catagory/carpenter.jfif"
import gardening from "../i/catagory/gardening.jfif"

 

const categoryImageMap = {
  plumbing: Plumbing,
  electrical: electrical,
  painting: painting,
  pestcontrol: pestcontroll,
  acrepair: ac,
  cleaning: cleaning,
  carpentry: carpenting,
  gardening: gardening,
};

const defaultImage = painting;
const normalizeName = (name) => name.replace(/\s+/g, "").toLowerCase();

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
    <Container className="my-5">
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
      <img
   src={categoryImageMap[normalizeName(category.name)] || defaultImage}
  alt={category.name}
  className="categorylist-image"
/>

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
