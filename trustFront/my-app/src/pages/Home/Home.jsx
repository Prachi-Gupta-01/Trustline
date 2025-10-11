import Header from "../../component/header/header";
import "./Home.css";
import About from "../../component/About/About";
import Features from "../../component/features/features";
import Footer from "../../component/Footer/Footer";

import FAQSection from "../../component/FAQ/FAQ";




const Home=()=> {
    return(
        <div className="home">
            <Header/>
            <About/>
            <Features/>
            <FAQSection/>   
            <Footer/>
        
        </div>
    )
}
export default Home;