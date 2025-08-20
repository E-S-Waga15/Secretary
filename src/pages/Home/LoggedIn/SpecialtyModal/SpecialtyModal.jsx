// SpecialtiesModal.jsx (لا يوجد تغييرات هنا، هذا هو نفس الكود الذي تم تعديله في الرد السابق)
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { fetchSpecialties } from "../../../../store/slices/specialtySlice";
import SpinnersLoading from "../../../../components/SpinnersLoading";
import "./SpecialtyModal.css"; // تأكد أن هذا المسار واسم الملف صحيح 100%

const SpecialtiesModal = ({ isOpen, onClose, onSelectSpecialty }) => {
  const dispatch = useDispatch();
  const { specialties, loading, error } = useSelector(
    (state) => state.specialties
  );

  useEffect(() => {
    console.log("SpecialtiesModal useEffect triggered. isOpen:", isOpen);
    if (isOpen) {
      console.log("Dispatching fetchSpecialties...");
      dispatch(fetchSpecialties());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    console.log("Redux specialties state updated:", specialties);
    console.log("Loading state:", loading);
    console.log("Error state:", error);
    if (specialties && specialties.length > 0) {
      console.log("First specialty object details:", specialties[0]);
    }
  }, [specialties, loading, error]);

  const handleCardClick = (title, id) => {
    console.log(
      `Specialty card clicked: ${title} (ID: ${id}). Calling onSelectSpecialty.`
    );
    onSelectSpecialty(title, id);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("specialties-modal-overlay")) {
      console.log("Overlay clicked. Closing SpecialtiesModal via onClose().");
      onClose();
    }
  };

  if (!isOpen) {
    console.log("SpecialtiesModal is not open, returning null.");
    return null;
  }

  console.log("SpecialtiesModal is open. Rendering content.");
  return (
    <div className="specialties-modal-overlay" onClick={handleOverlayClick}>
      <div
        className="specialties-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="specialties-modal-header">
          <button className="specialties-close-button" onClick={onClose}>
            <FaTimes />
          </button>
          <h2 className="specialties-title">Our Medical Services</h2> 
        </div>

        <div className="specialties-modal-body">
          {loading ? (
            <div className="loading-container">
              <SpinnersLoading />
              <p>Loading medical services...</p>
            </div>
          ) : error ? (
            <p className="error">Error: {error}</p>
          ) : specialties && specialties.length > 0 ? (
            <div className="specialties-modal-grid">
              {specialties.map((specialty) => (
                <div
                  key={specialty.id}
                  className="specialties-modal-card"
                  onClick={() => handleCardClick(specialty.name, specialty.id)}
                >
                  <div className="specialties-modal-card-icon">
                    <img src={specialty.iconUrl} alt={specialty.name} />
                  </div>
                  <h3>{specialty.name}</h3>
                  <p>Get consultation from our {specialty.name} team</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No medical services found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecialtiesModal;
