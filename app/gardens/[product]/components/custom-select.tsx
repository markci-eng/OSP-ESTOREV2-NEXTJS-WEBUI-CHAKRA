"use client";
import { Box, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Body, BoxProps, Small } from "st-peter-ui";

interface CustomSelectProps extends Omit<BoxProps, "onChange"> {
  value?: string;
  children:
    | React.ReactElement<typeof CustomSelectItem>
    | React.ReactElement<typeof CustomSelectItem>[];
  onChange?: (value: string) => void;
}

export function CustomSelect({
  value,
  children,
  onChange,
  ...props
}: CustomSelectProps) {
  const [_value, setValue] = useState<string>(value || "");

  useEffect(() => {
    onChange?.(_value);
  }, [_value]);

  return (
    <Box {...props}>
      <Grid templateColumns={"repeat(2, 1fr)"} gap={3}>
        {Array.isArray(children)
          ? children.map((child, index) => ({
              ...child,
              props: {
                key: { index },
                ...child.props,
                onSelect: (v: string) => setValue(v),
              },
            }))
          : {
              ...children,
              props: {
                ...children.props,
                onSelect: (v: string) => setValue(v),
              },
            }}
      </Grid>
    </Box>
  );
}

export function CustomSelectItem({
  value,
  label,
  subLabel,
  selected,
  onSelect,
}: {
  value: string;
  label: string;
  subLabel?: string;
  selected?: boolean;
  onSelect?: (value: string) => void;
}) {
  const [isSelected, setIsSelected] = useState<boolean>(selected || false);

  return (
    <Box
      border={"1px solid"}
      borderColor={isSelected ? "var(--chakra-colors-primary)" : "gray.300"}
      backgroundColor={isSelected ? "var(--chakra-colors-primary-disabled)/50" : "white"}
      borderRadius={"md"}
      p={3}
      cursor={"pointer"}
      onClick={() => {
        onSelect?.(value);
        setIsSelected(true);
      }}
      _hover={{
        borderColor: "gray.400",
        backgroundColor: "gray.50",
      }}
    >
      <Body fontWeight={"semibold"}>{label}</Body>
      <Small>{subLabel}</Small>
    </Box>
  );
}
