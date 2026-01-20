"use client";
import { Separator } from "@chakra-ui/react";
import { Body, Box, H3, PrimaryMdFlexButton } from "st-peter-ui";

const getLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      alert(`Latitude: ${pos.coords.latitude}, Longitude: ${pos.coords.longitude}`);
    },
    (err) => {
      alert(err.message);
    }
  );
};

export default function Page() {
  const handleNotificationClick = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications");
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      new Notification("Hello!", {
        body: "This is a push notification",
        icon: "/icon.png", // optional
      });
    } else {
      alert("Notification permission denied");
    }
  };

  return (
    <Box p={"20px"}>
      <H3>Mobile Features</H3>
      <Body>Explore the mobile features of our application.</Body>
      <Separator my="10px" />
      <PrimaryMdFlexButton my={5}><label htmlFor="camera">Camera</label></PrimaryMdFlexButton>
      <PrimaryMdFlexButton my={5} onClick={handleNotificationClick}>Notification</PrimaryMdFlexButton>
      <PrimaryMdFlexButton my={5} onClick={() => window.location.href = "/login"}>Authentication</PrimaryMdFlexButton>
      <PrimaryMdFlexButton my={5} onClick={getLocation}>Geolocation</PrimaryMdFlexButton>

      <input type="file" accept="image/*" capture="environment" id="camera" hidden/>

    </Box>
  );
}
