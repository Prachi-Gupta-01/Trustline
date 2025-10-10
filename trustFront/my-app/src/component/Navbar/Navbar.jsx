import "./Navbar.css";
import { Link } from "react-router-dom"; 
import { CircleUser,ShieldCheck } from "lucide-react";  
import { assets } from "../../assets/assets";

const Navbar=(props)=> {
    let showLogin=props.showLogin;
    let setShowLogin=props.setShowLogin;
  return (
    <div className="navbar">
      {/* <div className="navbar-logo">
        <Link to="/"><img src={assets.logo} alt="logo" className="logo"></img></Link>
       
      </div> */}
      <Link to="/" style={{textDecoration:"none"}}>
        <div className="lg">
          <ShieldCheck size={40} />
          <p id="p">TrustLine</p>
        </div>
      </Link>
      
      
      <div className="navbar-links">
        <div className="nav-options">
          <Link to="/ContactUs" className="nav-option">Contact Us</Link>
          <Link to="/help" className="nav-option">Help</Link>
        </div>
        {
            !showLogin &&
            <div  className="bb"><Link to="/signup" className="navbar-link" >Signup</Link></div>
        }
        {
            !showLogin &&
            <div className="bb"><Link to="/login" className="navbar-link">Login</Link></div>
        }
        {
            showLogin &&
            <div className="bb"><Link to="/Dashboard" className="navbar-link">Dashboard</Link></div>
        }
        {
            showLogin &&
            <div className="bb" onClick={()=>setShowLogin(false)}><Link to="/" className="navbar-link">Logout</Link></div>
        }
        
        
      </div>
    </div>
  );
}

export default Navbar;