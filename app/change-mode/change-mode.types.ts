
export type PlanDetails = {
    lpa_no: string;
    plan_type: string;
    mode: string;
    total_amount_payable: number;
    total_amount_paid: number;
    installment_no: number;
    balance: number;
    installment_amount: number;
}

export type PlanType = {
    plan_code: string;
    description: string;
    term: number;
    mode: string;
    contract_price: number;
    total_amount_payable: number;
    installment_amount: number;
}