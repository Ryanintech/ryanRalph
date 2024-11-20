import React from "react";
import "./About.css";

const About = () => {
  return (
    <div id="about" className="about">
      <div className="about-title">
        <h1>About Me</h1>
      </div>

      {/* Top Section */}
      <div className="about-top">
        <div className="photo-frame">
          <img src="/src/assets/trialphoto.png" alt="Ryan Ralph" />
        </div>

        {/* About Paragraph */}
        <div className="about-para">
          <p>
            My journey into tech started in a completely different field working
            as a tech recruiter. However, I soon became fascinated by the world
            of coding and decided to explore it myself.
          </p>
          <p>
            I began with freeCodeCamp, which sparked my interest even more as I
            enjoyed building basic projects. Motivated to take my skills to the
            next level, I enrolled in a course to deepen my understanding of
            development and make the transition into the tech industry. I'm
            excited to continue learning and grow as a developer, tackling new
            challenges and building impactful applications.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="about-skills">
        <div className="about-skill">
          <i className="bx bxl-html5"></i>
          <p>HTML & CSS</p>
          <hr style={{ width: "70%" }} />
        </div>
        <div className="about-skill">
          <i className="bx bxl-javascript"></i>
          <p>JavaScript</p>
          <hr style={{ width: "60%" }} />
        </div>
        <div className="about-skill">
          <i className="bx bxl-react"></i>
          <p>React JS</p>
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
      </div>
    </div>
  );
};

export default About;
