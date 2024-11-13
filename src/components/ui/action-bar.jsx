import { ActionBar, Portal } from "@chakra-ui/react";
import { CloseButton } from "./close-button";
import { forwardRef } from "react";
import PropTypes from "prop-types";

export const ActionBarContent = forwardRef(function ActionBarContent(
  props,
  ref
) {
  const { children, portalled = true, portalRef, ...rest } = props;

  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ActionBar.Positioner>
        <ActionBar.Content ref={ref} {...rest} asChild={false}>
          {children}
        </ActionBar.Content>
      </ActionBar.Positioner>
    </Portal>
  );
});

ActionBarContent.propTypes = {
  children: PropTypes.node.isRequired,
  portalled: PropTypes.bool,
  portalRef: PropTypes.oneOfType([
    PropTypes.func, // function ref
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }), // object ref
  ]),
};

export const ActionBarCloseTrigger = forwardRef(function ActionBarCloseTrigger(
  props,
  ref
) {
  return (
    <ActionBar.CloseTrigger {...props} asChild ref={ref}>
      <CloseButton size="sm" />
    </ActionBar.CloseTrigger>
  );
});

ActionBarCloseTrigger.propTypes = {
  children: PropTypes.node,
};

export const ActionBarRoot = ActionBar.Root;
export const ActionBarSelectionTrigger = ActionBar.SelectionTrigger;
export const ActionBarSeparator = ActionBar.Separator;
