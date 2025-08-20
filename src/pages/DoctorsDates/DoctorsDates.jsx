// src/pages/DoctorsDates.jsx
import React, { useEffect, useState } from "react";
import "./DoctorsDates.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchOnDutyDoctors } from "../../store/slices/onDutyDoctorsSlice";

const DoctorsDates = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.onDutyDoctors);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchOnDutyDoctors());
  }, [dispatch]);

  const filteredData = data.filter((item) =>
    (item.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="doctors-page">
      <div className="doctors-header">
        <input
          type="text"
          placeholder="Search doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="doctors-table-container">
        {loading && <p>Loading doctors...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          <table className="doctors-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Time</th>
                <th>Specialization</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((doc) => (
                  <tr key={doc.id}>
                    <td>{doc.name || "No Name"}</td>
                    <td>
                      {doc.start_time} - {doc.end_time}
                    </td>
                    <td>{doc.specialization}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No doctors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DoctorsDates;
