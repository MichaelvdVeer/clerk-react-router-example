import { Skeleton as ChakraSkeleton, Circle, Stack } from "@chakra-ui/react";
import { forwardRef } from "react";
import PropTypes from "prop-types";

export const SkeletonCircle = (props) => {
  const { size, ...rest } = props;
  return (
    <Circle size={size} asChild>
      <ChakraSkeleton {...rest} />
    </Circle>
  );
};

SkeletonCircle.propTypes = {
  size: PropTypes.string.isRequired, // The size prop should be a string (e.g., '50px', '100px')
};

export const SkeletonText = forwardRef(function SkeletonText(props, ref) {
  const { noOfLines = 3, gap, ...rest } = props;
  return (
    <Stack gap={gap} width="full" ref={ref}>
      {Array.from({ length: noOfLines }).map((_, index) => (
        <ChakraSkeleton
          height="4"
          key={index}
          {...props}
          _last={{ maxW: "80%" }}
          {...rest}
        />
      ))}
    </Stack>
  );
});

SkeletonText.propTypes = {
  noOfLines: PropTypes.number, // Optional, number of skeleton lines to show
  gap: PropTypes.string, // Optional, gap between lines
};

export const Skeleton = ChakraSkeleton;
