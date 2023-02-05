import React from "react";
import receiptImg from "../../assets/images/receipt-img.png";

import Chip from "@mui/material/Chip";
import "./styles.css";

const UpcomingOrder = ({ color, label }) => {
  return (
    <div className="upcoming-order-container">
      <div className="img-component">
        <img src={receiptImg} width={50} height={60} className="receipt-img" />
      </div>
      <div className="text-details">
        <p>Xavier's Full Detailing service</p>
        <div>February 12, 2023 @11am</div>
        <p>Jose's Detailing</p>
        <Chip label={label} color={color} size="small" />
      </div>
    </div>
  );
};
export const Dashboard = () => (
  <div className="dashboard-container">
    <div>You upcoming orders</div>
    <UpcomingOrder label={"Confirmed"} color={"success"} />
    <br />
    <div>Your past orders</div>
    <UpcomingOrder label={"Completed"} color={"primary"} />
    <UpcomingOrder label={"Completed"} color={"primary"} />
    <UpcomingOrder label={"cancelled"} color={"warning"} />
    <UpcomingOrder label={"Completed"} color={"primary"} />
  </div>
);
