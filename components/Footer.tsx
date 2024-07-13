import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "20px",
        marginTop: "20px",
        backgroundColor: "#f0f0f0",
      }}
    >
      © {new Date().getFullYear()} My Website. All rights reserved.
    </footer>
  );
};

export default Footer;
