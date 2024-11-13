import { Popover as ChakraPopover, IconButton, Portal } from "@chakra-ui/react";
import { forwardRef } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import PropTypes from "prop-types";

export const ToggleTip = forwardRef(function ToggleTip(props, ref) {
  const {
    showArrow,
    children,
    portalled = true,
    content,
    portalRef,
    ...rest
  } = props;

  return (
    <ChakraPopover.Root
      {...rest}
      positioning={{ ...rest.positioning, gutter: 4 }}
    >
      <ChakraPopover.Trigger asChild>{children}</ChakraPopover.Trigger>
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraPopover.Positioner>
          <ChakraPopover.Content
            width="auto"
            px="2"
            py="1"
            textStyle="xs"
            rounded="sm"
            ref={ref}
          >
            {showArrow && (
              <ChakraPopover.Arrow>
                <ChakraPopover.ArrowTip />
              </ChakraPopover.Arrow>
            )}
            {content}
          </ChakraPopover.Content>
        </ChakraPopover.Positioner>
      </Portal>
    </ChakraPopover.Root>
  );
});

ToggleTip.propTypes = {
  showArrow: PropTypes.bool, // Optional, defaults to false
  children: PropTypes.node.isRequired, // Children is required
  portalled: PropTypes.bool, // Optional, defaults to true
  content: PropTypes.node.isRequired, // Content to show in the popover
  portalRef: PropTypes.object, // Optional, for custom portal container
};

export const InfoTip = (props) => {
  const { children, ...rest } = props;
  return (
    <ToggleTip content={children} {...rest}>
      <IconButton variant="ghost" aria-label="info" size="2xs">
        <HiOutlineInformationCircle />
      </IconButton>
    </ToggleTip>
  );
};

InfoTip.propTypes = {
  children: PropTypes.node.isRequired, // Content to display in the InfoTip
};
