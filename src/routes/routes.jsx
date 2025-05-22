import ContactUs from "../pages/static_pages/ContactUs";
import AboutUs from "../pages/static_pages/AboutUs";
import JobSeekerPage from "../pages/JobSeeker/JobSeekerPage";
import EmpHome from "../pages/Employer/EmpHome";
import JobDetails from "../pages/Employer/JobDetails";

export const jobSeekerRoutes = [
  { path: "/", element: <JobSeekerPage />, protected: true },
  { path: "/contact-us", element: <ContactUs /> },
  { path: "/about-us", element: <AboutUs /> },
];

export const employerRoutes = [
  { path: "/", element: <EmpHome />, protected: true },
    { path: "/job/:id", element: <JobDetails />, protected: true },

  { path: "/contact-us", element: <ContactUs /> },
  { path: "/about-us", element: <AboutUs /> },
];
