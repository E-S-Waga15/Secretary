import React, { useState } from 'react';
import DoctorsModal from '../DoctorsModal/DoctorsModal';
import BookingModal from './BookingModal/BookingModal';

const AppointmentFlow = () => {
  const [showDoctorsModal, setShowDoctorsModal] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <>
      {showDoctorsModal && (
        <DoctorsModal
          isOpen={showDoctorsModal}
          onClose={() => setShowDoctorsModal(false)}
          selectedSpecialty="Ophthalmology"
          selectedSpecialtyId={1}
          onBook={() => {
            setShowDoctorsModal(false);
            setShowBookingModal(true);
          }}
        />
      )}

      {showBookingModal && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </>
  );
};

export default AppointmentFlow;
