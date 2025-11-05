"use client"
import {
  Box,
  Flex,
  Text,
  Link,
  Image,
  VStack,
  HStack,
  Button, 
  Strong,
  Heading,
  Checkbox,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginFlexButton, SignupButton, InputFloatingLabel, StPeterProvider } from 'st-peter-ui';
interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onSignUp: (
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    middlename: string,
    contactnumber: string
  ) => void;
  forgotPasswordLink?: string;
}

const MotionFlex = motion(Flex);
const MotionBox = motion(Box);

export default function LoginPage({
  onLogin,
  onSignUp,
  forgotPasswordLink,
}: LoginPageProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUpClick = () => setIsSignUp(true);
  const handleSignInClick = () => setIsSignUp(false);

  const Login_OnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get('emailInput');
    const password = form.get('passwordInput');
    if (typeof email === 'string' && typeof password === 'string')
      onLogin(email, password);
  };

  const Signup_OnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get('emailInput');
    const password = form.get('passwordInput');
    const firstname = form.get('firstnameInput');
    const lastname = form.get('lastnameInput');
    const middlename = form.get('middlenameInput');
    const contactnumber = form.get('contactInput');
    const confirm = form.get('confirmPasswordInput');
    if (password !== confirm) return alert('Passwords do not match');
    if (
      typeof email === 'string' &&
      typeof password === 'string' &&
      typeof firstname === 'string' &&
      typeof lastname === 'string' &&
      typeof middlename === 'string' &&
      typeof contactnumber === 'string'
    )
      onSignUp(email, password, firstname, lastname, middlename, contactnumber);
  };

  return (
    <StPeterProvider theme='green'>
      <Flex
        w="100%"
        h="100vh"
        align="center"
        justify="center"
        bg="gray.50"
        overflow="hidden"
      >
        <Flex
          position="relative"
          w={{ base: '100%', md: '800px' }}
          h={{ base: '100%', md: '650px' }}
          borderRadius={{ base: 0, md: 'lg' }}
          boxShadow="xl"
          bg="white"
          overflow="hidden"
        >
          <AnimatePresence mode="wait">
            {!isSignUp ? (
              <MotionFlex
                key="signin"
                flex="1"
                align="center"
                justify="center"
                p={8}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <form onSubmit={Login_OnSubmit}>
                  <VStack padding={4} align="stretch" minW="280px">
                    <Image src="images/stpeter-logo.png" w="100%" mx="auto" mb={isMobile ? "20px" : "10px"} />
                    <Heading size="lg" textAlign="center" color={"rgb(53, 53, 53)"} mb={isMobile? "20px" : "10px"}>
                      Log In
                    </Heading>
                    <HStack justify="center">
                      <Link
                      border={"1px solid #ddd"}
                      borderRadius={"50%"}
                      display={"inline-flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      margin={"0 5px"}
                      height={"40px"}
                      width={"40px"}
                      >
                        <Image src="images/icons8-google-48.png" boxSize="8" />
                      </Link>
                      <Link
                      border={"1px solid #ddd"}
                      borderRadius={"50%"}
                      display={"inline-flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      margin={"0 5px"}
                      height={"40px"}
                      width={"40px"}
                      >
                        <Image src="images/icons8-meta-48.png" boxSize="8" />
                      </Link>
                      <Link
                      border={"1px solid #ddd"}
                      borderRadius={"50%"}
                      display={"inline-flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      margin={"0 5px"}
                      height={"40px"}
                      width={"40px"}
                      >
                        <Image src="images/icons8-apple-48.png" boxSize="8" />
                      </Link>
                    </HStack>
                    <Text textAlign="center" fontSize="sm" color="gray.500" my={"10px"}> 
                      or use your account
                    </Text>
                    <InputFloatingLabel type='email' label="Email" name='emailInput' required autoComplete='off'/>
                    <InputFloatingLabel type='password' label="Password" name='passwordInput' required autoComplete='off'/>
                    <Link href={forgotPasswordLink} color="blue.500" fontSize="sm" my={"10px"}>
                      Forgot your password?
                    </Link>
                    <Button type='submit'>Log In</Button>
                    <Text 
                    fontSize="sm" 
                    textAlign="center" 
                    color="gray.500" 
                    mt={2}
                    position={"absolute"}
                    left={0}
                    right={0}
                    bottom={"20px"}
                    display={isMobile ? "block" : "none"}
                    >
                      Don’t have an account?{' '}
                      <Link
                      color={"var(--chakra-colors-primary)"}
                      onClick={handleSignUpClick}
                      >
                        <Strong> Create Account</Strong>
                      </Link>
                    </Text>
                  </VStack>
                </form>
              </MotionFlex>
            ) : (
              <MotionFlex
                key="signup"
                flex="1"
                align="center"
                justify="center"
                p={0}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: isMobile ? 0 : 400, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <form onSubmit={Signup_OnSubmit}>
                  <VStack padding={3} align="stretch" maxW="sm">
                    <Heading size="lg" color={"rgb(53, 53, 53)"}>
                      Create Account
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      Join us and secure your future.
                    </Text>
                    <hr />
                    <InputFloatingLabel label="Last Name" name='lastnameInput' required autoComplete='off'/>
                    <InputFloatingLabel label="First Name" name='firstnameInput' required autoComplete='off'/>
                    <InputFloatingLabel label="Middle Name" name='middlenameInput' required autoComplete='off'/>
                    <InputFloatingLabel label="Email" type='email' name='emailInput' required autoComplete='off'/>
                    <InputFloatingLabel label="Contact No." type='number' name='contactInput' required autoComplete='off'/>
                    <InputFloatingLabel label="Password" type='password' name='passwordInput' required autoComplete='off'/>
                    <InputFloatingLabel label="Confirm Password" type='password' name='confirmPasswordInput' required autoComplete='off'/>
                    <Checkbox.Root mt={"10px"}>
                      <Checkbox.HiddenInput />
                      <Checkbox.Control colorPalette={"green"}/>
                      <Checkbox.Label color={"rgb(53, 53, 53)"}>I agree to the {' '}<Link color={"var(--chakra-colors-primary)"}><Strong>Terms and Conditions</Strong></Link></Checkbox.Label>
                    </Checkbox.Root>
                    <Checkbox.Root mb={"10px"}>
                      <Checkbox.HiddenInput />
                      <Checkbox.Control fontSize={"sm"} colorPalette={"green"}/>
                      <Checkbox.Label color={"rgb(53, 53, 53)"}>I agree to the {' '}<Link color={"var(--chakra-colors-primary)"}><Strong>Data Privacy Policy</Strong></Link></Checkbox.Label>
                    </Checkbox.Root>
                    <SignupButton type="submit" width={"100%"}/>
                    <Text 
                    fontSize="sm" 
                    textAlign="center" 
                    color="gray.500" 
                    mt={2}
                    position={"absolute"}
                    left={0}
                    right={0}
                    bottom={"20px"}
                    display={isMobile ? "block" : "none"}
                    >
                      Already have an account?{' '}
                      <Link
                      color={"var(--chakra-colors-primary)"}
                      onClick={handleSignInClick}
                      >
                        <Strong> Log In</Strong>
                      </Link>
                    </Text>
                  </VStack>
                </form>
              </MotionFlex>
            )}
          </AnimatePresence>

          {/* Overlay */}
          {!isMobile && (
            <MotionBox
              key="overlay"
              flex="1"
              bg="var(--chakra-colors-primary)"
              color="white"
              initial={{ x: isSignUp ? '-100%' : '0%' }}
              animate={{ x: isSignUp ? '-100%' : '0%' }}
              transition={{ duration: 0.6 }}
              p={0}
            >
              {isSignUp ? (
                <>
                  <Image
                    src="/images/createaccount.jpg"
                    mb={4}
                    objectFit="cover"
                    width={"100%"}
                    margin={0}
                    padding={0}
                    border={"none"}
                  />
                  <Box
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                  justifyContent="center"
                  p={8}
                  >
                      <Heading size="lg" mb={2}>
                          Already have an account?
                      </Heading>
                      <Text mb={4}>
                          To keep connected with us, please log in with your personal info
                      </Text>
                      <Button
                      size={"lg"}
                      color="white"
                      borderColor="white"
                      onClick={handleSignInClick}
                      >
                          Log In
                      </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Image
                    src="/images/ourproductsnew.webp"
                    width={"100%"}    
                    margin={0}
                    padding={0}
                    border={"none"}
                    mb={4}
                    objectFit="cover"
                  />
                  <Box
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                  justifyContent="center"
                  p={8}
                  >
                      <Heading size="lg" mb={2}>
                          Welcome to St. Peter eStore!
                      </Heading>
                      <Text mb={4}>
                          Enter your personal details and start your journey with us
                      </Text>
                      <Button
                      size={"lg"}
                      color="white"
                      borderColor="white"
                      onClick={handleSignUpClick}
                      >
                          Create Account
                      </Button>
                  </Box>
                </>
              )}
            </MotionBox>
          )}
        </Flex>
      </Flex>
    </StPeterProvider>
  );
}