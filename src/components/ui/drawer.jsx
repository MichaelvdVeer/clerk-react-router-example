import { Drawer as ChakraDrawer, Portal } from "@chakra-ui/react";
import { CloseButton } from "./close-button";
import { forwardRef } from "react";
import PropTypes from "prop-types";

export const DrawerContent = forwardRef(function DrawerContent(props, ref) {
  const { children, portalled = true, portalRef, offset, ...rest } = props;
  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ChakraDrawer.Positioner padding={offset}>
        <ChakraDrawer.Content ref={ref} {...rest} asChild={false}>
          {children}
        </ChakraDrawer.Content>
      </ChakraDrawer.Positioner>
    </Portal>
  );
});

DrawerContent.propTypes = {
  children: PropTypes.node.isRequired, // children are required and can be any React node
  portalled: PropTypes.bool, // portalled is optional, a boolean (default is true)
  portalRef: PropTypes.object, // portalRef is optional, an object (can be null or a ref)
  offset: PropTypes.string, // offset is optional, a string (it can be used for padding)
};

export const DrawerCloseTrigger = forwardRef(function DrawerCloseTrigger(
  props,
  ref
) {
  return (
    <ChakraDrawer.CloseTrigger
      position="absolute"
      top="2"
      insetEnd="2"
      {...props}
      asChild
    >
      <CloseButton size="sm" ref={ref} />
    </ChakraDrawer.CloseTrigger>
  );
});

DrawerCloseTrigger.propTypes = {
  children: PropTypes.node, // children is optional, as the CloseButton might not need any content
};

export const DrawerTrigger = ChakraDrawer.Trigger;
export const DrawerRoot = ChakraDrawer.Root;
export const DrawerFooter = ChakraDrawer.Footer;
export const DrawerHeader = ChakraDrawer.Header;
export const DrawerBody = ChakraDrawer.Body;
export const DrawerBackdrop = ChakraDrawer.Backdrop;
export const DrawerDescription = ChakraDrawer.Description;
export const DrawerTitle = ChakraDrawer.Title;
export const DrawerActionTrigger = ChakraDrawer.ActionTrigger;
