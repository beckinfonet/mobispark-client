import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWashRounded";
import MinorCruchIcon from "@mui/icons-material/MinorCrashRounded";

import { ServiceCategories } from "../../components/ServiceCategories";
import { ServiceCard } from "../../components/ServiceDetailsCard/ServiceCard";

const testOptions = [
  { title: "Mobile Tint", cost: 20, Icon: MinorCruchIcon },
  { title: "Mobile Car Wash", cost: 5, Icon: LocalCarWashIcon },
];

export const BasicWash = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = React.useState(
    testOptions.filter((opt) => state.categories === opt.title)
  );
  const [vendorList, setVendorList] = useState({
    status: "loading",
    data: [],
    error: null,
  });

  // useEffect(() => {
  //   const fetchVendors = async () => {
  //     const result = await axios(
  //       "https://formula312-server-2xrue.ondigitalocean.app/vendors"
  //     );
  //     setVendors(result.data);
  //   };

  //   fetchVendors();
  // }, []);

  useEffect(() => {
    const category = encodeURIComponent(state?.categories);
    const shopType = encodeURIComponent(state?.shopType);
    const zipCode = encodeURI(state?.dateAndZipCode?.zipCode);
    setVendorList({ status: "loading" });
    axios
      .get(`/api/vendors/list/${zipCode}`, { params: { category, shopType } })
      .then((res) => {
        setVendorList({ status: "success", data: res?.data?.data || [] });
      })
      .catch((error) => {
        setVendorList({ status: "error", error: error });
      });
  }, []);

  const handleCategoryClick = (categories) => {
    setSelectedCategories(categories);

    const category = encodeURIComponent(categories?.[0]?.title);
    const shopType = encodeURIComponent(state?.shopType);
    const zipCode = encodeURIComponent(state?.dateAndZipCode?.zipCode);
    setVendorList({ status: "loading" });
    axios
      .get(`/api/vendors/list/${zipCode}`, { params: { category, shopType } })
      .then((res) => {
        setVendorList({ status: "success", data: res?.data?.data || [] });
      })
      .catch((error) => {
        setVendorList({ status: "error", error: error });
      });
  };

  const handleServiceCardClick = (record) => () => {
    window.scrollTo(0, 0);
    navigate(`/basic-wash/${record.id}/details`, {
      state: {
        selectedVendor: record,
        dateAndZipCode: state.dateAndZipCode,
        categories: selectedCategories?.[0]?.title,
      },
    });
  };

  return (
    <Box>
      <ServiceCategories
        selected={selectedCategories}
        options={testOptions}
        onClick={handleCategoryClick}
      />
      {vendorList?.status === "error" && (
        <div>
          <Typography
            variant="h4"
            align="center"
            color="text.secondary"
            sx={{
              margin: "30px 0px",
              fontFamily: "inherit",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            Something went wrong, Please try after sometime.
          </Typography>
        </div>
      )}
      {vendorList?.status === "success" && (
        <Grid container spacing={3}>
          {vendorList?.data?.length === 0 && (
            <div>
              <Typography
                variant="h4"
                align="center"
                color="text.secondary"
                sx={{
                  margin: "30px 0px",
                  fontFamily: "inherit",
                  fontWeight: "600",
                  textTransform: "uppercase",
                }}
              >
                No records found
              </Typography>
            </div>
          )}
          {vendorList?.data?.map((record, key) => (
            <Grid item xs={12} md={4} key={key}>
              <ServiceCard
                data={record}
                onClick={handleServiceCardClick(record)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
