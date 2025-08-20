import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./pages/Home/Home";

import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import NotFound from "./pages/NotFound/NotFound";
import SignIn from "./pages/SignIn/SignIn";
import Start from "./pages/Start/Start";
import Footer from "./components/Footer/Footer";
import Appointments from "./pages/Appointments/Appointments";
// الصفحات الجديدة
import AppointmentSchedule from "./pages/AppointmentSchedule/AppointmentSchedule";
import DoctorsDates from "./pages/DoctorsDates/DoctorsDates";

// Layout
import DashboardLayout from "./components/DashboardLayout";
import SecretaryPage from "./pages/SecretaryPage/SecretaryPage";
import { ToastContainer } from 'react-toastify';
function App() {
  useEffect(() => {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      loadingScreen.style.display = "none";
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* صفحات عامة */}
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Start />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/home" element={<Home />} />

          {/* صفحات داخل الـ Dashboard مع Sidebar */}
          <Route
            path="/appointments"
            element={
              <DashboardLayout>
                <AppointmentSchedule />
              </DashboardLayout>
            }
          />
          <Route
            path="/doctors-dates"
            element={
              <DashboardLayout>
                <DoctorsDates />
              </DashboardLayout>
            }
          />
          <Route
            path="/book"
            element={
              <DashboardLayout>
                <Appointments />
              </DashboardLayout>
            }
          />
          <Route
            path="/createaccount"
            element={
              <DashboardLayout>
                <SecretaryPage />
              </DashboardLayout>
            }
          />
        </Routes>

        <Footer />
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
