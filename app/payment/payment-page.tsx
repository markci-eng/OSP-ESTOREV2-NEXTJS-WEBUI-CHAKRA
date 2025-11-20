"use client";
import { Box, Card, Icon, RadioCard, SimpleGrid, VStack, Steps } from "@chakra-ui/react";
import { LuCreditCard, LuWallet } from "react-icons/lu";
import { FaCcMastercard, FaCcVisa, FaPaypal } from "react-icons/fa";
import { PrimaryMdButton, SecondaryMdButton } from "st-peter-ui";

export default function PaymentPage() {
    return (
        <Box mt={"150px"} mb={10}>
            <Steps.Root defaultStep={1} count={3}>
                <Steps.Content index={1}>
                    <Card.Root w={"xl"} minH={"2xl"} mx={"auto"} p={10} colorPalette={"green"}>
                        <Card.Body>
                            <RadioCard.Root defaultValue="next" variant={"subtle"} colorPalette={"green"}>
                                <RadioCard.Label>Choose the payment method you'd like to use.</RadioCard.Label>
                                <VStack align="stretch">
                                    <RadioCard.Item key={1} value={"card"}>
                                        <RadioCard.ItemHiddenInput />
                                        <RadioCard.ItemControl>
                                            <Icon fontSize="4xl" color="fg.subtle">
                                                <LuCreditCard />
                                            </Icon>
                                            <RadioCard.ItemText alignSelf={"center"}>Card</RadioCard.ItemText>
                                            <RadioCard.ItemDescription>
                                                <Icon fontSize="2xl" color="fg.subtle" mx={1}>
                                                    <FaCcVisa />
                                                </Icon>
                                                <Icon fontSize="2xl" color="fg.subtle" mx={1}>
                                                    <FaCcMastercard />
                                                </Icon>
                                            </RadioCard.ItemDescription>
                                        </RadioCard.ItemControl>
                                    </RadioCard.Item>
                                    <RadioCard.Item key={2} value={"ewallet"}>
                                        <RadioCard.ItemHiddenInput />
                                        <RadioCard.ItemControl>
                                            <Icon fontSize="4xl" color="fg.subtle">
                                                <LuWallet />
                                            </Icon>
                                            <RadioCard.ItemText alignSelf={"center"}>E-Wallet</RadioCard.ItemText>
                                            <RadioCard.ItemDescription>
                                                <Icon fontSize="2xl" color="fg.subtle" mx={1}>
                                                    <FaPaypal />
                                                </Icon>
                                            </RadioCard.ItemDescription>
                                        </RadioCard.ItemControl>
                                    </RadioCard.Item>
                                </VStack>
                            </RadioCard.Root>
                        </Card.Body>
                        <Card.Footer>
                            <SimpleGrid columns={2} width={"full"}>
                                <SecondaryMdButton mx={1}>Cancel</SecondaryMdButton>
                                <Steps.NextTrigger asChild>
                                    <PrimaryMdButton mx={1}>Proceed</PrimaryMdButton>
                                </Steps.NextTrigger>
                            </SimpleGrid>
                        </Card.Footer>
                    </Card.Root>
                </Steps.Content>
                <Steps.Content index={2}>
                    <Card.Root w={"xl"} minH={"2xl"} mx={"auto"} p={10} colorPalette={"green"}>
                        <Card.Body>
                            <RadioCard.Root defaultValue="next" variant={"subtle"} colorPalette={"green"}>
                                <RadioCard.Label>Choose the payment method you'd like to use.</RadioCard.Label>
                                <VStack align="stretch">
                                    <RadioCard.Item key={1} value={"card"}>
                                        <RadioCard.ItemHiddenInput />
                                        <RadioCard.ItemControl>
                                            <Icon fontSize="4xl" color="fg.subtle">
                                                <LuCreditCard />
                                            </Icon>
                                            <RadioCard.ItemText alignSelf={"center"}>Card</RadioCard.ItemText>
                                            <RadioCard.ItemDescription>
                                                <Icon fontSize="2xl" color="fg.subtle" mx={1}>
                                                    <FaCcVisa />
                                                </Icon>
                                                <Icon fontSize="2xl" color="fg.subtle" mx={1}>
                                                    <FaCcMastercard />
                                                </Icon>
                                            </RadioCard.ItemDescription>
                                        </RadioCard.ItemControl>
                                    </RadioCard.Item>
                                    <RadioCard.Item key={2} value={"ewallet"}>
                                        <RadioCard.ItemHiddenInput />
                                        <RadioCard.ItemControl>
                                            <Icon fontSize="4xl" color="fg.subtle">
                                                <LuWallet />
                                            </Icon>
                                            <RadioCard.ItemText alignSelf={"center"}>E-Wallet</RadioCard.ItemText>
                                            <RadioCard.ItemDescription>
                                                <Icon fontSize="2xl" color="fg.subtle" mx={1}>
                                                    <FaPaypal />
                                                </Icon>
                                            </RadioCard.ItemDescription>
                                        </RadioCard.ItemControl>
                                    </RadioCard.Item>
                                </VStack>
                            </RadioCard.Root>
                        </Card.Body>
                        <Card.Footer>
                            <SimpleGrid columns={2} width={"full"}>
                                <SecondaryMdButton mx={1}>Cancel</SecondaryMdButton>
                                <Steps.NextTrigger asChild>
                                    <PrimaryMdButton mx={1}>Proceed</PrimaryMdButton>
                                </Steps.NextTrigger>
                            </SimpleGrid>
                        </Card.Footer>
                    </Card.Root>
                </Steps.Content>
            </Steps.Root>
        </Box>
    )
}