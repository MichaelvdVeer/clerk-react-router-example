"use client";

import { For, SegmentGroup } from "@chakra-ui/react";
import { forwardRef, useMemo } from "react";
import PropTypes from "prop-types";

function normalize(items) {
  return items.map((item) => {
    if (typeof item === "string") return { value: item, label: item };
    return item;
  });
}

export const SegmentedControl = forwardRef(function SegmentedControl(
  props,
  ref
) {
  const { items, ...rest } = props;
  const data = useMemo(() => normalize(items), [items]);

  return (
    <SegmentGroup.Root ref={ref} {...rest}>
      <SegmentGroup.Indicator />
      <For each={data}>
        {(item) => (
          <SegmentGroup.Item
            key={item.value}
            value={item.value}
            disabled={item.disabled}
          >
            <SegmentGroup.ItemText>{item.label}</SegmentGroup.ItemText>
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        )}
      </For>
    </SegmentGroup.Root>
  );
});

SegmentedControl.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string, // Item can be a string
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        disabled: PropTypes.bool, // Optional flag to disable item
      }), // Or it can be an object with 'value', 'label', and optional 'disabled' property
    ])
  ).isRequired, // items is a required prop that must be an array
};
