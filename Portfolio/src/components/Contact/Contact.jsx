import React, { useState } from "react";
import "./Contact.css";
import location from "../../assets/location.png";
import facebook from "../../assets/facebook.png";
import linkedin from "../../assets/linkedin.png";
import twitter from "../../assets/twitter.png";
import email from "../../assets/email.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email_address: "",
    mobile_number: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = "Name is required.";
    if (!formData.email_address.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      formErrors.email_address = "Invalid email address.";
    }
    if (formData.honeypot) formErrors.honeypot = "Spam detected.";
    if (!formData.message.trim()) formErrors.message = "Message is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email_address: "",
          mobile_number: "",
          message: "",
          honeypot: "",
        });
      } else {
        throw new Error("Failed to submit the form.");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div id="contact" className="contact">
      <div className="contact-title">
        <h1>Get in touch</h1>
      </div>
      <div className="contact-section">
        <div className="contact-left">
          <h1>Let's talk</h1>
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

        <form method="post" className="contact-right" onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label>Your Email</label>
          <input
            type="email"
            name="email_address"
            placeholder="Email address"
            value={formData.email_address}
            onChange={handleChange}
            required
          />
          {errors.email_address && (
            <p className="error">{errors.email_address}</p>
          )}

          <label>Phone Number (optional)</label>
          <input
            type="number"
            min="0"
            name="mobile_number"
            placeholder="Mobile number"
            value={formData.mobile_number}
            onChange={handleChange}
          />

          <label>Write your message here</label>
          <textarea
            name="message"
            cols="30"
            rows="10"
            placeholder="Your message here... I will get back to you ASAP!"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {errors.message && <p className="error">{errors.message}</p>}

          <input
            type="text"
            name="honeypot"
            style={{ display: "none" }}
            value={formData.honeypot}
            onChange={handleChange}
          />
          {errors.honeypot && <p className="error">{errors.honeypot}</p>}

          <div className="submit-container">
            <button className="submit">Submit</button>
          </div>
        </form>
        {success && <p className="success">Thank you for reaching out!</p>}
      </div>
    </div>
  );
};

export default Contact;
