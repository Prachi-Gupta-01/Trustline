import "./Footer.css";
import {Twitter, Instagram, Facebook,MapPinned,Mail,Phone, ShieldCheck} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
            <Link to="/" style={{textDecoration:"none", color:"white", fontWeight:"bold"}}><div className="logo"><ShieldCheck size={30}/>Trustline</div></Link>
          
          <p style={{fontSize:"12px"}}>
            Trustline is a civic complaint tracking system that empowers citizens to
            report local issues, track their progress, and ensure faster resolution
            through transparency and accountability.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Signup</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p><MapPinned /> &nbsp; City Municipal Office, Sector 15</p>
          <p><Mail /> &nbsp; support@trustline.org</p>
          <p><Phone /> &nbsp; +91 98765 43210</p>

          <div className="social-icons">
            <a href="#"><Facebook /></a>
            <a href="#"><Twitter /></a>
            <a href="#"><Instagram /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Trustline. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
