"use client";
import ProductCard from "@/components/ui/card";
import { Text, Flex, Heading, Box } from "@chakra-ui/react";

export function GardensPage(){
    return (
      <Box maxW={"full"} mx={"auto"} py={3}>
        <Box textAlign={{ base: "center", md: "left" }}>
          <Heading
            fontWeight="bold"
            textTransform="uppercase"
            fontSize={{ base: "2xl", md: "4xl" }}
            color="green.700"
          >
            Memorial Gardens
          </Heading>
          <Text color="gray.800" mt={1} fontSize={{ base: "sm", md: "md" }}>
            A peaceful place to remember
          </Text>
        </Box>
        <Flex
          mt="8"
          gap={{ base: 8, lg: 16 }}
          //   w="full"
          overflowX={{ base: "auto", lg: "visible" }}
          scrollBehavior="smooth"
          justifyContent={{ base: "start", lg: "center" }}
        >
          <ProductCard
            variant="memorial"
            title="Guiguinto, Bulacan"
            image="/images/memorial-park/memorial-park-1.jpg"
            address="Guiguinto Memorial Gardens - St. Peter Memorial Gardens, Ilang-Ilang, Guiguinto, Bulacan"
          />
          <ProductCard
            variant="memorial"
            title="Legaspi City, Albay"
            image="/images/memorial-park/memorial-park-2.jpg"
            address="Taysan Hills, Brgy. 56-Taysan, Legaspi City, 4500 Taysan Hills, Brgy. 56-Taysan, Legaspi City"
          />
        </Flex>
      </Box>
    );
}
