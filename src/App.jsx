import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Layout from "./components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./redux/slices/authSlice";
import { jobSeekerRoutes, employerRoutes } from "./routes/routes";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token || (allowedRoles && !allowedRoles.includes(userData?.role))) {
      navigate("/login");
    }
  }, [token, userData, navigate, allowedRoles]);

  if (!token || (allowedRoles && !allowedRoles.includes(userData?.role))) {
    return null;
  }

  return children;
};

function App() {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getUser());
    }
  }, [dispatch]);

  const getRoutesByRole = () => {
    switch (userData?.role) {
      case "jobseeker":
        return jobSeekerRoutes;
      case "employer":
        return employerRoutes;
      default:
        return [];
    }
  };

  const roleRoutes = getRoutesByRole();
  return (
    <Router>
      {/* Auth Routes */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* Protected Role-Based Routes */}
      {Object.keys(userData)?.length > 0 && userData?.role ? (
        <Layout>
          <Routes>
            {roleRoutes.map(({ path, element, protected: isProtected }) => (
              <Route
                key={path}
                path={path}
                element={
                  isProtected ? (
                    <ProtectedRoute allowedRoles={[userData.role]}>
                      {element}
                    </ProtectedRoute>
                  ) : (
                    element
                  )
                }
              />
            ))}
          </Routes>
        </Layout>
      ) : (
        ""
      )}
    </Router>
  );
}

export default App;
