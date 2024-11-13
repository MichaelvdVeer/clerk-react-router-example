import { Blockquote as ChakraBlockquote } from "@chakra-ui/react";
import { forwardRef } from "react";
import PropTypes from "prop-types";

export const Blockquote = forwardRef(function Blockquote(props, ref) {
  const { children, cite, citeUrl, showDash, icon, ...rest } = props;

  return (
    <ChakraBlockquote.Root ref={ref} {...rest}>
      {icon}
      <ChakraBlockquote.Content cite={citeUrl}>
        {children}
      </ChakraBlockquote.Content>
      {cite && (
        <ChakraBlockquote.Caption>
          {showDash ? <>&mdash;</> : null} <cite>{cite}</cite>
        </ChakraBlockquote.Caption>
      )}
    </ChakraBlockquote.Root>
  );
});

Blockquote.propTypes = {
  children: PropTypes.node.isRequired,
  cite: PropTypes.string,
  citeUrl: PropTypes.string,
  showDash: PropTypes.bool,
  icon: PropTypes.node,
};

export const BlockquoteIcon = ChakraBlockquote.Icon;
