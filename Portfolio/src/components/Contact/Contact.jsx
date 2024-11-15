import React from "react";
import "./Contact.css";
import location from "../../assets/location.png";
import telephone from "../../assets/telephone.png";
import facebook from "../../assets/facebook.png";
import linkedin from "../../assets/linkedin.png";
import twitter from "../../assets/twitter.png";
import email from "../../assets/email.png";

const Contact = () => {
  return (
    <div id="contact" className="contact">
      <div className="contact-title">
        <h1>Get in touch</h1>
      </div>

      <div className="contact-section">
        {/* contact left side */}
        <div className="contact-left">
          <h1>Let's talk</h1>
          <p>Template</p>
          <div className="contact-details">
            <div className="contact-detail">
              <img src={location} alt="" />
              <p>London, United Kingdom</p>
            </div>
            <div className="contact-detail">
              <img src={email} alt="" />
              <p>ryanscoding1@gmail.com</p>
            </div>
            <div className="socials">
              <a href="https://www.facebook.com/ryan.ralph1" target="_blank">
                <img src={facebook} alt="facebook logo" />
              </a>
              <a
                href="https://www.linkedin.com/in/ryan-ralph-200483235"
                target="_blank">
                <img src={linkedin} alt="linkedin logo" />
              </a>
              <a href="https://x.com/RyandoingTech" target="_blank">
                <img src={twitter} alt="twitter logo" />
              </a>
            </div>
          </div>
        </div>

        {/* contact right side */}
        <form action="" method="POST" className="contact-right">
          <label htmlFor="" for>
            Your Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
          <label htmlFor="">Your Email</label>
          <input
            type="email"
            name="email_address"
            placeholder="Email Address"
            required></input>
          <label htmlFor="">Phone Number (optional)</label>
          <input
            type="number"
            min="0"
            name="mobile_number"
            placeholder="Mobile Number"></input>
          <label htmlFor="">Write your message here</label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            placeholder="Your Message here... I will get back to you ASAP!"
            required></textarea>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
