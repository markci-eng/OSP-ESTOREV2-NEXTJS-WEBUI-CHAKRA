"use client";
import {
  Box,
  Carousel,
  createListCollection,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import { Body } from "st-peter-ui";
import { SelectFloatingLabel } from "../components/select-floating-label";
import imgGardenPlan from "@/public/images/osp-chakra-reusable-components/guiguinto-memorial-lot.jpg";
import imgGardenPlanSection from "@/public/images/osp-chakra-reusable-components/sample-plan-section.jpg";
import { useState } from "react";

const phaseCollection = createListCollection({
  items: [
    {
      label: "Phase 0",
      value: 0,
    },
    {
      label: "Phase 1",
      value: 1,
    },
    {
      label: "Phase 2",
      value: 2,
    },
  ],
});

const sectionCollection = createListCollection({
  items: [
    {
      label: "Section 1",
      value: 1,
    },
    {
      label: "Section 2",
      value: 2,
    },
    {
      label: "Section 3",
      value: 3,
    },
  ],
});

const blockCollection = createListCollection({
  items: [
    {
      label: "Block 1",
      value: 1,
    },
    {
      label: "Block 2",
      value: 2,
    },
    {
      label: "Block 3",
      value: 3,
    },
  ],
});

const lotCollection = createListCollection({
  items: [
    {
      label: "Lot 1",
      value: 1,
    },
    {
      label: "Lot 2",
      value: 2,
    },
    {
      label: "Lot 3",
      value: 3,
    },
  ],
});

interface LotSelectionPageProps {
  lotType: string;
  setPhase: (phase: number) => void;
  setSection: (section: number) => void;
  setBlock: (block: number) => void;
  setLot: (lot: number) => void;
}

export function LotSelectionPage(props: LotSelectionPageProps) {
  const [page, setPage] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const zoom = 2; // magnification level
  const imageUrl = imgGardenPlan.src;

  return (
    <Box>
      <Body my={5} fontStyle={"italic"}>
        Select and view available sections using the provided Site Development
        Plan.
      </Body>
      <Grid
        my={2}
        gap={6}
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
      >
        <GridItem colSpan={1} order={{ base: 2, md: 1 }}>
          <SelectFloatingLabel
            my={1}
            label={"Phase"}
            collection={phaseCollection}
            required
            onValueChanged={(v) => {
              setPage(0);
              props.setPhase(parseInt(v[0].toString()));
            }}
          />
          <SelectFloatingLabel
            my={1}
            label={"Section"}
            collection={sectionCollection}
            required
            onValueChanged={(v) => {
              setPage(1);
              props.setSection(parseInt(v[0].toString()));
            }}
          />
          <SelectFloatingLabel
            my={1}
            label={"Block"}
            collection={blockCollection}
            required
            onValueChanged={(v) => {
              setPage(3);
              props.setBlock(parseInt(v[0].toString()));
            }}
          />
          <SelectFloatingLabel
            my={1}
            label={"Lot"}
            collection={lotCollection}
            required
            onValueChanged={(v) => {
              setPage(4);
              props.setLot(parseInt(v[0].toString()));
            }}
          />
        </GridItem>
        <GridItem colSpan={2} order={{ base: 1, md: 2 }}>
          <Carousel.Root
            page={page}
            slideCount={1}
            onPageChange={(e) => setPage(e.page)}
            scrollBehavior={"none"}
          >
            <Carousel.ItemGroup>
              <Carousel.Item index={0}>
                {/* <Image width={"full"} src={imgGardenPlan.src}/> */}
                <Box
                  position="relative"
                  w="full"
                  h="500px"
                  bgImage={`url(${imageUrl})`}
                  bgSize="cover"
                  bgPos="center"
                  borderRadius="lg"
                  overflow="hidden"
                  cursor="zoom-in"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;

                    setPosition({ x, y });
                    setShow(true);
                  }}
                  onMouseLeave={() => setShow(false)}
                >
                  {show && (
                    <Box
                      position="absolute"
                      inset={0}
                      bgImage={`url(${imageUrl})`}
                      bgRepeat="no-repeat"
                      bgSize={`${zoom * 100}%`}
                      bgPos={`${position.x}% ${position.y}%`}
                      pointerEvents="none"
                    />
                  )}
                </Box>
              </Carousel.Item>
              <Carousel.Item index={1}>
                <Box w="100%" h="300px" rounded="lg" fontSize="2.5rem">
                  <Image width={"full"} src={imgGardenPlanSection.src} />
                </Box>
              </Carousel.Item>
            </Carousel.ItemGroup>
          </Carousel.Root>
        </GridItem>
      </Grid>
    </Box>
  );
}
