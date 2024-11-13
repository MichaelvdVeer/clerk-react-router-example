import { Field as ChakraField } from "@chakra-ui/react";
import { forwardRef } from "react";
import PropTypes from "prop-types";

export const Field = forwardRef(function Field(props, ref) {
  const { label, children, helperText, errorText, optionalText, ...rest } =
    props;
  return (
    <ChakraField.Root ref={ref} {...rest}>
      {label && (
        <ChakraField.Label>
          {label}
          <ChakraField.RequiredIndicator fallback={optionalText} />
        </ChakraField.Label>
      )}
      {children}
      {helperText && (
        <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
      )}
      {errorText && <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>}
    </ChakraField.Root>
  );
});

Field.propTypes = {
  label: PropTypes.string, // label is optional and must be a string
  children: PropTypes.node, // children is optional and can be any React node
  helperText: PropTypes.string, // helperText is optional and must be a string
  errorText: PropTypes.string, // errorText is optional and must be a string
  optionalText: PropTypes.string, // optionalText is optional and must be a string
};
