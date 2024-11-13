"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";
import PropTypes from "prop-types";

export function Provider(props) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>{props.children}</ColorModeProvider>
    </ChakraProvider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures that the 'children' prop is required and is of type 'node'
};
