"use client";

import { useState } from "react";
import type { InputProps } from "@chakra-ui/react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Box, Field, Input, defineStyle } from "@chakra-ui/react";

interface FloatingLabelInputProps extends InputProps {
  label: React.ReactNode;
  name?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
}

export function InputFloatingLabel(props: FloatingLabelInputProps) {
  const { label, required, name, register, ...rest } = props;
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState("");
  const [invalid, setInvalid] = useState(false);

  // Handle auto-validation on form submit
  const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (required && !value.trim()) setInvalid(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    setInvalid(required ? !v.trim() && touched : false);
  };

  const handleBlur = () => {
    setTouched(true);
    if (required && !value.trim()) setInvalid(true);
    else setInvalid(false);
  };

  return (
    <Field.Root invalid={invalid}>
      <FloatingLabelInputInternal
        label={label}
        name={name}
        required={required}
        value={value}
        register={register}
        onChange={handleChange}
        onBlur={handleBlur}
        onInvalid={handleInvalid}
        {...rest}
      />
      <Field.ErrorText>
        {invalid ? "This field is required" : ""}
      </Field.ErrorText>
    </Field.Root>
  );
}

const FloatingLabelInputInternal = (props: any) => {
  const { label, value, onChange, onBlur, onInvalid, register, ...rest } = props;
  const [focused, setFocused] = useState(false);
  const shouldFloat = value?.length > 0 || focused;

  return (
    <Box pos="relative" w="full" my="5px">
      <Input
        {...rest}
        value={value}
        onChange={onChange}
        onInvalid={onInvalid}
        color={"#000"}
        {...register}
        onFocus={(e) => {
          props.onFocus?.(e);
          setFocused(true);
        }}
        onBlur={(e) => {
          props.onBlur?.(e);
          onBlur?.();
          setFocused(false);
        }}
        data-float={shouldFloat || undefined}
      />
      <Field.Label css={floatingStyles} data-float={shouldFloat || undefined}>
        {label}
      </Field.Label>
    </Box>
  );
};

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
    top: "-2",
    insetStart: "2",
    color: "fg",
    fontSize: "xs",
    bg: "bg",
  },
});
