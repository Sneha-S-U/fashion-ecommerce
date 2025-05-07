import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <h2 className="footer-title">FashionStore</h2>
        <p className="footer-tagline">Trendy Styles at Your Fingertips</p>

        {/* Quick Links */}
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
        </div>

        {/* Contact Information */}
        <div className="footer-contact">
          <div>
            <h4>Contact Us</h4>
            <p><FaPhoneAlt /> +123 456 7890</p>
            <p><FaEnvelope /> support@fashionstore.com</p>
          </div>
          <div>
            <h4>Location</h4>
            <p>123 Fashion St, NY, USA</p>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="footer-social">
          <a href="#" className="social-icon"><FaFacebook size={24} /></a>
          <a href="#" className="social-icon"><FaInstagram size={24} /></a>
          <a href="#" className="social-icon"><FaTwitter size={24} /></a>
          <a href="#" className="social-icon"><FaLinkedin size={24} /></a>
        </div>

        {/* Footer Bottom */}
        <p className="footer-bottom">© 2025 FashionStore. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
