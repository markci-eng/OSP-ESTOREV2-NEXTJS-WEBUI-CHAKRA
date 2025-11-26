import { CheckboxCard, Dialog } from "@chakra-ui/react";
import React, { useState, useMemo } from "react";
import { useListItemDialog } from "./use-list-item-dialog";

interface ListItemTriggerableChildProps {
  triggerDialog?: boolean;
  onTriggerDialog?: () => void;
}

export interface ListItemColumnProps extends ListItemTriggerableChildProps {
  label: string;
  value: string;
}

export interface ListItemColumnButtonProps extends ListItemTriggerableChildProps {
  label: string;
  onClick?: () => void;
}

export interface ListItemColumnDialogProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

interface ListItemProps {
  selectable: boolean;
  onClick?: () => void;
  onCheckChange?: (checked: boolean) => void;
  isChecked?: boolean;
  dialog?: React.ReactElement<ListItemColumnDialogProps>;
  children?: React.ReactElement<ListItemTriggerableChildProps>[];
}

export function ListItem(props: ListItemProps) {
  const [isChecked, setIsChecked] = useState(props.isChecked ?? false);
  const dialog = useListItemDialog(false);

  /** stable callback passed to children */
  const triggerCallback = dialog.openDialog;

  /** generate updated children ONLY once */
  const enhancedChildren = useMemo(
    () =>
      React.Children.map(props.children, (child) => {
        if (!child) return null;

        return React.cloneElement(child, {
          onTriggerDialog:
            child.props.triggerDialog === true ? triggerCallback : undefined,
        });
      }),
    [props.children, triggerCallback]
  );

  /** attach dialog state to dialog component */
  const enhancedDialog =
    props.dialog &&
    React.cloneElement(props.dialog, {
      isOpen: dialog.open,
      onOpenChange: dialog.setDialog,
    });

  return (
    <>
      <CheckboxCard.Root
        variant="solid"
        my={2}
        cursor="pointer"
        checked={isChecked}
        _hover={{
          backgroundColor: "gray.100",
        }}
        _checked={{
          backgroundColor: "var(--chakra-colors-primary-disabled)/50",
          borderColor: "var(--chakra-colors-primary-disabled)",
          color: "var(--chakra-colors-primary-hover)",
          _hover: {
            backgroundColor: "var(--chakra-colors-primary-disabled)/70",
          },
        }}
        onClick={(e) => {
          props.onClick?.();

          const clickTarget = e.target as HTMLElement;
          if (clickTarget.closest("[data-dialog-trigger]")) return;

          if (props.selectable) {
            setIsChecked((prev) => !prev);

            // schedule after render
            if (props.onCheckChange) {
              Promise.resolve().then(() => props.onCheckChange?.(!isChecked));
            }

          }
        }}
      >
        <CheckboxCard.Control>
          {props.selectable && (
            <CheckboxCard.Indicator
              _hover={{
                backgroundColor: "gray.200",
                _checked: {
                  borderColor: "var(--chakra-colors-primary)",
                  backgroundColor: "var(--chakra-colors-primary-disabled)",
                },
              }}
              _checked={{
                borderColor: "var(--chakra-colors-primary-disabled)",
                color: "var(--chakra-colors-primary-hover)",
              }}
            />
          )}
          {enhancedChildren}
        </CheckboxCard.Control>
      </CheckboxCard.Root>

      {enhancedDialog}
    </>
  );
}

export function ListItemColumn({
  label,
  value,
  triggerDialog = false,
  onTriggerDialog,
}: ListItemColumnProps) {
  return (
    <CheckboxCard.Content
      data-dialog-trigger={triggerDialog || undefined}
      onClick={() => triggerDialog && onTriggerDialog?.()}
    >
      <CheckboxCard.Label>{value}</CheckboxCard.Label>
      <CheckboxCard.Description>{label}</CheckboxCard.Description>
    </CheckboxCard.Content>
  );
}

import { SecondarySmButton } from "st-peter-ui";

export function ListItemColumnButton({
  label,
  onClick,
  triggerDialog = false,
  onTriggerDialog,
}: ListItemColumnButtonProps) {
  return (
    <SecondarySmButton
      data-dialog-trigger={triggerDialog || undefined}
      onClick={(e) => {
        onClick?.();
        if (triggerDialog) onTriggerDialog?.();
        e.stopPropagation();
      }}
    >
      {label}
    </SecondarySmButton>
  );
}

export function ListItemColumnDialog({
  isOpen,
  onOpenChange,
  children,
}: ListItemColumnDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => onOpenChange?.(e.open)} size={"xl"} placement={"center"}>
      {children}
    </Dialog.Root>
  );
}
