import React from "react";
import "./Projects.css";
import work_data from "../../assets/workdata";
import search_icon from "../../assets/square-arrow.png";

const Projects = () => {
  return (
    <div className="projects">
      <div className="project-title">
        <h1>My Projects</h1>
      </div>
      <div className="project-container">
        {work_data.map((work, index) => {
          return (
            <img
              key={index}
              src={work.w_img}
              alt=""
              className="project-image"
            />
          );
        })}
      </div>
      <div className="project-showmore">
        <p>Show More</p>
        <img src={search_icon} alt="" />
      </div>
    </div>
  );
};

export default Projects;
