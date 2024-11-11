import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <img src="/src/assets/photo1.jpg" alt="Image of me" />
      <h1>
        <span>I'm Ryan Ralph</span>, a Junior Developer from England.
      </h1>
      <p>
        Passionate about coding and eager to grow, I am focused on building a
        successful career by creating impactful applications.
      </p>

      <div className="hero-action">
        <div className="hero-connect">Connect With me</div>
        <div className="hero-cv">My C.V</div>
      </div>
    </div>
  );
};

export default Hero;
