import React from 'react';
import './DoctorCard.css';

const DoctorCard = ({ image, name, specialty, onAppointmentClick }) => {
  return (
    <div className="doctor-card">
      <div className="doctor-image">
        <img src={image} alt={name} />
      </div>
      <h3 className="doctor-name">{name}</h3>
      <p className="doctor-specialty">{specialty}</p>
      <button 
        className="appointment-button"
        onClick={onAppointmentClick}
      >
        Appointment
      </button>
    </div>
  );
};

export default DoctorCard;
