import { useMedia } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import { toggleForm } from "../features/auth/authSlice";
import ErrorBoundary from "../components/ErrorBoundary";
import SignInForm from "../components/forms/SignInForm";
import SignUpForm from "../components/forms/SignUpForm";
import { Box, Flex, Text, Link } from "@chakra-ui/react";

const AuthenticationPage = () => {
  const isLargeScreen = useMedia("(min-width: 1280px)");
  const isMediumScreen = useMedia("(min-width: 768px) and (max-width: 1279px)");

  return (
    <ErrorBoundary>
      {isLargeScreen ? (
        <LargeScreenLayout />
      ) : isMediumScreen ? (
        <MediumScreenLayout />
      ) : (
        <SmallScreenLayout />
      )}
    </ErrorBoundary>
  );
};

const LargeScreenLayout = () => {
  const showSignInForm = useSelector((state) => state.auth.showSignInForm);
  const dispatch = useDispatch();
  const handleSignInClick = () => {
    dispatch(toggleForm());
  };
  return (
    <Box>
      <Flex height="100vh" justifyContent="center" minHeight="666.8px" mx="5vw">
        <Flex
          width="100%"
          maxWidth="2500px"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Flex
            direction="column"
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Flex direction="column" height="666.8px">
              <Box height="75px" />
              {showSignInForm ? <SignInForm /> : <SignUpForm />}
              {showSignInForm ? (
                <Flex
                  width="400px"
                  justifyContent="center"
                  alignItems="center"
                  paddingTop="40px"
                ></Flex>
              ) : (
                <Flex
                  width="400px"
                  justifyContent="center"
                  alignItems="center"
                  paddingTop="40px"
                >
                  <Text
                    color="#242424"
                    fontWeight="regular"
                    fontFamily="Helvetica Neue"
                    fontSize="16px"
                  >
                    Already have an account?{" "}
                    <Link
                      onClick={handleSignInClick}
                      _hover={{ textDecoration: "underline" }}
                      fontWeight="bold"
                      fontFamily="Helvetica Neue"
                      color="#242424"
                      fontSize="16px"
                    >
                      Sign in
                    </Link>
                  </Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

const MediumScreenLayout = () => {
  const showSignInForm = useSelector((state) => state.auth.showSignInForm);
  const dispatch = useDispatch();
  const handleSignInClick = () => {
    dispatch(toggleForm()); // Dispatch de Redux actie om de form te toggelen
  };
  return (
    <Box>
      <Flex
        direction="column"
        justifyContent="center"
        minHeight="886.8px"
        height="100vh"
        mx="5vw"
      >
        <Flex direction="column" alignItems="center">
          {showSignInForm ? <SignInForm /> : <SignUpForm />}
          {showSignInForm ? (
            <Flex
              direction="column"
              alignItems="center"
              width="100%"
              paddingTop="70px"
            ></Flex>
          ) : (
            <Flex
              direction="column"
              alignItems="center"
              width="100%"
              paddingTop="70px"
            >
              <Text
                color="#242424"
                fontWeight="400"
                fontFamily="Helvetica Neue"
                fontSize="16px"
              >
                Already have an account?{" "}
                <Link
                  onClick={handleSignInClick}
                  _hover={{ textDecoration: "underline" }}
                  fontWeight="bold"
                  fontFamily="Helvetica Neue"
                  fontSize="16px"
                >
                  Sign in
                </Link>
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

const SmallScreenLayout = () => {
  const showSignInForm = useSelector((state) => state.auth.showSignInForm);
  const dispatch = useDispatch();
  const handleSignInClick = () => {
    dispatch(toggleForm());
  };

  return (
    <Box>
      <Flex
        direction="column"
        justifyContent="center"
        minHeight="560px"
        height="100vh"
        mx="5vw"
      >
        <Flex direction="column" alignItems="center">
          {showSignInForm ? <SignInForm /> : <SignUpForm />}
          {showSignInForm ? undefined : (
            <Flex alignItems="center" paddingTop="15.02px" paddingBottom="12px">
              <Text
                color="#242424"
                fontWeight="regular"
                fontFamily="Helvetica Neue"
                fontSize="16px"
              >
                Already have an een account?{" "}
                <Link
                  onClick={handleSignInClick}
                  _hover={{ textDecoration: "underline" }}
                  fontWeight="bold"
                  fontFamily="Helvetica Neue"
                  color="#242424"
                  fontSize="16px"
                >
                  Sign in
                </Link>
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default AuthenticationPage;
