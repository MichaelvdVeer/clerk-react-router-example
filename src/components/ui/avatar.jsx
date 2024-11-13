"use client";

import { Avatar as ChakraAvatar, Group } from "@chakra-ui/react";
import { forwardRef } from "react";
import PropTypes from "prop-types";

export const Avatar = forwardRef(function Avatar(props, ref) {
  const { name, src, srcSet, loading, icon, fallback, children, ...rest } =
    props;
  return (
    <ChakraAvatar.Root ref={ref} {...rest}>
      <AvatarFallback name={name} icon={icon}>
        {fallback}
      </AvatarFallback>
      <ChakraAvatar.Image src={src} srcSet={srcSet} loading={loading} />
      {children}
    </ChakraAvatar.Root>
  );
});

Avatar.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  srcSet: PropTypes.string,
  loading: PropTypes.oneOf(["eager", "lazy"]),
  icon: PropTypes.node,
  fallback: PropTypes.node,
  children: PropTypes.node,
};

const AvatarFallback = forwardRef(function AvatarFallback(props, ref) {
  const { name, icon, children, ...rest } = props;
  return (
    <ChakraAvatar.Fallback ref={ref} {...rest}>
      {children}
      {name != null && children == null && <>{getInitials(name)}</>}
      {name == null && children == null && (
        <ChakraAvatar.Icon asChild={!!icon}>{icon}</ChakraAvatar.Icon>
      )}
    </ChakraAvatar.Fallback>
  );
});

AvatarFallback.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node,
};

function getInitials(name) {
  const names = name.trim().split(" ");
  const firstName = names[0] != null ? names[0] : "";
  const lastName = names.length > 1 ? names[names.length - 1] : "";
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);
}

export const AvatarGroup = forwardRef(function AvatarGroup(props, ref) {
  const { size, variant, borderless, ...rest } = props;
  return (
    <ChakraAvatar.PropsProvider value={{ size, variant, borderless }}>
      <Group gap="0" spaceX="-3" ref={ref} {...rest} />
    </ChakraAvatar.PropsProvider>
  );
});

AvatarGroup.propTypes = {
  size: PropTypes.string,
  variant: PropTypes.string,
  borderless: PropTypes.bool,
  children: PropTypes.node,
};