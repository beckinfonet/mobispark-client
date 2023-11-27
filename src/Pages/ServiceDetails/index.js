import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ImageSlider } from "../../components/ImageSlider";
import { PlansSelection } from "../../components/PlansSelection";

const images = [
  {
    id: 1,
    src: "https://hips.hearstapps.com/hmg-prod/images/man-hoovering-seat-of-car-during-car-cleaning-royalty-free-image-1585677173.jpg?crop=0.668xw:1.00xh;0.247xw,0&resize=1200:*",
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
  const { title, rate, fullAddress, promoRate, servicePlans } =
    data?.state?.selectedVendor;

  const handleBookCarWash = (config) => {
    window.scrollTo(0, 0);
    navigate(`/${category}/${serviceId}/available-slots`, {
      state: {
        ...data.state,
        selectedPlan: config?.planType,
        selectedVendor: {
          ...data?.state?.selectedVendor,
          basePrice: config?.price,
        },
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
      <PlansSelection
        promoRate={promoRate}
        servicePlans={servicePlans}
        handleBookCarWash={handleBookCarWash}
      />
    </Box>
  );
};
