"use client";

import { Select as ChakraSelect, Portal } from "@chakra-ui/react";
import { CloseButton } from "./close-button";
import { forwardRef } from "react";
import PropTypes from "prop-types";

export const SelectTrigger = forwardRef(function SelectTrigger(props, ref) {
  const { children, clearable, ...rest } = props;
  return (
    <ChakraSelect.Control {...rest}>
      <ChakraSelect.Trigger
        ref={ref}
        _focus={{
          borderColor: "#D6D6DA",
          outline: "transparent",
        }}
      >
        {children}
      </ChakraSelect.Trigger>
      <ChakraSelect.IndicatorGroup>
        {clearable && <SelectClearTrigger />}
        <ChakraSelect.Indicator />
      </ChakraSelect.IndicatorGroup>
    </ChakraSelect.Control>
  );
});

SelectTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  clearable: PropTypes.bool, // Optional prop for clearable functionality
};

const SelectClearTrigger = forwardRef(function SelectClearTrigger(props, ref) {
  return (
    <ChakraSelect.ClearTrigger asChild {...props} ref={ref}>
      <CloseButton
        size="xs"
        variant="plain"
        focusVisibleRing="inside"
        focusRingWidth="2px"
        pointerEvents="auto"
      />
    </ChakraSelect.ClearTrigger>
  );
});

export const SelectContent = forwardRef(function SelectContent(props, ref) {
  const { portalled = true, portalRef, ...rest } = props;
  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ChakraSelect.Positioner>
        <ChakraSelect.Content {...rest} ref={ref} />
      </ChakraSelect.Positioner>
    </Portal>
  );
});

SelectContent.propTypes = {
  portalled: PropTypes.bool, // Optional boolean to control portal behavior
  portalRef: PropTypes.object, // Reference to the portal container
};

export const SelectItem = forwardRef(function SelectItem(props, ref) {
  const { item, children, ...rest } = props;
  return (
    <ChakraSelect.Item key={item.value} item={item} {...rest} ref={ref}>
      {children}
      <ChakraSelect.ItemIndicator />
    </ChakraSelect.Item>
  );
});

SelectItem.propTypes = {
  item: PropTypes.shape({
    value: PropTypes.string.isRequired, // Each item must have a 'value' property
  }).isRequired,
  children: PropTypes.node, // Children can be any renderable content
};

export const SelectValueText = forwardRef(function SelectValueText(props, ref) {
  const { children, ...rest } = props;
  return (
    <ChakraSelect.ValueText {...rest} ref={ref}>
      <ChakraSelect.Context>
        {(select) => {
          const items = select.selectedItems;
          if (items.length === 0) return props.placeholder;
          if (children) return children(items);
          if (items.length === 1)
            return select.collection.stringifyItem(items[0]);
          return `${items.length} selected`;
        }}
      </ChakraSelect.Context>
    </ChakraSelect.ValueText>
  );
});

SelectValueText.propTypes = {
  children: PropTypes.func, // Optional function to render custom content
  placeholder: PropTypes.string, // Placeholder text when no items are selected
};

export const SelectRoot = forwardRef(function SelectRoot(props, ref) {
  return (
    <ChakraSelect.Root
      {...props}
      ref={ref}
      positioning={{ sameWidth: true, ...props.positioning }}
    />
  );
});

SelectRoot.propTypes = {
  positioning: PropTypes.shape({
    sameWidth: PropTypes.bool,
  }), // Optional prop for positioning behavior
};

export const SelectItemGroup = forwardRef(function SelectItemGroup(props, ref) {
  const { children, label, ...rest } = props;
  return (
    <ChakraSelect.ItemGroup {...rest} ref={ref}>
      <ChakraSelect.ItemGroupLabel>{label}</ChakraSelect.ItemGroupLabel>
      {children}
    </ChakraSelect.ItemGroup>
  );
});

SelectItemGroup.propTypes = {
  children: PropTypes.node, // Children can be any renderable content
  label: PropTypes.string, // Label for the item group
};

export const SelectLabel = ChakraSelect.Label;
export const SelectItemText = ChakraSelect.ItemText;

// "use client";

// import { Select as ChakraSelect, Portal } from "@chakra-ui/react";
// import { CloseButton } from "./close-button";
// import { forwardRef } from "react";

// export const SelectTrigger = forwardRef(function SelectTrigger(props, ref) {
//   const { children, clearable, ...rest } = props;
//   return (
//     <ChakraSelect.Control {...rest}>
//       <ChakraSelect.Trigger
//         ref={ref}
//       >
//         {children}
//       </ChakraSelect.Trigger>
//       <ChakraSelect.IndicatorGroup>
//         {clearable && <SelectClearTrigger />}
//         <ChakraSelect.Indicator />
//       </ChakraSelect.IndicatorGroup>
//     </ChakraSelect.Control>
//   );
// });

// const SelectClearTrigger = forwardRef(function SelectClearTrigger(props, ref) {
//   return (
//     <ChakraSelect.ClearTrigger asChild {...props} ref={ref}>
//       <CloseButton
//         size="xs"
//         variant="plain"
//         focusVisibleRing="inside"
//         focusRingWidth="2px"
//         pointerEvents="auto"
//       />
//     </ChakraSelect.ClearTrigger>
//   );
// });

// export const SelectContent = forwardRef(function SelectContent(props, ref) {
//   const { portalled = true, portalRef, ...rest } = props;
//   return (
//     <Portal disabled={!portalled} container={portalRef}>
//       <ChakraSelect.Positioner>
//         <ChakraSelect.Content {...rest} ref={ref} />
//       </ChakraSelect.Positioner>
//     </Portal>
//   );
// });

// export const SelectItem = forwardRef(function SelectItem(props, ref) {
//   const { item, children, ...rest } = props;
//   return (
//     <ChakraSelect.Item key={item.value} item={item} {...rest} ref={ref}>
//       {children}
//       <ChakraSelect.ItemIndicator />
//     </ChakraSelect.Item>
//   );
// });

// export const SelectValueText = forwardRef(function SelectValueText(props, ref) {
//   const { children, ...rest } = props;
//   return (
//     <ChakraSelect.ValueText {...rest} ref={ref}>
//       <ChakraSelect.Context>
//         {(select) => {
//           const items = select.selectedItems;
//           if (items.length === 0) return props.placeholder;
//           if (children) return children(items);
//           if (items.length === 1)
//             return select.collection.stringifyItem(items[0]);
//           return `${items.length} selected`;
//         }}
//       </ChakraSelect.Context>
//     </ChakraSelect.ValueText>
//   );
// });

// export const SelectRoot = forwardRef(function SelectRoot(props, ref) {
//   return (
//     <ChakraSelect.Root
//       {...props}
//       ref={ref}
//       positioning={{ sameWidth: true, ...props.positioning }}
//     />
//   );
// });

// export const SelectItemGroup = forwardRef(function SelectItemGroup(props, ref) {
//   const { children, label, ...rest } = props;
//   return (
//     <ChakraSelect.ItemGroup {...rest} ref={ref}>
//       <ChakraSelect.ItemGroupLabel>{label}</ChakraSelect.ItemGroupLabel>
//       {children}
//     </ChakraSelect.ItemGroup>
//   );
// });

// export const SelectLabel = ChakraSelect.Label;
// export const SelectItemText = ChakraSelect.ItemText;
