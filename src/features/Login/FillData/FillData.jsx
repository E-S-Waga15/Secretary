import React, { useState, useEffect } from 'react';
import "./FillData.css";
import { FaMars, FaVenus, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AuthBanner from '../../../components/AuthBanner/AuthBanner';

import { useDispatch, useSelector } from 'react-redux';
import { submitPatientData } from '../../../store/slices/fillDataSlice';

const CustomGenderSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (selectedValue) => {
    onChange({ target: { name: 'gender', value: selectedValue } });
    setIsOpen(false);
  };
  return (
    <div className="custom-select-container">
      <div 
        className={`custom-select-header filldata-input ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? (
          <div className="selected-option">
            {value === 'male' ? <FaMars className="gender-icon" /> : <FaVenus className="gender-icon" />}
            {value === 'male' ? 'Male' : 'Female'}
          </div>
        ) : 'Select gender'}
        <span className={`arrow ${isOpen ? 'open' : ''}`}></span>
      </div>
      {isOpen && (
        <div className="custom-select-options">
          <div className={`select-option ${value === 'male' ? 'selected' : ''}`} onClick={() => handleSelect('male')}>
            <FaMars className="gender-icon" /><span>Male</span>
          </div>
          <div className={`select-option ${value === 'female' ? 'selected' : ''}`} onClick={() => handleSelect('female')}>
            <FaVenus className="gender-icon" /><span>Female</span>
          </div>
        </div>
      )}
    </div>
  );
};

const CustomDateInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
  <div className="custom-date-input" onClick={onClick}>
    <input
      type="text"
      className="filldata-input"
      value={value}
      onChange={() => {}}
      placeholder={placeholder}
      ref={ref}
    />
    <FaCalendarAlt className="calendar-icon" />
  </div>
));

const FillData = ({ isOpen, onClose, onNext }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.fillData);

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    motherName: '',
    birthdate: '',
    nationalNumber: '',
    gender: ''
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        motherName: '',
        birthdate: '',
        nationalNumber: '',
        gender: ''
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (status === 'succeeded') {
      onClose(); // إغلاق المودال
      window.location.reload(); // إعادة تحميل الصفحة
    }
  }, [status, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('filldata-modal-overlay')) {
      onClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'nationalNumber') {
      const numbersOnly = value.replace(/[^0-9]/g, '');
      if (numbersOnly.length <= 11) {
        setFormData(prev => ({ ...prev, [name]: numbersOnly }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, birthdate: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitPatientData(formData));
  };

  return (
    <div className="filldata-modal-overlay" onClick={handleOverlayClick}>
      <div className="filldata-modal-content">
        <AuthBanner onClose={onClose} />
        <div className="filldata-content-container">
          <h1 className="filldata-title">We Need Some<br />Info About You!</h1>
          <p className="filldata-subtitle">
            A verification code has been sent to you successfully.<br />
            Use it here.
          </p>
          <form onSubmit={handleSubmit}>
           {/* First Name and Middle Name */}
            <div className="filldata-form-group">
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  className="filldata-input"
                  placeholder="Enter first name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  className="filldata-input"
                  placeholder="Enter middle name"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Last Name and Mother Name */}
            <div className="filldata-form-group">
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  className="filldata-input"
                  placeholder="Enter last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  className="filldata-input"
                  placeholder="Enter mother name"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Birthdate and National Number */}
            <div className="filldata-form-group">
              <div style={{ flex: 1 }}>
                <DatePicker
                  selected={formData.birthdate}
                  onChange={handleDateChange}
                  customInput={<CustomDateInput />}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select birthdate"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  maxDate={new Date()}
                  className="custom-datepicker"
                  calendarClassName="custom-calendar"
                  popperClassName="custom-popper"
                  wrapperClassName="custom-wrapper"
                />
              </div>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="11"
                  className="filldata-input national-number-input"
                  placeholder="Enter national number"
                  name="nationalNumber"
                  value={formData.nationalNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Gender and Submit Button (Desktop) */}
            <div className="filldata-form-group desktop-only">
              <div style={{ flex: 1 }}>
                <CustomGenderSelect
                  value={formData.gender}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ flex: 1 }}>
                <button type="submit" className="filldata-next-button">
                  Next
                </button>
              </div>
            </div>

            {/* Gender and Submit Button (Mobile) */}
            <div className="mobile-only">
              <div className="filldata-form-group">
                <div style={{ flex: 1 }}>
                  <CustomGenderSelect
                    value={formData.gender}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            <button type="submit" className="filldata-next-button">
              {status === 'loading' ? 'Submitting...' : 'Next'}
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FillData;


