"use client";

import { useState, forwardRef, useEffect } from "react";
import {
  Box,
  Field,
  Portal,
  Select,
  defineStyle,
  ListCollection,
  SelectRootProps,
} from "@chakra-ui/react";
import { Control, Controller, FieldValues, Path, type UseFormRegisterReturn } from "react-hook-form";

interface FloatingLabelSelectProps extends Omit<SelectRootProps, "value" | "onChange" | "onBlur"> {
  label: React.ReactNode;
  name?: string;
  required?: boolean;
  collection: ListCollection;
  value?: string[];
  onChange?: (value: string[]) => void;
  onValueChanged?: (value: string[]) => void;
  onBlur?: () => void;
  register?: UseFormRegisterReturn;
}

interface SelectFloatingLabelProps<T extends FieldValues> extends Omit<SelectRootProps, "onChange"> {
  label: React.ReactNode;
  name?: Path<T>;
  required?: boolean;
  control?: Control<T>;
  collection: ListCollection;
  value?: string[];
  onValueChanged?: (value: string[]) => void;
  onBlur?: () => void;
  register?: UseFormRegisterReturn;
}

export const SelectFloatingLabel = <T extends FieldValues> ({
  label,
  name,
  control,
  collection,
  value,
  required,
  onValueChanged,
  ...props
}: SelectFloatingLabelProps<T>) => {
  if(control && name){
    return <Controller
    name={name}
    control={control}
    rules={{ required: required }}
    render={({ field }) => (
      <Select_Floating_Label
        label={label}
        name={field.name}
        value={value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        collection={collection}
        onValueChanged={onValueChanged}
        {...props}
      />
    )}
  />
  } else {
    return <Select_Floating_Label
        label={label}
        required={required}
        name={name}
        value={value}
        collection={collection}
        onValueChanged={onValueChanged}
        {...props}
      />
  }
}

const Select_Floating_Label = ({
  label,
  required,
  name,
  collection,
  value,
  onChange,
  onValueChanged,
  onBlur,
  register,
  ...props
}: FloatingLabelSelectProps) => {
  const isRHF = Boolean(register);

  const [localValue, setLocalValue] = useState<string[]>(value ?? []);
  const currentValue = isRHF ? value ?? [] : localValue;

  const [invalid, setInvalid] = useState(false);
  const [invalidMsg, setInvalidMsg] = useState("");

  useEffect(() => {
    if (!isRHF && value) {
      setLocalValue(value);
    }
  }, [value, isRHF]);

  const handleChange = (val: string[]) => {
    if (!isRHF) setLocalValue(val);
    onChange?.(val);
    setInvalid(required ? val.length === 0 : false);
    onValueChanged?.(val);
  };

  const handleBlur = () => {
    if (required && currentValue.length === 0) {
      setInvalid(true);
      setInvalidMsg(`${label} field is required.`);
    }
    onBlur?.();
  };

  return (
    <Field.Root invalid={invalid} my={2}>
      <FloatingLabelSelectInternal
        label={label}
        name={name}
        required={required}
        collection={collection}
        value={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        register={register}
        {...props}
      />

      <Field.ErrorText color="dangerHover" mt={-1}>
        {invalidMsg}
      </Field.ErrorText>
    </Field.Root>
  );
};

interface InternalProps {
  label: React.ReactNode;
  name?: string;
  required?: boolean;
  collection: ListCollection;
  value: string[];
  onChange: (value: string[]) => void;
  onBlur: () => void;
  register?: UseFormRegisterReturn;
}

const FloatingLabelSelectInternal = forwardRef<HTMLDivElement, InternalProps>(
  ({ label, name, required, collection, value, onChange, onBlur, ...props }, ref) => {
    const shouldFloat = value.length > 0;
    const [focused, setFocus] = useState(false);

    return (
      <Box pos="relative" w="full" {...props} my={1}>
        <Select.Root
          ref={ref}
          name={name}
          required={required}
          collection={collection}
          size="md"
          value={value}
          onValueChange={(e) => onChange(e.value)}
          onBlur={() => {
            onBlur();
            setFocus(false);
          }}
          onFocus={() => setFocus(true)}
          onChange={() => setFocus(false)}
        >
          <Select.HiddenSelect />

          <Select.Control cursor="pointer" onBlur={() => setFocus(false)}>
            <Select.Trigger>
              <Select.ValueText color={"#000"}/>
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>

          <Portal>
            {focused && <Select.Positioner>
              <Select.Content pointerEvents="none" _open={{ pointerEvents: "auto" }}>
                {collection.items.map((item: any) => (
                  <Select.Item key={item.value} item={item}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>}
          </Portal>
        </Select.Root>

        <Field.Label css={floatingStyles} data-float={shouldFloat || undefined}>
          {required ? (
            <>
              {label}
              <span style={{ color: "var(--chakra-colors-danger-hover)" }}>
                *
              </span>
            </>
          ) : (
            label
          )}
        </Field.Label>
      </Box>
    );
  }
);

const floatingStyles = defineStyle({
  pos: "absolute",
  px: "0.5",
  top: "2.5",
  insetStart: "3",
  pointerEvents: "none",
  transition: "all 0.2s",
  color: "fg.muted",
  "&[data-float]": {
    top: "-2.5",
    insetStart: "2",
    bg: "bg",
    fontSize: "13px",
    color: "fg",
  },
});