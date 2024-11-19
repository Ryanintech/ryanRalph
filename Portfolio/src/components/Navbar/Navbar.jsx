import React, { useRef, useState } from "react";
import "./Navbar.css";
import underline from "../../assets/underline.png";
import AnchorLink from "react-anchor-link-smooth-scroll";
import menuopen from "../../assets/menu-open.png";
import menuclose from "../../assets/menu-close.png";

const Navbar = () => {
  const [menu, setMenu] = useState("about");
  const menuRef = useRef();

  const openMenu = () => {
    menuRef.current.style.right = "0";
  };
  const closeMenu = () => {
    menuRef.current.style.right = "-350px";
  };

  return (
    <div className="navbar">
      <img src="/src/assets/logo2.png" alt="Image of me" className="logo" />
      <img className="menu-open" onClick={openMenu} src={menuopen} alt="" />

      <ul ref={menuRef} className="nav-menu">
        <img
          className="menu-close"
          onClick={closeMenu}
          src={menuclose}
          alt=""
        />
        <li>
          <div className="nav-item">
            <AnchorLink className="anchor-link" href="#home" offset={100}>
              <p
                onClick={() => setMenu("home")}
                className={menu === "home" ? "active" : ""}>
                Home
              </p>
            </AnchorLink>
            {menu === "home" ? (
              <img src={underline} alt="" className="active-image" />
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
              <img src={underline} alt="" className="active-image" />
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
              <img src={underline} alt="" className="active-image" />
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
              <img src={underline} alt="" className="active-image" />
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
