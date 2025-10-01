import "./Navbar.css";
import { Link } from "react-router-dom"; 
import { CircleUser } from "lucide-react";  
// import assets from "../../assets/assets.js";

const Navbar=(props)=> {
    let showLogin=props.showLogin;
    let setShowLogin=props.setShowLogin;
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
      <div className="navbar-links">
        {
            !showLogin &&
            <div><Link to="/signup" className="navbar-link">Signup</Link></div>
        }
        {
            !showLogin &&
            <div><Link to="/login" className="navbar-link">Login</Link></div>
        }
        {
            showLogin &&
            <div><Link to="/profile" className="navbar-link"><CircleUser size={20}/> Profile</Link></div>
        }
        {
            showLogin &&
            <div><Link to="/logout" className="navbar-link">Logout</Link></div>
        }
        
        
      </div>
    </div>
  );
}

export default Navbar;