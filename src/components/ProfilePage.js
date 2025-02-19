import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Spinner, Alert, Container, Button } from "react-bootstrap";
import HeadingSection from './HeadingSection'
import API_BASE_URL from "../config";
const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          setError("You must be logged in to view your profile.");
          setLoading(false);
          return;
        }

        const response = await axios.get(` ${API_BASE_URL}/auth/profile/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(response.data.user);
      } catch (err) {
        setError("Failed to load profile.");
        console.error("Profile Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clears all stored data
    sessionStorage.clear(); // Clears session storage (if used)
    navigate("/ "); // Redirect to login page
  };

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }

  if (error) {
    return <Alert variant="danger" className="text-center">{error}</Alert>;
  }

  return (
    <>
    <HeadingSection/>
    <Container className="mt-4">
      <Card className="p-4">
        <h2 className="text-center">User Profile</h2>
        <Card.Body>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>User Type:</strong> {profile.user_type}</p>
          <p><strong>Address:</strong> {profile.address || "Not provided"}</p>

          {/* Logout Button */}
          <Button variant="danger" className="mt-3" onClick={handleLogout}>
            Logout
          </Button>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
};

export default ProfilePage;
