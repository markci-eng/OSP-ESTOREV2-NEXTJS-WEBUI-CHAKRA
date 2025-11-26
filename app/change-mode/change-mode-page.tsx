"use client";
import { Box, Dialog, Container, Flex, Heading, Portal, SimpleGrid, Stack, Steps, Text, VStack, CloseButton } from "@chakra-ui/react";
import { useState } from "react";
import { ListItem, ListItemColumn, ListItemColumnButton, ListItemColumnDialog } from "../components/list-item/list-item";
import { PlanDetails } from "./change-mode.types";
import { InputFloatingLabel } from "../components/input/input-floating-label";

const PHPlans : PlanDetails[] = [
    {
        lpa_no: "L36447545F",
        plan_type: "St. Gregory",
        mode: "Monthly",
        total_amount_payable: 500,
        total_amount_paid: 500,
        installment_no: 60,
        installment_amount: 100,
        balance: 0
    }
];

export default function ChangeModePage() {
  const [phPlans] = useState<PlanDetails[]>(PHPlans)
  const [checkedPlans, setCheckedPlans] = useState<PlanDetails[]>([])
  const [step, setStep] = useState(0);

  const handleCheckedChange = (checked: boolean, values: PlanDetails) => {
        setCheckedPlans(prev => {
            if (checked) {
                if (!prev.some(p => p.lpa_no === values.lpa_no)) {
                    return [...prev, values];
                }
                return prev;
            }

            return prev.filter(p => p.lpa_no !== values.lpa_no);
        });
    };

  return (
    <Box maxW={"7xl"} mx={"auto"} my={8} px={0}>
      <Container centerContent p="0">
        <Text textStyle="2xl" fontWeight="semibold">
          Change of Mode Application
        </Text>
      </Container>
      <Steps.Root
        step={step}
        onStepChange={(e) => setStep(e.step)}
        count={steps.length}
        my={5}
      >
        <Steps.List>
          {steps.map((step, index) => (
            <Steps.Item key={index} index={index} title={step}>
              <Steps.Indicator
                _current={{
                  backgroundColor: "var(--chakra-colors-primary-disabled)/50",
                  borderColor: "var(--chakra-colors-primary)",
                }}
                _complete={{
                  backgroundColor: "var(--chakra-colors-primary)",
                  borderColor: "var(--chakra-colors-primary)",
                }}
              />
              <Steps.Title display={{ base: "block", mdDown: "none" }}>
                {step}
              </Steps.Title>
              <Steps.Separator
                _complete={{
                  backgroundColor: "var(--chakra-colors-primary)",
                }}
              />
            </Steps.Item>
          ))}
        </Steps.List>
        {/* Step 1: Select Lapsed Plans */}
        <Steps.Content key={1} index={0}>
          <Text mx={"auto"} my={5}>
            Switch your payment mode anytime—Quarterly, Semi-Annual, or Annual.
          </Text>
          <Box
            p="6"
            bg="gray.50"
            border={"1px solid #ddd"}
            borderTopLeftRadius={"md"}
            borderTopEndRadius={"md"}
          >
            <Flex justify={"space-between"}>
              <Box>
                <Heading size="lg">Plans</Heading>
                <Text fontSize="sm" mb="4" fontStyle={"italic"}>
                  Kindly select plans you want to change mode.
                </Text>
              </Box>
              <Box textAlign={"right"}>
                <Text fontSize="sm" fontStyle={"italic"}>
                  No. of plans selected:
                </Text>
                <Heading size="lg">
                  {checkedPlans.length}/{phPlans.length}
                </Heading>
              </Box>
            </Flex>
            {phPlans.length === 0 ? (
              <Text
                textAlign={"center"}
                border={"1px solid #ddd"}
                p={10}
                borderRadius={"md"}
                fontStyle={"italic"}
                color={"gray-500"}
              >
                No lapsed plans available for reinstatement.
              </Text>
            ) : (
              phPlans.map((plan, index) => (
                <ListItem
                  key={index}
                  selectable={true}
                  dialog={
                    <ListItemColumnDialog>
                      <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                          <Dialog.Content>
                            <Dialog.Header>
                              <Dialog.Title>Plan Details</Dialog.Title>
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
                                      Current Mode
                                    </Heading>
                                    <Flex
                                      justifyContent={"space-between"}
                                      alignItems={"center"}
                                      my={3}
                                      gap={2}
                                    >
                                      <InputFloatingLabel
                                        label="Mode"
                                        value={plan.mode}
                                        readOnly
                                      />
                                      <InputFloatingLabel
                                        label="Total Amount Payable"
                                        value={"₱ " + plan.total_amount_payable.toFixed(2)}
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
                                        label="Total Amount Paid"
                                        value={"₱ " + plan.total_amount_paid.toFixed(2)}
                                        readOnly
                                      />
                                      <InputFloatingLabel
                                        label="Installment No."
                                        value={plan.installment_no.toLocaleString()}
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
                                        value={"₱ " + plan.balance.toFixed(2)}
                                        readOnly
                                      />
                                      <InputFloatingLabel
                                        label="Installment Amount"
                                        value={"₱ " + plan.installment_amount.toFixed(2)}
                                        readOnly
                                      />
                                    </Flex>
                                  </Box>
                                  <Box
                                    p={3}
                                    bg={"gray.50"}
                                    border={"1px solid #ddd"}
                                    borderRadius="md"
                                  >
                                    <Heading size={"lg"} textAlign="center">
                                      After Change of Mode
                                    </Heading>
                                    <Flex
                                      justifyContent={"space-between"}
                                      alignItems={"center"}
                                      my={3}
                                      gap={2}
                                    >
                                      <InputFloatingLabel
                                        label="New Mode"
                                        value={plan.mode}
                                        readOnly
                                      />
                                      <InputFloatingLabel
                                        label="New Total Amount Payable"
                                        value={"₱ " + plan.total_amount_payable.toFixed(2)}
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
                                        label="Total Amount Paid"
                                        value={"₱ " + plan.total_amount_paid.toFixed(2)}
                                        readOnly
                                      />
                                      <InputFloatingLabel
                                        label="New Installment No."
                                        value={plan.installment_no.toLocaleString()}
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
                                        label="New Balance"
                                        value={"₱ " + plan.balance.toFixed(2)}
                                        readOnly
                                      />
                                      <InputFloatingLabel
                                        label="New Installment Amount"
                                        value={"₱ " + plan.installment_amount.toFixed(2)}
                                        readOnly
                                      />
                                    </Flex>
                                  </Box>
                                </SimpleGrid>
                              </Stack>
                            </Dialog.Body>
                            <Dialog.CloseTrigger asChild>
                              <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                          </Dialog.Content>
                        </Dialog.Positioner>
                      </Portal>
                    </ListItemColumnDialog>
                  }
                  onCheckChange={(checked) =>
                    handleCheckedChange(checked, plan)
                  }
                >
                  <ListItemColumn
                    triggerDialog={true}
                    label="LPA Number"
                    value={plan.lpa_no}
                  />
                  <ListItemColumn
                    triggerDialog={true}
                    label="Plan Type"
                    value={plan.plan_type}
                  />
                  <ListItemColumn
                    triggerDialog={true}
                    label="Mode"
                    value={plan.mode}
                  />
                  <ListItemColumnButton
                    triggerDialog={true}
                    label="Select Mode"
                  />
                </ListItem>
              ))
            )}
          </Box>
          <Box
            width={"full"}
            padding={2}
            bg={"gray.200"}
            display={"flex"}
            alignItems={"center"}
            borderBottomLeftRadius={"md"}
            borderBottomEndRadius={"md"}
            justifyContent={"flex-end"}
          >
            <Box>
              <Text mr={5}>Installment Payment:</Text>
              <Text mr={5}>Change Mode Fee:</Text>
              <Text mr={5}>Total Amount Due:</Text>
            </Box>
            {/* <Box>
              <Heading size={"lg"} mr={5} textAlign={"right"}>
                ₱ <span ref={TotalRIPayment}>0.00</span>
              </Heading>
              <Heading size={"lg"} mr={5} textAlign={"right"}>
                ₱ <span ref={TotalRIFee}>0.00</span>
              </Heading>
              <Heading size={"lg"} mr={5} textAlign={"right"}>
                ₱ <span ref={TotalAmountDue}>0.00</span>
              </Heading>
            </Box> */}
          </Box>
        </Steps.Content>
      </Steps.Root>
    </Box>
  );
}

const steps = ["Select Plan", "Review Application", "Payment"];
