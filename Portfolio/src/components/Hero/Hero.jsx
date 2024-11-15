import React from "react";
import "./Hero.css";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Hero = () => {
  return (
    // Hero Page
    <div id="home" className="hero">
      <div className="hero-image-container">
        <span className="hero-frame"></span>
        <img
          src="/src/assets/photo1.jpg"
          alt="Image of me"
          className="hero-image"
        />
      </div>

      <h1>
        I'm <span>Ryan Ralph,</span> a Junior Developer from England.
      </h1>
      <p>
        Passionate about coding and eager to grow, I am focused on building a
        successful career by creating impactful applications.
      </p>

      <div className="hero-action">
        <div className="hero-connect">
          <AnchorLink className="anchor-link" href="#contact">
            Connect With me
          </AnchorLink>
        </div>
        <div className="hero-cv">My C.V</div>
      </div>
    </div>
  );
};

export default Hero;
