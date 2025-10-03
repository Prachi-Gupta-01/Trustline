import Header from "../../component/header/header";
import "./Home.css";
import About from "../../component/About/About";
import Features from "../../component/features/features";



const Home=()=> {
    return(
        <div className="home">
            <Header/>
            <About/>
            <Features/>
        </div>
    )
}
export default Home;