import React, { useEffect, useState } from 'react';
import { ReactComponent as LogoOutline } from '../../assets/logoAnimated.svg';
import { ReactComponent as LogoFilled } from '../../assets/logoLogin.svg';
import './AuthBanner.css';

const AuthBanner = ({ onClose }) => {
  const [showFilled, setShowFilled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFilled(true);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="auth-banner">
      <button onClick={onClose} className="auth-banner-close-button">×</button>
      <div className="auth-banner-logo-background">
        {!showFilled && <LogoOutline className="logo-draw" width="120" height="120"/>}
        {showFilled && <LogoFilled className="logo-filled" width="120" height="120" />}
      </div>
    </div>
  );
};

export default AuthBanner;
