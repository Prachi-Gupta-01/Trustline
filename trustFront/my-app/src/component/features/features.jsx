import "./features.css";
import { assets } from "../../assets/assets";

const Features=()=> {
    return(
        <div className="features">
            <div className="feature-left">
                <div className="fb">
                    <div className="f-box">
                        <img src={assets.complaint} alt="compaint-form" className="f-img"></img> 
                        <p className="label">Complaint Submission</p>
                        <p className="info">Citizens can easily file complaints through a simple and intuitive form, anytime and anywhere.</p>
                    </div>
                    <div className="f-box">
                        <img src={assets.track} alt="track-complaint" className="f-img"></img>
                        <p className="label">Tracking and Transparency</p>
                        <p className="info">Users can monitor the real-time progress of their complaints — from submission to resolution.</p>
                    </div>
                </div>
                <div className="fb">
                    <div className="f-box">
                        <img src={assets.heatmap} alt="heatmap-visualization" className="f-img"></img>
                        <p className="label">Heatmap Visualization</p>
                        <p className="info">An interactive map displays complaint hotspots across different city areas.</p>
                    </div>
                    <div className="f-box">
                        <img src={assets.support} alt="customer-support" className="f-img"></img>
                        <p className="label">Escalation and SLA System</p>
                        <p className="info">If a complaint isn’t resolved within a defined Service Level Agreement (SLA) time, it is auto-escalated.</p>
                    </div>
                </div>
            </div>
            <div className="feature-right">
                <div>
                    <h3 style={{color:"#0d9488"}}>Our Features</h3>
                    <p style={{fontStyle:"italic", fontWeight:"bold"}}>“Your Complaints, Our Priority. Together We Build a Better City.”</p>
                    <img src={assets.staff} alt="staff" className="featurephoto" />
                </div>
            </div>
        </div>
    )
}
export default Features;