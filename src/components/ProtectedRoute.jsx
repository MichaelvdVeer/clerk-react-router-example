import PropTypes from "prop-types";
import { Navigate } from "react-router";
import { useAuth } from "@clerk/clerk-react";

const ProtectedRoute = ({ element }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
