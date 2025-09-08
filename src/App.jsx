// App.js

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import About_us from "./Components/About_us";
import Bookpage from "./Components/Bookpage";
import Login from "./Components/Login";
import AdminDashboard from "./Components/AdminDashboard";
import Profile from "./Components/Profile";
import AppointmentsList from "./Components/AppointmentsList";
import Navigation from "./Components/Navigation"; // Import the new Navigation component

import "./App.css";

function App() {
  //to strore user logged in data
  const [user, setUser] = useState(null);
  //to strore appointments data for logged in user 
  const [profileAppointments, setProfileAppointments] = useState([]);

  // Load user from localStorage on mount 
  //check the login if yes set it in the user state

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      fetchUserAppointments(userData.id);  // call the fetchUserAppointments to load the appointments from the backend
    }
  }, []);
  //call apointments for the user
  const fetchUserAppointments = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/user/${userId}`);
      const data = await res.json();
      setProfileAppointments(data);//update the state
    } catch (err) {
      console.error("Error fetching user appointments:", err);
    }
  };
  //saves user in state and localStorage, fetches their appointments.
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    fetchUserAppointments(userData.id);
  };
  //clear the user and appointments from the state
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setProfileAppointments([]);
  };
  //update the user appointments 
  const handleProfileChange = (updatedAppointments) => {
    setProfileAppointments(updatedAppointments);
  };

  return (
    <>
      <Router>
        <Navigation user={user} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About_us" element={<About_us />} />

          <Route
            path="/admin"
            element={
              user && user.role === "admin" ? (
                <AdminDashboard user={user} />
              ) : (
                <Navigate to="/Login" replace />
              )
            }
          />

          <Route
            path="/Appointments"
            element={
              user ? (
                <AppointmentsList
                  user={user}
                  onProfileChange={handleProfileChange}
                />
              ) : (
                <Navigate to="/Login" />
              )
            }
          />
          {/* <Route path="/Profile" element={<Profile />} /> */}
// In your App.js, make sure you're passing the correct props:
          <Route
            path="/Profile"
            element={
              <Profile
                user={user}
                appointments={profileAppointments}
                onProfileChange={handleProfileChange}
              />
            }
          />


          <Route
            path="/Bookpage"
            element={<Bookpage user={user} />}
          />
          <Route path="/Login" element={<Login onLogin={handleLogin} />} />







        </Routes>
        <Footer></Footer>

      </Router>
    </>
  );
}

export default App;