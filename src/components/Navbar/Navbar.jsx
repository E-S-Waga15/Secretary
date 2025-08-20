import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './Navbar.css';
import AvatarModal from '../../features/AvatarModal/AvatarModal';


const Navbar = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // جلب حالة الدخول وبيانات المستخدم من localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    const userData = localStorage.getItem('user');
    setUser(userData ? JSON.parse(userData) : null);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOverlayClick = () => {
    setIsMenuOpen(false);
  };

  const handleNavItemClick = () => {
    if (location.pathname === '/doctor') {
      const doctorsSection = document.getElementById('doctors-section');
      if (doctorsSection) {
        doctorsSection.scrollIntoView({ behavior: 'smooth' });
      }else if(location.pathname === '/specialty'){
        const specialtySection = document.getElementById('specialty-section');
        if (specialtySection) {
          specialtySection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMenuOpen(false);
  };



  return (
    <nav className="navbar navbar-expand-lg bg-white fixed-top">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between w-100">
          <Link className="navbar-brand d-flex align-items-center" to="/" onClick={handleNavItemClick}>
            <img src={logo} alt="Clinic Hub Logo" />
            <span>Clinic Hub</span>
          </Link>
          
          {isMobile && (
            <div className="mobile-nav-buttons">
              {isLoggedIn ? (
                <AvatarModal user={user}  />
              ) : (
                <button className="btn btn-primary login-button" onClick={onLoginClick}>
                  Log in
                </button>
              )}
              <button 
                className={`navbar-toggler ${isMenuOpen ? 'active' : ''}`}
                type="button" 
                onClick={toggleMenu}
                aria-controls="navbarNav" 
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          )}
        </div>
        
        {isMobile && <div className={`navbar-overlay ${isMenuOpen ? 'show' : ''}`} onClick={handleOverlayClick}></div>}
        <div className={`collapse navbar-collapse justify-content-between ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                to="/"
                onClick={handleNavItemClick}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/specialty' ? 'active' : ''}`} 
                to="/specialty"
                onClick={handleNavItemClick}
              >
                Specialty
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/doctor' ? 'active' : ''}`} 
                to="/doctor"
                onClick={handleNavItemClick}
              >
                Doctor
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} 
                to="/about"
                onClick={handleNavItemClick}
              >
                About us
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} 
                to="/contact"
                onClick={handleNavItemClick}
              >
                Contact Us
              </Link>
            </li>
          </ul>
          {!isMobile && (
            <div className="ms-4">
              {isLoggedIn ? (
                <AvatarModal user={user}  />
              ) : (
                <button className="btn btn-primary login-button" onClick={onLoginClick}>
                  Log in
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 