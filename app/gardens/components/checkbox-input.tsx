import {
  Checkbox as Cb,
  CheckboxCheckedChangeDetails,
  CheckboxRootProps,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";

export interface BaseCheckboxProps extends CheckboxRootProps {
  variant?: "solid" | "outline" | "subtle";
  size?: "sm" | "md" | "lg";
  label?: string;
  register?: UseFormRegister<any>;
  onCheckedChange?: (details: CheckboxCheckedChangeDetails) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, BaseCheckboxProps>(
  ({ variant, name, size, label, register, onCheckedChange, ...rest }, ref) => {
    // Merge RHF register if provided
    type RHFRegisterReturn = ReturnType<UseFormRegister<any>>;
    const registerProps: Partial<RHFRegisterReturn> = register && name ? register(name) : {};

    return (
      <Cb.Root
        variant={variant}
        size={size}
        name={name}
        onCheckedChange={(details) => {
          // RHF expects a normal event, so we manually trigger it
          registerProps.onChange?.({
            target: { name, checked: details.checked },
          });

          onCheckedChange?.(details);
        }}
        {...rest}
      >
        {/* RHF needs the ref and name on the HiddenInput */}
        <Cb.HiddenInput
          {...registerProps}
          ref={(el) => {
            // connect both refs
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;

            registerProps.ref?.(el);
          }}
        />

        <Cb.Control />
        <Cb.Label>{label}</Cb.Label>
      </Cb.Root>
    );
  }
);
