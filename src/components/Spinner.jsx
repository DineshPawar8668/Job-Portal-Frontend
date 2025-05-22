import React from "react";
import { Spinner as BootstrapSpinner } from "react-bootstrap";

const Spinner = ({ height = "20vh" }) => {
  return (
    <div className="text-center my-5 d-flex flex-column align-items-center justify-content-center" style={{ height }}>
      <BootstrapSpinner animation="border" variant="primary" />
      <p>Loading data...</p>
    </div>
  );
};

export default Spinner;
