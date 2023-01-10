import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51LaViqJqBNYq7xof3NXD8I9Lj1fprAvWRcvcj6G66buneVUNwhgPWwXPi8eUnjnnuM9b3KFLz35vJbZqoQ2V2RDL00I9e6mcBA";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export function PaymentContainer() {
  return (
    <Elements
      stripe={stripeTestPromise}
      options={{ appearance: { theme: "stripe" } }}
    >
      <PaymentForm />
    </Elements>
  );
}
