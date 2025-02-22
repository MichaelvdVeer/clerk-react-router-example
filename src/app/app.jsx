import { useAuth } from "@clerk/react-router";
import { RouterProvider } from "react-router";
import ErrorBoundary from "../components/ErrorBoundary";
import AppRoutes from "../components/AppRoutes";
import LoadingPage from "../components/LoadingPage";

const App = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <LoadingPage />;
  }

  const router = AppRoutes(isSignedIn);

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
