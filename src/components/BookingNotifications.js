import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const BookingNotifications = () => {
  const [lastBookingId, setLastBookingId] = useState(localStorage.getItem("lastNotifiedId") || null);

  useEffect(() => {
    const userRole = localStorage.getItem("user_type");

    // Only proceed if the user is a technician
    if (userRole !== "technician") return;

    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`${API_BASE_URL}/bookings/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const latestBookings = response.data;

        if (latestBookings.length > 0) {
          const newBookingId = latestBookings[0].id;

          // ✅ Notify only if the new booking ID is different from last notified ID
          if (newBookingId.toString() !== localStorage.getItem("lastNotifiedId")) {
            showNotification("New Booking", `A new booking (ID: ${newBookingId}) has been assigned to you.`);
            localStorage.setItem("lastNotifiedId", newBookingId); // ✅ Persist last notified ID
            setLastBookingId(newBookingId); // ✅ Update state to prevent re-triggering
          }
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    // Poll for new bookings every 30 seconds
    const interval = setInterval(fetchBookings, 30000);
    return () => clearInterval(interval);
  }, []);

  const showNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, { body });
        }
      });
    }
  };

  return <></>; // No UI needed, just notifications
};

export default BookingNotifications;
