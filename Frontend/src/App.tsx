import { Route, Routes } from "react-router-dom"
import Home from "./Component/Home/Home.js";
import Register from "./Component/Auth/Register.js";
import Login from "./Component/Auth/Login.js";
import RideDashboard from "./Component/Ride/RideDashboard"
import DriverDashboard from "./Component/Ride/DriverDashboard.js";
import MainPage from "./Component/Ride/MainPage.js";
import MyRidesPage from "./Component/Rider/MyRides.js";
import PaymentPage from "./Component/Rider/PaymentPage.js";
import FavoritesPage from "./Component/Rider/FavoritesPage.js";
import SafetyCenter from "./Component/Rider/Safety.js";
import SettingsPage from "./Component/Rider/Setting.js";
import NotificationsPage from "./Component/Rider/Notifications.js";
import ScheduleRide from "./Component/Rider/Schedule.js";
import HelpSupport from "./Component/Rider/HelpSupport.js";
import ProfilePage from "./Component/Rider/Profile.js";
import TodayRidesDashboard from "./Component/Driver/RidesToday.js";
import DriverRatingPage from "./Component/Driver/DriverRatingPage.js";
import EarningsDashboard from "./Component/Driver/EarningsDashboard.js";
import TripHistory from "./Component/Driver/TripHistory.js";
import DriverSettings from "./Component/Driver/DriverSetting.js";
import DriverSupportPage from "./Component/Driver/DriverSupportPage.js";
import TodayEarningsDashboard from "./Component/Driver/TodayEarning.js";

const App = () => {
  return (

    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/ride" element={<RideDashboard />} />
        <Route path="/driver" element={<DriverDashboard />} />
        <Route path="/myrides" element={<MyRidesPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/safety" element={<SafetyCenter />} />
        <Route path="/setting" element={<SettingsPage />} />
        <Route path="/notifications" element={<NotificationsPage/>} />
        <Route path="/schedule" element={<ScheduleRide/>} />
        <Route path="/support" element={<HelpSupport/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/todayearning" element={<TodayEarningsDashboard/>} />
        <Route path="/todayrides" element={<TodayRidesDashboard/>} />
        <Route path="/rating" element={<DriverRatingPage/>} />
        <Route path="/viewearning" element={<EarningsDashboard/>}/>
        <Route path="/trips" element={<TripHistory/>}/>
        <Route path="/driversetting" element={<DriverSettings/>}/>
        <Route path="/driversupport" element={<DriverSupportPage/>}/>
      </Routes>
    </main>

  )
}

export default App