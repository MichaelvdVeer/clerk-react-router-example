import { useAuth } from "@clerk/clerk-react";
import { RouterProvider } from "react-router-dom";
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
      <RouterProvider
        // future={{
        //   v7_startTransition: true,
        // }}
        router={router}
      />
    </ErrorBoundary>
  );
};

export default App;
