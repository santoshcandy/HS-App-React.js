import React from "react";

const HeadingSection = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        <span style={styles.highlight}>TRIPLE SPOT</span> HOME SERVICE
      </h1>
      <p style={styles.subtitle}>Reliable & Professional Home Services at Your Doorstep</p>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#1A3A6F", // Deep Blue
    color: "#C9A24D", // Gold Text
    textAlign: "center",
    padding: "50px 20px",
    borderRadius: "8px",
  },
  title: {
    fontSize: "48px",
    fontWeight: "bold",
    margin: "0",
  },
  highlight: {
    color: "#C9A24D", // Gold
  },
  subtitle: {
    fontSize: "20px",
    color: "#E0CBA8", // Light Gold/White
    marginTop: "10px",
  },
};

export default HeadingSection;
