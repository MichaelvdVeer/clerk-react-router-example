import {
  AbsoluteCenter,
  ProgressCircle as ChakraProgressCircle,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import PropTypes from "prop-types";

export const ProgressCircleRoot = ChakraProgressCircle.Root;

export const ProgressCircleRing = forwardRef(function ProgressCircleRing(
  props,
  ref
) {
  const { trackColor, cap, color, ...rest } = props;
  return (
    <ChakraProgressCircle.Circle {...rest} ref={ref}>
      <ChakraProgressCircle.Track stroke={trackColor} />
      <ChakraProgressCircle.Range stroke={color} strokeLinecap={cap} />
    </ChakraProgressCircle.Circle>
  );
});

ProgressCircleRing.propTypes = {
  trackColor: PropTypes.string, // `trackColor` should be a string (CSS color value)
  cap: PropTypes.oneOf(["butt", "round", "square"]), // `cap` should be one of the strokeLinecap options: 'butt', 'round', 'square'
  color: PropTypes.string, // `color` should be a string (CSS color value)
};

export const ProgressCircleValueText = forwardRef(
  function ProgressCircleValueText(props, ref) {
    return (
      <AbsoluteCenter>
        <ChakraProgressCircle.ValueText {...props} ref={ref} />
      </AbsoluteCenter>
    );
  }
);

ProgressCircleValueText.propTypes = {
  // ChakraProgressCircle.ValueText could have some specific props for content like `children`, `fontSize`, etc.
  children: PropTypes.node, // `children` can be any renderable content (text, numbers, etc.)
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // `fontSize` could be a string or a number
  // Other Chakra-specific props can be added here if necessary
};
