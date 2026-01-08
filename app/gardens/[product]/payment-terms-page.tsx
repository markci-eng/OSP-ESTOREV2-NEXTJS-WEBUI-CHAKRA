import {
  Box,
  createListCollection,
  Grid,
  RadioCard,
  Span,
  VStack,
} from "@chakra-ui/react";
import { Body, H4, Small } from "st-peter-ui";
import { SelectFloatingLabel } from "../components/select-floating-label";
import { useEffect, useState } from "react";
import { fetchTerms } from "@/lib/utils/garden-terms";

interface PaymentTermsPageProps {
  lotType: string;
  phase?: number;
  section?: number;
  block?: number;
  lot?: number;
  setTerms: (terms: TermProps | undefined) => void;
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

const formatValue = (
  value: string | number | Date | boolean,
  type: string
): string => {
  switch (type) {
    case "string":
      return value.toString();
    case "number":
      return value.toLocaleString();
    case "currency":
      return `₱ ${value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    case "date":
      return value.toLocaleString();
    case "boolean":
      return value == true ? "Yes" : "No";
    default:
      return value.toString();
  }
};

export function PaymentTermsPage(props: PaymentTermsPageProps) {
  const [mode, setMode] = useState<string>("");
  const [monthlyTerms, setMonthlyTerms] = useState<string>("");
  const [terms, setTerms] = useState<TermProps[]>([]);
  const [scTerms, setSCTerms] = useState<TermProps[]>([]);
  const [anTerms, setANTerms] = useState<TermProps[]>([]);

  const [lotPrice, setLotPrice] = useState<number>(0);
  const [perpetualCare, setPerpetualCare] = useState<number>(0);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [installmentAmount, setInstallmentAmount] = useState<number>(0);
  const [interest, setInterest] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [totalAmountPayable, setTotalAmountPayable] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const _fetchedTerms = await fetchTerms(props.lotType, props.phase?? -1);
      const _monthlyTerms = _fetchedTerms.filter(
        (term: { mode: string }) => term.mode === "MONTHLY"
      );
      const _spotCashTerms = _fetchedTerms.filter(
        (term: { mode: string }) => term.mode === "SPOT CASH"
      );
      const _atNeedTerms = _fetchedTerms.filter(
        (term: { mode: string }) => term.mode === "AT-NEED"
      );
      setTerms(_monthlyTerms);
      setSCTerms(_spotCashTerms);
      setANTerms(_atNeedTerms);
    };
    fetchData();
  }, [props.lotType, props.phase]);

  useEffect(() => {
    if (mode === "MONTHLY") {
      const selectedTerm = terms.find(
        (term) => term.term === monthlyTerms.toString()
      );

      if (selectedTerm) {
        setLotPrice(selectedTerm.lotPrice);
        setPerpetualCare(selectedTerm.perpetualCare);
        setDownPayment(selectedTerm.downPayment);
        setInstallmentAmount(selectedTerm.installmentAmount);
        setInterest(selectedTerm.interest);
        setDiscount(selectedTerm.discount);
        setTotalAmountPayable(selectedTerm.totalAmountPayable);
        props.setTerms(selectedTerm);
      }
    } else if (mode === "SPOT CASH") {
      setLotPrice(scTerms[0]?.lotPrice || 0); 
      setPerpetualCare(scTerms[0]?.perpetualCare || 0);
      setDownPayment(scTerms[0]?.downPayment || 0);
      setInstallmentAmount(scTerms[0]?.installmentAmount || 0);
      setInterest(scTerms[0]?.interest || 0);
      setDiscount(scTerms[0]?.discount || 0);
      setTotalAmountPayable(scTerms[0]?.totalAmountPayable || 0);
      props.setTerms(scTerms[0]);
    } else if (mode === "AT-NEED") {
      setLotPrice(anTerms[0]?.lotPrice || 0);
      setPerpetualCare(anTerms[0]?.perpetualCare || 0);
      setDownPayment(anTerms[0]?.downPayment || 0);
      setInstallmentAmount(anTerms[0]?.installmentAmount || 0);
      setInterest(anTerms[0]?.interest || 0);
      setDiscount(anTerms[0]?.discount || 0);
      setTotalAmountPayable(anTerms[0]?.totalAmountPayable || 0);
      props.setTerms(anTerms[0]);
    }
  }, [mode, monthlyTerms]);

  useEffect(() => {
    setMonthlyTerms(terms[terms.length - 1]?.term || "0");
  },[terms]);

  const modeCollection = createListCollection({
    items: [
      {
        label: "At-Need",
        value: "AT-NEED",
      },
      {
        label: "Spot Cash",
        value: "SPOT CASH",
      },
      {
        label: "Monthly",
        value: "MONTHLY",
      },
    ],
  });


  return (
    <Box>
      <Grid
        my={2}
        gap={6}
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
      >
        <Box>
          <Body my={5} fontStyle={"italic"}>
            Select your prefered payment option.
          </Body>
          <SelectFloatingLabel
            my={1}
            label={"Mode"}
            collection={modeCollection}
            required
            onValueChanged={(v) => setMode(v[0].toString())}
          />
          <Box display={mode === "MONTHLY" ? "block" : "none"}>
            <RadioCard.Root
              variant={"subtle"}
              value={monthlyTerms}
              onValueChange={(e) => {
                setMonthlyTerms(e.value ?? "");
              }}
            >
              <RadioCard.Label>Select Terms</RadioCard.Label>
              <Grid templateColumns={"repeat(2, 1fr)"} gap={3}>
                {terms.map((term, index) => (
                  <RadioCard.Item
                    key={index}
                    value={term.term}
                    cursor={"pointer"}
                    border={"none"}
                  >
                    <RadioCard.ItemHiddenInput />
                    <RadioCard.ItemControl
                      _checked={{
                        backgroundColor:
                          "var(--chakra-colors-primary-disabled)/50",
                        borderColor: "var(--chakra-colors-primary)",
                        borderWidth: "1px",
                        color: "var(--chakra-colors-primary-hover)",
                      }}
                    >
                      <RadioCard.ItemContent>
                        <RadioCard.ItemText>
                          {term.term + " Months"}
                        </RadioCard.ItemText>
                        <RadioCard.ItemDescription>
                          {formatValue(term.installmentAmount, "currency") +
                            " / mo"}
                        </RadioCard.ItemDescription>
                      </RadioCard.ItemContent>
                      <RadioCard.ItemIndicator
                        _checked={{
                          color: "var(--chakra-colors-primary)",
                          borderColor: "var(--chakra-colors-primary)",
                        }}
                      />
                    </RadioCard.ItemControl>
                  </RadioCard.Item>
                ))}
              </Grid>
            </RadioCard.Root>
          </Box>
        </Box>
        <Box
          p={5}
          width={"full"}
          borderWidth="1px"
          borderColor="var(--chakra-colors-primary)"
          borderRadius="lg"
          bg={"var(--chakra-colors-primary-disabled)/50"}
        >
          <H4 color="var(--chakra-colors-primary-hover)">Terms Details</H4>
          <Grid my={3} gap={3} templateColumns={"repeat(2, 1fr)"}>
            <InfoItem
              label={"Lot Price"}
              value={formatValue(lotPrice, "currency")}
            />
            <InfoItem
              label={"Perpetual Care"}
              value={formatValue(perpetualCare, "currency")}
            />
            <InfoItem
              label={"Down Payment"}
              value={formatValue(downPayment, "currency")}
            />
            <InfoItem
              label={"Installment Amount"}
              value={formatValue(installmentAmount, "currency")}
            />
            <InfoItem
              label={"Interest"}
              value={formatValue(interest, "currency")}
            />
            <InfoItem
              label={"Discount"}
              value={formatValue(discount, "currency")}
            />
            <InfoItem
              label={"Total Amount Payable"}
              value={formatValue(totalAmountPayable, "currency")}
            />
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <VStack gap={1} align="start" minW={0}>
    <Small>{label}</Small>
    <Body>
      <Span fontWeight="semibold">{value}</Span>
    </Body>
  </VStack>
);
