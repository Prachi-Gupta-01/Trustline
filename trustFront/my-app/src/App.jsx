import {  Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup.jsx";
import Login from "./pages/Login/Login.jsx"
import "./App.css"

const App=()=> {
  return (
 
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
   
  );
}

export default App;
