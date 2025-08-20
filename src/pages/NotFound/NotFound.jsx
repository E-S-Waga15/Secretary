import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import animation1 from "../../assets/NotFound/notFound404.json";
import animation2 from "../../assets/NotFound/doctorMb.json";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NotFound = () => {
  const navigate = useNavigate();
  const isSmallScreen = window.innerWidth < 768;

  const smallSize = { height: "250px", width: "250px" };
  const largeSize1 = { height: "530px", width: "630px" };
  const largeSize2 = { height: "430px", width: "430px" };

  return (
    <>
      <div style={{ height: "60px" }}></div>
      <div
        className="container d-flex flex-column align-items-center justify-content-center text-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="row">
          <div className="col-12 col-md-6">
            <Player
              autoplay
              loop
              src={animation1}
              style={isSmallScreen ? smallSize : largeSize1}
            />
          </div>
          <div className="col-12 col-md-6">
            <Player
              autoplay
              loop
              src={animation2}
              style={isSmallScreen ? smallSize : largeSize2}
            />
          </div>
        </div>
        <h2 className="mt-4">Oops! Page Not Found</h2>
        <p className="text-muted mb-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </>
  );
};

export default NotFound;
