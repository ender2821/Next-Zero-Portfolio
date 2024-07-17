import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "20px",
        marginTop: "20px",
        background: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <p className="m-0">
        <Link href="mailto:bruening.r86@gmail.com" className="underline">
          bruening.r86@gmail.com
        </Link>{" "}
        | © {new Date().getFullYear()} Andy Bruening. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
