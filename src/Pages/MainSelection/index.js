import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./styles.css";

const selectionTiles = [
  "Tint",
  "Mobile Car Wash",
  "Full Detailing",
  "Body Shop Work",
  "Paintles Dent Repair",
  "Mobile Tire Services",
];

const Tile = ({ children }) => <div className="title-box">{children}</div>;

export const MainSelection = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/basic-wash`);
  };

  return (
    <div className="selection-container">
      <Typography>Please select services:</Typography>
      <div
        style={{ width: "70%", backgroundColor: "" }}
        className="tile-section"
      >
        {selectionTiles.map((service, index) => (
          <Tile key={index}>{service}</Tile>
        ))}
      </div>
      <Button
        size="small"
        color="primary"
        variant="outlined"
        endIcon={<ArrowForwardIcon />}
        onClick={handleNavigate}
      >
        See results!
      </Button>
    </div>
  );
};
