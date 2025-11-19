import { Text, Box, Card, Heading, IconButton } from "@chakra-ui/react"
import { StPeterProvider } from "st-peter-ui"
import RIPlanItem from "./ri-item"
import { useState } from "react";

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
  reinstatementFee: number;
  reinstatementPayment: number;
}

interface RIProps {
  initialPlans: PhLapsedPlan[];
  onSubmit: (selectedPlans: CheckedPlan[]) => void;
}

export default function RIPage({initialPlans, onSubmit}: RIProps) {
    const [phLapsedPlans] = useState<PhLapsedPlan[]>(initialPlans || []);

    return (
        <Card.Root maxW={"7xl"} mx="auto" my="8">
            <Card.Header>
                <Card.Title mx={"auto"}>Reinstatement Page</Card.Title>
                <Card.Description mx={"auto"} textAlign={"center"}>
                    Bring your plan back on track with ease. The Reinstatement option lets you reactivate a lapsed plan so you can continue enjoying your benefits and resume payments smoothly.
                </Card.Description>
            </Card.Header>
            <Card.Body>
                <Box p="6" bg="gray.50" border={"1px solid #000"} borderRadius="md">
                    <Heading size="md" mb="4">Lapsed Plans</Heading>
                    {phLapsedPlans.length === 0 ? (
                        <Text>No lapsed plans available for reinstatement.</Text>
                    ) : (
                        phLapsedPlans.map((plan) => (
                            <RIPlanItem key={plan.lpaNo}
                            plan={plan}/>
                    )))}
                </Box>
            </Card.Body>    
            <Card.Footer>
                <StPeterProvider theme="green">
                    <IconButton colorScheme="green" width={"full"}>Proceed to Reinstatement</IconButton>
                </StPeterProvider>
            </Card.Footer>
        </Card.Root>
    )
}