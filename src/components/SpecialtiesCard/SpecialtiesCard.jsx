import React from 'react';
import './SpecialtiesCard.css';

const SpecialtiesCard = ({ icon, title, description, active, onClick }) => {
    return (
        <div
          className={`specialties-card ${active ? 'active' : ''}`}
          onClick={onClick}
        >
          <div className="icon">{icon}</div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      );
    };

export default SpecialtiesCard;
