import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecialties } from '../../../../store/slices/specialtySlice';
import DoctorsModal from '../DoctorsModal/DoctorsModal';
import './Specialty.css';
import BookingModal from '../BookingModal/BookingModal';

const SpecialtySection = () => {
  const sectionRef = useRef(null);
  const dispatch = useDispatch();
  const { specialties, loading, error } = useSelector((state) => state.specialties);

  const [isDoctorsModalOpen, setIsDoctorsModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState();
  const [hasAnimated, setHasAnimated] = useState(false); // لتفادي التكرار
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [idDoctor, setIdDoctor] = useState();

  useEffect(() => {
    dispatch(fetchSpecialties());
  }, [dispatch]);

  // Observer after data is fetched
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !specialties.length || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const cards = entry.target.querySelectorAll('.clinic-specialty-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('visible');
              }, index * 100);
            });
            observer.unobserve(entry.target); // لا نحتاجه بعد الآن
            setHasAnimated(true);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [specialties, hasAnimated]);

  const handleCardClick = (title ,id) => {
    setSelectedSpecialty(title );
    setSelectedSpecialtyId(id);
    setIsDoctorsModalOpen(true);
  };

  return (
    <>
      <section className="clinic-specialty-section" ref={sectionRef}>
        <div className="clinic-specialty-header">
          <h2>Our Medical Services</h2>
          <h2 className="clinic-key-feature">
            KEY <span>FEATURE</span>
          </h2>
        </div>

        {loading ? (
          <p>Loading specialties...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="clinic-specialty-grid">
            {specialties.map((specialty) => (
              <div
                key={specialty.id}
                className="clinic-specialty-card"
                onClick={() => handleCardClick(specialty.name , specialty.id)}
              >
                <div className="clinic-icon">
                  <img src={specialty.iconUrl} alt={specialty.name} />
                </div>
                <h3>{specialty.name}</h3>
                <p>Get consultation from our {specialty.name} team</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <DoctorsModal
        isOpen={isDoctorsModalOpen}
        onClose={() => setIsDoctorsModalOpen(false)}
        selectedSpecialty={selectedSpecialty}
        selectedSpecialtyId={selectedSpecialtyId}
        onBook={(idDoctor) => {
          setIdDoctor(idDoctor);
          setIsDoctorsModalOpen(false);
          setIsBookingModalOpen(true);
        }}
      />
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        idDoctor={idDoctor}
      />
    </>
  );
};

export default SpecialtySection;
