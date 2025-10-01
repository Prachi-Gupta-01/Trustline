import "./Header.css";
import { Link } from "react-router-dom"; 
import { SquarePen, CalendarSearch, Bell, ChartPie} from "lucide-react"; 

const Header=()=> {
    return(
        <div className="header">
            <div className="submit">
                <Link to="/submit complaint" className="submit" style={{textDecoration:"none"}} >
                    <div className="box">
                        <SquarePen size={30} />
                        <p>Submit Complaint</p>
                    </div>
                </Link>
                
            </div>
            <div className="track">
                <Link to="/track" className="track">
                    <div className="box">
                        <CalendarSearch size={30}/>
                        <p>Track Complaint</p>
                    </div>
                </Link>
                
            </div>
            <div className="notifications">
                <Link to="/notifications" className="notifications">
                <div className="box">
                     <Bell size={30}/>
                    <p>Notifications</p>
                </div>
               </Link>    
            </div>
            <div className="resolutions">
                <Link to="/resolutions" className="resolutions">
                <div className="box">
                     <ChartPie size={30}/> 
                    <p>Resolution Status</p>
                </div>
               </Link>
            </div>

        </div>
    )

}
export default Header;