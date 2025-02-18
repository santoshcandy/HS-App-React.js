import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config"; // Your backend API base URL

const Login = () => {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setError("");
        setLoading(true);

        try {
            // const response = await axios.post(`${API_BASE_URL}/auth/login/`, { phone_number: phone });
            const response = await axios.post(`${API_BASE_URL}/auth/login/`, { phone });

            if (response.data.access) {
                // Store tokens
                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("refresh_token", response.data.refresh);
                localStorage.setItem("user", JSON.stringify(response.data.user));

                // Set default authorization header for future requests
                axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;

                alert("Login successful!");
                window.location.href = "/"; // Redirect after login
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (err) {
            setError("Login failed. Please check your phone number.");
            console.error("Login Error:", err.response ? err.response.data : err.message);
        }

        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Login</h2>
            <input
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleLogin} style={styles.button} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
};

// Styles
const styles = {
    container: {
        width: "300px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center",
        background: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    title: { fontSize: "24px", marginBottom: "15px" },
    input: {
        width: "90%",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    button: {
        width: "100%",
        padding: "10px",
        background: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    error: { color: "red", marginTop: "10px" },
};

export default Login;
