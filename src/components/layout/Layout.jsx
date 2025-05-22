import React from "react";
import Navbar from "../header/CustomNavbar";
import Footer from "../footer/Footer";
import { useSelector } from "react-redux";

const Layout = ({ user, children }) => {
  const {userData} = useSelector((state) => state.auth);
  return (
    <>
      <Navbar user={userData} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
