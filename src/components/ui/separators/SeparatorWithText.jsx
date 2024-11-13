import { Box, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const SeparatorWithText = ({ text }) => {
  return (
    <Flex align="center" width="100%" my="12px">
      <Box flex="1" height="1px" backgroundColor="#F0F0F0" />
      <Text
        mx="12px"
        fontFamily="Helvetica Neue"
        fontSize="16px"
        color="#7E7E7E"
      >
        {text}
      </Text>
      <Box flex="1" height="1px" backgroundColor="#F0F0F0" />
    </Flex>
  );
};

SeparatorWithText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SeparatorWithText;
