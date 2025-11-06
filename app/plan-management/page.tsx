"use client";
import { Box, Heading, Spinner } from "@chakra-ui/react";
import { PrimaryMdButton } from "st-peter-ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert("User has been signed out!")
      router.push("/login");
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <Box p={5} pt="150px">
        <Spinner /> Loading...
      </Box>
    );
  }

  if (!user) return null; // prevent rendering before redirect

  return (
    <Box p={5} pt="150px">
      <Heading>
        Welcome {user.firstName} {user.lastName}!!
      </Heading>
      <PrimaryMdButton
        onClick={() => {
          localStorage.removeItem("user_data");
          router.push("/");
        }}
      >
        Log Out
      </PrimaryMdButton>
    </Box>
  );
}
