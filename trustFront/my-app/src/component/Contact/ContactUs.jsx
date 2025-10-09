import { assets } from "../../assets/assets";
import React, { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
    //  replace this alert with an API call like:
    // axios.post('/api/contact', formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-container">
      <div className="img-box">
        
        <img src={assets.contact} alt="contact-img" className="image"></img>
        <h1 className="contact-title">Contact Us</h1>

      </div>
      
      <h3 className="contact-subtitle">
        Questions, Thoughts, Or Just Want To Say Hello
      </h3>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Enter your subject"
          value={formData.subject}
          onChange={handleChange}
        />

        <textarea
          name="message"
          rows="6"
          placeholder="Enter your message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className="contact-btn">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
