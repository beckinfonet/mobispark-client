import React, { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BasicTable from "./OrderDetails";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "./styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";

const cardElementOptions = {
  iconStyle: "solid",
  style: {
    base: {
      fontSize: "18px",
      color: "#424770",
      letterSpacing: "0.025em",
      fontFamily: "Source Code Pro, monospace",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const BookingDetails = (props) => (
  <div className="summary-container">
    <p className="bold-font">ORDER SUMMARY</p>
    <BasicTable {...props} />
  </div>
);

const Summary = ({ basePrice, tax, totalPrice }) => (
  <div className="summary-container">
    <p>
      <b>Price breakdown</b>
    </p>
    <div className="row-item">
      <div>Base price</div>
      <p className="price-indicator">${basePrice}</p>
    </div>
    <div className="row-item">
      <div>Tax</div>
      <p className="price-indicator">${tax}</p>
    </div>
    <div className="row-item">
      <div>Total</div>
      <p className="price-indicator">${totalPrice}</p>
    </div>
  </div>
);

export default function PaymentForm() {
  const data = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthenticator((context) => [context.authStatus]);
  const { selectedPlan, selectedVendor, dateAndZipCode } = data.state || {};
  const [paymentStatus, setPaymentStatus] = useState("INITIATED");
  const stripe = useStripe();
  const elements = useElements();
  const tax = 34;
  const totalPrice = tax + selectedVendor?.basePrice;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const body = {
        userInfo: user?.attributes,
        paymentId: paymentMethod.id,
        vendorId: selectedVendor.id,
        vendorName: selectedVendor.title,
        address: selectedVendor.fullAddress,
        packageType: selectedPlan,
        bookingStatus: "Booked",
        date: dayjs(dateAndZipCode?.dateOfBooking?.$d).format("MM/DD/YYYY"),
        timeSlot: dateAndZipCode?.timeSlot,
        price: selectedVendor.basePrice,
        tax: tax,
        bookingDateTime: dayjs().format(),
      };
      axios
        .post("/api/bookings/create", body)
        .then(() => {
          setPaymentStatus("SUCCESS");
        })
        .catch((error) => {
          setPaymentStatus("ERROR");
          console.log(error);
        });
      // try {
      //   const { id } = paymentMethod;
      //   const response = await axios.post(
      //     "https://whale-app-snfl3.ondigitalocean.app/payment",
      //     { amount: totalPrice, id }
      //   );

      //   if (response.data.success) {
      //     console.log("Successful payment");
      //     setSuccess(true);
      //   }
      // } catch (error) {
      //   console.log("Error", error);
      // }
    } else {
      setPaymentStatus("ERROR");
      console.log(error.message);
    }
  };

  const handleBookingHistory = () => {
    window.scrollTo(0, 0);
    navigate("/bookings");
  };

  return (
    <div className="payment-container">
      {paymentStatus === "INITIATED" && (
        <div>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            sx={{
              margin: "40px 0px",
              fontFamily: "inherit",
              fontWeight: "600",
            }}
          >
            Complete Your Payment
          </Typography>
          <div>
            <BookingDetails
              userInfo={user?.attributes}
              values={dateAndZipCode}
            />
            <Summary
              basePrice={selectedVendor?.basePrice}
              tax={tax}
              totalPrice={totalPrice}
            />
          </div>
          <Divider />
          <Card
            sx={{
              maxWidth: "500px",
              margin: "auto",
              background: "rgb(0 0 0 / 4%)",
              marginTop: "40px",
            }}
          >
            <CardContent>
              <form onSubmit={handleSubmit}>
                <label>
                  Enter Card Details
                  <CardElement options={cardElementOptions} />
                </label>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!stripe}
                  fullWidth
                >
                  Pay
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      {paymentStatus === "SUCCESS" && (
        <div className="payment-successful-page">
          <div className="check-container">
            <div className="check-background">
              <svg
                viewBox="0 0 65 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 25L27.3077 44L58.5 7"
                  stroke="white"
                  strokeWidth="13"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="check-shadow"></div>
          </div>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            sx={{
              margin: "30px 0px",
              fontFamily: "inherit",
              fontWeight: "600",
            }}
          >
            Your appointment is scheduled
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            sx={{ fontSize: "14px", margin: "10px 0px" }}
          >
            Here is your booking details
          </Typography>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ border: "1px solid #CCCCCC", borderRadius: "10px", p: 2 }}
          >
            <List>
              <ListItem sx={{ py: "6px" }}>
                <ListItemIcon sx={{ minWidth: "30px", pb: "4px" }}>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={user?.attributes?.email} />
              </ListItem>
              <ListItem sx={{ py: "6px" }}>
                <ListItemIcon sx={{ minWidth: "30px", pb: "4px" }}>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${dateAndZipCode?.timeSlot}, ${dayjs(
                    dateAndZipCode?.dateOfBooking?.$d
                  ).format("dddd, MMMM DD YYYY")}`}
                />
              </ListItem>
              <ListItem sx={{ py: "6px" }}>
                <ListItemIcon sx={{ minWidth: "30px", pb: "4px" }}>
                  <LocalCarWashIcon />
                </ListItemIcon>
                <ListItemText primary={selectedVendor?.title} />
              </ListItem>
              <ListItem sx={{ py: "6px" }}>
                <ListItemIcon sx={{ minWidth: "30px", pb: "4px" }}>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary={selectedVendor?.fullAddress} />
              </ListItem>
            </List>
          </Grid>
          <br />
          <br />
          <Box sx={{ textAlign: "center" }}>
            <Button
              size="large"
              color="primary"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={handleBookingHistory}
              sx={{ borderRadius: "30px", width: "300px" }}
            >
              Your Booking History
            </Button>
          </Box>
        </div>
      )}

      {paymentStatus === "ERROR" && (
        <div className="payment-successful-page">
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            sx={{
              margin: "30px 0px",
              fontFamily: "inherit",
              fontWeight: "600",
            }}
          >
            Something went wrong, Please try after sometime...
          </Typography>
        </div>
      )}
    </div>
  );
}
