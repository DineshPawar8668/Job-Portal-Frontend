

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
  const token = localStorage.getItem("token");
  const { userData } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userData?.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !userData?.role) {
      dispatch(getUser());
    }
  }, [dispatch, token, userData?.role]);

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
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes for Logged In Users */}
        <Route
          path="/*"
          element={
            token && userData?.role ? (
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
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
