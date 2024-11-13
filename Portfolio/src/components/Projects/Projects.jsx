import React, { useState, useEffect } from "react";
import "./Projects.css";
import work_data from "../../assets/workdata"; // Assuming each project has an array of images
import search_icon from "../../assets/square-arrow.png";

const Projects = () => {
  const [focusedProject, setFocusedProject] = useState(null); // Store the focused project
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Store the current image index
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null); // Store the index of the current project

  const handleClick = (index) => {
    setFocusedProject(work_data[index]);
    setCurrentProjectIndex(index);
    setCurrentImageIndex(0); // Reset to the first image of the selected project
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
    setCurrentImageIndex(0); // Reset the image index
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
      document.body.style.overflow = "auto"; // Reset when component unmounts
    };
  }, [focusedProject]);

  return (
    <div className="projects">
      <div className="project-title">
        <h1>My Projects</h1>
      </div>

      <div className="project-container">
        {work_data.map((work, index) => (
          <img
            key={index}
            src={work.w_img[0]} // Show the first image of each project
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
        <img src={search_icon} alt="Show more" />
      </div>
    </div>
  );
};

export default Projects;
