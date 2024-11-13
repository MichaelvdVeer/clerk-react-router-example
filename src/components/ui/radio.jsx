import { RadioGroup as ChakraRadioGroup } from "@chakra-ui/react";
import { forwardRef } from "react";
import PropTypes from "prop-types";

export const Radio = forwardRef(function Radio(props, ref) {
  const { children, inputProps, rootRef, ...rest } = props;
  return (
    <ChakraRadioGroup.Item ref={rootRef} {...rest}>
      <ChakraRadioGroup.ItemHiddenInput ref={ref} {...inputProps} />
      <ChakraRadioGroup.ItemIndicator />
      {children && (
        <ChakraRadioGroup.ItemText>{children}</ChakraRadioGroup.ItemText>
      )}
    </ChakraRadioGroup.Item>
  );
});

Radio.propTypes = {
  children: PropTypes.node, // The content inside the radio button, typically a label
  inputProps: PropTypes.object, // Props for the hidden input element inside the radio item
  rootRef: PropTypes.oneOfType([
    // Reference to the root element, can be a function or ref object
    PropTypes.func,
    PropTypes.object,
  ]),
};

export const RadioGroup = ChakraRadioGroup.Root;
