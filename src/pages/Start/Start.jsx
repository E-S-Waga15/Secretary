// src/pages/Start/Start.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import logoLogin from "../../assets/logoLogin.svg";
import startDoctor from "../../assets/startDoctor.svg";
import startBg from "../../assets/start.svg";

const Start = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("tokenSec");
    if (token) {
      navigate("/appointments");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
      {/* الخلفية */}
      <img
        src={startBg}
        alt="Background"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* اللوجو */}
      <div
        className="d-flex align-items-center"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 2,
        }}
      >
        <img
          src={logoLogin}
          alt="Clinic Hub"
          style={{ height: "50px", marginRight: "10px" }}
        />
        <h5 className="m-0 fw-bold text-white">Clinic Hub</h5>
      </div>

      {/* المحتوى */}
      <Container fluid className="px-4 position-relative" style={{ zIndex: 1 }}>
        <Row className="m-0 align-items-center" style={{ minHeight: "100vh" }}>
          {/* النص والزر */}
          <Col
            xs={12}
            md={6}
            className="d-flex flex-column justify-content-center text-center text-md-start mb-5 mb-md-0"
          >
            <h2 className="fw-bold mb-3" style={{ lineHeight: "1.4" }}>
              Your clinic,
              <br />
              just a tap away..
            </h2>
            <p style={{ color: "#555", maxWidth: "400px", margin: "0 " }}>
              Let’s make our doctors and patients more comfortable
            </p>

            <div className="d-flex justify-content-center justify-content-md-start">
              <Button
                style={{
                  backgroundColor: "#006d6d",
                  border: "none",
                  width: "80%",
                  maxWidth: "270px",
                  padding: "12px 0",
                  fontSize: "1.1rem",
                  marginTop: "20px",
                }}
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </div>
          </Col>

          {/* صورة */}
          <Col xs={12} md={6} className="text-center">
            <Image
              src={startDoctor}
              alt="Doctors"
              style={{
                width: "90%",
                maxWidth: "600px",
              }}
              fluid
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Start;
