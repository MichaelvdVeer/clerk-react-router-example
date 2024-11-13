import { RadioCard } from "@chakra-ui/react";
import { Fragment, forwardRef } from "react";
import PropTypes from "prop-types";

export const RadioCardItem = forwardRef(function RadioCardItem(props, ref) {
  const {
    inputProps,
    label,
    description,
    addon,
    icon,
    indicator = <RadioCard.ItemIndicator />,
    indicatorPlacement = "end",
    ...rest
  } = props;

  const hasContent = label || description || icon;
  const ContentWrapper = indicator ? RadioCard.ItemContent : Fragment;

  return (
    <RadioCard.Item {...rest}>
      <RadioCard.ItemHiddenInput ref={ref} {...inputProps} />
      <RadioCard.ItemControl>
        {indicatorPlacement === "start" && indicator}
        {hasContent && (
          <ContentWrapper>
            {icon}
            {label && <RadioCard.ItemText>{label}</RadioCard.ItemText>}
            {description && (
              <RadioCard.ItemDescription>
                {description}
              </RadioCard.ItemDescription>
            )}
            {indicatorPlacement === "inside" && indicator}
          </ContentWrapper>
        )}
        {indicatorPlacement === "end" && indicator}
      </RadioCard.ItemControl>
      {addon && <RadioCard.ItemAddon>{addon}</RadioCard.ItemAddon>}
    </RadioCard.Item>
  );
});

RadioCardItem.propTypes = {
  inputProps: PropTypes.object, // Input properties, usually for accessibility
  label: PropTypes.node, // Can be any node (string, number, element, etc.)
  description: PropTypes.node, // Can also be any node
  addon: PropTypes.node, // Optional additional content at the end
  icon: PropTypes.node, // Icon to display alongside the label and description
  indicator: PropTypes.node, // Indicator to show in the item, default is RadioCard.ItemIndicator
  indicatorPlacement: PropTypes.oneOf(["start", "end", "inside"]), // Position of the indicator (default is 'end')
};

export const RadioCardRoot = RadioCard.Root;
export const RadioCardLabel = RadioCard.Label;
export const RadioCardItemIndicator = RadioCard.ItemIndicator;
