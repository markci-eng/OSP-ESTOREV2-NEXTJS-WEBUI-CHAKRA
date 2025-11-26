import { useState, useCallback } from "react";

export function useListItemDialog(initial: boolean) {
  const [open, setOpen] = useState(initial);

  const openDialog = useCallback(() => setOpen(true), []);
  const closeDialog = useCallback(() => setOpen(false), []);
  const setDialog = useCallback((value: boolean) => setOpen(value), []);

  return {
    open,
    openDialog,
    closeDialog,
    setDialog,
  };
}
