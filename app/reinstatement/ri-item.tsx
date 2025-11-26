import { 
    useDisclosure, 
    CheckboxCard, 
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
    VStack,
    Flex
} from "@chakra-ui/react";
import { useState } from "react";
import { BaseButton, InputFloatingLabel, PrimaryMdButton, SecondarySmButton, UnselectSolidButton } from "st-peter-ui";

interface CheckedPlan {
  lpaNo: string;
  planType: string;
  isFullyPaid: boolean;
  reinstatementFee: number;
  reinstatementPayment: number;
}

interface RIPlanItemProps {
  plan: any;
  onChange?: (checked: boolean, values: CheckedPlan) => void;
}

export default function RIPlanItem({ plan, onChange }: RIPlanItemProps) {
    // const { theme } = useStPeter();
    const reinstatementFee = 500;
    const [isChecked, setIsChecked] = useState(false);
    const { open, onOpen, onClose } = useDisclosure();
    const [isFullyPaid, setIsFullyPaid] = useState(false);
    const reinstatementPayment = isFullyPaid
        ? parseFloat(plan.newBalance)
        : parseFloat(plan.newInstAmt);
    const totalAmountDue = reinstatementFee + reinstatementPayment;

    return (
      <>
        <CheckboxCard.Root
          variant={"solid"}
          my={2}
          cursor={"pointer"}
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
        >
          {/* <CheckboxCard.HiddenInput /> */}
          <CheckboxCard.Control>
            <CheckboxCard.Indicator
              cursor={"pointer"}
              onClick={() => {
                setIsChecked((isChecked) => !isChecked);
                onChange?.(!isChecked, {
                  lpaNo: plan.lpaNo,
                  planType: plan.planType,
                  isFullyPaid: isFullyPaid,
                  reinstatementFee: reinstatementFee,
                  reinstatementPayment: reinstatementPayment,
                });
              }}
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
            <CheckboxCard.Content onClick={onOpen}>
              <CheckboxCard.Label>{plan.lpaNo}</CheckboxCard.Label>
              <CheckboxCard.Description>LPA Number</CheckboxCard.Description>
            </CheckboxCard.Content>
            <CheckboxCard.Content onClick={onOpen}>
              <CheckboxCard.Label>{plan.planType}</CheckboxCard.Label>
              <CheckboxCard.Description>Plan Type</CheckboxCard.Description>
            </CheckboxCard.Content>
            <CheckboxCard.Content
              onClick={onOpen}
              display={{ base: "block", mdDown: "none" }}
            >
              <CheckboxCard.Label>{plan.mop}</CheckboxCard.Label>
              <CheckboxCard.Description>Mode</CheckboxCard.Description>
            </CheckboxCard.Content>
            <CheckboxCard.Content onClick={onOpen}>
              <CheckboxCard.Label>{plan.duedate}</CheckboxCard.Label>
              <CheckboxCard.Description>Due Date</CheckboxCard.Description>
            </CheckboxCard.Content>
            <SecondarySmButton  onClick={onOpen}>View Details</SecondarySmButton>
          </CheckboxCard.Control>
        </CheckboxCard.Root>

        <Dialog.Root
          open={open}
          onOpenChange={onClose}
          size={"xl"}
          placement={"center"}
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Heading>Plan Details</Heading>
                </Dialog.Header>
                <Dialog.Body>
                  <Stack direction={{ base: "column", md: "row" }}>
                    {/* Current Plan */}
                    <SimpleGrid
                      columns={{ base: 1, md: 2 }}
                      px={1}
                      width={"full"}
                    >
                      <Box px={3} py={3}>
                        <Heading size={"lg"} textAlign="center">
                          Current Plan
                        </Heading>
                        <Flex
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          my={3}
                          gap={2}
                        >
                          <InputFloatingLabel
                            label="LPA Number"
                            value={plan.lpaNo}
                            name="lpaN"
                            readOnly
                          />
                          <InputFloatingLabel
                            label="Account Status"
                            value={plan.status}
                            name="status"
                            readOnly
                          />
                        </Flex>
                        <Flex
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          my={3}
                          gap={2}
                        >
                          <InputFloatingLabel
                            label="Total Amount Payable"
                            value={plan.totalAmtPayable}
                            name="tap"
                            readOnly
                          />
                          <InputFloatingLabel
                            label="Total Amount Paid"
                            value={plan.totalAmtPaid}
                            name="totAmtPd"
                            readOnly
                          />
                        </Flex>
                        <Flex
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          my={3}
                          gap={2}
                        >
                          <InputFloatingLabel
                            label="Balance"
                            value={plan.balance}
                            name="bal"
                            readOnly
                          />
                          <InputFloatingLabel
                            label="Installment Amount"
                            value={plan.instAmt}
                            name="instAmt"
                            readOnly
                          />
                        </Flex>

                        <Checkbox.Root
                          checked={isFullyPaid}
                          colorPalette={"green"}
                          display={{ base: "none", md: "block" }}
                          disabled={isChecked}
                        >
                          <Checkbox.HiddenInput
                            onChange={() =>
                              setIsFullyPaid((checked) => !checked)
                            }
                          />
                          <Checkbox.Control
                            _checked={{
                              backgroundColor: "var(--chakra-colors-primary)",
                              borderColor: "var(--chakra-colors-primary)",
                            }}
                          />
                          <Checkbox.Label>
                            {" "}
                            Reinstate Fully Paid{" "}
                          </Checkbox.Label>
                        </Checkbox.Root>
                      </Box>
                      <Box
                        p={3}
                        bg={"gray.50"}
                        border={"1px solid #ddd"}
                        borderRadius="md"
                      >
                        <Heading size={"lg"} textAlign="center">
                          After Reinstatement
                        </Heading>
                        <Flex
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          my={3}
                          gap={2}
                        >
                          <InputFloatingLabel
                            label="LPA Number"
                            value={plan.newLpaNo}
                            name="lpaN"
                            readOnly
                          />
                          <InputFloatingLabel
                            label="Account Status"
                            value={plan.newStatus}
                            name="status"
                            readOnly
                          />
                        </Flex>
                        <Flex
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          my={3}
                          gap={2}
                        >
                          <InputFloatingLabel
                            label="Total Amount Payable"
                            value={plan.newTotalAmtPayable}
                            name="tap"
                            readOnly
                          />
                          <InputFloatingLabel
                            label="Total Amount Paid"
                            value={plan.newTotalAmtPaid}
                            name="totAmtPd"
                            readOnly
                          />
                        </Flex>
                        <Flex
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          my={3}
                          gap={2}
                        >
                          <InputFloatingLabel
                            label="Balance"
                            value={plan.newBalance}
                            name="bal"
                            readOnly
                          />
                          <InputFloatingLabel
                            label="Installment Amount"
                            value={plan.newInstAmt}
                            name="instAmt"
                            readOnly
                          />
                        </Flex>
                      </Box>
                    </SimpleGrid>
                  </Stack>

                  <Checkbox.Root
                    checked={isFullyPaid}
                    colorPalette={"green"}
                    display={{ base: "block", md: "none" }}
                    disabled={isChecked}
                    m={4}
                  >
                    <Checkbox.HiddenInput
                      onChange={() => setIsFullyPaid((checked) => !checked)}
                    />
                    <Checkbox.Control
                      _checked={{
                        backgroundColor: "var(--chakra-colors-primary)",
                        borderColor: "var(--chakra-colors-primary)",
                      }}
                    />
                    <Checkbox.Label> Reinstate Fully Paid </Checkbox.Label>
                  </Checkbox.Root>

                  {/* Payment Summary */}
                  <Box
                    mt={3}
                    mx={{ base: "auto", md: 20 }}
                    borderWidth="1px"
                    borderColor={"var(--chakra-colors-primary)"}
                    borderRadius="lg"
                    p={5}
                    bg={"var(--chakra-colors-primary)/15"}
                    color="gray.700"
                  >
                    <Text>
                      Applying for reinstatement requires the following
                      payments:
                    </Text>
                    <VStack align="start" p={1} mt={2}>
                      <Text>
                        Reinstatement Fee:{" "}
                        <strong>₱ {reinstatementFee.toLocaleString()}</strong>
                      </Text>
                      <Text>
                        Reinstatement Payment:{" "}
                        <strong>
                          ₱ {reinstatementPayment.toLocaleString()}
                        </strong>
                      </Text>
                    </VStack>
                    <Text fontWeight="bold" mt={3}>
                      Total Amount Due: ₱ {totalAmountDue.toLocaleString()}
                    </Text>
                  </Box>
                  <Box mt={3} mx={"auto"} textAlign={"center"}>
                    {isChecked ? (
                      <UnselectSolidButton 
                      onClick={() => {
                        setIsChecked((checked) => !checked);
                        onChange?.(!isChecked, {
                          lpaNo: plan.lpaNo,
                          planType: plan.planType,
                          isFullyPaid: isFullyPaid,
                          reinstatementFee: reinstatementFee,
                          reinstatementPayment: reinstatementPayment,
                        });
                        onClose();
                      }}/>
                    ) : (
                      <PrimaryMdButton 
                      onClick={() => {
                        setIsChecked((checked) => !checked);
                        onChange?.(!isChecked, {
                          lpaNo: plan.lpaNo,
                          planType: plan.planType,
                          isFullyPaid: isFullyPaid,
                          reinstatementFee: reinstatementFee,
                          reinstatementPayment: reinstatementPayment,
                        });
                        onClose();
                      }}>Select</PrimaryMdButton>
                    )}
                  </Box>
                </Dialog.Body>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size={"sm"} />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </>
    );
}
