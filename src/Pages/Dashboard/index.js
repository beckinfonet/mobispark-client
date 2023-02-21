import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import "./styles.css";

const steps = ["Booked", "Confirmed", "Completed"];
const stepperMap = {
  Booked: 1,
  Cancelled: 1,
  Confirmed: 2,
  Completed: 3,
};

const pastOrders = [
  {
    bookingId: "1233-4524-2452-45245",
    vendor: "Xavier's car detailing",
    address: "1542 N Broadway, Baltimore, MD 21213",
    packageType: "Basic",
    bookingStatus: "Completed",
    date: "02/08/2023",
    timeSlot: "02-03 PM",
    price: 262.5,
    tax: 34,
  },
  {
    bookingId: "1233-4524-6666-45245",
    vendor: "Xavier's car detailing",
    address: "1542 N Broadway, Baltimore, MD 21213",
    packageType: "Basic",
    bookingStatus: "Completed",
    date: "02/08/2023",
    timeSlot: "02-03 PM",
    price: 262.5,
    tax: 34,
  },
  {
    bookingId: "1233-4524-4444-45245",
    vendor: "Xavier's car detailing",
    address: "1542 N Broadway, Baltimore, MD 21213",
    packageType: "Basic",
    bookingStatus: "Completed",
    date: "02/08/2023",
    timeSlot: "02-03 PM",
    price: 262.5,
    tax: 34,
  },
  {
    bookingId: "1233-4524-7777-45245",
    vendor: "Xavier's car detailing",
    address: "1542 N Broadway, Baltimore, MD 21213",
    packageType: "Basic",
    bookingStatus: "Cancelled",
    date: "02/08/2023",
    timeSlot: "02-03 PM",
    price: 262.5,
    tax: 34,
  },
  {
    bookingId: "1233-4524-3333-45246",
    vendor: "Xavier's car detailing",
    address: "1542 N Broadway, Baltimore, MD 21213",
    packageType: "PRO",
    bookingStatus: "Completed",
    date: "02/08/2023",
    timeSlot: "02-03 PM",
    price: 262.5,
    tax: 34,
  },
];

const upcommingOrders = [
  {
    bookingId: "1233-4524-7777-45245",
    vendor: "Xavier's car detailing",
    address: "1542 N Broadway, Baltimore, MD 21213",
    packageType: "Basic",
    bookingStatus: "Booked",
    date: "02/08/2023",
    timeSlot: "02-03 PM",
    price: 262.5,
    tax: 34,
  },
  {
    bookingId: "1233-4524-3333-45246",
    vendor: "Xavier's car detailing",
    address: "1542 N Broadway, Baltimore, MD 21213",
    packageType: "PRO",
    bookingStatus: "Confirmed",
    date: "02/08/2023",
    timeSlot: "02-03 PM",
    price: 262.5,
    tax: 34,
  },
];

const BookingCard = (props) => {
  const { details } = props;
  const [expand, setExpand] = useState(false);

  const getCardType = (status) => {
    switch (status) {
      case "Completed":
        return "blue";
      case "Confirmed":
        return "green";
      case "Cancelled":
        return "red";
      default:
        return "grey";
    }
  };

  const handleExpand = () => {
    setExpand((old) => !old);
  };

  return (
    <div className={`booking-card ${getCardType(details.bookingStatus)}`}>
      <div className="card-cover-section">
        <p className="location-section">
          {details.vendor} | {details.date} :: {details.timeSlot} | STATUS :{" "}
          {details.bookingStatus}
        </p>

        <div>
          <IconButton aria-label="Expand More Icon" onClick={handleExpand}>
            {expand ? (
              <ExpandLessIcon fontSize="inherit" />
            ) : (
              <ExpandMoreIcon fontSize="inherit" />
            )}
          </IconButton>
        </div>
      </div>
      {expand && (
        <>
          <div className="booking-status">
            <div className="text-content">
              Package:{" "}
              <span className="font-normal">{details.packageType}</span>
            </div>
            <div className="text-content">
              Booking Status:{" "}
              <span className="status">{details.bookingStatus}</span>
            </div>
          </div>
          <div className="booking-details-section">
            <div className="left-content">
              <p className="date-time-text">
                {details.date} :: {details.timeSlot}
              </p>
              <Typography variant="h6" gutterBottom>
                {details.vendor}
              </Typography>
              <Typography gutterBottom>{details.address}</Typography>
            </div>
            <div className="price-details">
              <div className="price-row">
                <span>Booking ID</span>
                <span className="bold">{details.bookingId}</span>
              </div>
              <div className="price-row">
                <span>Base price</span>
                <span className="bold">${details.price}</span>
              </div>
              <div className="price-row">
                <span>Tax</span>
                <span className="bold">${details.tax}</span>
              </div>
              <div className="price-row">
                <span>Total</span>
                <span className="bold">${details.price + details.tax}</span>
              </div>
            </div>
          </div>
          <div className="booking-tracker">
            <Box sx={{ width: "100%" }}>
              <Stepper
                activeStep={stepperMap[details.bookingStatus]}
                alternativeLabel
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>
        </>
      )}
    </div>
  );
};

export const Dashboard = () => {
  return (
    <div className="booking-container">
      <div className="booking-section">
        <div className="cards-container">
          <Divider>
            <Typography variant="h5">UPCOMMING BOOKINGS</Typography>
          </Divider>
          {upcommingOrders.map((record) => (
            <BookingCard key={record.bookingId} details={record} />
          ))}
          <br />
          <br />
          <Divider>
            <Typography variant="h5">PAST BOOKINGS</Typography>
          </Divider>
          {pastOrders.map((record) => (
            <BookingCard key={record.bookingId} details={record} />
          ))}
        </div>
      </div>
    </div>
  );
};
