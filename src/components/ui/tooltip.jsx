import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react";
import { forwardRef } from "react";
import PropTypes from "prop-types";

export const Tooltip = forwardRef(function Tooltip(props, ref) {
  const {
    showArrow,
    children,
    disabled,
    portalled,
    content,
    contentProps,
    portalRef,
    ...rest
  } = props;

  if (disabled) return children;

  return (
    <ChakraTooltip.Root {...rest}>
      <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraTooltip.Positioner>
          <ChakraTooltip.Content ref={ref} {...contentProps}>
            {showArrow && (
              <ChakraTooltip.Arrow>
                <ChakraTooltip.ArrowTip />
              </ChakraTooltip.Arrow>
            )}
            {content}
          </ChakraTooltip.Content>
        </ChakraTooltip.Positioner>
      </Portal>
    </ChakraTooltip.Root>
  );
});

Tooltip.propTypes = {
  showArrow: PropTypes.bool, // Optional, whether to show the arrow or not
  children: PropTypes.node.isRequired, // The element that triggers the tooltip (required)
  disabled: PropTypes.bool, // Optional, whether the tooltip is disabled
  portalled: PropTypes.bool, // Optional, whether the tooltip should be portalled (default is true)
  content: PropTypes.node.isRequired, // The content to be displayed inside the tooltip (required)
  contentProps: PropTypes.object, // Optional additional props for ChakraTooltip.Content
  portalRef: PropTypes.object, // Optional, reference to a custom portal container
};
