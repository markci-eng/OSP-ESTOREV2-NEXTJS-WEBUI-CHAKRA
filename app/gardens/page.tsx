import { Box } from "@chakra-ui/react";
import { GardensPage } from "./GardensPage";
import { GardensProductPage } from "./gardens-products-page";

export default function Page(){
    return(
        <Box  pt={"170px"} maxW={"7xl"} margin={"auto"} px={0}>
            <GardensProductPage/>
        </Box>
    );
}