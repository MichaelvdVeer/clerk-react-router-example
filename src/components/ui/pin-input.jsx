import { PinInput as ChakraPinInput, Group } from "@chakra-ui/react";
import { forwardRef } from "react";
import PropTypes from "prop-types";

export const PinInput = forwardRef(function PinInput(props, ref) {
  const { count = 6, inputProps, rootRef, attached, ...rest } = props;
  return (
    <ChakraPinInput.Root ref={rootRef} {...rest}>
      <ChakraPinInput.HiddenInput ref={ref} {...inputProps} />
      <ChakraPinInput.Control>
        <Group attached={attached}>
          {Array.from({ length: count }).map((_, index) => (
            <ChakraPinInput.Input
              key={index}
              index={index}
              border="1px solid #E5E5E8"
              borderRadius="5px"
              backgroundColor="#FAFAFA"
              _focus={{
                borderColor: "#D6D6DA",
                outline: "transparent",
              }}
            />
          ))}
        </Group>
      </ChakraPinInput.Control>
    </ChakraPinInput.Root>
  );
});

PinInput.propTypes = {
  count: PropTypes.number, // Ensure `count` is a number
  inputProps: PropTypes.object, // `inputProps` should be an object
  rootRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]), // `rootRef` can be a function or an object (ref)
  attached: PropTypes.bool, // `attached` should be a boolean
};
