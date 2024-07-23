import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="lgMax:peer-has-[:checked]:hidden text-center p-6 mt-6 bg-black/60">
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
