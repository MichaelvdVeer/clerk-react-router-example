import { HoverCard, Portal } from "@chakra-ui/react";
import { forwardRef } from "react";
import PropTypes from "prop-types";

export const HoverCardContent = forwardRef(function HoverCardContent(
  props,
  ref
) {
  const { portalled = true, portalRef, ...rest } = props;

  return (
    <Portal disabled={!portalled} container={portalRef}>
      <HoverCard.Positioner>
        <HoverCard.Content ref={ref} {...rest} />
      </HoverCard.Positioner>
    </Portal>
  );
});

HoverCardContent.propTypes = {
  portalled: PropTypes.bool,
  portalRef: PropTypes.object, // portalRef should be an object (usually a DOM element reference)
  children: PropTypes.node, // children is optional and can be any type of React node
};

export const HoverCardArrow = forwardRef(function HoverCardArrow(props, ref) {
  return (
    <HoverCard.Arrow ref={ref} {...props}>
      <HoverCard.ArrowTip />
    </HoverCard.Arrow>
  );
});

HoverCardArrow.propTypes = {
  children: PropTypes.node, // children is optional for the arrow
};

export const HoverCardRoot = HoverCard.Root;
export const HoverCardTrigger = HoverCard.Trigger;
