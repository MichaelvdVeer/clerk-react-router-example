"use client";

import {
  Box,
  HStack,
  IconButton,
  Input,
  Stack,
  mergeRefs,
  useControllableState,
} from "@chakra-ui/react";
import { forwardRef, useRef } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { InputGroup } from "./input-group";
import PropTypes from "prop-types";

export const PasswordInput = forwardRef(function PasswordInput(props, ref) {
  const {
    rootProps,
    defaultVisible,
    visible: visibleProp,
    onVisibleChange,
    visibilityIcon = {
      on: <AiOutlineEyeInvisible color="#7E7E7E" />,
      off: <AiOutlineEye color="#7E7E7E" />,
    },
    ...rest
  } = props;

  const [visible, setVisible] = useControllableState({
    value: visibleProp,
    defaultValue: defaultVisible || false,
    onChange: onVisibleChange,
  });

  const inputRef = useRef(null);

  return (
    <InputGroup
      width="full"
      endElement={
        <VisibilityTrigger
          disabled={rest.disabled}
          onPointerDown={(e) => {
            if (rest.disabled) return;
            if (e.button !== 0) return;
            e.preventDefault();
            setVisible(!visible);
          }}
        >
          {visible ? visibilityIcon.off : visibilityIcon.on}
        </VisibilityTrigger>
      }
      {...rootProps}
    >
      <Input
        {...rest}
        ref={mergeRefs(ref, inputRef)}
        type={visible ? "text" : "password"}
      />
    </InputGroup>
  );
});

const VisibilityTrigger = forwardRef(function VisibilityTrigger(props, ref) {
  return (
    <IconButton
      marginTop="13px"
      tabIndex={-1}
      ref={ref}
      me="-2"
      aspectRatio="square"
      size="sm"
      backgroundColor="transparent"
      height="calc(100% - {spacing.2})"
      aria-label="Toggle password visibility"
      {...props}
    />
  );
});

export const PasswordStrengthMeter = forwardRef(function PasswordStrengthMeter(
  props,
  ref
) {
  const { max = 4, value, ...rest } = props;

  const percent = (value / max) * 100;
  const { label, colorPalette } = getColorPalette(percent);

  return (
    <Stack align="flex-end" gap="1" ref={ref} {...rest}>
      <HStack width="full" ref={ref} {...rest}>
        {Array.from({ length: max }).map((_, index) => (
          <Box
            key={index}
            height="1"
            flex="1"
            rounded="sm"
            data-selected={index < value ? "" : undefined}
            layerStyle="fill.subtle"
            colorPalette="gray"
            _selected={{
              colorPalette,
              layerStyle: "fill.solid",
            }}
          />
        ))}
      </HStack>
      {label && <HStack textStyle="xs">{label}</HStack>}
    </Stack>
  );
});

function getColorPalette(percent) {
  switch (true) {
    case percent < 33:
      return { label: "Low", colorPalette: "red" };
    case percent < 66:
      return { label: "Medium", colorPalette: "orange" };
    default:
      return { label: "High", colorPalette: "green" };
  }
}

PasswordInput.propTypes = {
  rootProps: PropTypes.object,
  defaultVisible: PropTypes.bool,
  visible: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  visibilityIcon: PropTypes.shape({
    on: PropTypes.node.isRequired,
    off: PropTypes.node.isRequired,
  }),
};

PasswordStrengthMeter.propTypes = {
  max: PropTypes.number,
  value: PropTypes.number.isRequired,
};
