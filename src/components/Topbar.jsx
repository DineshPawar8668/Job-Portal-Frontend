import { Button, Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Topbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  return (
    <Navbar bg="light" className="p-3 shadow-sm">
      <Container fluid className="d-flex justify-content-between">
        <Button variant="primary" className="d-md-none" onClick={toggleSidebar}>
          ☰
        </Button>

        <div className="d-flex align-items-center ms-auto gap-3">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="rounded-circle"
          />
          <span className="fw-bold">User Name</span>
          <Button
            variant="danger"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Topbar;
