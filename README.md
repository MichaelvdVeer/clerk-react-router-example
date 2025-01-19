# Clerk React Router Example

This project is a minimal reproduction of an issue when using @clerk/react-router with a custom sign-up flow and React Router V7.
When migrating from @clerk/clerk-react to @clerk/react-router, an error message appears:

```javascript
Uncaught Error: useNavigate() may be used only in the context of a <Router> component.
```

I have tried several possible solutions:

- Using a different Node.js version,
- Using a different Vite version,
- Using a different React Router version

However, the previously mentioned error message persists.

Could you help me resolve this issue?

## Steps to run the project and reproduce the issue

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

Check the console, An error message appears:

```javascript
Uncaught Error: useNavigate() may be used only in the context of a <Router> component.
```
