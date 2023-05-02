import React from "react";
import { InlineWidget } from "react-calendly";

export const BookMeetingInlineWidget = ({ user, calenly }) => {
  return (
    <InlineWidget
      branding
      color="#00a2ff"
      pageSettings={{
        backgroundColor: "ffffff",
        hideEventTypeDetails: false,
        hideGdprBanner: true,
        hideLandingPageDetails: false,
        primaryColor: "00a2ff",
        textColor: "4d5055",
      }}
      prefill={{
        date: new Date(),
        name: "beck",
        email: "support@foodrates.com",
      }}
      text="Schedule an appointment:"
      textColor="#ffffff"
      url={calenly}
      utm={{
        utmSource: "Web",
      }}
    />
  );
};
