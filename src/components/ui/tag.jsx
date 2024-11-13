import { Tag as ChakraTag } from "@chakra-ui/react";
import { forwardRef } from "react";
import PropTypes from "prop-types";

export const Tag = forwardRef(function Tag(props, ref) {
  const {
    startElement,
    endElement,
    onClose,
    closable = !!onClose,
    children,
    ...rest
  } = props;

  return (
    <ChakraTag.Root ref={ref} {...rest}>
      {startElement && (
        <ChakraTag.StartElement>{startElement}</ChakraTag.StartElement>
      )}
      <ChakraTag.Label>{children}</ChakraTag.Label>
      {endElement && <ChakraTag.EndElement>{endElement}</ChakraTag.EndElement>}
      {closable && (
        <ChakraTag.EndElement>
          <ChakraTag.CloseTrigger onClick={onClose} />
        </ChakraTag.EndElement>
      )}
    </ChakraTag.Root>
  );
});

Tag.propTypes = {
  startElement: PropTypes.node, // startElement can be any renderable content, including React components
  endElement: PropTypes.node, // endElement can also be any renderable content
  onClose: PropTypes.func, // onClose is a function to handle the closing action
  closable: PropTypes.bool, // closable is a boolean that determines whether the tag can be closed
  children: PropTypes.node.isRequired, // children can be any renderable content, and is required
};
