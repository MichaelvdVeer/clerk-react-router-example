import {
  Badge,
  Stat as ChakraStat,
  FormatNumber,
  IconButton,
} from "@chakra-ui/react";
import { ToggleTip } from "./toggle-tip";
import { forwardRef } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import PropTypes from "prop-types";

export const StatLabel = forwardRef(function StatLabel(props, ref) {
  const { info, children, ...rest } = props;
  return (
    <ChakraStat.Label {...rest} ref={ref}>
      {children}
      {info && (
        <ToggleTip content={info}>
          <IconButton variant="ghost" aria-label="info" size="2xs">
            <HiOutlineInformationCircle />
          </IconButton>
        </ToggleTip>
      )}
    </ChakraStat.Label>
  );
});

StatLabel.propTypes = {
  info: PropTypes.string, // Optional string for the info tooltip content
  children: PropTypes.node.isRequired, // Children elements (usually text or components)
};

export const StatValueText = forwardRef(function StatValueText(props, ref) {
  const { value, formatOptions, children, ...rest } = props;
  return (
    <ChakraStat.ValueText {...rest} ref={ref}>
      {children ||
        (value != null && <FormatNumber value={value} {...formatOptions} />)}
    </ChakraStat.ValueText>
  );
});

StatValueText.propTypes = {
  value: PropTypes.number, // Optional number to be formatted and displayed
  formatOptions: PropTypes.object, // Optional object for formatting the number
  children: PropTypes.node, // Optional children elements (could be custom content)
};

export const StatUpTrend = forwardRef(function StatUpTrend(props, ref) {
  return (
    <Badge colorPalette="green" gap="0" {...props} ref={ref}>
      <ChakraStat.UpIndicator />
      {props.children}
    </Badge>
  );
});

StatUpTrend.propTypes = {
  children: PropTypes.node, // Optional children elements to be displayed next to the up indicator
};

export const StatDownTrend = forwardRef(function StatDownTrend(props, ref) {
  return (
    <Badge colorPalette="red" gap="0" {...props} ref={ref}>
      <ChakraStat.DownIndicator />
      {props.children}
    </Badge>
  );
});
StatDownTrend.propTypes = {
  children: PropTypes.node, // Optional children elements to be displayed next to the down indicator
};

export const StatRoot = ChakraStat.Root;
export const StatHelpText = ChakraStat.HelpText;
export const StatValueUnit = ChakraStat.ValueUnit;
