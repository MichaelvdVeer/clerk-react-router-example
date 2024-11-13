import { Group, InputElement } from "@chakra-ui/react";
import { cloneElement, forwardRef } from "react";
import PropTypes from "prop-types";

export const InputGroup = forwardRef(function InputGroup(props, ref) {
  const {
    startElement,
    startElementProps,
    endElement,
    endElementProps,
    children,
    ...rest
  } = props;

  return (
    <Group ref={ref} {...rest}>
      {startElement && (
        <InputElement pointerEvents="none" {...startElementProps}>
          {startElement}
        </InputElement>
      )}
      {cloneElement(children, {
        ...(startElement && { ps: "calc(var(--input-height) - 6px)" }),
        ...(endElement && { pe: "calc(var(--input-height) - 6px)" }),
        ...children.props,
      })}
      {endElement && (
        <InputElement placement="end" {...endElementProps}>
          {endElement}
        </InputElement>
      )}
    </Group>
  );
});

InputGroup.propTypes = {
  startElement: PropTypes.node, // Can be any valid React node
  startElementProps: PropTypes.object, // Object for additional props to pass to the start element
  endElement: PropTypes.node, // Can be any valid React node
  endElementProps: PropTypes.object, // Object for additional props to pass to the end element
  children: PropTypes.element.isRequired, // The children prop must be a single React element
};
