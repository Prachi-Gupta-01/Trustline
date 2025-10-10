import Header from "../../component/header/header";
import "./Home.css";
import About from "../../component/About/About";
import Features from "../../component/features/features";
import Footer from "../../component/Footer/Footer";

import FAQSection from "../../component/FAQ/FAQ";
import AboutMe from "../aboutme/aboutme";



const Home=()=> {
    return(
        <div className="home">
            <Header/>
            <About/>
            <Features/>
            <FAQSection/>   
            <Footer/>
            <AboutMe/>
        </div>
    )
}
export default Home;