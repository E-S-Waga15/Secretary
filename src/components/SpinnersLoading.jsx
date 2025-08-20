import React from "react";
import loadingSpinner from "../assets/spinner.svg";

const SpinnersLoading = ({ width = "200px" }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <img src={loadingSpinner} alt="Loading" style={{ width }} />
    </div>
  );
};

export default SpinnersLoading;
