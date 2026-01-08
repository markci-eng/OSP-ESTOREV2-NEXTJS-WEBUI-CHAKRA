"use client";

import React from "react";
import {
  User,
  FileText,
  CreditCard,
  Clipboard,
  Folder,
  CheckCircle,
  File,
  Clock,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Box, Flex, Text } from "@chakra-ui/react";

const SideBar = () => {
  const router = useRouter();
  const sidebarItems = [
    { icon: <User />, label: "My Account", href: "/account" },
    { icon: <FileText />, label: "Account Details", href: "/account/details" },
    { icon: <CreditCard />, label: "Pay My Plan", href: "/account/pay" },
    {
      icon: <Clipboard />,
      label: "Auto-Payment Enrollment",
      href: "/account/auto-payment",
    },
    {
      icon: <Folder />,
      label: "Request Plan Documents",
      href: "/account/request-documents",
    },
    { icon: <Folder />, label: "Manage My Plan", href: "/manage-my-plan" },
    {
      icon: <CheckCircle />,
      label: "Claim Applications",
      href: "/cab-claim",
    },
    { icon: <File />, label: "ROP Application", href: "/rop" },
    {
      icon: <Clipboard />,
      label: "Application Status",
      href: "/account/status",
    },
    {
      icon: <Clock />,
      label: "Transaction History",
      href: "/account/transactions",
    },
    { icon: <LogOut />, label: "Sign Out", href: "/logout" },
  ];

  return (
    <Box
      as="aside"
      bg="gray.200"
      w="3.5rem"                // w-24
      _hover={{ w: "20rem" }} // hover:w-lg equivalent
      transition="all 0.3s ease"
      overflow="hidden"
      borderRadius="xl"
      role="group"            // enables groupHover
    >
      <Flex as="nav" mt={4} direction="column">
        {sidebarItems.map((item, idx) => (
          <Flex
            key={idx}
            align="center"
            px={4}
            py={3}
            cursor="pointer"
            position="relative"
            _hover={{ bg: "gray.300" }}
            onClick={() => router.push(item.href)}
          >
            {/* Icon (always visible) */}
            <Box color="green.600" fontSize="xl">
              {item.icon}
            </Box>

            {/* Label (appears on hover) */}
            <Text
              ml={4}
              fontWeight="medium"
              color="gray.600"
              whiteSpace="nowrap"
              opacity={1}
              transition="opacity 0.3s ease"
              _groupHover={{ opacity: 1 }}
            >
              {item.label}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default SideBar;
