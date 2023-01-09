import "./styles.css";
import React from "react";
import Rating from "@mui/material/Rating";
import { useLocation } from "react-router-dom";

import ScrollableImages from "../ScrollableImages/index";

import { GenericButton } from "../Buttons/GenericButton";
import ServiceCard from "../ServiceCard";

const stickyButton = {
  position: "absolute",
  width: 50,
  height: 50,
  bottom: 0,
  backgroundColor: "red",
  zIndex: 100,
};
export const Details = (props) => {
  const data = useLocation();
  const {
    title,
    contentText,
    image,
    rate,
    promoRate,
    basePrice,
    promoContentTop,
    promoContentBottom,
    fullAddress,
    serviceTypes,
  } = data.state;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      className="details"
    >
      <ScrollableImages />
      <div className="inner-box">
        <div className="title">
          <p style={{ margin: "0px" }}>{title}</p>
        </div>
        <div>
          <p>{fullAddress}</p>
        </div>
        <span className="rating-span">
          <Rating name="half-rating" precision={0.5} value={rate} color="red" />
          305 ratings
        </span>
        <div>
          <GenericButton>{`Book for $${promoRate}`}</GenericButton>
        </div>
        <p className="included-text">What is included:</p>
        <ServiceCard serviceTypes={serviceTypes} />
      </div>
    </div>
  );
};
