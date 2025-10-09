import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup/Signup.jsx";
import Login from "./pages/Login/Login.jsx"
import "./App.css"
import Navbar from "./component/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import SubmitComp from "./pages/SubmitComp/SubmitComp.jsx";
import Track from "./pages/Track/Track.jsx";
import Notify from "./pages/Notify/Notify.jsx";
import About from "./component/About/About.jsx";
import ContactUs from "./component/Contact/ContactUs.jsx";
import { useState } from "react";
const App=()=> {
  const [showLogin,setShowLogin]=useState(false);
  return (
    
    
    <div>
      <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/signup" element={<Signup setShowLogin={setShowLogin} />} />
        <Route path="/login" element={<Login setShowLogin={setShowLogin}/>}/>
        <Route path="/submit complaint" element={<SubmitComp/>}/>
        <Route path="/track" element={<Track/>}/>
        <Route path="/notifications" element={<Notify/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/ContactUs" element={<ContactUs/>}/>
      </Routes>
    </div>
 
     
  );
}

export default App;
