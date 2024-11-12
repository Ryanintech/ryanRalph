import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      <div className="about-title">
        <h1>About me</h1>
      </div>
      <div className="about-sections">
        <div className="about-left">
          <span className="photo-frame">
            <img src="/src/assets/trialphoto.png" alt="Ryan Ralph" />
          </span>
        </div>

        <div className="about-right">
          <div className="about-para">
            <p>
              My journey into tech started in a completely different field,
              working as a tech recruiter. However, I soon became fascinated by
              the world of coding and decided to explore it myself.
            </p>
            <p>
              I began with freeCodeCamp, which sparked my interest even more as
              I enjoyed building basic projects. Motivated to take my skills to
              the next level, I enrolled in a course to deepen my understanding
              of development and make the transition into the tech industry. I'm
              excited to continue learning and grow as a developer, tackling new
              challenges and building impactful applications.{" "}
            </p>
          </div>
          <div className="about-skills">
            <span className="about-background">
              <div className="about-skill">
                <i className="bx bxl-html5"></i>
                <i className="bx bxl-css3"></i>
                <p>HTML & CSS</p>
                <hr style={{ width: "70%" }} />
              </div>
              <div className="about-skill">
                <i className="bx bxl-javascript"></i>
                <p>Javascript</p>
                <hr style={{ width: "60%" }} />
              </div>
              <div className="about-skill">
                <i className="bx bxl-react"></i>
                <p>React js</p>
                <hr style={{ width: "55%" }} />
              </div>
              <div className="about-skill">
                <i className="bx bxl-python"></i>
                <p>Python</p>
                <hr style={{ width: "40%" }} />
              </div>
              <div className="about-skill">
                <i className="bx bxl-php"></i>
                <p>PHP</p>
                <hr style={{ width: "20%" }} />
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
