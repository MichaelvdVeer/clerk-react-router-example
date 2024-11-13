import { useState, useEffect } from "react";
import { useMedia } from "react-use";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSignUp, useSignIn } from "@clerk/clerk-react";
import { Box, Input, Flex, Image, Text, Link, Spinner } from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { Toaster, toaster } from "../ui/toaster";
import { Button } from "../ui/button";
import { PinInput } from "../ui/pin-input";

const SignUpForm = () => {
  const isLargeScreen = useMedia("(min-width: 1280px)");
  const isMediumScreen = useMedia("(min-width: 768px)");
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isPasswordFieldFocused, setIsPasswordFieldFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingGoogle, setIsSubmittingGoogle] = useState(false);
  const [isSubmittingApple, setIsSubmittingApple] = useState(false);

  const [timer, setTimer] = useState(30);
  const [verifying, setVerifying] = useState(false);
  const [value, setValue] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [isResendingEmail, setIsResendingEmail] = useState(false);

  // Validation e-mail input field
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Vul een geldig e-mailadres in.";
  };

  // Validation password input field
  const validatePassword = (password) => {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasLetter) {
      return "Password must contain at least one letter.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsSubmitting(true);

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    if (emailValidationError || passwordValidationError) {
      setEmailError(emailValidationError);
      setPasswordError(passwordValidationError);
      setIsSubmitting(false);
      return;
    }

    setEmailError("");
    setPasswordError("");

    try {
      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerifying(true);
    } catch (err) {
      console.error("Error during sign up:", err.errors);
      if (Array.isArray(err.errors) && err.errors.length > 0) {
        const error = err.errors[0];
        if (error.code) {
          switch (error.code) {
            case "form_identifier_exists":
              setEmailError(
                "This email address is already in use. Please try another email address."
              );
              break;
            case "form_password_not_strong_enough":
              setPasswordError(
                "Use a different strong password. Use letters, numbers, and special characters."
              );
              break;
            default:
              setPasswordError(
                "An unknown error occurred. Please try again later."
              );
          }
        } else {
          setPasswordError(
            "An unknown error has occurred. Please try again later."
          );
        }
      } else {
        // If array is empty
        setPasswordError(
          "An unknown error has occurred. Please try again later."
        );
      }
      setIsSubmitting(false);
      setTimer(30);
    }
  };

  // Timer resend button verification code
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // This function handles the email verification process after a user attempts to verify their email address.
  // On successful verification, the user's session is activated and the user is redirected to the onboarding page.
  // The verification code must be exactly 6 digits long. If verification is complete, the user's session is set as active and
  // the user is navigated to the onboarding page. If verification fails, an error message is shown.
  // Note: The actual user data storage and processing occur in the backend, where Clerk Webhooks handle events such as user creation.
  // If storing the user data in the database fails, Svix will retry sending the webhook according to its retry schedule.

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsVerifying(true);

    try {
      const verificationCode = value.join("");

      if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {
        setVerificationError("The verification code must consist of 6 digits.");
        setIsVerifying(false);
        return;
      }

      // Update Create clerk user object and activate webhook
      // Webhook: uploadig new email, fullName, imageUrl and acceptTermsPrivacyAndAdult. And other actual (default-)data.
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });
      if (result.status === "complete") {
        await setActive({
          session: result.createdSessionId,
        });

        navigate("/onboarding");
      } else {
        console.error("Verification not completed:", result);
        setVerificationError(
          "Verification not completed. Check the code and try again."
        );
      }
    } catch (err) {
      console.error("Verification error:", err.errors);
      setVerificationError("Incorrect code entered. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  if (!signIn || !signUp) return null;

  const handleResendVerificationEmail = async () => {
    if (timer > 0) return;

    try {
      setIsResendingEmail(true);
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setTimer(30);
    } catch (err) {
      console.error("Error resending e-mail:", err.errors);
      toaster.create({
        title: "Error resending email.",
        description:
          "An error occurred while resending the email. Please try again later.",
        type: "error",
        duration: 5000,
      });
    } finally {
      setIsResendingEmail(false);
    }
  };

  // Social sign up handler
  const signUpWith = (strategy) => {
    return signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/onboarding",
    });
  };

  async function handleSocialSignUp(strategy) {
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
      signUpWith(strategy);
    }
  }

  if (!isLoaded) {
    return <Spinner size="xl" color="#242424" />;
  }

  if (verifying) {
    return (
      <>
        {isLargeScreen ? <Box height="76.9px" /> : undefined}
        <Box
          maxWidth="400px"
          width="100%"
          px="16px"
          py="24px"
          borderRadius="10px"
          border={isMediumScreen ? "1px solid #7E7E7E " : "none"}
          boxShadow={isMediumScreen ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none"}
        >
          <Box mb="28px">
            <Text
              fontSize="20px"
              fontWeight="bold"
              color="#242424"
              fontFamily="Helvetica Neue"
              textAlign="center"
              marginBottom="8px"
            >
              Confirm your email address
            </Text>
            {isMediumScreen ? (
              <Flex direction="column">
                <Text
                  fontSize="16px"
                  fontWeight="regular"
                  color="#242424"
                  fontFamily="Helvetica Neue"
                  textAlign="center"
                >
                  Enter the verification code that was sent to
                </Text>
                <Text
                  fontSize="16px"
                  fontWeight="regular"
                  fontFamily="Helvetica Neue"
                  color="#242424"
                  textAlign="center"
                >
                  {email}
                </Text>
              </Flex>
            ) : (
              <Flex direction="column">
                <Text
                  fontSize="16px"
                  fontWeight="regular"
                  color="#242424"
                  fontFamily="Helvetica Neue"
                  textAlign="center"
                >
                  Enter the verification code that was sent
                </Text>
                <Text
                  fontSize="16px"
                  fontWeight="regular"
                  color="#242424"
                  fontFamily="Helvetica Neue"
                  textAlign="center"
                >
                  to {email}
                </Text>
              </Flex>
            )}
          </Box>

          <form onSubmit={handleVerify} noValidate>
            <Flex width="100%" justifyContent="center">
              <PinInput
                otp
                placeholder=""
                value={value}
                onValueChange={(e) => setValue(e.value)}
              />
            </Flex>
            {verificationError && (
              <Flex marginTop="8px" justifyContent="center" alignItems="center">
                <Text
                  px="12px"
                  fontSize="12px"
                  color="#D6493E"
                  fontFamily="Helvetica Neue"
                >
                  {verificationError}
                </Text>
              </Flex>
            )}

            <Flex
              marginBottom="22px"
              marginTop="22px"
              width="100%"
              height="21px"
              justifyContent="center"
            >
              {isResendingEmail ? (
                <Spinner size="sm" color="#242424" />
              ) : (
                <Flex>
                  <Link
                    fontFamily="Helvetica Neue"
                    fontSize="14px"
                    fontWeight={timer > 0 ? "medium" : "bold"}
                    color={timer > 0 ? "#7E7E7E" : "#242424"}
                    cursor={timer > 0 ? "undefined" : "pointer"}
                    _hover={{
                      textDecoration: timer > 0 ? "none" : "underline",
                    }}
                    onClick={handleResendVerificationEmail}
                    style={{ pointerEvents: timer > 0 ? "none" : "auto" }}
                  >
                    Resend
                  </Link>
                  <Toaster />

                  {timer > 0 && (
                    <Text
                      ml="4px"
                      fontFamily="Helvetica Neue"
                      fontSize="14px"
                      fontWeight={timer > 0 ? "medium" : "bold"}
                      color={timer > 0 ? "#7E7E7E" : "#242424"}
                    >
                      ({timer})
                    </Text>
                  )}
                </Flex>
              )}
            </Flex>

            <Button
              type="submit"
              backgroundColor="#242424"
              color="#F2F2F2"
              fontFamily="Helvetica Neue"
              borderRadius="10px"
              fontSize="16px"
              _hover={{ backgroundColor: "#363636", boxShadow: "md" }}
              width="100%"
              height="45px"
              style={{ fontFamily: "Helvetica Neue", fontWeight: "bold" }}
              loading={isVerifying}
            >
              Confirm
            </Button>
          </form>
        </Box>
      </>
    );
  }
  return (
    <Box
      maxWidth="400px"
      width="100%"
      px="16px"
      py="24px"
      borderRadius="10px"
      border={isMediumScreen ? "1px solid #7E7E7E " : "none"}
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
          Create an account
        </Text>
      </Box>
      <form onSubmit={handleSubmit} noValidate>
        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          fontFamily="Helvetica Neue"
          color="#242424"
          aria-label="Enter your email address here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        />
        {emailError && (
          <Flex alignContent="center">
            <Text
              px="12px"
              marginTop="8px"
              fontSize="12px"
              color="#D6493E"
              fontFamily="Helvetica Neue"
            >
              {emailError}
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
          onFocus={() => setIsPasswordFieldFocused(true)}
        />
        <Flex alignContent="center">
          {passwordError ? (
            <Text
              px="12px"
              fontSize="12px"
              marginTop="8px"
              color="#D6493E"
              fontFamily="Helvetica Neue"
            >
              {passwordError}
            </Text>
          ) : (
            isPasswordFieldFocused &&
            !passwordError && (
              <Text
                px="12px"
                fontSize="12px"
                marginTop="8px"
                color="#7E7E7E"
                fontFamily="Helvetica Neue"
              >
                The password must be at least 8 characters long, and contain
                letters and at least 1 number.
              </Text>
            )
          )}
        </Flex>

        <Text
          marginTop="12px"
          px="12px"
          marginBottom="20px"
          fontSize="13px"
          color="#7E7E7E"
          fontFamily="Helvetica Neue"
          lineHeight="1.2"
        >
          By signing up, you agree to our{" "}
          <Link
            color="#7E7E7E"
            fontFamily="Helvetica Neue"
            fontSize="13px"
            fontWeight="bold"
            _hover={{ textDecoration: "underline" }}
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            color="#7E7E7E"
            fontFamily="Helvetica Neue"
            fontSize="13px"
            fontWeight="bold"
            _hover={{ textDecoration: "underline" }}
          >
            Privacy Policy.
          </Link>
        </Text>

        <Button
          type="submit"
          backgroundColor="#242424"
          color="#F2F2F2"
          borderRadius="10px"
          fontSize="16px"
          _hover={{ backgroundColor: "#363636", boxShadow: "md" }}
          width="100%"
          height="45px"
          marginBottom="24px"
          fontFamily="Helvetica Neue"
          fontWeight="bold"
          loading={isSubmitting}
        >
          Sign up
        </Button>
      </form>

      <SocialSignUpButton
        icon="/google-logo.svg"
        text="Continue with Google"
        marginBottom="12px"
        iconSize="21px"
        onClick={() => handleSocialSignUp("oauth_google")}
        loading={isSubmittingGoogle}
      />
      <SocialSignUpButton
        icon="/apple-logo.svg"
        text="Continue with Apple"
        iconSize="24px"
        onClick={() => handleSocialSignUp("oauth_apple")}
        loading={isSubmittingApple}
      />
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
    fontSize="13px"
    border="1px solid #242424"
    width="100%"
    height="45px"
    marginBottom={marginBottom}
    onClick={onClick}
    _hover={{
      backgroundColor: "#F2F2F2",
      boxShadow: "md",
    }}
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

export default SignUpForm;
