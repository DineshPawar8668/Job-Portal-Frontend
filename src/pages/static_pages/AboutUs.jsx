import React from "react";
import { Container, Card } from "react-bootstrap";

function AboutUs() {
  return (
    <Container className="my-5">
      <h1 className="text-center fw-bold display-4 mb-4">Job Portal Platform</h1>
      <p className="text-center text-muted fs-5">
        Connecting employers with the right talent seamlessly.
      </p>

      <Card className="shadow-lg p-4">
        <Card.Body>
          <h3 className="text-primary fw-bold">Who We Are</h3>
          <p className="text-muted">
            Welcome to our <b>Job Portal Platform</b>, an efficient and reliable solution designed to connect job seekers with employers. We aim to simplify the hiring process by providing an intuitive interface for job listings, applications, and candidate management.
          </p>

          <h3 className="text-success fw-bold">Our Mission</h3>
          <p className="text-muted">
            Our mission is to bridge the gap between employers and qualified candidates by delivering a streamlined job search and recruitment experience for everyone.
          </p>

          <h3 className="text-danger fw-bold">Why Choose Us?</h3>
          <ul className="text-muted">
            <li>Role-based access for Employers and Job Seekers</li>
            <li>Easy job posting and application management</li>
            <li>Advanced search and filter options for jobs</li>
            <li>User-friendly dashboards tailored to each role</li>
            <li>Secure authentication and data privacy</li>
          </ul>

          <h3 className="text-warning fw-bold">Core Features</h3>
          <ul className="text-muted">
            <li>Job Listing Creation and Management</li>
            <li>Job Application Tracking</li>
            <li>Employer and Job Seeker Profiles</li>
            <li>Search and Filter Jobs</li>
            <li>Role-based Authentication and Authorization</li>
          </ul>

          <h3 className="text-info fw-bold">Our Vision</h3>
          <p className="text-muted">
            We envision a future where finding the perfect job or candidate is seamless, efficient, and accessible to all, enabling growth for individuals and businesses alike.
          </p>

          <h3 className="text-secondary fw-bold">Contact Us</h3>
          <p className="text-muted">
            Location: 123 Career Street, Innovation City, USA<br />
            Phone: +1 555 987 6543<br />
            Email: support@jobportalplatform.com
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AboutUs;
