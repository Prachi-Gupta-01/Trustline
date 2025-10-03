import "./features.css";

const Features=()=> {
    return(
        <div className="features">
            <div className="feature-left">
                <div className="fb">
                    <div className="f-box">Complaint Submission</div>
                    <div className="f-box">Tracking and Transparency</div>
                </div>
                <div className="fb">
                    <div className="f-box">Heatmap Visualization</div>
                    <div className="f-box">Customer Support</div>
                </div>
            </div>
            <div className="feature-right">
                <div>
                    <h3>Our Features</h3>
                    <p>“Your Complaints, Our Priority. Together We Build a Better City.”</p>
                </div>
            </div>
        </div>
    )
}
export default Features;