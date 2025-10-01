import Header from "../../component/header/header";
import "./Home.css";
import About from "../../component/About/About";



const Home=()=> {
    return(
        <div className="home">
            <Header/>
            <About/>
        </div>
    )
}
export default Home;