import ErrorBoundary from "../components/ErrorBoundary";
import { Box } from "@chakra-ui/react";

const FeedPage = () => {
  return (
    <ErrorBoundary>
      <Box>Feed page</Box>
    </ErrorBoundary>
  );
};

export default FeedPage;
