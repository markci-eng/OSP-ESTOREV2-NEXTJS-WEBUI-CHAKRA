"use client";
import {
  Box,
  Flex,
  Separator,
  Steps,
} from "@chakra-ui/react";
import { Body, DynamicButton, DynamicOutlineButton, H3, NextButton, PreviousButton } from "st-peter-ui";
import { useState } from "react";
import { LotSelectionPage } from "./lot-selection-page";
import { PaymentTermsPage } from "./payment-terms-page";
import { GardensSummaryPage } from "./gardens-summary";
import PaymentPage from "./payment";
import { SuccessPage } from "osp-chakra-reusable-components";
import { useRouter } from "next/navigation";

const steps = ["Select Lot", "Payment Terms", "Application Summary", "Payment"];

interface MemorialProductPageProps {
  lotCode: string;
  lotTitle: string;
}

interface TermProps {
  lotType: string;
  phase: string;
  term: string;
  mode: string;
  totalAmountPayable: number;
  lotPrice: number;
  perpetualCare: number;
  discount: number;
  interest: number;
  installmentAmount: number;
  downPayment: number;
}

export function MemorialProductPage(props : MemorialProductPageProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<number>();
  const [section, setSection] = useState<number>();
  const [block, setBlock] = useState<number>();
  const [lot, setLot] = useState<number>();
  const [termDetails, setTermDetails] = useState<TermProps>();

  return (
    <Box maxW={"full"} mx={"auto"} py={3}>
      <Box textAlign={{ base: "center", md: "left" }}>
        <H3>{props.lotTitle}</H3>
        <Body mt={1}>
          Enhanced garden spaces offering elegance, comfort, and lasting peace.
        </Body>
      </Box>

      <Steps.Root
        step={step}
        onStepChange={(e) => setStep(e.step)}
        count={steps.length}
        my={5}
        onStepComplete={() => {}}
      >
        <Steps.List>
          {steps.map((step, index) => (
            <Steps.Item key={index} index={index} title={step}>
              <Steps.Indicator
                _current={{
                  backgroundColor: "var(--chakra-colors-primary-disabled)/50",
                  borderColor: "var(--chakra-colors-primary)",
                  color: "var(--chakra-colors-primary-hover)",
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
        <Separator />
        <Steps.Content index={0}>
          <LotSelectionPage lotType={props.lotCode} setPhase={ setPhase } setSection={ setSection } setBlock={ setBlock } setLot={ setLot } />
        </Steps.Content>
        <Steps.Content index={1}>
          <PaymentTermsPage lotType={props.lotCode} phase={phase} section={section} block={block} lot={lot} setTerms={setTermDetails} />
        </Steps.Content>
        <Steps.Content index={2}>
          <GardensSummaryPage 
          lotType={props.lotCode} 
          phase={phase} 
          section={section} 
          block={block} 
          lot={lot} 
          term={termDetails?.term ?? ""} 
          mode={termDetails?.mode ?? ""} 
          totalAmountPayable={termDetails?.totalAmountPayable ?? 0} 
          lotPrice={termDetails?.lotPrice ?? 0} 
          perpetualCare={termDetails?.perpetualCare ?? 0} 
          discount={termDetails?.discount ?? 0} 
          interest={termDetails?.interest ?? 0} 
          installmentAmount={termDetails?.installmentAmount ?? 0} 
          downPayment={termDetails?.downPayment ?? 0}/>
        </Steps.Content>
        <Steps.Content index={3}>
          <PaymentPage/>
        </Steps.Content>
        <Steps.CompletedContent>
          <Box mt={"-150px"}>
            <SuccessPage 
            title="Payment Successful" 
            description="A confirmation email has also been sent, and you can view or track this anytime in your account."  
            transactionId="GY-12345"
            totalAmount={`₱ ${(termDetails && termDetails.downPayment + termDetails.installmentAmount)?.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            dateTime="JAN 07, 2026, 10:36 AM"
            onClickHome={() => router.push("/")} 
            onClickProceed={() => router.push("/transaction/GY-12345")} 
            variant={"payment"}/>
          </Box>
        </Steps.CompletedContent>
        
        <Flex justifyContent={"space-between"}>
          <Steps.PrevTrigger asChild>
            {step < 3 && <PreviousButton />}
          </Steps.PrevTrigger>
          <Box>
            {step === 2 && <DynamicOutlineButton label="Add to Cart" mx={2}/>}
            {step === 2 && <Steps.NextTrigger asChild><DynamicButton label="Checkout"/></Steps.NextTrigger>}
          </Box>
          <Steps.NextTrigger asChild>
            {step < 3 && step != 2 && <NextButton />}
          </Steps.NextTrigger>
        </Flex>
      </Steps.Root>
    </Box>
  );
}
