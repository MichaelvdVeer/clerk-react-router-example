// src/components/AppRoutes.jsx
import React, { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { Spinner, Center } from "@chakra-ui/react";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

// Lazy-loaded components
const AuthenticationPage = React.lazy(() =>
  import("../pages/AuthenticationPage")
);
const RootLayout = React.lazy(() => import("../layouts/RootLayout"));
const ProtectedRoute = React.lazy(() => import("./ProtectedRoute"));
const ProtectedRouteOnboarding = React.lazy(() =>
  import("./ProtectedRouteOnboarding")
);
const OnboardingPage = React.lazy(() => import("../pages/OnboardingPage"));
const FeedPage = React.lazy(() => import("../pages/FeedPage"));

// Loading spinner
const loadingSpinner = (
  <Center h="100vh">
    <Spinner color="#242424" size="xl" />
  </Center>
);

const AppRoutes = (isSignedIn) => {
  return createBrowserRouter(
    [
      {
        path: "/",
        element: (
          <Suspense fallback={loadingSpinner}>
            {isSignedIn ? <Navigate to="/feed" /> : <AuthenticationPage />}
          </Suspense>
        ),
      },
      {
        path: "/sso-callback",
        element: <AuthenticateWithRedirectCallback />,
      },
      {
        path: "/onboarding",
        element: (
          <Suspense fallback={loadingSpinner}>
            <ProtectedRouteOnboarding element={<OnboardingPage />} />
          </Suspense>
        ),
      },
      {
        element: (
          <Suspense fallback={loadingSpinner}>
            <RootLayout />
          </Suspense>
        ),
        children: [
          { path: "/feed", element: <ProtectedRoute element={<FeedPage />} /> },
        ],
      },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionStatusRevalidation: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );
};

export default AppRoutes;
