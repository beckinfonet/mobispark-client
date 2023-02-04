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
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import "./styles.css";

export const MainSelection = () => {
  const [categories, setCategories] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    zipCode: "",
    dateOfBooking: "",
  });
  const [touched, setTouched] = React.useState({
    zipCode: false,
    dateOfBooking: false,
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
    setValues((old) => ({ ...old, zipCode: e.target.value }));
  };

  const handleDateOfBookingChange = (e) => {
    setValues((old) => ({ ...old, dateOfBooking: e.target.value }));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleContinue = () => {
    if (values.zipCode.length === 5 && values.dateOfBooking) {
      navigate("/basic-wash", {
        state: { categories, dateAndZipCode: values },
      });
    } else {
      setTouched((old) => ({ ...old, zipCode: true, dateOfBooking: true }));
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
      <Dialog
        fullWidth
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle
          sx={{
            background: "#1976d2",
            color: "#ffffff",
            textAlign: "center",
            fontSize: "1.75rem",
          }}
        >
          Please Provide Details
        </DialogTitle>
        <DialogContent dividers>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <Box component="div" noValidate autoComplete="off" sx={{ p: 2 }}>
            <div
              style={{ maxWidth: "600px", width: "100%", margin: "30px 0px" }}
            >
              <div style={{ width: "100%", margin: "20px 0px" }}>
                <label htmlFor="zipCode">Zipcode</label>
                <TextField
                  error={touched.zipCode && values.zipCode.length < 5}
                  id="outlined-error-helper-text"
                  hideLabel
                  helperText={
                    touched.zipCode && values.zipCode.length < 5
                      ? values.zipCode.length === 0
                        ? "Field is required"
                        : "Please provide valid zipcode"
                      : ""
                  }
                  fullWidth
                  value={values.zipCode}
                  onChange={handleZipcodeChange}
                  inputProps={{
                    maxLength: "5",
                    onBlur: () =>
                      setTouched((old) => ({ ...old, zipCode: true })),
                  }}
                />
              </div>
              <div style={{ width: "100%", margin: "20px 0px" }}>
                <label htmlFor="dateOfBooking">Date of booking</label>
                <TextField
                  error={
                    touched.dateOfBooking && values.dateOfBooking.length === 0
                  }
                  id="date-of-booking"
                  hideLabel
                  type="datetime-local"
                  value={values.dateOfBooking}
                  fullWidth
                  onChange={handleDateOfBookingChange}
                  inputProps={{
                    onBlur: () =>
                      setTouched((old) => ({ ...old, dateOfBooking: true })),
                  }}
                  helperText={
                    touched.dateOfBooking && values.dateOfBooking.length === 0
                      ? "Field is required"
                      : ""
                  }
                />
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: "20px" }}>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={handleContinue}>
            Continue
          </Button>
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
