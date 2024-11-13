import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";

const ProtectedRoute = ({ element }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Navigate to="/unauthorized" />;
  }

  // Check if the user is activated
  const isActivated = user?.publicMetadata.activated === true;

  if (!isActivated) {
    return <Navigate to="/onboarding" />;
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
