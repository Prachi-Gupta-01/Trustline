import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup/Signup.jsx";
import Login from "./pages/Login/Login.jsx"
import "./App.css"
import Navbar from "./component/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import SubmitComp from "./pages/SubmitComp/SubmitComp.jsx";
import Track from "./pages/Track/Track.jsx";
import Notify from "./pages/Notify/Notify.jsx";
const App=()=> {
  return (
    
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/submit complaint" element={<SubmitComp/>}/>
        <Route path="/track" element={<Track/>}/>
        <Route path="/notifications" element={<Notify/>}/>
      </Routes>
    </div>
 
      // <Routes>
      //   <Route path="/signup" element={<Signup />} />
      //   <Route path="/login" element={<Login/>}/>
      // </Routes>
   
  );
}

export default App;
