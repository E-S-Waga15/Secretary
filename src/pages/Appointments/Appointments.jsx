// src/pages/Appointments.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Trash, CheckCircleFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import appointmentIcon from "../../assets/Appointment.svg";

// مودالاتك
import SpecialtiesModal from "../Home/LoggedIn/SpecialtyModal/SpecialtyModal";
import DoctorsModal from "../Home/LoggedIn/DoctorsModal/DoctorsModal";
import BookingModal from "../Home/LoggedIn/BookingModal/BookingModal";

// Slice
import { fetchAppointments } from "../../store/slices/appointmentsSlice";

const Appointments = () => {
  const dispatch = useDispatch();
  const { data: appointments = [], status, error } = useSelector(
    (state) => state.appointments
  );

  // state الخاص بالمودالات
  const [isSpecialtiesModalOpen, setIsSpecialtiesModalOpen] = useState(false);
  const [isDoctorsModalOpen, setIsDoctorsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState(null);
  const [idDoctor, setIdDoctor] = useState(null);

  // state للفلترة
  const [activeTab, setActiveTab] = useState("upcoming");

  // النص
  const textStyle = {
    fontSize: "2.5rem",
    fontWeight: "700",
    lineHeight: "1.3",
    color: "#1a1a1a",
  };

  // handlers
  const handleBookButtonClick = () => {
    setIsSpecialtiesModalOpen(true);
  };

  const handleSpecialtySelect = (title, id) => {
    setSelectedSpecialty(title);
    setSelectedSpecialtyId(id);
    setIsSpecialtiesModalOpen(false);
    setIsDoctorsModalOpen(true);
  };

  const handleBookDoctor = (doctorId) => {
    setIdDoctor(doctorId);
    setIsDoctorsModalOpen(false);
    setIsBookingModalOpen(true);
  };

  // جلب المواعيد عند تغيير التبويب
  useEffect(() => {
    dispatch(fetchAppointments(activeTab === "completed"));
  }, [activeTab, dispatch]);

  // Helper لعرض خطأ نصي
  const renderError = (err) => {
    if (!err) return null;
    if (typeof err === "string") return err;
    if (err.message) return err.message;
    return "An error occurred while loading appointments.";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        marginLeft: "260px",
        backgroundColor: "#F9FBFC",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container fluid="md" className="py-5">
        <Row className="align-items-start g-5">
          {/* النص وزر الحجز */}
          <Col xs={12} lg={5} className="order-1">
            <div className="px-2 text-center text-lg-start">
              <h1 style={textStyle}>
                Your steps <br /> towards <br /> better health <br /> start here.
              </h1>
              <p
                className="text-muted mt-3"
                style={{ fontSize: "1.05rem", lineHeight: "1.8" }}
              >
                Don’t wait until you get sick. <br />
                Take care of your health now and <br />
                invest in it.
              </p>
              <Button
                variant="dark"
                style={{
                  width: 250,
                  backgroundColor: "#006D6F",
                  borderColor: "#006D6F",
                  padding: "10px 28px",
                  fontWeight: "500",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  marginTop: "20px",
                }}
                onClick={handleBookButtonClick}
              >
                BOOK
              </Button>
            </div>
          </Col>

          {/* المواعيد */}
          <Col xs={12} lg={7} className="order-2">
            <h3 className="text-center mb-4">Patient Appointments</h3>

            {/* أزرار الفلترة */}
            <Row className="justify-content-center mb-4">
              <Col xs="auto">
                <Button
                  variant={activeTab === "upcoming" ? "dark" : "light"}
                  onClick={() => setActiveTab("upcoming")}
                  style={{ minWidth: "150px" }}
                >
                  Upcoming
                </Button>
              </Col>
              <Col xs="auto">
                <Button
                  variant={activeTab === "completed" ? "dark" : "light"}
                  onClick={() => setActiveTab("completed")}
                  style={{ minWidth: "150px" }}
                >
                  Completed
                </Button>
              </Col>
            </Row>

            {/* محتوى المواعيد Scrollable عمودي */}
            {status === "loading" && (
              <div className="text-center my-4">
                <Spinner animation="border" />
              </div>
            )}

            {status === "failed" && (
              <div className="text-center text-danger my-4">
                {renderError(error)}
              </div>
            )}

            {status === "succeeded" && appointments.length === 0 && (
              <div className="text-center text-muted my-4">
               There are no appointments here
              </div>
            )}

            {status === "succeeded" && appointments.length > 0 && (
              <div
                style={{
                  maxHeight: "350px", // ارتفاع يظهر حوالي 3 كروت
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  paddingRight: "0.5rem",
                }}
              >
                {appointments.map((a) => (
                  <Card
                    key={a.appointment_id}
                    className="appointment-card shadow-sm"
                    style={{ borderRadius: "15px" }}
                  >
                    <Card.Body className="d-flex align-items-center justify-content-between">
                      <img
                        src={appointmentIcon}
                        alt="appointment"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{a.start_time}</h6>
                        <small className="d-block text-muted">{a.date}</small>
                        <small className="text-muted">
                          {a.specialization} - {a.doctor_name}
                        </small>
                      </div>
                      {activeTab === "upcoming" ? (
                        <Button variant="light" className="p-2 rounded-circle">
                          <Trash size={24} className="text-danger" />
                        </Button>
                      ) : (
                        <CheckCircleFill size={28} className="text-success" />
                      )}
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* المودالات */}
      <SpecialtiesModal
        isOpen={isSpecialtiesModalOpen}
        onClose={() => setIsSpecialtiesModalOpen(false)}
        onSelectSpecialty={handleSpecialtySelect}
      />
      <DoctorsModal
        isOpen={isDoctorsModalOpen}
        onClose={() => setIsDoctorsModalOpen(false)}
        selectedSpecialty={selectedSpecialty}
        selectedSpecialtyId={selectedSpecialtyId}
        onBook={handleBookDoctor}
      />
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        idDoctor={idDoctor}
      />
    </div>
  );
};

export default Appointments;
