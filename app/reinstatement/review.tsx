"use client";
import { 
  Box,
  Flex,
  Text,
  Card,
  CardBody,
  Heading,
  Button,
} from "@chakra-ui/react";
import { LuReceiptText } from "react-icons/lu";
import { SummaryLabel } from "osp-chakra-reusable-components";

interface CheckedPlan {
  lpaNo: string;
  planType: string;
  isFullyPaid: boolean;
  reinstatementFee: number;
  reinstatementPayment: number;
}

interface RevRIProps {
  selectedPlans: CheckedPlan[];
  onSubmit: () => void;
  onBack: () => void;
}

export function ReviewReinstatementPage({
  selectedPlans,
  onSubmit,
  onBack,
}: RevRIProps) {
  const totalRIFee = selectedPlans.reduce((sum, p) => sum + p.reinstatementFee, 0);
  const totalRIPayment = selectedPlans.reduce((sum, p) => sum + p.reinstatementPayment, 0);
  const totalDue = totalRIFee + totalRIPayment;

  console.log("Selected Plans in Review Page:", selectedPlans);

  return (
    <Box px={0}>
        <Heading size="md" textAlign="center" mb={10} fontWeight={"semibold"} color={"gray.800"}>
          Review Reinstatements
        </Heading>
        {selectedPlans.map((plan) => (
            <Box
                key={plan.lpaNo}
                borderBottom="1px solid"
                borderColor="gray.200"
                mb={6}
                pb={4}
            >
                <Box>
                    <Text fontWeight="bold" mb={2}>
                        LPA NO: {plan.lpaNo}
                    </Text>

                    <Flex gap={{base: 20, mdDown: 10}} justify="space-between" mb={2}>
                        <Box width={"full"}>
                            <Box my={3}>
                                <SummaryLabel label="Plan Type" value={plan.planType}/>
                            </Box>
                            <Box my={3}>
                                <SummaryLabel label="Reinstatement Payment" value={`₱ ${plan.reinstatementPayment.toLocaleString()}`}/>
                            </Box>
                        </Box>
                        <Box width={"full"}>
                            <Box my={3}>
                                <SummaryLabel label="Reinstatement Fee" value={`₱ ${plan.reinstatementFee.toLocaleString()}`}/>
                            </Box>
                            <Box my={3}>
                                <SummaryLabel label="Full Payment" value={plan.isFullyPaid ? "Yes" : "No"}/>
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Box>
            ))
        }
        {/* Total Payable */}
        <Flex
            borderTop="1px solid"
            borderColor="gray.200"
            pt={5}
            mt={10}
            justify="space-between"
            align="center"
        >
            <Flex align="center" fontWeight="bold" color="gray.700">
                <LuReceiptText style={{ marginRight: 8 }} />
                Total Payable Amount
            </Flex>

            <Text fontWeight="bold">
                ₱{" "}
                {totalDue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                })}
            </Text>
        </Flex>
    </Box>
  );
}
