import React, { useState, useEffect } from "react";
import "./Projects.css";
import work_data from "../../assets/workdata";
import next from "../../assets/next.png";

const Projects = () => {
  const [focusedProject, setFocusedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null);

  const handleClick = (index) => {
    setFocusedProject(work_data[index]);
    setCurrentProjectIndex(index);
    setCurrentImageIndex(0);
  };

  const handleNext = () => {
    const nextIndex = (currentImageIndex + 1) % focusedProject.w_img.length;
    setCurrentImageIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex =
      (currentImageIndex - 1 + focusedProject.w_img.length) %
      focusedProject.w_img.length;
    setCurrentImageIndex(prevIndex);
  };

  const closeFocusedProject = () => {
    setFocusedProject(null);
    setCurrentImageIndex(0);
    setCurrentProjectIndex(null);
  };

  // Disable scrolling when an image is focused
  useEffect(() => {
    if (focusedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [focusedProject]);

  return (
    <div id="projects" className="projects">
      <div className="project-title">
        <h1>My Projects</h1>
      </div>

      <div className="project-container">
        {work_data.map((work, index) => (
          <img
            key={index}
            src={work.w_img[0]}
            alt={`Project ${index}`}
            className="project-image"
            onClick={() => handleClick(index)}
          />
        ))}
      </div>

      {focusedProject && (
        <div className="focused-image-container" onClick={closeFocusedProject}>
          <div className="image-nav" onClick={(e) => e.stopPropagation()}>
            <button onClick={handlePrev} className="nav-btn">
              ←
            </button>
            <img
              src={focusedProject.w_img[currentImageIndex]}
              alt={`Project ${currentProjectIndex} Image ${currentImageIndex}`}
              className="focused-image"
            />
            <button onClick={handleNext} className="nav-btn">
              →
            </button>
          </div>
          <button className="close-btn" onClick={closeFocusedProject}>
            ✕
          </button>
        </div>
      )}

      <div className="project-showmore">
        <p>Show More</p>
        <img src={next} alt="Show more" />
      </div>
    </div>
  );
};

export default Projects;
