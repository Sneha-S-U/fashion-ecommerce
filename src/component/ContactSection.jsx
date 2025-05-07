import React from 'react';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Get in Touch</h2>
        <p className="contact-subtitle">
          We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
        </p>
        <form className="contact-form">
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" rows="5" placeholder="Your Message" required />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
