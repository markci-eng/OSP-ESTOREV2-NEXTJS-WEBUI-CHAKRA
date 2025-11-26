"use client"
import { Box } from "@chakra-ui/react";
import { FileClaimPage, LoginPage } from "osp-chakra-reusable-components";

export default function ClaimsPage() {
    return (
        // <LoginPage onLogin={() => {}} onSignUp={() => {}}/>
        <Box maxW={"6xl"} mx={"auto"} py={150}>
            <FileClaimPage/>
        </Box>
    )
}