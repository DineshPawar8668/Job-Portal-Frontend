import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function CustomNavbar({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleNavigation = (event, path) => {
    event.preventDefault(); // Prevent default refresh
    navigate(path);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{
        background: "linear-gradient(to right, #0D47A1, rgb(73, 97, 121))",
        padding: "10px 0",
      }}
    >
      <Container>
        <Navbar.Brand
          onClick={(e) => handleNavigation(e, "/")}
          className="text-white fw-bold"
          style={{ fontSize: "1.5rem", cursor: "pointer" }}
        >
          Hire Talent
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbar-nav"
          className="border-0"
          style={{ backgroundColor: "white" }}
        />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto text-center">
            <Nav.Link
              href=""
              onClick={(e) => handleNavigation(e, "/")}
              className="text-white fw-semibold"
            >
              Home
            </Nav.Link>

            <Nav.Link
              href=""
              onClick={(e) => handleNavigation(e, "/contact-us")}
              className="text-white fw-semibold"
            >
              Contact Us
            </Nav.Link>
            <Nav.Link
              href=""
              onClick={(e) => handleNavigation(e, "/about-us")}
              className="text-white fw-semibold"
            >
              About Us
            </Nav.Link>
            {/* <Nav.Link
              href=""
              onClick={(e) => handleNavigation(e, "/upcoming-feature")}
              className="text-white fw-semibold"
            >
              Upcoming Features
            </Nav.Link> */}
          </Nav>

          <Nav className="ms-auto d-flex align-items-center text-center">
            {user ? (
              <>
                <span className="text-white me-3 fw-bold">
                  Welcome, {user.name}
                </span>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="light" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
