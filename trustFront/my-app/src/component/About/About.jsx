import "./About.css";
import { SquareCheckBig } from "lucide-react";
import { assets } from "../../assets/assets";

const About = () => {
    return(
        <div className="about">
            <div className="aboutLeft">
                <h3 className="h">About Us</h3>
                <h1 className="quote">“Empowering Citizens, Improving Cities: Your Voice, Our Responsibility.”</h1>
                <p className="ptext">Trustline is a civic complaint tracking system that enables residents to report municipal issues such as road damage, garbage collection, water leakage, and electricity problems.Our platform ensures transparency, accountability, and faster resolution through role-based dashboards and real-time tracking.</p>
                <p className="ptext">Join us in making our cities better places to live by reporting issues and tracking their resolution. Together, we can build a more responsive and efficient urban environment.</p>
                <div className="vm">
                    <div className="b1">
                        <h3 className="h">Our Vision</h3>
                        <ul className="list">
                            <li><SquareCheckBig  size={15} style={{color:"#0D9488"}}/>Faster redressal of complaints.</li>
                            <li><SquareCheckBig size={15} style={{color:"#0D9488"}}/>Digital bridge between citizens and authorities.</li>
                            <li><SquareCheckBig size={15} style={{color:"#0D9488"}}/>Cleaner, smarter, and safer communities.</li>
                            <li><SquareCheckBig size={15} style={{color:"#0D9488"}}/>Transparency in governance.</li>
                        </ul>
                    </div>
                    <div className="b1">
                        <h3 className="h">Our Mission</h3>
                        <ul className="list">
                            <li><SquareCheckBig size={15} style={{color:"#0D9488"}}/>Empower every citizen to raise their voice.</li>
                            <li><SquareCheckBig size={15} style={{color:"#0D9488"}}/>Ensure no complaint is left unresolved.</li>
                            <li><SquareCheckBig size={15} style={{color:"#0D9488"}}/>Utilize technology for efficient complaint management.</li>
                            <li><SquareCheckBig size={15} style={{color:"#0D9488"}}/>Build trust between residents and municipal authorities.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="aboutright">
                <div>
                    <img src={assets.aboutphoto} alt="aboutphoto" className="aboutphoto"/>
                </div>
                
                
            </div>
        </div>
    )
}
export default About;