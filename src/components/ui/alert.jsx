import { Alert as ChakraAlert } from "@chakra-ui/react";
import { CloseButton } from "./close-button";
import { forwardRef } from "react";
import PropTypes from "prop-types";

export const Alert = forwardRef(function Alert(props, ref) {
  const {
    title,
    children,
    icon,
    closable,
    onClose,
    startElement,
    endElement,
    ...rest
  } = props;
  return (
    <ChakraAlert.Root ref={ref} {...rest}>
      {startElement || <ChakraAlert.Indicator>{icon}</ChakraAlert.Indicator>}
      {children ? (
        <ChakraAlert.Content>
          <ChakraAlert.Title>{title}</ChakraAlert.Title>
          <ChakraAlert.Description>{children}</ChakraAlert.Description>
        </ChakraAlert.Content>
      ) : (
        <ChakraAlert.Title flex="1">{title}</ChakraAlert.Title>
      )}
      {endElement}
      {closable && (
        <CloseButton
          size="sm"
          pos="relative"
          top="-2"
          insetEnd="-2"
          alignSelf="flex-start"
          onClick={onClose}
        />
      )}
    </ChakraAlert.Root>
  );
});

Alert.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node,
  icon: PropTypes.node,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  startElement: PropTypes.node,
  endElement: PropTypes.node,
};
