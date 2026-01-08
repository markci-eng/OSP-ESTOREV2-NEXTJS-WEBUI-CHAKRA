"use client";

import { useState, forwardRef } from "react";
import type { InputProps } from "@chakra-ui/react";
import { Box, Field, Input, defineStyle } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

interface FloatingLabelInputProps extends InputProps {
  label: React.ReactNode;
  type?: "text" | "email" | "number" | "date" | "password" | "search"
  name?: string;
  required?: boolean;
  register?: UseFormRegister<any>;
}

export const InputFloatingLabel = (props: FloatingLabelInputProps) => {
  const { label, required, name, register, ...rest } = props;

  // Detect RHF register props (prefer explicit `register`; fall back to detecting register-like props)
  const isRHF =
    Boolean(register) ||
    ("onChange" in rest && "onBlur" in rest && "name" in rest && "ref" in rest);

  // Local state only when NOT using RHF
  const [localValue, setLocalValue] = useState(props.value);
  const value = isRHF ? props.value ?? "" : localValue;

  const [invalid, setInvalid] = useState(false);
  const [invalidMsg, setInvalidMsg] = useState("");

  const handleInvalid = (e: React.SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = e.currentTarget;
    const validity = input.validity;

    if (validity.valueMissing) {
      setInvalid(true);
      setInvalidMsg(`${label} field is required.`);
    } else if (validity.typeMismatch) {
      setInvalid(true);
      setInvalidMsg("Invalid email format.");
    } else {
      setInvalid(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isRHF) setLocalValue(e.target.value); // Only control locally if not RHF
    handleInvalid(e);

    rest.onChange?.(e); // Always call RHF/parent onChange
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (required && !e.target.value.trim()) {
      setInvalid(true);
      setInvalidMsg(`${label} field is required.`);
    }
    rest.onBlur?.(e);
  };

  return (
    <Field.Root invalid={invalid} my={2}>
      <FloatingLabelInputInternal
        {...rest}
        label={label}
        required={required}
        value={value}
        name={name}
        borderColor={invalid ? "dangerHover" : "gray.200"}
        onChange={handleChange}
        onBlur={handleBlur}
        onInvalid={handleInvalid}
      />

      <Field.ErrorText color="dangerHover" mt={-2}>
        {invalidMsg}
      </Field.ErrorText>
    </Field.Root>
  );
};


const FloatingLabelInputInternal = forwardRef<HTMLInputElement, any>((props, ref) => {
  const { label, name, value, onChange, onBlur, onInvalid, ...rest } = props;
  const [focused, setFocused] = useState(false);
  const shouldFloat = (value?.length ?? 0) > 0 || focused;

  return (
    <Box pos="relative" w="full" my="5px">
      <Input
        {...rest}
        name={name}
        ref={ref}
        value={value}
        placeholder=""
        autoComplete="off"
        color={shouldFloat ? "#000" : "transparent"}
        onChange={(e) => {
          onChange?.(e);
          rest.onChange?.(e);
        }}
        onBlur={(e) => {
          onBlur?.(e);
          rest.onBlur?.(e);
          setFocused(false);
        }}
        onFocus={(e) => {
          rest.onFocus?.(e);
          setFocused(true);
        }}
        data-float={shouldFloat || undefined}
        onInvalid={(e) => onBlur?.(e)}
      />
      <Field.Label css={floatingStyles} data-float={shouldFloat || undefined}>
        {props.required ? (
            <>{label}<span style={{color: "var(--chakra-colors-danger-hover)"}}>*</span></>
        ) : label}
      </Field.Label>
    </Box>
  );
});

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "transparent",
  px: "0.5",
  top: "2.5",
  insetStart: "3",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  color: "fg.muted",
  "&[data-float]": {
    top: "-2.5",
    insetStart: "2",
    color: "fg",
    bg: "bg",
    fontSize: "13px"
  },
});
