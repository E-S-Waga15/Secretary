import React from "react";
import "./Footer.css";
import LogoFooter from "../../assets/Footer.svg";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
     
      <footer className="footer">
        <div className="footer-main">
          {/* Logo & About */}
          <div className="footer-col about">
            <div className="footer-logo">
              <img src={LogoFooter} alt="Clinic Hub" />
              <span>Clinic Hub</span>
            </div>
            <p >
              Clinic Hub It is a smart digital platform that aims to develop the
              healthcare experience through technology.
            </p>
            <div className="footer-col">
              <ul>
                <li>
                    <Link to="/privacypolicy">Privacy Policy _ سياسة الخصوصية</Link> 
                </li>
              </ul>
          
            </div>
            <div className="footer-social">
              <a href="https://www.facebook.com/Eswaga15/">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.instagram.com/E.S.WAGA15/">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
         {/* Pages */}
<div className="footer-col">
  <h3>Pages</h3>
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="#">Book</Link>
    </li>
    <li>
      <Link to="#">Specialty</Link>
    </li>
    <li>
      <Link to="#">Doctors</Link>
    </li>
    <li>
      <Link to="#">About us</Link>
    </li>
    <li>
      <Link to="#">Contact Us</Link>
    </li>
   
  </ul>
</div>

          {/* Service */}
          <div className="footer-col">
            <h3>Service</h3>
            <ul>
              <li>
                <a href="#">Appointment Booking</a>
              </li>
              <li>
                <a href="#">Patient Records Management</a>
              </li>
              <li>
                <a href="#">Visit History Tracking</a>
              </li>
              <li>
                <a href="#">Doctor Profiles Management</a>
              </li>
              <li>
                <a href="#">Lab Reports & Test Results</a>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div className="footer-col">
            <h3>Contact</h3>
            <ul className="footer-contact">
              <li>
                <i className="fas fa-phone"></i> 0994931568
              </li>
              <li>
                <i className="fas fa-envelope"></i> nwr8170@gmail.com
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i> Damscos
              </li>
            </ul>
          </div>
          {/* Map */}
          <div className="footer-col">
            <h3>Maps Location</h3>
            <iframe
  width="200"
  height="150"
  frameBorder="0"
  scrolling="no"
  marginHeight="0"
  marginWidth="0"
  src="https://www.openstreetmap.org/export/embed.html?bbox=36.1545,33.3295,36.1655,33.3405&layer=mapnik&marker=33.3350,36.1600"
  style={{ borderRadius: '8px', border: '2px solid #1b8a8e' }}
  title="Clinic Location"
/>
          </div>
        </div>
        <div className="footer-bottom">© 2025 All Rights Reserved</div>
      </footer>
    </>
  );
};

export default Footer;
