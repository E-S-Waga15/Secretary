// src/pages/SecretaryPage/SecretaryPage.jsx
import React, { useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import CreateAnAccount from "../../features/Login/CreateAnAccount";
import secretaryImg from "../../assets/secretaryPage.svg";
import { QRCodeSVG } from "qrcode.react";

const SecretaryPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div
      className="secretary-page p-4"
      style={{
        marginLeft: "260px",
        minHeight: "100vh",
        background: "#f4f6f9",
      }}
    >
      <Card className="shadow-lg border-0 rounded-4 p-4">
        <Row className="align-items-center">
          {/* Left side - Text & Button */}
          <Col md={6} className="d-flex flex-column justify-content-center">
            <h2 className="fw-bold mb-3" style={{ color: "#0d3b66" }}>
              Patients Accounts Management
            </h2>
            <p className="text-muted mb-4" style={{ fontSize: "1.05rem" }}>
              Easily create new patient accounts and manage their information
              with just a few clicks.
            </p>

            {/* Button Centered */}
            <div className="d-flex justify-content-center">
              <Button
                size="lg"
                className="d-flex align-items-center gap-2 border-0 px-4 py-2"
                style={{
                  backgroundColor: "#48A6A7",
                  borderRadius: "12px",
                  fontWeight: "600",
                }}
                onClick={() => setIsLoginOpen(true)}
              >
                <PlusCircle size={22} />
                Create New Account
              </Button>
            </div>
          </Col>

          {/* Right side - Smaller Image */}
          <Col md={6} className="text-center">
            <img
              src={secretaryImg}
              alt="Secretary illustration"
              style={{ maxWidth: "70%", height: "auto" }}
            />
          </Col>
        </Row>
      </Card>
      <div className="mt-4 d-flex justify-content-center gap-5 flex-wrap">
  {/* Website QR */}
  <Card className="shadow-sm border-0 rounded-4 text-center p-4">
    <h5 className="mb-2 fw-bold" style={{ color: "#48A6A7" }}>
      Clinic Website
    </h5>
    <p className="text-muted mb-3">Scan to visit our website</p>
    <QRCodeSVG value="https://clinic-hub-orpin.vercel.app/" size={200} />
  </Card>
   <div
   style={{
    width:"170px"
   }}
   >

   </div>
  {/* App Download QR */}
  <Card className="shadow-sm border-0 rounded-4 text-center p-4">
    <h5 className="mb-2 fw-bold" style={{ color: "#48A6A7" }}>
      Mobile App
    </h5>
    <p className="text-muted mb-3">Scan to download the app</p>
    <QRCodeSVG value="https://clinic-hub-orpin.vercel.app/files/Clinic_Hub.apk" size={200} />
  </Card>
</div>

      {/* Modals for Creating Account */}
      <CreateAnAccount
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
      />
    </div>
  );
};

export default SecretaryPage;
