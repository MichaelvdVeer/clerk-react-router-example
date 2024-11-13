import ErrorBoundary from "../components/ErrorBoundary";
import { Box } from "@chakra-ui/react";
import Headroom from "react-headroom";
import NavbarOnboarding from "../components/ui/navbars/NavbarOnboarding";

const OnboardingPage = () => {
  return (
    <ErrorBoundary>
      <Headroom>
        <NavbarOnboarding />
      </Headroom>
      <Box mt="56px">Onboarding page</Box>
    </ErrorBoundary>
  );
};

export default OnboardingPage;
