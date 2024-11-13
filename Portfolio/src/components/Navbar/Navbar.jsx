import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src="/src/assets/logo2.png" alt="Image of me" />
      <ul className="nav-menu">
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>Contact</li>
      </ul>
      <div className="nav-connect">
        <a
          href="http://ryanralph.rf.gd/"
          target="_blank"
          rel="noopener noreferrer">
          {" "}
          Contact Me
        </a>
      </div>
    </div>
  );
};

export default Navbar;
