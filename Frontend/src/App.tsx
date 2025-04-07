import { Route, Routes } from "react-router-dom"
import Home from "./Component/Home/Home.js";
import Register from "./Component/Auth/Register.js";
import Login from "./Component/Auth/Login.js"; 
import RideDashboard from "./Component/Ride/RideDashboard"
import DriverDashboard from "./Component/Ride/DriverDashboard.js";
import HomePage from "./Component/Ride/HomePage.js";

const App = () => {
  return (
    <div>
      <Routes>
          <Route path="/" element={ <Home/>}/>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Register/>}>/</Route>
          <Route path="/home" element={<HomePage/>}></Route>
          <Route path="/ride" element={<RideDashboard/>}></Route> 
          <Route path="/driver" element={<DriverDashboard/>}></Route>
      </Routes>
    </div>
  )
}

export default App
