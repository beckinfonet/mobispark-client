import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWashRounded";
import CarRepairIcon from "@mui/icons-material/CarRepairRounded";
// import TireRepairIcon from "@mui/icons-material/TireRepairRounded";
// import GarageIcon from "@mui/icons-material/GarageRounded";
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
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./styles.css";

const avialableTimeSlots = [
  "09:00 - 10:30 AM",
  "10:30 - 12:00 PM",
  "12:00 - 01:30 PM",
  "01:30 - 03:00 PM",
  "03:00 - 04:30 PM",
  "04:30 - 06:00 PM",
];

export const MainSelection = () => {
  const [serviceType, setServiceType] = React.useState("");
  const [shopType, setShopType] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    zipCode: "",
    dateOfBooking: "",
    timeSlot: "",
  });
  const [touched, setTouched] = React.useState({
    zipCode: false,
    dateOfBooking: false,
    timeSlot: false,
  });
  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const handleNavigate = () => {
    handleOpen();
  };

  const isCategorySelected = (category) => categories.includes(category);

  const handleOnCategoryClick = (category) => () => {
    // setCategories((old) =>
    //   isCategorySelected(category)
    //     ? old.filter((c) => c !== category)
    //     : [...old, category]
    // );
    if (shopType) {
      setCategories(category);
    }
  };

  const handleZipcodeChange = (e) => {
    setValues((old) => ({ ...old, zipCode: e.target.value }));
  };

  const handleDateOfBookingChange = (value) => {
    setValues((old) => ({ ...old, dateOfBooking: value }));
  };

  const handleTimeSlotChange = (e) => {
    setValues((old) => ({ ...old, timeSlot: e.target.value }));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleContinue = () => {
    if (values.zipCode.length === 5 && values.dateOfBooking) {
      navigate("/basic-wash", {
        state: { categories, serviceType, shopType, dateAndZipCode: values },
      });
    } else {
      setTouched((old) => ({
        ...old,
        zipCode: true,
        dateOfBooking: true,
        timeSlot: true,
      }));
    }
  };

  return (
    <div className="selection-container">
      {/* <div className="main-categories-header">
        <Typography gutterBottom align="center" variant="h5">
          1. Let's find your service
        </Typography>
        <div>
          {["Mobile", "Stationary"].map((type, index) => (
            <Button
              key={index}
              variant={serviceType === type ? "contained" : "outlined"}
              size="large"
              onClick={() => setServiceType(type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </div> */}
      <div className="main-categories-header">
        <Typography gutterBottom align="center" variant="h5">
          1. Select vehicle type:
        </Typography>
        <div>
          {["SEDAN", "SUV", "3-ROW SUV"].map((item, index) => (
            <Button
              key={index}
              // disabled={!serviceType}
              variant={shopType === item ? "contained" : "outlined"}
              size="large"
              onClick={() => setShopType(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      <div className="main-categories-header last">
        <Typography gutterBottom align="center" variant="h5">
          2. Select mobile service:
        </Typography>
      </div>
      <div className="main-categories-body">
        <div
          className={`item ${isCategorySelected("Tint") ? "active" : ""}`}
          onClick={handleOnCategoryClick("Tint")}
        >
          <MinorCruchIcon sx={{ fontSize: "75px" }} />
          <Typography>Tint</Typography>
        </div>
        <div
          className={`item ${
            isCategorySelected("Mobile Car Wash") ? "active" : ""
          }`}
          onClick={handleOnCategoryClick("Mobile Car Wash")}
        >
          <LocalCarWashIcon sx={{ fontSize: "75px" }} />
          <Typography>Mobile Car Wash</Typography>
        </div>
        <div
          className={`item ${
            isCategorySelected("Full Detailing") ? "active" : ""
          }`}
          onClick={handleOnCategoryClick("Full Detailing")}
        >
          <NoCrashIcon sx={{ fontSize: "75px" }} />
          <Typography>Full Detailing</Typography>
        </div>

        <div
          className={`item ${
            isCategorySelected("Paintless Dent Repair") ? "active" : ""
          }`}
          onClick={handleOnCategoryClick("Paintless Dent Repair")}
        >
          <CarRepairIcon sx={{ fontSize: "75px" }} />
          <Typography>Paintless Dent Repair</Typography>
        </div>
      </div>
      <Dialog fullWidth fullScreen={false} open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            background: "#1976d2",
            color: "#ffffff",
            textAlign: "center",
            fontSize: "1.5rem",
          }}
        >
          Please Provide Details
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: "0px" }}>
          <Box component="div" noValidate autoComplete="off">
            <div
              style={{ maxWidth: "400px", width: "100%", margin: "0px auto" }}
            >
              <div style={{ width: "100%", margin: "20px 0px" }}>
                <label htmlFor="zipCode">Zipcode</label>
                <TextField
                  size="small"
                  error={touched.zipCode && values.zipCode.length < 5}
                  id="outlined-error-helper-text"
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
                    placeholder: "Zipcode",
                    maxLength: "5",
                    onBlur: () =>
                      setTouched((old) => ({ ...old, zipCode: true })),
                  }}
                />
              </div>
              <div style={{ width: "100%", margin: "20px 0px" }}>
                <label htmlFor="dateOfBooking">Date of booking</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={values.dateOfBooking}
                    onChange={handleDateOfBookingChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        // hideLabel
                        error={
                          touched.dateOfBooking &&
                          values.dateOfBooking.length === 0
                        }
                        fullWidth
                        inputProps={{
                          ...params.inputProps,
                          onBlur: () =>
                            setTouched((old) => ({
                              ...old,
                              dateOfBooking: true,
                            })),
                        }}
                        helperText={
                          touched.dateOfBooking &&
                          values.dateOfBooking.length === 0
                            ? "Field is required"
                            : ""
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div style={{ width: "100%", margin: "20px 0px" }}>
                <label htmlFor="timeSlot">Time Slot</label>
                <FormControl
                  sx={{ width: "100%" }}
                  error={touched.timeSlot && values.timeSlot.length === 0}
                >
                  <Select
                    id="time-slot"
                    size="small"
                    value={values.timeSlot}
                    // hideLabel
                    onChange={handleTimeSlotChange}
                    onBlur={() =>
                      setTouched((old) => ({ ...old, timeSlot: true }))
                    }
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>-- Select Time Slot --</em>
                    </MenuItem>
                    {avialableTimeSlots.map((timeSlot) => (
                      <MenuItem key={timeSlot} value={timeSlot}>
                        {timeSlot}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.timeSlot && values.timeSlot.length === 0 && (
                    <FormHelperText>Field is required</FormHelperText>
                  )}
                </FormControl>
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions sx={{ paddingBottom: "20px", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleContinue}
            sx={{ borderRadius: "20px", width: "200px" }}
          >
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
          sx={{ borderRadius: "30px" }}
        >
          See results
        </Button>
      </div>
    </div>
  );
};
