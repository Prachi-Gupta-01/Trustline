import "./Navbar.css";
import { Link } from "react-router-dom"; 
import { SquarePen, CalendarSearch, Bell, CircleUser } from "lucide-react";  
// import assets from "../../assets/assets.js";

const Navbar=()=> {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        {/* <Link to="/"><img src={assets.logo} alt="logo" className="logo"></img></Link> */}
        <Link to="/" className="navbar-brand"><p>TrustLine</p></Link>
      </div>
      <div className="nav-options">
        <Link to="/contact" className="nav-option">Contact</Link>
        <Link to="/help" className="nav-option">Help</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/signup" className="navbar-link">Signup</Link></li>
        <li><Link to="/login" className="navbar-link">Login</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;