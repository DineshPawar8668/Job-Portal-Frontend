import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  return (
    <Card
      style={{
        background: "linear-gradient(to right, #0D47A1, rgb(73, 97, 121))",
        color: "white",
        border: "none",
      }}
    >
      <Card.Body>
        <Container>
          <Row>
            {/* About Us */}
            <Col md={4}>
              <h5>About Us</h5>
              <p>
                A trusted job platform connecting employers and job seekers with ease and efficiency.
              </p>
            </Col>

            {/* Quick Links */}
            <Col md={4}>
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/about-us" className="text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact-us" className="text-white">
                    Contact Us
                  </a>
                </li>
               
              </ul>
            </Col>

            {/* Contact Information */}
            <Col md={4}>
              <h5>Contact Us</h5>
              <p>Email: support@jobplatform.com</p>
              <p>Phone: +1 555 123 4567</p>
              <p>Location: 123 Career Street, Innovation City, USA</p>
            </Col>
          </Row>
        </Container>
      </Card.Body>

      <Card.Footer className="text-center" style={{ borderTop: "1px solid white" }}>
        &copy; {new Date().getFullYear()} Job Platform. All rights reserved.
      </Card.Footer>
    </Card>
  );
}

export default Footer;
