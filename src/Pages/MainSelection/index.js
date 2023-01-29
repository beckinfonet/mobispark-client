import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWashRounded";
import CarRepairIcon from "@mui/icons-material/CarRepairRounded";
import TireRepairIcon from "@mui/icons-material/TireRepairRounded";
import GarageIcon from "@mui/icons-material/GarageRounded";
import NoCrashIcon from "@mui/icons-material/NoCrashRounded";
import MinorCruchIcon from "@mui/icons-material/MinorCrashRounded";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./styles.css";

export const MainSelection = () => {
  const [categories, setCategories] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [zipCode, setZipcode] = React.useState("");
  const [zipcodeTouched, setZipcodeTouched] = React.useState(false);

  const navigate = useNavigate();

  const handleNavigate = () => {
    handleOpen();
  };

  const isCategorySelected = (category) => categories.includes(category);

  const handleOnCategoryClick = (category) => () => {
    setCategories((old) =>
      isCategorySelected(category)
        ? old.filter((c) => c !== category)
        : [...old, category]
    );
  };

  const handleZipcodeChange = (e) => {
    setZipcode(e.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleContinue = () => {
    if (zipCode.length === 6) {
      navigate("/basic-wash", { state: categories });
    } else {
      setZipcodeTouched(true);
    }
  };

  return (
    <div className="selection-container">
      <div className="main-categories-header">
        <Typography gutterBottom align="center" variant="h5">
          PLEASE SELECT SERVICE
        </Typography>
      </div>
      <div className="main-categories-body">
        <div
          className={`item ${isCategorySelected("Tint") ? "active" : ""}`}
          onClick={handleOnCategoryClick("Tint")}
        >
          <MinorCruchIcon sx={{ fontSize: "100px" }} />
          <Typography>Tint</Typography>
        </div>
        <div
          className={`item ${
            isCategorySelected("Mobile Car Wash") ? "active" : ""
          }`}
          onClick={handleOnCategoryClick("Mobile Car Wash")}
        >
          <LocalCarWashIcon sx={{ fontSize: "100px" }} />
          <Typography>Mobile Car Wash</Typography>
        </div>
        <div
          className={`item ${
            isCategorySelected("Full Detailing") ? "active" : ""
          }`}
          onClick={handleOnCategoryClick("Full Detailing")}
        >
          <NoCrashIcon sx={{ fontSize: "100px" }} />
          <Typography>Full Detailing</Typography>
        </div>
        <div
          className={`item ${
            isCategorySelected("Body Shop Work") ? "active" : ""
          }`}
          onClick={handleOnCategoryClick("Body Shop Work")}
        >
          <GarageIcon sx={{ fontSize: "100px" }} />
          <Typography>Body Shop Work</Typography>
        </div>
        <div
          className={`item ${
            isCategorySelected("Paintless Dent Repire") ? "active" : ""
          }`}
          onClick={handleOnCategoryClick("Paintless Dent Repire")}
        >
          <CarRepairIcon sx={{ fontSize: "100px" }} />
          <Typography>Paintless Dent Repire</Typography>
        </div>
        <div
          className={`item ${
            isCategorySelected("Mobile Tire Services") ? "active" : ""
          }`}
          onClick={handleOnCategoryClick("Mobile Tire Services")}
        >
          <TireRepairIcon sx={{ fontSize: "100px" }} />
          <Typography>Mobile Tire Services</Typography>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Please provide zipcode</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <Box component="form" noValidate autoComplete="off" sx={{ p: 2 }}>
            <div style={{ minWidth: "400px" }}>
              <TextField
                error={zipcodeTouched && zipCode.length < 6}
                id="outlined-error-helper-text"
                label="Zipcode"
                helperText={
                  zipcodeTouched && zipCode.length < 6
                    ? zipCode.length === 0
                      ? "Field is required"
                      : "Please provide valid zipcode"
                    : ""
                }
                value={zipCode}
                sx={{ width: "100%" }}
                onChange={handleZipcodeChange}
                inputProps={{
                  maxLength: "6",
                  onBlur: () => setZipcodeTouched(true),
                }}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleContinue}>Continue</Button>
        </DialogActions>
      </Dialog>
      <div className="main-categories-footer">
        <Button
          size="large"
          color="primary"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleNavigate}
          disabled={categories.length === 0}
        >
          See results
        </Button>
      </div>
    </div>
  );
};
