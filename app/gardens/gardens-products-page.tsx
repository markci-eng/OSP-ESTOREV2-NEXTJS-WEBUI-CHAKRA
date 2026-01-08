"use client";
import {ProductCard, ProductCardSkeleton} from "./product-card"
import { Text, Image, Heading, Grid, Box } from "@chakra-ui/react";
import imgGardenLot from "@/public/images/osp-chakra-reusable-components/garden-lot.jpg";
import imgLawnLot from "@/public/images/osp-chakra-reusable-components/lawn-lot.jpg";
import imgMausoleum from "@/public/images/osp-chakra-reusable-components/mausoleum.jpg";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductDescriptions = [
  "A serene resting place surrounded by nature’s quiet beauty.",
  "Enhanced garden spaces offering elegance, comfort, and lasting peace.",
  "A refined lawn sanctuary designed for dignified remembrance.",
  "A simple, tranquil space to honor cherished memories.",
  "Thoughtfully placed lawn plots for a more distinguished tribute.",
  "Premium lawn spaces offering elevated comfort and timeless serenity.",
  "A grand, luxurious memorial built for enduring legacy.",
  "A classic, dignified structure for honoring loved ones.",
  "A beautifully crafted mausoleum offering elevated design and lasting tribute."
]

interface LotProps {
  lotCode: string,
  description: string
}

export function GardensProductPage(){
    const [lots, setLots] = useState<LotProps[]>([]);
    const [dataLoading, setDataLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
      const fetchLots = async () => {
        try {
          const res = await fetch("https://localhost:7274/api/Lots", {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
          });

          if (!res.ok) {
            throw new Error("Network response was not ok");
          }

          const data: LotProps[] = await res.json();
          setLots(data);
          setDataLoading(false);
        } catch (error) {
          console.error("Error fetching lots:", error);
        }
      };

      fetchLots();
    }, []);


    return (
      <Box maxW={"full"} mx={"auto"} py={3}>
        <Box textAlign={{ base: "center", md: "left" }}>
          <Heading
            fontWeight="bold"
            textTransform="uppercase"
            fontSize={{ base: "2xl", md: "4xl" }}
            color="green.700"
          >
            Our Memorial Products
          </Heading>
          <Text color="gray.800" mt={1} fontSize={{ base: "sm", md: "md" }}>
            A peaceful place to remember
          </Text>
        </Box>
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="6" my={8}>
            <ProductCardSkeleton loading={dataLoading} />
            <ProductCardSkeleton loading={dataLoading} />
            <ProductCardSkeleton loading={dataLoading} />
            {
              lots.map((lot, index) => (
                <ProductCard 
                key={lot.lotCode}
                imgSrc={lot.lotCode.includes("LL") ? imgLawnLot.src : lot.lotCode.includes("GL") ? imgGardenLot.src : imgMausoleum.src} 
                title={lot.description} 
                description={ProductDescriptions[index]}
                onClick={() => router.push(`/gardens/${lot.lotCode}`)}/>
              ))
            }
        </Grid>
      </Box>
    );
}
