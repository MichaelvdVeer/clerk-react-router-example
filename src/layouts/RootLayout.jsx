import { Outlet } from "react-router";
import { Box, Flex, Spinner, Center } from "@chakra-ui/react";
import { Suspense } from "react";

const RootLayout = () => {
  return (
    <Box>
      {/* Main content with Suspense for route outlet */}
      <Flex direction="column" minHeight="calc(100vh - 56px)" width="100%">
        <Suspense
          fallback={
            <Center height="100vh">
              <Spinner color="#242424" size="xl" />
            </Center>
          }
        >
          <Outlet />
        </Suspense>
      </Flex>
    </Box>
  );
};

export default RootLayout;
