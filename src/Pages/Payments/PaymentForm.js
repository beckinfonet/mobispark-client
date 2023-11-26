import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import BasicTable from "./OrderDetails";

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
  const { user } = useAuthenticator((context) => [context.authStatus]);
  const { selectedVendor, dateAndZipCode } = data.state || {};
  const [success, setSuccess] = useState(false);
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
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "https://whale-app-snfl3.ondigitalocean.app/payment",
          {
            amount: totalPrice,
            id,
          }
        );

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div className="payment-container">
      {!success ? (
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
      ) : (
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
              margin: "40px 0px",
              fontFamily: "inherit",
              fontWeight: "600",
            }}
          >
            Thank you for your business! Your car will be taken care of in no
            time!
          </Typography>
        </div>
      )}
    </div>
  );
}
