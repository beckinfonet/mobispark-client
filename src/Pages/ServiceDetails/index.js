import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

import { ImageSlider } from "../../components/ImageSlider";
import { PlansSelection } from "../../components/PlansSelection";
import { BookMeetingInlineWidget } from "../../components/BookAppointment";

const images = [
  {
    id: 1,
    src: "https://www.tidalwaveautospa.com/wp-content/uploads/2022/10/DJM_TidalWave_RedefineU_20220628-072.jpg",
  },
  {
    id: 2,
    src: "https://images.squarespace-cdn.com/content/v1/57bf69aa9f7456b465a1ef78/1552972248385-JLADWPA6BC7YCPRKRFM4/service-page-mobile-car-wash-2500x1667.jpg?format=2500w",
  },
  {
    id: 3,
    src: "https://itscarwash.com/wp-content/uploads/2022/02/Locate-a-Hand-Car-Wash-Near-You.jpg",
  },
  {
    id: 4,
    src: "https://blog.way.com/wp-content/uploads/2021/01/part-car-wash-detailing-station-4.jpg",
  },
];

export const ServiceDetails = () => {
  const data = useLocation();
  const { serviceId, category } = useParams();
  const navigate = useNavigate();
  const { title, rate, fullAddress, promoRate, serviceTypes, carwashPackages } =
    data.state.selectedVendor;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const bookAppointment = () => {
    handleOpen();
  };

  const handleBookCarWash = (totalBaseRate) => {
    handleClose();
    navigate(`/${category}/${serviceId}/payment`, {
      state: {
        selectedVendor: { ...data.state.selectedVendor, totalBaseRate },
        dateAndZipCode: { ...data.state.dateAndZipCode },
      },
    });
  };

  return (
    <Box>
      <ImageSlider images={images} />
      <Typography variant="h4" sx={{ py: 1 }}>
        {title}
      </Typography>
      <Typography sx={{ py: 1 }}>{fullAddress}</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          py: 1,
          marginBottom: "20px",
        }}
      >
        <Rating name="text-feedback" precision={0.1} value={rate} readOnly />
        <Box sx={{ ml: 1 }}>305 ratings</Box>
      </Box>
      <Dialog fullWidth fullScreen open={open} onClose={handleClose}>
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
            <BookMeetingInlineWidget
              user={{ email: "beckinfonet@gmail.com", name: "Beck" }}
              calenly={"https://calendly.com/foodrates"}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ paddingBottom: "20px", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleClose}
            sx={{ borderRadius: "20px", width: "200px" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleBookCarWash}
            sx={{ borderRadius: "20px", width: "200px" }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      <PlansSelection
        promoRate={promoRate}
        serviceTypes={serviceTypes}
        handleBookCarWash={bookAppointment}
        carwashPackages={carwashPackages}
      />
    </Box>
  );
};
