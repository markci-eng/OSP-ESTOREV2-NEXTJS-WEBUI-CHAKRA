// "use client";
// import { Box, Heading, Spinner } from "@chakra-ui/react";
// import { PrimaryMdButton } from "st-peter-ui";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function Page() {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       alert("User has been signed out!")
//       router.push("/login");
//     }
//     setLoading(false);
//   }, [router]);

//   if (loading) {
//     return (
//       <Box p={5} pt="150px">
//         <Spinner /> Loading...
//       </Box>
//     );
//   }

//   if (!user) return null; // prevent rendering before redirect

//   return (
//     <Box p={5} pt="150px">
//       <Heading>
//         Welcome {user.firstName} {user.lastName}!!
//       </Heading>
//       <PrimaryMdButton
//         onClick={() => {
//           localStorage.removeItem("user_data");
//           router.push("/");
//         }}
//       >
//         Log Out
//       </PrimaryMdButton>
//     </Box>
//   );
// }


import SideBar from "./SideBar";
import { Body, H4 } from "osp-themes";
import React from "react";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineNumber } from "react-icons/ai";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { RiContactsBook3Line } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { VscLocation } from "react-icons/vsc";
import { Badge, Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";

const page = () => {
  return (
    <Box mt={32} p={8}>
      <Flex maxW="7xl" mx="auto" justify="center">
        <SideBar />

        <Flex direction="column" w="full">
          {/* Account Overview */}
          <Box flex={1} p={8}>
            <Heading size="md">Account Overview</Heading>
            <Text color="gray.500">
              Quick information about your account
            </Text>

            <Grid
              templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
              gap={8}
              mt={4}
            >
              {[
                {
                  icon: <VscAccount size={32} />,
                  label: "Account Holder",
                  value: "Juan Dela Cruz",
                },
                {
                  icon: <AiOutlineNumber size={32} />,
                  label: "Insurability",
                  value: "Insurable",
                },
                {
                  icon: <FaHandHoldingHeart size={32} />,
                  label: "Member Since",
                  value: "January 1, 2020",
                },
                {
                  icon: <RiContactsBook3Line size={32} />,
                  label: "Contact Number",
                  value: "+63 912 345 6789",
                },
                {
                  icon: <MdOutlineMailOutline size={32} />,
                  label: "Email Address",
                  value: "juan.delacruz@gmail.com",
                },
                {
                  icon: <VscLocation size={40} />,
                  label: "Home Address",
                  value:
                    "1234 Elm Street, Barangay 1, Makati City, Philippines",
                },
              ].map((item, index) => (
                <Flex
                  key={index}
                  p={8}
                  border="1px"
                  borderColor="gray.300"
                  borderRadius="lg"
                  align="center"
                  gap={4}
                >
                  <Box color="green.700">{item.icon}</Box>
                  <Box>
                    <Text color="gray.500">{item.label}</Text>
                    <Text fontWeight="bold">{item.value}</Text>
                  </Box>
                </Flex>
              ))}
            </Grid>
          </Box>

          {/* Active Plans */}
          <Box flex={1} p={8}>
            <Flex justify="space-between" align="center">
              <Box>
                <Heading size="md">Active Plans</Heading>
                <Text color="gray.500">
                  Manage your active plans
                </Text>
              </Box>

              <Badge
                bg="green.700"
                color="white"
                px={3}
                py={1}
                borderRadius="lg"
              >
                1 Active Plan
              </Badge>
            </Flex>

            <Grid templateColumns="1fr" mt={4}>
              <Box border="1px" borderColor="gray.300" p={8} borderRadius="md">
                <Flex direction="column" gap={8}>
                  <Box>
                    <Heading size="md">ST. ANNE</Heading>
                    <Text color="gray.500">
                      Effectivity Date: January 1, 2020
                    </Text>
                  </Box>

                  <Flex gap={16} wrap="wrap">
                    {[
                      { label: "Contract Price", value: "₱141,750.00" },
                      { label: "Plan Term", value: "5 years" },
                      {
                        label: "Installment",
                        value: "₱3,000 / month",
                      },
                      {
                        label: "Maturity Date",
                        value: "January 1, 2025",
                      },
                    ].map((item, index) => (
                      <Flex key={index} direction="column" gap={4}>
                        <Text color="gray.500">{item.label}</Text>
                        <Text fontWeight="bold">{item.value}</Text>
                      </Flex>
                    ))}
                  </Flex>
                </Flex>
              </Box>
            </Grid>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default page;
