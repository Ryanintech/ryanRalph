import React, { useState } from "react";
import "./Navbar.css";
import arrow from "../../assets/arrow-up.png";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Navbar = () => {
  const [menu, setMenu] = useState("about");

  return (
    <div id="navbar" className="navbar">
      <img src="/src/assets/logo2.png" alt="Image of me" className="logo" />
      <ul className="nav-menu">
        <li>
          <div className="nav-item">
            <AnchorLink className="anchor-link" href="#home">
              <p
                onClick={() => setMenu("home")}
                className={menu === "home" ? "active" : ""}>
                Home
              </p>
            </AnchorLink>
            {menu === "home" ? (
              <img src={arrow} alt="" className="active-image" />
            ) : (
              <></>
            )}
          </div>
        </li>
        <li>
          <div className="nav-item">
            <AnchorLink className="anchor-link" href="#about">
              <p
                onClick={() => setMenu("about")}
                className={menu === "about" ? "active" : ""}>
                About
              </p>
            </AnchorLink>
            {menu === "about" ? (
              <img src={arrow} alt="" className="active-image" />
            ) : (
              <></>
            )}
          </div>
        </li>
        <li>
          <div className="nav-item">
            <AnchorLink className="anchor-link" href="#projects">
              <p
                onClick={() => setMenu("projects")}
                className={menu === "projects" ? "active" : ""}>
                Projects
              </p>
            </AnchorLink>
            {menu === "projects" ? (
              <img src={arrow} alt="" className="active-image" />
            ) : (
              <></>
            )}
          </div>
        </li>
        <li>
          <div className="nav-item">
            <AnchorLink className="anchor-link" href="#contact">
              <p
                onClick={() => setMenu("contact")}
                className={menu === "contact" ? "active" : ""}>
                Contact
              </p>
            </AnchorLink>
            {menu === "contact" ? (
              <img src={arrow} alt="" className="active-image" />
            ) : (
              <></>
            )}
          </div>
        </li>
      </ul>
      <div className="nav-connect">
        <AnchorLink className="anchor-link" href="#contact">
          <p>Contact Me</p>
        </AnchorLink>
      </div>
    </div>
  );
};

export default Navbar;
