import { 
    useDisclosure, 
    CheckboxCard, 
    IconButton,
    Dialog,
    Portal,
    Button,
    CloseButton,
    Heading,
    Stack,
    Box,
    SimpleGrid,
    Checkbox,
    Text,
    Input
} from "@chakra-ui/react";
import { useState } from "react";
import { LuInfo } from "react-icons/lu";
import { InputFloatingLabel } from "st-peter-ui";

export default function RIPlanItem({plan}: {plan: any}) {
    const [isChecked, setIsChecked] = useState(false);
    const { open, onOpen, onClose } = useDisclosure();

    
    return (
        <>
        <CheckboxCard.Root my={2} variant={"subtle"} colorPalette={"green"} cursor={"pointer"} onClick={onOpen} checked={isChecked}>
            {/* <CheckboxCard.HiddenInput /> */}
            <CheckboxCard.Control>
                <CheckboxCard.Indicator />
                <CheckboxCard.Content>
                    <CheckboxCard.Label>{plan.lpaNo}</CheckboxCard.Label>
                    <CheckboxCard.Description>LPA Number</CheckboxCard.Description>
                </CheckboxCard.Content>
                <CheckboxCard.Content>
                    <CheckboxCard.Label>{plan.planType}</CheckboxCard.Label>
                    <CheckboxCard.Description>Plan Type</CheckboxCard.Description>
                </CheckboxCard.Content>
                <CheckboxCard.Content display={{ base: "block", mdDown: "none" }}>
                    <CheckboxCard.Label>{plan.mop}</CheckboxCard.Label>
                    <CheckboxCard.Description>Mode</CheckboxCard.Description>
                </CheckboxCard.Content>
                <CheckboxCard.Content>
                    <CheckboxCard.Label>{plan.duedate}</CheckboxCard.Label>
                    <CheckboxCard.Description>Due Date</CheckboxCard.Description>
                </CheckboxCard.Content>
                <IconButton><LuInfo /></IconButton>
            </CheckboxCard.Control>
        </CheckboxCard.Root>

        <Dialog.Root open={open} onOpenChange={onClose} size={"xl"} placement={"center"}>
            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Heading>Plan Details</Heading>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Stack direction={{ base: "column", md: "row" }}>
                                {/* Current Plan */}
                                <SimpleGrid columns={{ base: 1, md: 2 }} px={1} width={"full"}>
                                    <Box px={1}>
                                        <Heading size="md" textAlign="center">
                                            Current Plan
                                        </Heading>
                                        <SimpleGrid columns={{ base: 1, md: 2 }} px={2} width={"full"}>
                                            <InputFloatingLabel label="LPA Number" value={plan.lpaNo} name="lpaN" readOnly />
                                            <InputFloatingLabel label="LPA Number" value={plan.lpaNo} name="lpaN" readOnly />
                                        </SimpleGrid>
                                    </Box>
                                    <Box px={1}>
                                        <Heading size="md" textAlign="center">
                                            After Reinstatement
                                        </Heading>
                                        <InputFloatingLabel label="LPA Number" value={plan.lpaNo} name="lpaN" readOnly />
                                    </Box>
                                </SimpleGrid>
                            </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button variant={"outline"} onClick={onClose}>Cancel</Button>
                            <Button onClick={() => {setIsChecked(checked => !checked); onClose()}}>{isChecked ? "Unselect" : "Reinstate"}</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size={"sm"}/>
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
      </>
    )
}
