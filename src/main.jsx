import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as ChakraProvider } from "./components/ui/provider";
import { defaultSystem } from "@chakra-ui/react";
import store from "./app/store";
import App from "./app/app";
import "../styles/styles.css";

const root = createRoot(document.getElementById("root"));

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error("Clerk publishable key is not defined.");
}

root.render(
  <ReduxProvider store={store}>
    <ChakraProvider value={defaultSystem}>
      <ClerkProvider publishableKey={clerkPublishableKey}>
        <App />
      </ClerkProvider>
    </ChakraProvider>
  </ReduxProvider>
);

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
