// src/pages/Auth/LoginModal/LoginModal.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestOtp } from '../../../store/slices/authSlice';
import "./CreateAnAccountModal.css";
import AuthBanner from '../../../components/AuthBanner/AuthBanner';

const CreateAnAccountModal = ({ isOpen, onClose, onSendCode }) => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');

  const { loading, otpSent, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isOpen) {
      setPhoneNumber('');
    }
  }, [isOpen]);

  // ✅ عند نجاح الإرسال ننتقل إلى OTP Modal
  useEffect(() => {
    if (otpSent) {
      onSendCode();
    }
  }, [otpSent, onSendCode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      dispatch(requestOtp(phoneNumber));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(value);
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={(e) => {
      if (e.target.classList.contains('login-modal-overlay')) {
        onClose();
      }
    }}>
      <div className="login-modal-content container-fluid">
        <div className="row h-100 flex-column flex-lg-row">
          <AuthBanner onClose={onClose} />
          <div className="login-content-container col-12 col-lg-6">
            <h1 className="login-title">Your clinic,<br />just a tap away..</h1>
            <p className="login-subtitle">
              Enter your number or email to complete your login<br />as a Patient
            </p>

            <form onSubmit={handleSubmit} className="d-flex flex-column flex-lg-row align-items-stretch gap-2 w-100">
              <input 
                type="tel"
                pattern="[0-9]*"
                inputMode="numeric"
                className="form-control login-phone-input px-4 py-2"
                placeholder="Enter your phone number (10 digits)"
                value={phoneNumber}
                onChange={handlePhoneChange}
                required
              />
              <button 
                type="submit"
                className="login-send-code-button"
                disabled={phoneNumber.length !== 10 || loading}
              >
                {loading ? 'Sending...' : 'Send Code'}
              </button>
            </form>

            {error && <p className="text-danger mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAnAccountModal;
