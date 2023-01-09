import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Divider from "@mui/material/Divider";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CarsImage from "../../assets/images/wax.jpeg";

const servicesPills = ["Car wash", "Tint", "Tire pressure"];

const calculateOffer = (basePrice, offerPrice = 0) =>
  Math.round(((basePrice - offerPrice) / basePrice) * 10000) / 100;

export function ServiceCard(props) {
  const {
    title,
    fullAddress,
    rate,
    promoContentTop,
    promoContentBottom,
    basePrice,
    promoRate,
  } = props.data || {};
  return (
    <Card raised>
      <CardActionArea onClick={props.onClick}>
        <CardMedia
          component="img"
          height="180"
          image={CarsImage}
          alt="green iguana"
        />
        <CardContent>
          <Stack direction="row" spacing={1}>
            <Chip
              label={promoContentTop.toUpperCase()}
              color="success"
              variant="outlined"
              size="small"
            />
          </Stack>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="text-feedback"
              value={rate}
              readOnly
              precision={0.1}
              size="small"
            />
            <Box sx={{ ml: 1 }}>{rate}</Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              margin: "10px 0px",
            }}
          >
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {fullAddress}
            </Typography>
          </Box>

          <Stack direction={"row"} spacing={1} sx={{ mt: 2, mb: 2 }}>
            {servicesPills.map((serviceType) => (
              <Chip label={serviceType} color="primary" size="small" />
            ))}
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              margin: "2px 0px",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {promoContentBottom}
            </Typography>
            {calculateOffer(basePrice, promoRate) ? (
              <Typography variant="body2" color="success.main">
                {calculateOffer(basePrice, promoRate)}% OFF
              </Typography>
            ) : null}
          </Box>
        </CardContent>
      </CardActionArea>
      <Divider light />
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          margin: "2px 0px",
        }}
      >
        <Typography variant="h6">${promoRate}</Typography>
        <Button
          size="small"
          color="primary"
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          onClick={props.onClick}
        >
          More Details
        </Button>
      </CardActions>
    </Card>
  );
}
