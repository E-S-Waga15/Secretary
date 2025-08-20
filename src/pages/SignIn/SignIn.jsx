import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import "./SignIn.css";
import logoLogin from "../../assets/logoLogin.svg";
import secretary from "../../assets/secretary.svg";
import floor from "../../assets/floor.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { secretaryLogin } from "../../store/slices/secretaryAuthSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.secretaryAuth);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.type === "password" ? "password" : "name"]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await dispatch(secretaryLogin(formData));

    if (result.meta.requestStatus === "fulfilled" && result.payload.success) {
      navigate("/appointments");
    }
  };

  return (
    <div className="signin-page">
      <div className="left-panel">
        <div className="logo-box d-flex align-items-center">
          <img src={logoLogin} alt="Clinic Hub" className="logo-img me-2" />
          <h3 className="m-0">Clinic Hub</h3>
        </div>
        <img src={secretary} alt="Secretary" className="secretary-img" />
      </div>

      <div className="right-panel">
        <div className="login-bg-layer"></div>
        <div className="login-box">
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                placeholder="Enter clinic name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            {error && <Alert variant="danger">{error.message || error}</Alert>}

            <Button
              variant="primary"
              type="submit"
              className="w-100 login-button"
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>
          </Form>
        </div>
        <img src={floor} alt="Decoration" className="floor-img" />
      </div>
    </div>
  );
};

export default SignIn;
