import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./../../redux/slices/authSlice";
import { isValidNumber } from "./../../utils/validations";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
    confirmPassword: "",
    role: "employer",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    await dispatch(registerUser(form, navigate));
    navigate("/login");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "35rem", padding: "20px" }}>
        <h3 className="text-center">Create an Account</h3>
        <p className="text-center text-muted">
          Fill in the details below to get started.
        </p>
        <hr />

        <Form>
          <Row>
            {/* Full Name */}
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            {/* Email Address */}
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            {/* Role Selection */}
            <Col md={6}>
              <Form.Group controlId="role">
                <Form.Label>Select Role</Form.Label>
                <Form.Select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="employer">Employer</option>
                  <option value="jobseeker">Jobseeker</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            {/* Password */}
            <Col md={6}>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Register Button */}
          <Button
            variant="primary"
            className="mt-4 w-100"
            onClick={handleRegister}
          >
            Register
          </Button>

          {/* Login Redirect */}
          <p className="text-center mt-3">
            Already have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
              className="fw-bold text-decoration-none"
            >
              Login here
            </a>
          </p>
        </Form>
      </Card>
    </Container>
  );
}

export default Register;
