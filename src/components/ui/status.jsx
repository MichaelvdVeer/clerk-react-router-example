function _nullishCoalesce(lhs, rhsFn) {
  if (lhs != null) {
    return lhs;
  } else {
    return rhsFn();
  }
}
import { Status as ChakraStatus } from "@chakra-ui/react";
import { forwardRef } from "react";
import PropTypes from "prop-types";

const statusMap = {
  success: "green",
  error: "red",
  warning: "orange",
  info: "blue",
};

export const Status = forwardRef(function Status(props, ref) {
  const { children, value = "info", ...rest } = props;
  const colorPalette = _nullishCoalesce(
    rest.colorPalette,
    () => statusMap[value]
  );
  return (
    <ChakraStatus.Root ref={ref} {...rest} colorPalette={colorPalette}>
      <ChakraStatus.Indicator />
      {children}
    </ChakraStatus.Root>
  );
});

Status.propTypes = {
  children: PropTypes.node, // Children elements to display within the status component
  value: PropTypes.oneOf(["success", "error", "warning", "info"]), // A string that can be 'success', 'error', 'warning', or 'info' to define the status type
  colorPalette: PropTypes.string, // Optional string to specify the color palette manually (overrides value)
};
