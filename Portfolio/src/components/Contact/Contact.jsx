import React from "react";
import "./Contact.css";
import location from "../../assets/location.png";
import telephone from "../../assets/telephone.png";
import email from "../../assets/email.png";

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-title">
        <h1>Get in touch</h1>
      </div>
      <div className="contact-section">
        {/* contact left side */}
        <div className="contact-left">
          <h1>Let's talk</h1>
          <div className="contact-details">
            <div className="contact-detail">
              <img src={location} alt="" />
            </div>
            <div className="contact-detail">
              <img src={telephone} alt="" />
            </div>
            <div className="contact-detail">
              <img src={email} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
