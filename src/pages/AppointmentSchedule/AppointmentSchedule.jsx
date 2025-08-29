import React, { useState, useEffect } from "react";
import "./AppointmentSchedule.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDailyAppointments } from "../../store/slices/dailyAppointmentsSlice";
import { payAppointment } from "../../store/slices/paymentSlice";
import { cancelAppointment, clearCancelState } from "../../store/slices/cancelAppointmentSlice";
import { FaTimes, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentSchedule = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(
    (state) => state.dailyAppointments
  );

  const [search, setSearch] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    dispatch(fetchDailyAppointments({ date: today, finished: false }));

    // تنظيف حالة الإلغاء عند خروج المكون
    return () => {
      dispatch(clearCancelState());
    };
  }, [dispatch, today]);

  const filteredData = data.filter((item) =>
    item.patient_name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Custom Toast Content
  const CustomToastContent = (message) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FaCheckCircle
        style={{ color: "green", marginRight: "10px", fontSize: "24px" }}
      />
      <span>{message}</span>
    </div>
  );

  // Confirmation Toast for Cancel
  const confirmCancel = (appointmentId) => {
    toast(
      ({ closeToast }) => (
        <div style={{ textAlign: "center" }}>
          <h4 style={{ margin: "0 0 8px 0" }}>Cancel Appointment?</h4>
          <p style={{ fontSize: "14px", marginBottom: "12px" }}>
            Are you sure you want to cancel this appointment?
          </p>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <button
              className="toast-confirm"
              onClick={() => {
                handleCancel(appointmentId);
                closeToast();
              }}
            >
              Confirm
            </button>
            <button className="toast-cancel" onClick={closeToast}>
              Close
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
        className: "custom-toast",
      }
    );
  };

  // ✅ استدعاء API الإلغاء عبر Slice
  const handleCancel = (appointmentId) => {
    dispatch(cancelAppointment(appointmentId))
      .unwrap()
      .then((res) => {
        toast(CustomToastContent(res.message), {
          position: "top-center",
          autoClose: 3000,
        });

        // تحديث المواعيد بعد الإلغاء
        dispatch(fetchDailyAppointments({ date: today, finished: false }));
      })
      .catch((err) => {
        toast.error(err, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  // Confirmation Toast for Payment
  const confirmPayment = (appointmentId) => {
    toast(
      ({ closeToast }) => (
        <div style={{ textAlign: "center" }}>
          <h4 style={{ margin: "0 0 8px 0" }}>Confirm Payment?</h4>
          <p style={{ fontSize: "14px", marginBottom: "12px" }}>
            Do you want to confirm this payment?
          </p>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <button
              className="toast-confirmp"
              onClick={() => {
                handlePay(appointmentId);
                closeToast();
              }}
            >
              Confirm
            </button>
            <button className="toast-cancel" onClick={closeToast}>
              Close
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
        className: "custom-toast",
      }
    );
  };

  // ✅ استدعاء API الدفع عبر الـ Slice
  const handlePay = (appointmentId) => {
    dispatch(payAppointment(appointmentId))
      .unwrap()
      .then((res) => {
        toast(CustomToastContent(res.message), {
          position: "top-center",
          autoClose: 3000,
        });

        // تحديث المواعيد بعد الدفع
        dispatch(fetchDailyAppointments({ date: today, finished: false }));
      })
      .catch((err) => {
        toast.error(err, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="appointment-page">
      <div className="appointment-header">
        <input
          type="text"
          placeholder="Search by patient name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="appointment-controls">
          <button className="circle-btn">←</button>
          <button className="today-btn">Today</button>
          <button className="circle-btn">→</button>
        </div>
      </div>

      <div className="appointment-table-container">
        {loading && <p>Loading appointments...</p>}
        {error && <p className="error">Error: {error.message || error}</p>}
        {!loading && !error && (
          <table className="appointment-table">
            <thead>
              <tr>
                <th>Number</th>
                <th>Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Specialization</th>
                <th>Doctor</th>
                <th>Status</th>
                <th>Pay</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <tr key={row.appointment_id}>
                    <td>{index + 1}</td>
                    <td>
                      <strong>{row.patient_name}</strong>
                      <br />
                      <span className="phone">{row.phone}</span>
                    </td>
                    <td>{row.date}</td>
                    <td>{row.start_time}</td>
                    <td>{row.specialization}</td>
                    <td>{row.doctor_name}</td>

                    <td>
                      {row.paid ? (
                        <span className="status paid">Paid</span>
                      ) : (
                        <span className="status unpaid">Unpaid</span>
                      )}
                    </td>

                    <td>
                      <button
                        className="action-btn pay-btn"
                        onClick={() => confirmPayment(row.appointment_id)}
                        disabled={row.paid}
                      >
                        <FaMoneyBillWave />
                      </button>
                    </td>

                    <td>
                      <button
                        className="action-btn cancel-btn"
                        onClick={() => confirmCancel(row.appointment_id)}
                      >
                        <FaTimes />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default AppointmentSchedule;
