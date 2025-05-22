import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginUser, getUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employer");
  const dispatch = useDispatch(0);
  const navigate = useNavigate(0);

  const handleLogin = async () => {
    await dispatch(loginUser({ email, password }));
    await dispatch(getUser());
    navigate("/");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "25rem", padding: "20px" }}>
        <h3 className="text-center">Welcome Back!</h3>
        <p className="text-center text-muted">Login to access your account</p>
        <hr />

        <Form>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {/* <Form.Group controlId="role" className="mt-3">
            <Form.Label>Select Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="employer">Employer</option>
              <option value="jobseeker">Jobseeker</option>
            </Form.Select>
          </Form.Group> */}

          <Button
            variant="primary"
            className="mt-4 w-100"
            onClick={handleLogin}
          >
            Login
          </Button>

          {/* <p className="text-center mt-3">
            <a href="#forgot-password" className="text-decoration-none">
              Forgot password?
            </a>
          </p> */}

          <hr />

          <p className="text-center">
            New here?{" "}
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
              className="fw-bold text-decoration-none"
            >
              Create an account
            </a>
          </p>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;
