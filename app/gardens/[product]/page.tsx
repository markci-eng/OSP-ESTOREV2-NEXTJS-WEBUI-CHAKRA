import { Box } from "@chakra-ui/react";
import { MemorialProductPage } from "./memorial-product-page";
import { fetchLot } from "@/lib/utils/lot";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ product: string }>;
}

export default async function Page({ params }: PageProps) {
  const { product } = await params;

  const lotTitle = await fetchLot(product).then(lot => { return lot.description; }).catch((error) => { return "Error " + error; });

  return (
    <>
      {/* {lotTitle === "Error" && redirect("/404")} */}
      <Box pt="170px" maxW="7xl" margin="auto" px={0}>
        <MemorialProductPage lotCode={product} lotTitle={lotTitle} />
      </Box>
    </>
  );
}
