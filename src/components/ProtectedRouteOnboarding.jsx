import PropTypes from "prop-types";
import { Navigate } from "react-router";
import { useAuth } from "@clerk/react-router";

const ProtectedRoute = ({ element }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  return isSignedIn ? element : <Navigate to="/unauthorized" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
