// src/layouts/DashboardLayout.jsx
import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
