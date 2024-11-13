# Clerk React Router Example

This project is a minimal reproduction of an issue when using Clerk (custom sign up flow) and React Router, where enabling the `v7_startTransition` future flag from React Router causes unexpected navigation issues during email verification.

Currently, the project is using the latest version of React Router (version 6). React Router has announced that it will update to version 7, which includes several breaking changes. These changes can be tested using the `future` flags in the current version (v6). More information on these future flags and the changes in version 7 can be found here: [React Router Future Flags](https://reactrouter.com/en/main/upgrading/future).

In the React Router documentation, it mentions that useTransition (which is used in React Router v7) doesn’t work well with components that use promises (like React.lazy or async operations). I’m wondering if this issue is related to the fact that Clerk’s custom flow for verifying the email code involves promises, which might conflict with useTransition.

Could you offer any guidance or best practices for handling asynchronous operations (like Clerk’s email verification) while using the v7_startTransition flag? I want to ensure this issue is resolved before React Router v7 is fully released.

Thanks in advance for your help!

### Example Code for Redirecting After Verification

Here’s the relevant code snippet from the signupForm that handles the redirection to the `/onboarding` page after email verification:

```javascript
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

    // Attempt email address verification with Clerk
    const result = await signUp.attemptEmailAddressVerification({
      code: verificationCode,
    });

    if (result.status === "complete") {
      await setActive({
        session: result.createdSessionId,
      });

      // Redirect to onboarding page after successful verification
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
```

This code handles the verification process and redirects the user to the /onboarding page after successfully verifying their email address. However, with the v7_startTransition future flag enabled, users are unexpectedly redirected to the /feed page instead of staying on /onboarding after the verification is complete.

## Steps to Run the Project

Follow these steps to run the project locally and reproduce the issue:

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/MichaelvdVeer/clerk-react-router-example
cd clerk-react-router-example
```

### 2. Install Dependencies

Run the following command to install the required npm packages:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a .env file in the root of the project with the following environment variable:

```bash
VITE_CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
```

Replace <YOUR_CLERK_PUBLISHABLE_KEY> with your own Clerk Public Key, which you can find in your Clerk Dashboard under API Keys.

### 4. Start the Development Server

After setting up the environment, start the development server with:

```bash
npm run dev
```

## Testing the Expected Behavior (Without the v7_startTransition Flag)

1. Click the Create new account button.
2. Enter your email and password, and click the Sign up button.
3. After submitting, you will receive a verification code.
4. Enter the verification code.
5. After successful verification, the user will be redirected directly to the /onboarding page by useNavigate.
6. This is the expected behavior when the v7_startTransition flag is not enabled.

## Steps to Reproduce the Issue (With the v7_startTransition Flag Enabled)

1. Open the project and navigate to /src/app/app.jsx.
2. Uncomment the v7_startTransition future flag in the React Router configuration. This wil enable the future flag.
3. In the browser go back to signup page. Click the Create new account button.
4. Enter your email and password, and click the Sign up button.
5. After submitting, you will receive a verification code.
6. Enter the verification code.
7. When the v7_startTransition flag is enabled, the following behavior occurs:
   The user is initially redirected to the /onboarding page after successful email verification.
   However, while the /onboarding page is still loading, the user is unexpectedly redirected to the /feed page.
   This can be especially noticeable when throttling the connection to simulate a slower network.
