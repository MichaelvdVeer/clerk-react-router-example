import { useState } from "react";
import { useNavigate } from "react-router";
import { useMedia } from "react-use";
import { Link as RouterLink } from "react-router";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useSignIn, useSignUp, useClerk } from "@clerk/clerk-react";
import { newAccountClicked } from "../../features/auth/authSlice";
import { Box, Input, Text, Link, Flex, Image } from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import SeparatorWithText from "../ui/separators/SeparatorWithText";

const SignInForm = () => {
  const isMediumScreen = useMedia("(min-width: 768px)");
  const dispatch = useDispatch();
  const { signIn, isLoaded } = useSignIn();
  const { signUp } = useSignUp();
  const { setActive } = useClerk();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [identifierError, setIdentifierError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingGoogle, setIsSubmittingGoogle] = useState(false);
  const [isSubmittingApple, setIsSubmittingApple] = useState(false);

  if (!signIn || !signUp) return null;

  const handleNewAccountClick = () => {
    dispatch(newAccountClicked());
  };

  // Validation e-mail input field
  const validateIdentifier = (identifier) => {
    if (!identifier) {
      return "Email address or username is required.";
    }

    return "";
  };

  // Validation password input field
  const validatePassword = (password) => {
    if (!password) {
      return "Password is required.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) return;

    const identifierValidationError = validateIdentifier(identifier);
    const passwordValidationError = validatePassword(password);

    if (identifierValidationError || passwordValidationError) {
      setIdentifierError(identifierValidationError);
      setPasswordError(passwordValidationError);
      return;
    }

    setIdentifierError("");
    setPasswordError("");
    setIsSubmitting(true);

    try {
      const completeSignIn = await signIn.create({
        identifier: identifier,
        password,
      });
      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
        navigate("/feed");
      }
    } catch (err) {
      console.error("Error during sign in:", err.errors);
      if (Array.isArray(err.errors) && err.errors.length > 0) {
        const error = err.errors[0];
        if (error.code) {
          switch (error.code) {
            case "form_param_format_invalid":
              setIdentifierError("Enter a valid email address.");
              break;
            case "form_identifier_not_found":
              setIdentifierError("Email address not found.");
              break;
            case "strategy_for_user_invalid":
              setIdentifierError(
                "You registered with Google or Apple. Please sign in with that method."
              );
              break;
            case "form_password_incorrect":
              setPasswordError("Password is incorrect.");
              break;
            default:
              setPasswordError(
                "Er is een onbekende fout opgetreden. Probeer het later opnieuw."
              );
          }
        } else {
          setPasswordError(
            "Er is een onbekende fout opgetreden. Probeer het later opnieuw."
          );
        }
      } else {
        // If array is empty
        setPasswordError("An unknown error occurred. Please try again later.");
      }
      setIsSubmitting(false);
    }
  };

  // Social sign in handler
  const signInWith = (strategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/feed",
    });
  };

  async function handleSocialSignIn(strategy) {
    if (!signIn || !signUp) return null;

    if (strategy === "oauth_google") setIsSubmittingGoogle(true);
    if (strategy === "oauth_apple") setIsSubmittingApple(true);

    // If the user has an account in your application, but does not yet
    // have an OAuth account connected to it, you can transfer the OAuth
    // account to the existing user account.
    const userExistsButNeedsToSignIn =
      signUp.verifications.externalAccount.status === "transferable" &&
      signUp.verifications.externalAccount.error?.code ===
        "external_account_exists";

    if (userExistsButNeedsToSignIn) {
      const res = await signIn.create({ transfer: true });

      if (res.status === "complete") {
        setActive({
          session: res.createdSessionId,
        });
      }
    }

    // If the user has an OAuth account but does not yet
    // have an account in your app, you can create an account
    // for them using the OAuth information.
    const userNeedsToBeCreated =
      signIn.firstFactorVerification.status === "transferable";

    if (userNeedsToBeCreated) {
      const res = await signUp.create({
        transfer: true,
      });

      if (res.status === "complete") {
        setActive({
          session: res.createdSessionId,
        });
      }
    } else {
      signInWith(strategy);
    }
  }

  return (
    <Box
      maxWidth="400px"
      width="100%"
      px="16px"
      py="24px"
      border={isMediumScreen ? "1px solid #7E7E7E " : "none"}
      borderRadius={isMediumScreen ? "10px" : "8px"}
      boxShadow={isMediumScreen ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none"}
    >
      <Box mb="20px">
        <Text
          fontSize="20px"
          fontWeight="bold"
          fontFamily="Helvetica Neue"
          color="#242424"
          textAlign="center"
        >
          Welcome
        </Text>
      </Box>
      <form onSubmit={handleSubmit} noValidate>
        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          aria-label="Enter your email address here."
          fontFamily="Helvetica Neue"
          color="#242424"
          width="100%"
          height="45px"
          borderRadius="5px"
          backgroundColor="#FAFAFA"
          border="1px solid #E5E5E8"
          _focus={{
            borderColor: "#D6D6DA",
            outline: "transparent",
          }}
          _placeholder={{ color: "#7E7E7E", fontFamily: "Helvetica Neue" }}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        {identifierError && (
          <Flex alignContent="center">
            <Text
              px="12px"
              marginTop="8px"
              fontSize="12px"
              color="#D6493E"
              fontFamily="Helvetica Neue"
            >
              {identifierError}
            </Text>
          </Flex>
        )}

        <PasswordInput
          value={password}
          placeholder="Password"
          aria-label="Enter your password here"
          fontFamily="Helvetica Neue"
          color="#242424"
          width="100%"
          height="45px"
          marginTop="12px"
          borderRadius="5px"
          backgroundColor="#FAFAFA"
          border="1px solid #E5E5E8"
          _focus={{
            borderColor: "#D6D6DA",
            outline: "transparent",
          }}
          _placeholder={{ color: "#7E7E7E", fontFamily: "Helvetica Neue" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && (
          <Flex alignContent="center">
            <Text
              px="12px"
              marginTop="8px"
              fontSize="12px"
              color="#D6493E"
              fontFamily="Helvetica Neue"
            >
              {passwordError}
            </Text>
          </Flex>
        )}

        <Button
          type="submit"
          backgroundColor="#242424"
          marginTop="12px"
          color="#F2F2F2"
          borderRadius="10px"
          fontSize="16px"
          fontFamily="Helvetica Neue"
          fontWeight="bold"
          _hover={{
            backgroundColor: "#363636",
            boxShadow: "md",
          }}
          width="100%"
          height="45px"
          marginBottom="16px"
          loading={isSubmitting}
        >
          Sign in
        </Button>
      </form>

      <Flex width="100%" justifyContent="center">
        <Link
          fontFamily="Helvetica Neue"
          color="#7E7E7E"
          fontSize="14px"
          fontWeight="bold"
          marginBottom="16px"
          as={RouterLink}
          to="/"
          _hover={{ textDecoration: "underline" }}
        >
          Forgot password?
        </Link>
      </Flex>

      <SocialSignUpButton
        icon="/google-logo.svg"
        text="Continue with Google"
        marginBottom="12px"
        iconSize="21px"
        onClick={() => handleSocialSignIn("oauth_google")}
        loading={isSubmittingGoogle}
      />
      <SocialSignUpButton
        icon="/apple-logo.svg"
        text="Continue with Apple"
        iconSize="24px"
        onClick={() => handleSocialSignIn("oauth_apple")}
        loading={isSubmittingApple}
      />

      <SeparatorWithText text="Of" />

      <Button
        onClick={handleNewAccountClick}
        backgroundColor="#4A31FC"
        color="#F2F2F2"
        borderRadius="10px"
        _hover={{
          backgroundColor: "#5A41FC",
          boxShadow: "md",
        }}
        width="100%"
        height="45px"
        fontSize="16px"
        fontFamily="Helvetica Neue"
        fontWeight="bold"
      >
        Create new account
      </Button>
    </Box>
  );
};

const SocialSignUpButton = ({
  icon,
  text,
  marginBottom,
  iconSize,
  onClick,
  loading,
}) => (
  <Button
    backgroundColor="#FFFFFF"
    color="#242424"
    fontFamily="Helvetica Neue"
    fontWeight="regular"
    borderRadius="10px"
    border="1px solid #242424"
    width="100%"
    height="45px"
    _hover={{
      backgroundColor: "#F2F2F2",
      boxShadow: "md",
    }}
    marginBottom={marginBottom}
    onClick={onClick}
    loading={loading}
  >
    <Flex align="center" justify="center" width="100%" gap="16px">
      <Box width="24px" display="flex" justifyContent="center">
        <Image
          src={icon}
          alt={`${text} Logo`}
          height={iconSize}
          width={iconSize}
        />
      </Box>
      <Text
        fontFamily="Helvetica Neue"
        color="#242424"
        fontSize="16px"
        fontWeight="regular"
        textAlign="center"
      >
        {text}
      </Text>
    </Flex>
  </Button>
);

SocialSignUpButton.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  marginBottom: PropTypes.string,
  iconSize: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default SignInForm;
