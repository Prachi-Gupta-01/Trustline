import "./Navbar.css";
import { Link } from "react-router-dom"; 
import { CircleUser,ShieldCheck } from "lucide-react";  
import { assets } from "../../assets/assets";
import { useContext , useState} from "react";
import { StoreContext } from "../../context/StoreContext";

const Navbar=(props)=> {
    let showLogin=props.showLogin;
    let setShowLogin=props.setShowLogin;
    const { username, email, role, clearUser } = useContext(StoreContext);
     // Local state for showing profile toggle box
  const [showProfileBox, setShowProfileBox] = useState(false);

  // Handle logout
  const handleLogout = () => {
    clearUser(); // clears token and user info from context
    setShowLogin(false); // sets login state to false
  };

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
        {showLogin && role === "citizen" && (
          <div className="profile-section">
            <CircleUser
              size={35}
              className="profile-icon"
              onClick={() => setShowProfileBox(!showProfileBox)}
            />
            {showProfileBox && (
              <div className="profile-dropdown">
                <p><strong>{username}</strong></p>
                <p>{email}</p>
                <hr />
                <Link to="/my-complaints" className="dropdown-link">
                  My Complaints
                </Link>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
        {
            showLogin && role==="staff" &&
            <div className="bb"><Link to="/Dashboard" className="navbar-link">Dashboard</Link></div>
        }
        {
            showLogin &&
            <div className="bb"  onClick={handleLogout}><Link to="/" className="navbar-link">Logout</Link></div>
        }
        
        
      </div>
    </div>
  );
}

export default Navbar;