import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DoctorCard from "../../../../components/DoctorCard/DoctorCard";
import {
  fetchDoctorsBySpecialty,
  clearDoctors,
} from "../../../../store/slices/doctorsSlice";

import "./DoctorsModal.css";
import SpinnersLoading from "../../../../components/SpinnersLoading";

const DoctorsModal = ({
  isOpen,
  onClose,
  selectedSpecialty,
  selectedSpecialtyId,
  onBook,
}) => {
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector((state) => state.doctors);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [slideDirection, setSlideDirection] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 1200);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isOpen && selectedSpecialtyId) {
      dispatch(fetchDoctorsBySpecialty(selectedSpecialtyId));
    }
    return () => dispatch(clearDoctors());
  }, [isOpen, selectedSpecialtyId, dispatch]);

  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  const handlePrevClick = () => {
    setSlideDirection("slide-right");
    setCurrentIndex((prev) => (prev === 0 ? doctors.length - 4 : prev - 1));
    setTimeout(() => setSlideDirection(""), 500);
  };

  const handleNextClick = () => {
    setSlideDirection("slide-left");
    setCurrentIndex((prev) => (prev === doctors.length - 4 ? 0 : prev + 1));
    setTimeout(() => setSlideDirection(""), 500);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("doctors-modal-overlay")) {
      onClose();
    }
  };

  const displayedDoctors = isLargeScreen
    ? doctors.slice(currentIndex, currentIndex + 4)
    : doctors;

  if (!isOpen) return null;

  return (
    <div className="doctors-modal-overlay" onClick={handleOverlayClick}>
      <div className="doctors-modal-content">
        <div className="doctors-modal-header">
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
          <h2 className="specialty-title">{selectedSpecialty}</h2>
        </div>

        <div className="doctors-modal-body">
          {loading ? (
            <>
              <SpinnersLoading/>
              <p>Loading doctors...</p>
            </>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="doctors-slider-container">
              {isLargeScreen && (
                <button
                  className="slider-button prev"
                  onClick={handlePrevClick}
                >
                  <FaChevronLeft />
                </button>
              )}

              <div className={`doctors-grid ${slideDirection}`}>
                {displayedDoctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    image={doctor.imageUrl}
                    name={doctor.name}
                    specialty={doctor.speciality.name}
                    bio={doctor.bio}
                    onAppointmentClick={() => onBook(doctor.id)}
                  />
                ))}
              </div>

              {isLargeScreen && (
                <button
                  className="slider-button next"
                  onClick={handleNextClick}
                >
                  <FaChevronRight />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsModal;
