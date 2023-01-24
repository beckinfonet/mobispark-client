import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

import "./styles.css";

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

export default function PaymentForm() {
  const data = useLocation();
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

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
          "https://oyster-app-6q5gi.ondigitalocean.app/payment",
          {
            amount: 89000,
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

  const BookingDetails = () => (
    <div className="summary-container">
      <p>Order Details</p>
      <div className="row-item">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            width: "100%",
          }}
        >
          <img
            src="https://pixlr.com/studio/template/8352fdc3-0e0e-4465-a3d3-af93beb070c4/thumbnail.webp"
            width={50}
            height={50}
          />
          <div>
            <div>Brandon Frank</div>
            <div>(212)755-3455</div>
          </div>
          <div>
            Email
            <p style={{ margin: 0, padding: 0 }}>brandonfrank@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );

  const Summary = ({ tax }) => (
    <div className="summary-container">
      <div className="row-item">
        <div>Base price</div>
        <p className="price-indicator">${data.state.totalBaseRate}</p>
      </div>
      <div className="row-item">
        <div>Tax</div>
        <p className="price-indicator">${tax}</p>
      </div>
      <div className="row-item">
        <div>Total</div>
        <p className="price-indicator">${tax + data.state.totalBaseRate}</p>
      </div>
    </div>
  );

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
            <BookingDetails />
            <Summary basePrice={349} tax={34} />
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
          <div class="check-container">
            <div class="check-background">
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
            <div class="check-shadow"></div>
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
