import { Flex, Link, Box, Text } from "@chakra-ui/react";
import { Toaster, toaster } from "../toaster";
import { useAuth } from "@clerk/react-router";

const NavbarOnboarding = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error during sign out:", error);
      toaster.create({
        title: "Error logging during sign out.",
        description: "An error occurred while signing out. Please try again.",
        type: "error",
        duration: 5000,
      });
    }
  };

  return (
    <Flex
      as="nav"
      align="center"
      justifyContent="space-between"
      paddingLeft="5vw"
      paddingRight="5vw"
      width="100vw"
      paddingTop={{ base: "16px", md: "5px" }}
      paddingBottom={{ base: "16px", md: "5px" }}
      backgroundColor="#FFFFFF"
      borderBottom="1px solid"
      borderColor="#F0F0F0"
      height="56px"
    >
      <Text>Logo</Text>
      <Box paddingTop="2px" height="30px">
        {" "}
        <Link
          fontSize="13px"
          color="#7E7E7E"
          fontFamily="Helvetica Neue"
          textDecoration="none"
          fontWeight="bold"
          _hover={{ textDecoration: "underline" }}
          onClick={handleSignOut}
        >
          Sign out
        </Link>
        <Toaster />
      </Box>
    </Flex>
  );
};

export default NavbarOnboarding;
