import { Timeline as ChakraTimeline } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const TimelineRoot = ChakraTimeline.Root;
export const TimelineContent = ChakraTimeline.Content;
export const TimelineItem = ChakraTimeline.Item;
export const TimelineIndicator = ChakraTimeline.Indicator;
export const TimelineTitle = ChakraTimeline.Title;
export const TimelineDescription = ChakraTimeline.Description;

export const TimelineConnector = (props) => {
  return (
    <ChakraTimeline.Connector>
      <ChakraTimeline.Separator />
      <ChakraTimeline.Indicator {...props} />
    </ChakraTimeline.Connector>
  );
};

TimelineConnector.propTypes = {
  // Expecting an object as props since we spread props onto ChakraTimeline.Indicator
  props: PropTypes.object, // This will validate that the props are a valid object
};
