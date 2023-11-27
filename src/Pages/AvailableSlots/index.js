import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Divider } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const slots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
];

export const AvailableSlots = () => {
  const data = useLocation();
  const navigate = useNavigate();
  const { serviceId, category } = useParams();
  const [bookingDate, setBookingDate] = React.useState(
    dayjs(data?.state?.dateAndZipCode?.dateOfBooking?.$d)
  );
  const [bookingSlot, setBookingSlot] = React.useState("");

  const handleSlotConfirmAndContinue = () => {
    window.scrollTo(0, 0);
    navigate(`/${category}/${serviceId}/payment`, {
      state: {
        ...data.state,
        dateAndZipCode: {
          ...data.state?.dateAndZipCode,
          dateOfBooking: bookingDate,
          timeSlot: bookingSlot,
        },
      },
    });
  };

  const handleDateOfBookingChange = (value) => {
    setBookingDate(value);
    setBookingSlot("");
  };

  const handleSlotChange = (slot) => () => {
    setBookingSlot(slot);
  };

  return (
    <Box sx={{ py: 2 }}>
      <Typography
        variant="h5"
        sx={{
          py: 2,
          mx: "auto",
          textAlign: "center",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        Book Your Appointment
      </Typography>
      <br />
      <Divider />
      <br />
      <Box sx={{ display: "flex", flexFlow: "row wrap" }}>
        <Box sx={{ flexGrow: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              sx={{ mt: 5, ml: "auto", mr: 3 }}
              disablePast
              showDaysOutsideCurrentMonth
              fixedWeekNumber={6}
              value={bookingDate}
              onChange={handleDateOfBookingChange}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ flexGrow: 1, width: "500px" }}>
          <Typography
            variant="overline"
            display="block"
            gutterBottom
            sx={{ p: 1 }}
          >
            {dayjs(bookingDate).format("dddd, MMMM DD")} - Available Slots
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexFlow: "row wrap",
              "& button": { m: 1 },
            }}
          >
            {slots.map((slot) => (
              <Button
                variant={bookingSlot === slot ? "contained" : "outlined"}
                size="large"
                sx={{ width: "150px" }}
                onClick={handleSlotChange(slot)}
              >
                {slot}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
      <br />
      <Divider />
      <br />
      <Box sx={{ textAlign: "center" }}>
        <Button
          size="large"
          color="primary"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleSlotConfirmAndContinue}
          disabled={!bookingSlot}
          sx={{ borderRadius: "30px", width: "300px" }}
        >
          Confirm & Continue
        </Button>
      </Box>
    </Box>
  );
};
