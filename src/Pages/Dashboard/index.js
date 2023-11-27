import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useAuthenticator } from "@aws-amplify/ui-react";
import dayjs from "dayjs";

const steps = ["Booked", "Confirmed", "Completed"];
const stepperMap = {
  Booked: 1,
  Cancelled: 1,
  Confirmed: 2,
  Completed: 3,
};

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
              <Typography
                variant="h6"
                gutterBottom
                sx={{ textTransform: "uppercase" }}
              >
                {details.vendorName}
              </Typography>
              <Typography gutterBottom>{details.address}</Typography>
            </div>
            <div className="price-details">
              <div className="price-row">
                <span>Booking Time</span>
                <span className="bold">
                  {dayjs(details.bookingDateTime).format("MM-DD-YYYY hh:mm A")}
                </span>
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
  const { user } = useAuthenticator((context) => [context.authStatus]);
  const [bookings, setBookings] = useState({
    status: "",
    data: [],
    error: null,
  });

  useEffect(() => {
    axios
      .get(`/api/bookings/list/${user?.attributes?.sub}`)
      .then((res) => {
        setBookings({ status: "success", data: res?.data?.data || [] });
      })
      .catch((error) => {
        setBookings({ status: "error", error: error });
      });
  }, []);

  const upcommingBookings = bookings?.data?.filter((x) =>
    ["Booked", "Confirmed"].includes(x.bookingStatus)
  );

  const pastBookings = bookings?.data?.filter(
    (x) => !["Booked", "Confirmed"].includes(x.bookingStatus)
  );

  return (
    <div className="booking-container">
      <div className="booking-section">
        {bookings?.status === "error" && (
          <div>
            <Typography
              variant="h4"
              align="center"
              color="text.secondary"
              sx={{
                margin: "30px 0px",
                fontFamily: "inherit",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              Something went wrong, Please try after sometime.
            </Typography>
          </div>
        )}
        {bookings.status === "success" && (
          <div className="cards-container">
            {bookings?.data?.length === 0 && (
              <div>
                <Typography
                  variant="h4"
                  align="center"
                  color="text.secondary"
                  sx={{
                    margin: "30px 0px",
                    fontFamily: "inherit",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  No records found
                </Typography>
              </div>
            )}
            {upcommingBookings?.length > 0 && (
              <>
                <Divider>
                  <Typography variant="h5">UPCOMMING BOOKINGS</Typography>
                </Divider>
                {upcommingBookings?.map((record) => (
                  <BookingCard key={record.bookingId} details={record} />
                ))}
              </>
            )}
            {pastBookings?.length > 0 && (
              <>
                <br />
                <br />
                <Divider>
                  <Typography variant="h5">PAST BOOKINGS</Typography>
                </Divider>
                {pastBookings?.map((record) => (
                  <BookingCard key={record.bookingId} details={record} />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
