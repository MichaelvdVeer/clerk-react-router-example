function _optionalChain(ops) {
  let lastAccessLHS = undefined;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
      return undefined;
    }
    if (op === "access" || op === "optionalAccess") {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === "call" || op === "optionalCall") {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = undefined;
    }
  }
  return value;
}
import { Switch as ChakraSwitch } from "@chakra-ui/react";
import { forwardRef } from "react";
import PropTypes from "prop-types";

export const Switch = forwardRef(function Switch(props, ref) {
  const { inputProps, children, rootRef, trackLabel, thumbLabel, ...rest } =
    props;

  return (
    <ChakraSwitch.Root ref={rootRef} {...rest}>
      <ChakraSwitch.HiddenInput ref={ref} {...inputProps} />
      <ChakraSwitch.Control>
        <ChakraSwitch.Thumb>
          {thumbLabel && (
            <ChakraSwitch.ThumbIndicator
              fallback={_optionalChain([
                thumbLabel,
                "optionalAccess",
                (_) => _.off,
              ])}
            >
              {_optionalChain([thumbLabel, "optionalAccess", (_2) => _2.on])}
            </ChakraSwitch.ThumbIndicator>
          )}
        </ChakraSwitch.Thumb>
        {trackLabel && (
          <ChakraSwitch.Indicator fallback={trackLabel.off}>
            {trackLabel.on}
          </ChakraSwitch.Indicator>
        )}
      </ChakraSwitch.Control>
      {children != null && <ChakraSwitch.Label>{children}</ChakraSwitch.Label>}
    </ChakraSwitch.Root>
  );
});

Switch.propTypes = {
  inputProps: PropTypes.object, // Object for the input props, passed directly to the hidden input element
  children: PropTypes.node, // Children can be anything renderable (string, number, React elements, etc.)
  rootRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]), // Ref for the root element, can be a function or object
  trackLabel: PropTypes.shape({
    on: PropTypes.node, // Content for the "on" state of the track
    off: PropTypes.node, // Content for the "off" state of the track
  }), // Track label, which contains "on" and "off" content
  thumbLabel: PropTypes.shape({
    on: PropTypes.node, // Content for the "on" state of the thumb
    off: PropTypes.node, // Content for the "off" state of the thumb
  }), // Thumb label, which contains "on" and "off" content
};
