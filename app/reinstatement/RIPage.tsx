import { Text, Box, Card, Heading, Steps, Button, Stack, Container, ButtonGroup, Flex } from "@chakra-ui/react"
import { PrimaryMdButton, SecondaryMdButton } from "st-peter-ui"
import RIPlanItem from "./ri-item"
import { useRef, useEffect, useState } from "react";
import { LuCheck, LuFileText, LuFilePenLine, LuCreditCard } from "react-icons/lu";
import { ReviewReinstatementPage } from "./review";
import PaymentPage from "./payment";
import { SuccessPage } from "osp-chakra-reusable-components";
import { ListItem, ListItemColumn } from "../components/list-item/list-item";

interface PhLapsedPlan {
    lpaNo: string;
    phName: string;
    planType: string;
    mop: string;
    status: string;
    totalAmtPayable: string;
    totalAmtPaid: string;
    balance: string;
    instAmt: string;
    newLpaNo: string;
    newStatus: string;
    newTotalAmtPayable: string;
    newTotalAmtPaid: string;
    newBalance: string;
    newInstAmt: string;
    duedate: string;
}

interface CheckedPlan {
    lpaNo: string;
    planType: string;
    isFullyPaid: boolean;
    reinstatementFee: number;
    reinstatementPayment: number;
    }

interface RIProps {
  initialPlans: PhLapsedPlan[];
  onSubmit: (selectedPlans: CheckedPlan[]) => void;
}

export default function RIPage({initialPlans, onSubmit}: RIProps) {
    const [phLapsedPlans] = useState<PhLapsedPlan[]>(initialPlans || []);
    const [checkedPlans, setCheckedPlans] = useState<CheckedPlan[]>([]);
    const TotalAmountDue = useRef<HTMLSpanElement>(null);
    const TotalRIPayment = useRef<HTMLSpanElement>(null);
    const TotalRIFee = useRef<HTMLSpanElement>(null);
    
    const step1Next = useRef<HTMLButtonElement>(null);
    const [step, setStep] = useState(0)

    const handleCheckedChange = (checked: boolean, values: CheckedPlan) => {
        setCheckedPlans(prev => {
            if (checked) {
                if (!prev.some(p => p.lpaNo === values.lpaNo)) {
                    return [...prev, values];
                }
                return prev;
            }

            return prev.filter(p => p.lpaNo !== values.lpaNo);
        });
    };

    useEffect(() => {
        let totalDue = 0;
        let totalRIPayment = 0;
        let totalRIFee = 0;
        checkedPlans.forEach(plan => {
          totalRIPayment += plan.reinstatementPayment;
          totalRIFee += plan.reinstatementFee;
          totalDue += plan.reinstatementFee + plan.reinstatementPayment;
        });
        
        if (TotalRIPayment.current)
            TotalRIPayment.current.innerText = totalRIPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        if (TotalRIFee.current)
            TotalRIFee.current.innerText = totalRIFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        if (TotalAmountDue.current)
            TotalAmountDue.current.innerText = totalDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        if(step1Next.current)
            step1Next.current.disabled = checkedPlans.length === 0;
    }, [checkedPlans]);

    return (
      <Box maxW={"7xl"} mx={"auto"} my={8} px={0}>
        <Container centerContent p="0">
          <Text textStyle="2xl" fontWeight="semibold">
            Reinstatement Application
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
                  borderColor: "var(--chakra-colors-primary)"
                }}
                _complete={{
                  backgroundColor: "var(--chakra-colors-primary)",
                  borderColor: "var(--chakra-colors-primary)"
                }}/>
                <Steps.Title display={{ base: "block", mdDown: "none" }}>
                  {step}
                </Steps.Title>
                <Steps.Separator _complete={{
                  backgroundColor: "var(--chakra-colors-primary)"
                }} />
              </Steps.Item>
            ))}
          </Steps.List>

          {/* Step 1: Select Lapsed Plans */}
          <Steps.Content key={1} index={0}>
            <Text mx={"auto"} my={5}>
              Bring your plan back on track with ease. The Reinstatement option
              lets you reactivate a lapsed plan so you can continue enjoying
              your benefits and resume payments smoothly.
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
                  <Heading size="lg">Lapsed Plans</Heading>
                  <Text fontSize="sm" mb="4" fontStyle={"italic"}>
                    Kindly select plans you want to reinstate.
                  </Text>
                </Box>
                <Box textAlign={"right"}>
                  <Text fontSize="sm" fontStyle={"italic"}>
                    No. of plans selected:
                  </Text>
                  <Heading size="lg">{checkedPlans.length}/{phLapsedPlans.length}</Heading>
                </Box>
              </Flex>
              {phLapsedPlans.length === 0 ? (
                <Text>No lapsed plans available for reinstatement.</Text>
              ) : (
                phLapsedPlans.map((plan, index) => (
                  <RIPlanItem
                    key={index}
                    plan={plan}
                    onChange={(checked, values) =>
                      handleCheckedChange(checked, values)
                    }
                  />
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
                <Text mr={5}>Reinstatement Payment:</Text>
                <Text mr={5}>Reinstatement Fee:</Text>
                <Text mr={5}>Total Amount Due:</Text>
              </Box>
              <Box>
                <Heading size={"lg"} mr={5} textAlign={"right"}>
                  ₱ <span ref={TotalRIPayment}>0.00</span>
                </Heading>
                <Heading size={"lg"} mr={5} textAlign={"right"}>
                  ₱ <span ref={TotalRIFee}>0.00</span>
                </Heading>
                <Heading size={"lg"} mr={5} textAlign={"right"}>
                  ₱ <span ref={TotalAmountDue}>0.00</span>
                </Heading>
              </Box>
            </Box>
          </Steps.Content>

          {/* Step 2: Review Reinstatement */}
          <Steps.Content key={2} index={1}>
            <ReviewReinstatementPage
              selectedPlans={checkedPlans}
              onBack={() => {}}
              onSubmit={() => {}}
            />
          </Steps.Content>

          {/* Step 3: Choose Payment Option */}
          <Steps.Content key={3} index={2}>
            <PaymentPage />
          </Steps.Content>

          <Steps.CompletedContent>
            <SuccessPage
              title="Reinstatement Successfully Submitted"
              description="Your application has been successfully submitted."
              transactionId={`RI-${Math.floor(Math.random() * 1000000000)}`}
              totalAmount={TotalAmountDue.current?.innerText || ""}
              dateTime={new Date().toLocaleString()}
              variant="payment"
              onClickHome={() => {}}
              onClickProceed={() => {}}
            />
          </Steps.CompletedContent>

          <Flex justifyContent={"space-between"}>
            <Steps.PrevTrigger asChild>
              {step < 3 && <SecondaryMdButton>Previous</SecondaryMdButton>}
            </Steps.PrevTrigger>
            <Steps.NextTrigger asChild>
              {step < 2 && (
                <PrimaryMdButton
                  disabled={step === 0 && checkedPlans.length === 0}
                >
                  Next
                </PrimaryMdButton>
              )}
            </Steps.NextTrigger>
          </Flex>
        </Steps.Root>
      </Box>
    );
}

const steps = ["Select Lapsed Plan", "Review Reinstatement", "Payment"]