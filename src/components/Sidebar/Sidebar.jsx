// src/components/Sidebar/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

// الخلفيات والصور
import barBg from "../../assets/bar.svg";   
import doctorImg from "../../assets/secBar.svg"; 
import logoLogin from "../../assets/logoLogin.svg"; 

// الأيقونات
import { CalendarDays, CalendarRange, NotebookPen } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* خلفية */}
      <img src={barBg} alt="Sidebar Background" className="sidebar-bg" />

      {/* الشعار */}
      <div className="sidebar-logo">
        <img src={logoLogin} alt="Clinic Logo" className="sidebar-icon" />
        <h2>Clinic Hub</h2>
      </div>

      {/* القائمة */}
      <ul className="sidebar-menu">
        <li>
          <NavLink 
            to="/appointments" 
            className={({ isActive }) => `menu-link ${isActive ? "active" : ""}`}
          >
            <CalendarDays className="icon" />
            <span>Appointment schedule</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/doctors-dates" 
            className={({ isActive }) => `menu-link ${isActive ? "active" : ""}`}
          >
            <CalendarRange className="icon" />
            <span>Doctors dates</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/book" 
            className={({ isActive }) => `menu-link ${isActive ? "active" : ""}`}
          >
            <NotebookPen className="icon" />
            <span>Book</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/createaccount" 
            className={({ isActive }) => `menu-link ${isActive ? "active" : ""}`}
          >
            <NotebookPen className="icon" />
            <span>Create An Account</span>
          </NavLink>
        </li>
      </ul>

      {/* صورة الدكتور أسفل */}
      <div className="sidebar-doctor-container">
        <img src={doctorImg} alt="Doctor" className="sidebar-doctor" />
      </div>
    </div>
  );
};

export default Sidebar;
