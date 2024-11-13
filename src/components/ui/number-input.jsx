import { NumberInput as ChakraNumberInput } from "@chakra-ui/react";
import { forwardRef } from "react";
import PropTypes from "prop-types";

export const NumberInputRoot = forwardRef(function NumberInput(props, ref) {
  const { children, ...rest } = props;
  return (
    <ChakraNumberInput.Root ref={ref} variant="outline" {...rest}>
      {children}
      <ChakraNumberInput.Control>
        <ChakraNumberInput.IncrementTrigger />
        <ChakraNumberInput.DecrementTrigger />
      </ChakraNumberInput.Control>
    </ChakraNumberInput.Root>
  );
});

NumberInputRoot.propTypes = {
  children: PropTypes.node.isRequired, // children is required and should be a React node
  // Add other prop types validation if needed (depending on your requirements)
};

export const NumberInputField = ChakraNumberInput.Input;
export const NumberInputScruber = ChakraNumberInput.Scrubber;
export const NumberInputLabel = ChakraNumberInput.Label;
