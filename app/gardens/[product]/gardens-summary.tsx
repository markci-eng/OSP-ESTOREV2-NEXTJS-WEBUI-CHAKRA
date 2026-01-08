import { SummaryItems, SummarySection } from "osp-chakra-reusable-components";
import { LuClipboardCheck } from "react-icons/lu";

interface GardernsSummaryPageProps {
  lotType: string;
  phase?: number;
  section?: number;
  block?: number;
  lot?: number;
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

export function GardensSummaryPage(props: GardernsSummaryPageProps) {
  const summaryItems = (): SummaryItems[] => {
    return [
      { label: "Phase", value: props.phase ? "Phase " + props.phase : "-" },
      { label: "Section", value: props.section ? "Section " + props.section : "-"},
      { label: "Block", value: props.block ? "Block " + props.block : "-" },
      { label: "Lot No.", value: props.lot ? "Lot " + props.lot : "-" },
      { label: "Payment Option", value: props.mode },
      { label: "Terms", value: props.term },
      { label: "Lot Price", value: props.lotPrice, type: "currency" },
      { label: "Perpetual Care", value: props.perpetualCare, type: "currency" },
      { label: "Down Payment", value: props.downPayment, type: "currency" },
      { label: "Installment Amount", value: props.installmentAmount, type: "currency" },
      { label: "Interest", value: props.interest, type: "currency" },
      { label: "Discount", value: props.discount, type: "currency" },
      { label: "Total Amount Payable", value: props.totalAmountPayable, type: "currency" },
    ];
  };

  return (
    <SummarySection
      columns={4}
      icon={<LuClipboardCheck />}
      title={"Lot Availment Summary"}
      items={summaryItems()}
    />
  );
}
