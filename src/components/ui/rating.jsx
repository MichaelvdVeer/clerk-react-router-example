import { RatingGroup } from "@chakra-ui/react";
import { forwardRef } from "react";
import PropTypes from "prop-types";

export const Rating = forwardRef(function Rating(props, ref) {
  const { icon, count = 5, label, ...rest } = props;
  return (
    <RatingGroup.Root ref={ref} count={count} {...rest}>
      {label && <RatingGroup.Label>{label}</RatingGroup.Label>}
      <RatingGroup.HiddenInput />
      <RatingGroup.Control>
        {Array.from({ length: count }).map((_, index) => (
          <RatingGroup.Item key={index} index={index + 1}>
            <RatingGroup.ItemIndicator icon={icon} />
          </RatingGroup.Item>
        ))}
      </RatingGroup.Control>
    </RatingGroup.Root>
  );
});

Rating.propTypes = {
  icon: PropTypes.element.isRequired, // The icon used to represent each rating item (e.g., a star)
  count: PropTypes.number, // The number of rating items (default is 5)
  label: PropTypes.string, // Optional label text to be displayed above the rating group
};
